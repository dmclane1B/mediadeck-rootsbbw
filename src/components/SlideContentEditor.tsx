import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSlideContent } from '@/hooks/useSlideContent';
import { SlideContent } from '@/data/slideContent';
import { Edit, Save, RotateCcw, Download, Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SlideImagePreview from '@/components/SlideImagePreview';

interface SlideContentEditorProps {
  slides: Array<{ id: string; name: string; route: string }>;
  onNavigateToImages?: () => void;
}

const SlideContentEditor: React.FC<SlideContentEditorProps> = ({ slides, onNavigateToImages }) => {
  const { 
    getSlideContent, 
    updateSlideContent, 
    resetSlideContent, 
    resetAllContent,
    exportContent,
    importContent 
  } = useSlideContent();
  const { toast } = useToast();
  const [selectedSlide, setSelectedSlide] = useState<string>(slides[0]?.id || '');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');

  const currentContent = getSlideContent(selectedSlide);

  const handleFieldUpdate = (field: keyof SlideContent, value: string) => {
    if (currentContent) {
      updateSlideContent(selectedSlide, { [field]: value });
    }
  };

  const handleSectionUpdate = (index: number, field: 'title' | 'content', value: string | string[]) => {
    if (currentContent?.sections) {
      const newSections = [...currentContent.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      updateSlideContent(selectedSlide, { sections: newSections });
    }
  };

  const addSection = () => {
    if (currentContent) {
      const newSections = [...(currentContent.sections || [])];
      newSections.push({ title: 'New Section', content: '' });
      updateSlideContent(selectedSlide, { sections: newSections });
    }
  };

  const removeSection = (index: number) => {
    if (currentContent?.sections) {
      const newSections = currentContent.sections.filter((_, i) => i !== index);
      updateSlideContent(selectedSlide, { sections: newSections });
    }
  };

  const handleReset = () => {
    resetSlideContent(selectedSlide);
    toast({
      title: "Content Reset",
      description: `${slides.find(s => s.id === selectedSlide)?.name} content has been reset to default.`,
    });
  };

  const handleResetAll = () => {
    resetAllContent();
    toast({
      title: "All Content Reset",
      description: "All slides have been reset to default content.",
    });
  };

  const handleExport = () => {
    const content = exportContent();
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slide-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Content Exported",
      description: "Slide content has been exported to a JSON file.",
    });
  };

  const handleImport = () => {
    if (importContent(importText)) {
      setImportDialogOpen(false);
      setImportText('');
      toast({
        title: "Content Imported",
        description: "Slide content has been successfully imported.",
      });
    } else {
      toast({
        title: "Import Failed",
        description: "Failed to import content. Please check the JSON format.",
        variant: "destructive",
      });
    }
  };

  const handleArrayContentChange = (index: number, value: string) => {
    if (currentContent?.sections) {
      const section = currentContent.sections[index];
      if (Array.isArray(section.content)) {
        const lines = value.split('\n').filter(line => line.trim() !== '');
        handleSectionUpdate(index, 'content', lines);
      }
    }
  };

  if (!currentContent) return null;

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Edit Slide Content</h3>
          <p className="text-sm text-muted-foreground">
            Customize text content for your slides
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Slide Content</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="import-content">Paste JSON Content</Label>
                <Textarea
                  id="import-content"
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your exported JSON content here..."
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleImport}>Import</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Slide
          </Button>
          
          <Button variant="destructive" size="sm" onClick={handleResetAll}>
            Reset All
          </Button>
        </div>
      </div>

      <Tabs value={selectedSlide} onValueChange={setSelectedSlide}>
        <TabsList className="w-full flex-wrap h-auto">
          {slides.map((slide) => (
            <TabsTrigger key={slide.id} value={slide.id} className="text-xs">
              {slide.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {slides.map((slide) => (
          <TabsContent key={slide.id} value={slide.id} className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Fields - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={currentContent?.title || ''}
                      onChange={(e) => handleFieldUpdate('title', e.target.value)}
                      placeholder="Slide title"
                    />
                  </div>
                  
                  {currentContent?.subtitle !== undefined && (
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={currentContent.subtitle || ''}
                        onChange={(e) => handleFieldUpdate('subtitle', e.target.value)}
                        placeholder="Slide subtitle"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={currentContent?.description || ''}
                      onChange={(e) => handleFieldUpdate('description', e.target.value)}
                      placeholder="Slide description"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  {currentContent?.buttonText !== undefined && (
                    <div>
                      <Label htmlFor="buttonText">Button Text</Label>
                      <Input
                        id="buttonText"
                        value={currentContent.buttonText || ''}
                        onChange={(e) => handleFieldUpdate('buttonText', e.target.value)}
                        placeholder="Button text"
                      />
                    </div>
                  )}

                  {/* Sections */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <Label>Content Sections</Label>
                      <Button size="sm" onClick={addSection}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Section
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {currentContent?.sections?.map((section, index) => (
                        <Card key={index} className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Input
                              value={section.title}
                              onChange={(e) => handleSectionUpdate(index, 'title', e.target.value)}
                              placeholder="Section title"
                              className="flex-1 mr-2"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeSection(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {Array.isArray(section.content) ? (
                            <Textarea
                              value={section.content.join('\n')}
                              onChange={(e) => handleArrayContentChange(index, e.target.value)}
                              placeholder="Enter each item on a new line"
                              className="min-h-[80px]"
                            />
                          ) : (
                            <Textarea
                              value={section.content}
                              onChange={(e) => handleSectionUpdate(index, 'content', e.target.value)}
                              placeholder="Section content"
                              className="min-h-[80px]"
                            />
                          )}
                        </Card>
                      ))}
                      
                      {(!currentContent?.sections || currentContent.sections.length === 0) && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No content sections</p>
                          <p className="text-sm">Click "Add Section" to create content blocks</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Preview - Takes 1 column */}
                <div className="space-y-4">
                  <SlideImagePreview 
                    slideId={slide.id} 
                    onNavigateToImages={onNavigateToImages}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SlideContentEditor;