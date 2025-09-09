import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Award, Briefcase, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import teamLeadershipImage from '@/assets/team-leadership.png';
import SlideNavigation from '@/components/SlideNavigation';
const TeamLeadershipSlide = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--accent)) 2px, transparent 2px)`,
        backgroundSize: '60px 60px'
      }}>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button variant="outline" onClick={() => navigate('/')} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          ← Home
        </Button>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="text-accent text-2xl font-space font-bold animate-glow">DX1</div>
          <div className="text-muted-foreground text-sm font-inter">Leadership Team</div>
        </div>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-accent text-xl font-space font-bold">11</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 font-space leading-tight">
            TEAM <span className="text-accent">&</span><br />
            <span className="text-accent">LEADERSHIP</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Experienced leaders driving innovation in sports communication technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center font-space">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
            animationDelay: '0.3s'
          }}>
              {/* Bob Perales - CPO */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary font-space mb-2">Bob Perales, Chief Product Officer</h3>
                    
                    <div className="space-y-3 text-sm text-muted-foreground font-inter">
                      
                      
                      
                    </div>
                    
                    <p className="mt-4 text-muted-foreground font-inter leading-relaxed">
                      Brings deep understanding of coaching needs and athletic department operations, with a proven track record of successful technology adoption in sports.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Danny McLane - CEO */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-primary hover:shadow-elegant transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary font-space mb-2">Danny McLane, Chief Executive Officer</h3>
                    
                    
                    
                    
                    <p className="mt-4 text-muted-foreground font-inter leading-relaxed">
                      Specializes in AI-powered communication systems and has led product development for major collegiate athletics programs nationwide.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Advisory Board */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center font-space">Advisory Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
            animationDelay: '0.6s'
          }}>
              {/* Tarrell Gamble */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-primary hover:shadow-elegant transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary font-space mb-2">Tarrell Gamble</h3>
                    <p className="text-accent font-semibold mb-2 font-inter">SVP Capital Markets</p>
                    <p className="text-muted-foreground text-sm mb-4 font-inter">Blaylock Van, LLC</p>
                    
                    <p className="mt-4 text-muted-foreground font-inter leading-relaxed">
                      Provides strategic guidance on capital markets and financial growth strategies for scaling technology companies.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Brian Seng */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary font-space mb-2">Brian Seng</h3>
                    <p className="text-accent font-semibold mb-2 font-inter">Owner</p>
                    <p className="text-muted-foreground text-sm mb-4 font-inter">Altest Manufacturing Corp</p>
                    
                    <p className="mt-4 text-muted-foreground font-inter leading-relaxed">
                      Brings extensive manufacturing and operations expertise to guide product development and scaling strategies.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 animate-fade-in" style={{
      animationDelay: '1s'
    }}>
        <div className="text-accent font-bold font-space text-lg">PROVEN LEADERS. PROVEN RESULTS.</div>
        <div className="text-muted-foreground text-sm font-inter">Building the future of sports communication</div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={11}
        previousRoute="/slides/value-propositions"
        nextRoute="/slides/roadmap"
      />
    </div>;
};
export default TeamLeadershipSlide;