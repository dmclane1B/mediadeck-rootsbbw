import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Target, TrendingUp, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const CustomerPersonaSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('customer-persona');

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 2px, transparent 2px)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          ← Home
        </Button>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="text-accent text-2xl font-space font-bold animate-glow">DX1</div>
          <div className="text-muted-foreground text-sm font-inter">Customer Analysis</div>
        </div>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-accent text-xl font-space font-bold">09</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 font-space leading-tight">
            CUSTOMER <span className="text-accent">PERSONA</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Understanding our primary target audience and their specific pain points in sports communication
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.imageUrl}
            imageAlt={slideImage?.imageAlt}
            onImageSelect={() => navigate('/media')}
            variant="standard"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Primary Persona */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 rounded-full bg-accent/10">
                  <User className="w-12 h-12 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-accent font-space">Coach Mike</h2>
                  <p className="text-lg text-muted-foreground font-inter">Division I Baseball Coach</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-space">Demographics</h3>
                  <ul className="space-y-2 text-muted-foreground font-inter">
                    <li>• Age: 35-55 years old</li>
                    <li>• Experience: 10+ years coaching</li>
                    <li>• Education: Sports Management/Kinesiology</li>
                    <li>• Tech comfort: Moderate to high</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-space">Goals & Motivations</h3>
                  <ul className="space-y-2 text-muted-foreground font-inter">
                    <li>• Win championships and develop athletes</li>
                    <li>• Gain competitive advantage through technology</li>
                    <li>• Improve team communication efficiency</li>
                    <li>• Protect strategic information from opponents</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-space">Pain Points</h3>
                  <ul className="space-y-2 text-muted-foreground font-inter">
                    <li>• Slow communication during critical moments</li>
                    <li>• Risk of strategy interception</li>
                    <li>• Complex technology adoption barriers</li>
                    <li>• Budget constraints for new tools</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Persona Insights */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* Decision Factors */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-accent font-space">Decision Factors</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                <div>
                  <div className="font-medium text-foreground mb-2">Primary Concerns</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Security & Privacy</li>
                    <li>• Ease of Use</li>
                    <li>• Cost Effectiveness</li>
                    <li>• Proven Results</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">Influence Sources</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Peer Recommendations</li>
                    <li>• Athletic Directors</li>
                    <li>• Industry Publications</li>
                    <li>• Conference Networks</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Buying Journey */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-accent font-space">Buying Journey</h3>
              </div>
              <div className="space-y-3 text-sm font-inter">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span><strong>Awareness:</strong> Problem recognition through game losses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span><strong>Research:</strong> Peer consultation and demo requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span><strong>Evaluation:</strong> Pilot programs and ROI analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span><strong>Purchase:</strong> Budget approval and implementation</span>
                </div>
              </div>
            </Card>

            {/* Budget & Authority */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-accent font-space">Budget & Authority</h3>
              </div>
              <div className="space-y-4 text-sm font-inter">
                <div>
                  <div className="font-medium text-foreground mb-1">Budget Range</div>
                  <div className="text-muted-foreground">$1,500 - $5,000 annually per team</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Decision Makers</div>
                  <div className="text-muted-foreground">Head Coach + Athletic Director approval</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Budget Cycle</div>
                  <div className="text-muted-foreground">Annual planning (June-August)</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="text-accent font-bold font-space text-lg">KNOW YOUR COACH. WIN THE GAME.</div>
        <div className="text-muted-foreground text-sm font-inter">Data-driven persona development</div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={9}
        previousRoute="/slides/sales-strategy"
        nextRoute="/slides/value-propositions"
      />
    </div>
  );
};

export default CustomerPersonaSlide;