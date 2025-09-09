import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart3, 
  Users, 
  Target,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  preview: string;
  category: string;
}

const templates: Template[] = [
  {
    id: 'title-slide',
    name: 'Title Slide',
    icon: <FileText className="w-5 h-5" />,
    description: 'Clean title slide with company branding',
    preview: 'Sales Strategy',
    category: 'Title'
  },
  {
    id: 'content-slide',
    name: 'Content Slide',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Multi-column layout for key points',
    preview: 'Key Challenges in Coaching Communication',
    category: 'Content'
  },
  {
    id: 'persona-slide',
    name: 'Persona Slide',
    icon: <Users className="w-5 h-5" />,
    description: 'Customer persona presentation',
    preview: 'Customer Persona',
    category: 'People'
  },
  {
    id: 'market-slide',
    name: 'Market Analysis',
    icon: <Target className="w-5 h-5" />,
    description: 'Market data with visual hierarchy',
    preview: 'Market TAM: 70B',
    category: 'Data'
  },
  {
    id: 'value-prop',
    name: 'Value Proposition',
    icon: <Lightbulb className="w-5 h-5" />,
    description: 'Highlight key benefits and features',
    preview: 'DX-Play Value Propositions',
    category: 'Strategy'
  },
  {
    id: 'solution-slide',
    name: 'Solution Overview',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Problem-solution presentation',
    preview: 'Overcoming Play Communication Challenges',
    category: 'Strategy'
  }
];

interface SlideTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

const SlideTemplates: React.FC<SlideTemplatesProps> = ({ onSelectTemplate }) => {
  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose a Template</h2>
        <p className="text-muted-foreground">
          Start with a professionally designed template inspired by your DX-Play presentation
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-3 py-1"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="p-6 space-y-4">
              {/* Preview */}
              <div className="aspect-video bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center px-4">
                  {template.preview}
                </div>
                
                {/* Geometric Pattern Overlay */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent/30 rounded"></div>
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {template.icon}
                  <h3 className="font-semibold">{template.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>

              {/* Action Button */}
              <Button 
                variant="hero" 
                className="w-full group-hover:scale-105 transition-transform"
                onClick={() => onSelectTemplate(template.id)}
              >
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SlideTemplates;