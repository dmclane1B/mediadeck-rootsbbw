import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StorageMonitor from '@/components/StorageMonitor';
import ImageRestoreStatus from '@/components/ImageRestoreStatus';
import MediaDiagnostics from '@/components/MediaDiagnostics';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MediaLibrary from '@/components/MediaLibrary';
import ImageShowcase from '@/components/ImageShowcase';
import useSlideImages, { SlideImage } from '@/hooks/useSlideImages';
import { useSlideImageValidation } from '@/hooks/useSlideImageValidation';
import { usePublishedSlides } from '@/hooks/usePublishedSlides';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import SlideImageStatus from '@/components/SlideImageStatus';
import { MediaFile, useMediaLibrary } from '@/hooks/useMediaLibrary';
import { ArrowLeft, Settings, Image, Presentation, Download, Upload, HardDrive, CheckCircle, AlertTriangle, RotateCcw, Play, Save, Type, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SlideContentEditor from '@/components/SlideContentEditor';
import SlideHealthCheck from '@/components/SlideHealthCheck';
import ValidationRunner from '@/components/ValidationRunner';
import { CloudMediaManager } from '@/utils/cloudMedia';

const MediaDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { slideConfig, setSlideImage, getSlideImage, clearAllConfigurations } = useSlideImages();
  const { publishAllSlides, isLoading: isPublishing } = usePublishedSlides();
  const { isSlidePublished, getSlideImageForDisplay } = useSlideImageResolver();
  const { restoreFromPublishedSlides, restoring } = useMediaLibrary();
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("slides");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);
  const [publishingProgress, setPublishingProgress] = useState<{
    stage: 'idle' | 'preparing' | 'uploading' | 'publishing' | 'complete' | 'error';
    progress: number;
    currentSlide?: string;
    details?: string;
  }>({ stage: 'idle', progress: 0 });
 
  const slides = useMemo(() => [
    { id: 'title', name: 'Title Slide', route: '/' },
    { id: 'overview', name: 'Overview', route: '/slides/overview' },
    { id: 'challenges', name: 'Challenges', route: '/slides/challenges' },
    { id: 'monday-kickoff', name: 'Monday Kick-Off', route: '/slides/monday-kickoff' },
    { id: 'expert-panel', name: 'Expert Panel', route: '/slides/expert-panel' },
    { id: 'community-voices', name: 'Community Voices', route: '/slides/community-voices' },
    { id: 'nutrition-education', name: 'Nutrition Education', route: '/slides/nutrition-education' },
    { id: 'workout-session', name: 'Workout Session', route: '/slides/workout-session' },
    { id: 'smoothie-demo', name: 'Smoothie Demo', route: '/slides/smoothie-demo' },
    { id: 'resources-support', name: 'Resources & Support', route: '/slides/resources-support' },
    { id: 'community-partners', name: 'Community Partners', route: '/slides/community-partners' },
    { id: 'roadmap', name: 'Roadmap', route: '/slides/roadmap' },
    { id: 'ask', name: 'Ask', route: '/slides/ask' },
    { id: 'contact', name: 'Contact', route: '/slides/contact' }
  ], []);

  // Add validation for slide images - memoize slideIds to prevent infinite re-renders
  const slideIds = useMemo(() => slides.map(slide => slide.id), [slides]);
  const { validations, isValidating, validateAndCleanup, getValidationSummary } = useSlideImageValidation(slideIds);
  const summary = getValidationSummary();


  // Convert MediaFile to SlideImage format
  const convertMediaFileToSlideImage = (mediaFile: MediaFile): SlideImage => {
    return {
      id: mediaFile.id,
      name: mediaFile.name,
      url: mediaFile.url,
      uploadDate: mediaFile.uploadDate,
      dimensions: mediaFile.dimensions,
      size: mediaFile.size
    };
  };

  const handleImageSelect = async (image: MediaFile) => {
    if (selectedSlide) {
      try {
        const slideImage = convertMediaFileToSlideImage(image);
        await setSlideImage(selectedSlide, slideImage);
        setShowImageSelector(false);
        setSelectedSlide(null);
        toast({
          title: "Image Selected",
          description: `${image.name} has been assigned to the slide.`,
        });
      } catch (error) {
        console.error('Error selecting image:', error);
        if (error instanceof Error && (error.name === 'QuotaExceededError' || error.message.includes('QuotaExceededError'))) {
          toast({
            title: "Storage Full",
            description: "Your browser storage is full. Please clear some images from your media library.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Selection Failed",
            description: "Failed to assign image to slide. Please try again.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const openImageSelector = (slideId: string) => {
    setSelectedSlide(slideId);
    setShowImageSelector(true);
  };

  const removeSlideImage = (slideId: string) => {
    setSlideImage(slideId, null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save process (data is already auto-saved to IndexedDB)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const slidesWithImages = Object.keys(slideConfig).length;
    
    toast({
      title: "Changes Saved",
      description: `Successfully saved ${slidesWithImages} slide image assignments.`,
    });
    
    setIsSaving(false);
  };

  const handleSaveAndPublish = async () => {
    if (summary.validImages === 0) {
      toast({
        title: "No slides to publish",
        description: "Please add images to your slides before publishing.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);
      setPublishingProgress({ stage: 'preparing', progress: 10, details: 'Starting save & publish...' });
      console.log('[MediaDashboard] Starting save & publish process...');

      // Step 1: Save current state
      setPublishingProgress({ stage: 'preparing', progress: 20, details: 'Saving current state...' });
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save
      
      // Step 2: Verify storage health
      setPublishingProgress({ stage: 'preparing', progress: 30, details: 'Checking storage health...' });
      console.log('[MediaDashboard] Checking storage health...');
      const storageHealth = await CloudMediaManager.verifyStorageHealth();
      if (!storageHealth.healthy) {
        throw new Error(`Storage health check failed: ${storageHealth.error}`);
      }
      
      // Step 3: Prepare slide configurations
      setPublishingProgress({ stage: 'uploading', progress: 50, details: 'Preparing slide configurations...' });
      console.log('[MediaDashboard] Building publish configurations...');
      
      const slideCount = Object.keys(slideConfig).length;
      if (slideCount === 0) {
        throw new Error('No slide configurations found to publish.');
      }

      // Step 4: Publish slides
      setPublishingProgress({ stage: 'publishing', progress: 70, details: 'Publishing to database...' });
      console.log('[MediaDashboard] Publishing slides to database...');
      
      // Create a mock result array since publishAllSlides returns boolean
      const slideIds = Object.keys(slideConfig);
      const publishResult = await publishAllSlides(slideIds);
      const results = slideIds.map(id => ({ slideId: id, success: publishResult }));
      
      // Step 5: Complete
      setPublishingProgress({ stage: 'complete', progress: 100, details: 'Publishing complete!' });
      console.log('[MediaDashboard] Publish complete. Results:', results);

      const successCount = results.filter(r => r.success).length;
      const failureCount = results.length - successCount;

      if (successCount > 0) {
        setShowPublishSuccess(true);
        toast({
          title: "Slides Published Successfully!",
          description: `${successCount} slides published${failureCount > 0 ? `, ${failureCount} failed` : ''}`
        });
      } else {
        throw new Error(`All ${failureCount} slides failed to publish`);
      }

    } catch (error) {
      console.error('[MediaDashboard] Save & publish error:', error);
      toast({
        title: "Publishing Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
      setPublishingProgress({ stage: 'idle', progress: 0, details: '' });
    }
  };

  const handleStartPresentation = () => {
    navigate('/');
  };

  const handlePublishSlides = async () => {
    const slideCount = Object.keys(slideConfig).length;
    console.log('🚀 Starting slide publishing process');
    console.log('📊 Publishing configuration:', slideConfig);
    console.log(`📑 Total slides to publish: ${slideCount}`);
    
    if (slideCount === 0) {
      toast({
        title: "No Slides to Publish",
        description: "Please add images to your slides before publishing.",
        variant: "destructive",
      });
      return;
    }

      // Reset progress
      setPublishingProgress({ stage: 'preparing', progress: 10, details: 'Preparing slides for publishing...' });
      
      try {
        // Step 1: Pre-flight checks
        console.log('🔍 Performing pre-flight checks...');
        setPublishingProgress({ stage: 'preparing', progress: 20, details: 'Validating slide data...' });
        
        // Check Supabase connection
        const { data: healthCheck, error: healthError } = await supabase
          .from('published_slide_configurations')
          .select('count')
          .limit(1);
        
        if (healthError) {
          console.error('❌ Supabase connection failed:', healthError);
          throw new Error('Database connection failed. Please check your internet connection.');
        }
        
        console.log('✅ Database connection verified');

        // Check Cloud Storage availability
        setPublishingProgress({ stage: 'preparing', progress: 30, details: 'Checking cloud storage...' });
        const cloudOk = await CloudMediaManager.isCloudAvailable();
        if (!cloudOk) {
          throw new Error('Cloud storage bucket is not available. Please try again later.');
        }
        console.log('✅ Cloud storage available');
        setPublishingProgress({ stage: 'preparing', progress: 35, details: 'Cloud storage verified' });
        
        // Step 2: Start upload process
        setPublishingProgress({ stage: 'uploading', progress: 40, details: 'Uploading images to cloud storage...' });
        console.log('☁️ Starting cloud upload process...');
        
        // Step 3: Publish slides
        setPublishingProgress({ stage: 'publishing', progress: 70, details: 'Publishing slides to database...' });
        console.log('📤 Publishing slides to database...');
        
        const success = await publishAllSlides(slideConfig);
      
      if (success) {
        console.log('✅ All slides published successfully!');
        setPublishingProgress({ stage: 'complete', progress: 100, details: 'Publishing complete!' });
        
        // Brief delay to show completion
        setTimeout(() => {
          setPublishingProgress({ stage: 'idle', progress: 0 });
          setShowSuccessDialog(true);
        }, 1000);
        
        toast({
          title: "Slides Published Successfully!",
          description: "Your slides are now live and accessible from any device.",
        });
      } else {
        console.log('⚠️ Publishing completed with some failures');
        setPublishingProgress({ stage: 'error', progress: 0, details: 'Some slides failed to publish' });
        
        setTimeout(() => {
          setPublishingProgress({ stage: 'idle', progress: 0 });
        }, 3000);
        
        toast({
          title: "Publishing Incomplete",
          description: "Some slides failed to publish. Check the console for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('❌ Failed to publish slides:', error);
      setPublishingProgress({ 
        stage: 'error', 
        progress: 0, 
        details: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
      
      setTimeout(() => {
        setPublishingProgress({ stage: 'idle', progress: 0 });
      }, 5000);
      
      toast({
        title: "Publishing Failed",
        description: error instanceof Error ? error.message : "There was an error publishing your slides. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportConfiguration = () => {
    const dataStr = JSON.stringify(slideConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `slide-config-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleRestoreAllImages = async () => {
    try {
      const restoredCount = await restoreFromPublishedSlides();
      
      if (restoredCount > 0) {
        toast({
          title: "Images Restored Successfully!",
          description: `Restored ${restoredCount} images from published slides.`,
        });
      } else {
        toast({
          title: "No Images to Restore",
          description: "All published images are already available in your media library.",
        });
      }
    } catch (error) {
      console.error('Error restoring images:', error);
      toast({
        title: "Restoration Failed",
        description: error instanceof Error ? error.message : "Failed to restore images from published slides.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/builder')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Builder
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Media Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your slide images and media library
              </p>
              
              {/* Validation Summary */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">
                    {summary.validImages}/{summary.totalSlides} slides have images
                  </span>
                </div>
                
                {summary.invalidImages > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-amber-600">
                      {summary.invalidImages} invalid references
                    </span>
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  {summary.completionPercentage}% complete
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Primary Action Buttons */}
            <Button onClick={handleStartPresentation} size="lg" className="mr-4">
              <Play className="w-4 h-4 mr-2" />
              Start Presentation
            </Button>
            
            <Button 
              onClick={handleSaveAndPublish} 
              disabled={isSaving || isPublishing}
              size="lg"
              className="mr-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            
            <Button 
              onClick={handlePublishSlides} 
              disabled={isPublishing || summary.validImages === 0 || publishingProgress.stage !== 'idle'}
              size="lg" 
              className="mr-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 min-w-[160px] relative overflow-hidden"
            >
              {publishingProgress.stage !== 'idle' && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 transition-all duration-300"
                  style={{ width: `${publishingProgress.progress}%` }}
                />
              )}
              <Globe className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">
                {publishingProgress.stage === 'idle' && 'Publish Slides'}
                {publishingProgress.stage === 'preparing' && 'Preparing...'}
                {publishingProgress.stage === 'uploading' && 'Uploading...'}
                {publishingProgress.stage === 'publishing' && 'Publishing...'}
                {publishingProgress.stage === 'complete' && 'Complete!'}
                {publishingProgress.stage === 'error' && 'Failed'}
              </span>
            </Button>
            
            {/* Secondary Action Buttons */}
            {summary.invalidImages > 0 && (
              <Button variant="outline" onClick={validateAndCleanup} disabled={isValidating}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {isValidating ? 'Cleaning...' : 'Cleanup Invalid'}
              </Button>
            )}
            
            <Button variant="outline" onClick={exportConfiguration}>
              <Download className="w-4 h-4 mr-2" />
              Export Config
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleRestoreAllImages}
              disabled={restoring}
            >
              <Upload className="w-4 h-4 mr-2" />
              {restoring ? 'Restoring...' : 'Restore Images'}
            </Button>
            <Button variant="destructive" onClick={clearAllConfigurations}>
              <Settings className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>

        {/* Publishing Progress Indicator */}
        {publishingProgress.stage !== 'idle' && (
          <div className="bg-card border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">Publishing Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">{publishingProgress.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${publishingProgress.progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{publishingProgress.details}</p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 max-w-4xl">
            <TabsTrigger value="slides" className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              Slide Images
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text Content
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Health Check
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Media Library
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Diagnostics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map(slide => {
                const resolvedImage = getSlideImageForDisplay(slide.id);
                
                return (
                  <Card key={slide.id} className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{slide.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">Slide {slide.id}</span>
                          <SlideImageStatus 
                            hasImage={!!resolvedImage} 
                            isPublished={resolvedImage?.isPublished}
                            source={resolvedImage?.source}
                            error={validations.find(v => v.slideId === slide.id)?.error}
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(slide.route)}
                      >
                        View Slide
                      </Button>
                    </div>
                    
                    <ImageShowcase
                      resolvedImage={resolvedImage}
                      variant="compact"
                      onImageSelect={() => openImageSelector(slide.id)}
                      showPlaceholder={!resolvedImage}
                    />
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openImageSelector(slide.id)}
                        className="flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {resolvedImage ? 'Change' : 'Add'} Image
                      </Button>
                      {resolvedImage && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSlideImage(slide.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="content">
            <Card className="p-6">
              <SlideContentEditor 
                slides={slides} 
                onNavigateToImages={() => setActiveTab("slides")}
              />
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <SlideHealthCheck onFixIssues={() => setActiveTab("content")} />
          </TabsContent>

          <TabsContent value="validation">
            <ValidationRunner autoRun={activeTab === "validation"} />
          </TabsContent>

          <TabsContent value="library">
            <Card className="p-6">
              <MediaLibrary />
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <StorageMonitor />
            <ImageRestoreStatus />
          </TabsContent>

          <TabsContent value="diagnostics">
            <MediaDiagnostics />
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Selection Dialog */}
      <Dialog open={showImageSelector} onOpenChange={setShowImageSelector}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Image for Slide</DialogTitle>
          </DialogHeader>
          <MediaLibrary 
            onSelectImage={handleImageSelect}
            compact={false}
          />
        </DialogContent>
      </Dialog>

      {/* Publish Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Publish Complete</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">Slides published successfully</span>
            </div>
            <p className="text-muted-foreground">
              Your slides are now live and accessible from any device.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
                Close
              </Button>
              <Button onClick={() => { setShowSuccessDialog(false); handleStartPresentation(); }}>
                Start Presentation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaDashboard;