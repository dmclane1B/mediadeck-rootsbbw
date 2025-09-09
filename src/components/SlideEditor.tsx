import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type, 
  Image, 
  Layout, 
  Palette, 
  Download,
  Plus,
  Trash2,
  Move,
  Edit3
} from 'lucide-react';
import geometricPattern from '@/assets/geometric-pattern.png';

interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
}

interface Slide {
  id: string;
  title: string;
  background: string;
  elements: SlideElement[];
}

const SlideEditor = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      title: 'Sales Strategy',
      background: 'primary',
      elements: [
        {
          id: '1',
          type: 'text',
          content: 'Sales Strategy',
          x: 50,
          y: 45,
          width: 400,
          height: 100,
          fontSize: 48,
          fontWeight: 'bold',
          color: 'white'
        }
      ]
    }
  ]);
  
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [newElementType, setNewElementType] = useState<'text' | 'image'>('text');

  const backgroundOptions = [
    { id: 'primary', name: 'Primary Green', class: 'bg-primary' },
    { id: 'secondary', name: 'Secondary Green', class: 'bg-secondary' },
    { id: 'accent', name: 'Blue Accent', class: 'bg-accent' },
    { id: 'gradient', name: 'Green Gradient', class: 'bg-gradient-to-br from-primary to-secondary' },
    { id: 'white', name: 'White', class: 'bg-white' },
  ];

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      background: 'primary',
      elements: []
    };
    setSlides([...slides, newSlide]);
    setActiveSlide(slides.length);
  };

  const addElement = () => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: newElementType,
      content: newElementType === 'text' ? 'New Text' : '',
      x: 100,
      y: 100,
      width: newElementType === 'text' ? 300 : 200,
      height: newElementType === 'text' ? 60 : 200,
      fontSize: 24,
      fontWeight: 'normal',
      color: 'white'
    };

    const updatedSlides = [...slides];
    updatedSlides[activeSlide].elements.push(newElement);
    setSlides(updatedSlides);
  };

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    const updatedSlides = [...slides];
    const elementIndex = updatedSlides[activeSlide].elements.findIndex(el => el.id === elementId);
    if (elementIndex !== -1) {
      updatedSlides[activeSlide].elements[elementIndex] = {
        ...updatedSlides[activeSlide].elements[elementIndex],
        ...updates
      };
      setSlides(updatedSlides);
    }
  };

  const deleteElement = (elementId: string) => {
    const updatedSlides = [...slides];
    updatedSlides[activeSlide].elements = updatedSlides[activeSlide].elements.filter(
      el => el.id !== elementId
    );
    setSlides(updatedSlides);
    setSelectedElement(null);
  };

  const currentSlide = slides[activeSlide];
  const selectedEl = selectedElement ? 
    currentSlide.elements.find(el => el.id === selectedElement) : null;

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <div className="w-80 bg-background border-r p-4 space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded"></div>
          <h1 className="text-xl font-bold">Slide Designer</h1>
        </div>

        <Tabs defaultValue="slides" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="slides" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Slides</h2>
              <Button size="sm" onClick={addSlide} variant="hero">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {slides.map((slide, index) => (
                <Card 
                  key={slide.id}
                  className={`p-3 cursor-pointer transition-all ${
                    index === activeSlide ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setActiveSlide(index)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 bg-primary rounded-sm"></div>
                    <span className="text-sm font-medium">{slide.title}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Add Element</h3>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={newElementType === 'text' ? 'default' : 'outline'}
                  onClick={() => setNewElementType('text')}
                >
                  <Type className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant={newElementType === 'image' ? 'default' : 'outline'}
                  onClick={() => setNewElementType('image')}
                >
                  <Image className="w-4 h-4" />
                </Button>
              </div>
              <Button size="sm" onClick={addElement} className="w-full">
                Add {newElementType}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Background</h3>
              <div className="grid grid-cols-2 gap-2">
                {backgroundOptions.map((bg) => (
                  <div
                    key={bg.id}
                    className={`h-12 rounded cursor-pointer border-2 ${bg.class} ${
                      currentSlide.background === bg.id ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => {
                      const updatedSlides = [...slides];
                      updatedSlides[activeSlide].background = bg.id;
                      setSlides(updatedSlides);
                    }}
                  />
                ))}
              </div>
            </div>

            {selectedEl && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Edit Element</h3>
                
                {selectedEl.type === 'text' && (
                  <div className="space-y-2">
                    <Textarea
                      value={selectedEl.content}
                      onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                      placeholder="Text content"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={selectedEl.fontSize}
                        onChange={(e) => updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) })}
                        placeholder="Font size"
                      />
                      <select
                        value={selectedEl.fontWeight}
                        onChange={(e) => updateElement(selectedEl.id, { fontWeight: e.target.value })}
                        className="px-3 py-2 border rounded-md"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="lighter">Light</option>
                      </select>
                    </div>
                  </div>
                )}

                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => deleteElement(selectedEl.id)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Element
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Button variant="hero" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export as Images
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <Input
              value={currentSlide.title}
              onChange={(e) => {
                const updatedSlides = [...slides];
                updatedSlides[activeSlide].title = e.target.value;
                setSlides(updatedSlides);
              }}
              className="text-lg font-semibold border-none bg-transparent"
              placeholder="Slide title"
            />
          </div>

          {/* Slide Canvas */}
          <div className="relative">
            <div 
              className={`relative w-full aspect-video rounded-lg overflow-hidden shadow-xl ${
                backgroundOptions.find(bg => bg.id === currentSlide.background)?.class
              }`}
              style={{
                backgroundImage: currentSlide.background === 'primary' ? `url(${geometricPattern})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {currentSlide.elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-pointer border-2 ${
                    selectedElement === element.id ? 'border-accent' : 'border-transparent'
                  }`}
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.type === 'text' && (
                    <div
                      style={{
                        fontSize: `${element.fontSize}px`,
                        fontWeight: element.fontWeight,
                        color: element.color,
                        lineHeight: '1.2',
                        padding: '8px'
                      }}
                      className="w-full h-full flex items-center"
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {selectedElement === element.id && (
                    <div className="absolute -top-8 left-0 flex gap-1">
                      <Badge variant="secondary" className="text-xs">
                        <Edit3 className="w-3 h-3 mr-1" />
                        Selected
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeSlide ? 'bg-primary' : 'bg-muted-foreground'
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;