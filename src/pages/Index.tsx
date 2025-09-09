import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SlideEditor from '@/components/SlideEditor';
import SlideTemplates from '@/components/SlideTemplates';
import PWAInstallButton from '@/components/PWAInstallButton';
import { Presentation, Sparkles, Zap, Image } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'templates' | 'editor'>('home');

  const handleSelectTemplate = (templateId: string) => {
    setCurrentView('editor');
  };

  if (currentView === 'editor') {
    return <SlideEditor />;
  }

  if (currentView === 'templates') {
    return (
      <div className="min-h-screen bg-muted p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <SlideTemplates onSelectTemplate={handleSelectTemplate} />
        </div>
      </div>
    );
  }

  return (
    <>
      <PWAInstallButton />
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center">
                <Presentation className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
                Slide Designer
              </h1>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4">
              Create stunning presentations with AI-powered design inspired by your DX-Play slides
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
            <Card className="p-4 sm:p-6 text-center bg-white/10 backdrop-blur border-white/20 text-white">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-accent" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Smart Templates</h3>
              <p className="text-sm sm:text-base text-white/80">
                Professional templates matching your brand's green and blue aesthetic
              </p>
            </Card>
            
            <Card className="p-4 sm:p-6 text-center bg-white/10 backdrop-blur border-white/20 text-white">
              <Zap className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-success" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Real-time Editing</h3>
              <p className="text-sm sm:text-base text-white/80">
                Drag, drop, and edit elements with instant visual feedback
              </p>
            </Card>
            
            <Card className="p-4 sm:p-6 text-center bg-white/10 backdrop-blur border-white/20 text-white sm:col-span-2 md:col-span-1">
              <Presentation className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-white" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Export Ready</h3>
              <p className="text-sm sm:text-base text-white/80">
                Download as PDF or high-quality images for any presentation needs
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => setCurrentView('templates')}
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-white text-primary hover:bg-white/90"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start with Template
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setCurrentView('editor')}
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-white text-white hover:bg-white/10"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start from Scratch
              </Button>
            </div>
            
            {/* View Sample Slides Button */}
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.location.href = '/slides/title'}
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-white/50 text-white/90 hover:bg-white/5 mr-4"
              >
                <Presentation className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                DX1 Presentation
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.location.href = '/media'}
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-white/50 text-white/90 hover:bg-white/5"
              >
                <Image className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Media Dashboard
              </Button>
            </div>
            
            <p className="text-white/70 text-xs sm:text-sm px-4">
              Inspired by your DX-Play presentation design • Built for professional results
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;