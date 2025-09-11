import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StorageMonitor from '@/components/StorageMonitor';
import { useNavigate } from 'react-router-dom';
import MediaLibrary from '@/components/MediaLibrary';
import ImageShowcase from '@/components/ImageShowcase';
import useSlideImages, { SlideImage } from '@/hooks/useSlideImages';
import { useSlideImageValidation } from '@/hooks/useSlideImageValidation';
import SlideImageStatus from '@/components/SlideImageStatus';
import { MediaFile } from '@/hooks/useMediaLibrary';
import { ArrowLeft, Settings, Image, Presentation, Download, Upload, HardDrive, CheckCircle, AlertTriangle, RotateCcw, Play, Save, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SlideContentEditor from '@/components/SlideContentEditor';

const MediaDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { slideConfig, setSlideImage, getSlideImage, clearAllConfigurations } = useSlideImages();
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("slides");

  const slides = useMemo(() => [
    { id: 'title', name: 'Title Slide', route: '/' },
    { id: 'overview', name: 'Overview', route: '/slides/overview' },
    { id: 'challenges', name: 'Challenges', route: '/slides/challenges' },
    { id: 'product-glimpse', name: 'Product Glimpse', route: '/slides/product-glimpse' },
    { id: 'market-overview', name: 'Market Overview', route: '/slides/market-overview' },
    { id: 'proof-demand', name: 'Proof of Demand', route: '/slides/proof-demand' },
    { id: 'sales-strategy', name: 'Sales Strategy', route: '/slides/sales-strategy' },
    { id: 'customer-persona', name: 'Customer Persona', route: '/slides/customer-persona' },
    { id: 'value-propositions', name: 'Value Propositions', route: '/slides/value-propositions' },
    { id: 'team-leadership', name: 'Team Leadership', route: '/slides/team-leadership' },
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

  const handleImageSelect = (image: MediaFile) => {
    if (selectedSlide) {
      try {
        const slideImage = convertMediaFileToSlideImage(image);
        setSlideImage(selectedSlide, slideImage);
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

  const handleStartPresentation = () => {
    navigate('/');
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

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
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
              onClick={handleSave} 
              disabled={isSaving}
              variant="secondary" 
              size="lg" 
              className="mr-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
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
            <Button variant="destructive" onClick={clearAllConfigurations}>
              <Settings className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="slides" className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              Slide Images
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text Content
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Media Library
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Storage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map(slide => {
                const slideImage = getSlideImage(slide.id);
                
                return (
                  <Card key={slide.id} className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{slide.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">Slide {slide.id}</span>
                          <SlideImageStatus 
                            hasImage={!!slideImage} 
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
                      imageId={slideImage?.imageId}
                      imageAlt={slideImage?.imageAlt}
                      variant="compact"
                      onImageSelect={() => openImageSelector(slide.id)}
                      showPlaceholder={!slideImage}
                    />
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openImageSelector(slide.id)}
                        className="flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {slideImage ? 'Change' : 'Add'} Image
                      </Button>
                      {slideImage && (
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

          <TabsContent value="library">
            <Card className="p-6">
              <MediaLibrary />
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <StorageMonitor />
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
    </div>
  );
};

export default MediaDashboard;