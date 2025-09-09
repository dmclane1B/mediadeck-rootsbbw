import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Users, Zap, Globe, BarChart3, Target, Smartphone, Shield, TrendingUp, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';

const AskSlide = () => {
  const navigate = useNavigate();

  const fundingBreakdown = [
    {
      category: 'Core Platform & Security',
      amount: 325000,
      percentage: 10.8,
      icon: Shield,
      description: 'Platform infrastructure, security protocols, mobile apps development',
      timeline: '6-12 months',
      deliverables: ['Security compliance', 'Mobile app launch', 'Platform scalability']
    },
    {
      category: 'Hardware Agnostic Framework',
      amount: 200000,
      percentage: 6.7,
      icon: Layers,
      description: 'Multi-device compatibility, IoT integration, universal connectivity',
      timeline: '8-15 months',
      deliverables: ['Cross-platform SDK', 'IoT device support', 'API standardization'],
      highlight: true
    },
    {
      category: 'Sales & B2B Marketing',
      amount: 900000,
      percentage: 30,
      icon: Target,
      description: 'Enterprise partnerships, B2B sales team, channel development',
      timeline: '3-18 months',
      deliverables: ['Enterprise sales team', 'Partner network', 'B2B marketing campaigns']
    },
    {
      category: 'User Acquisition & Growth',
      amount: 450000,
      percentage: 15,
      icon: TrendingUp,
      description: 'Digital marketing, app store optimization, user onboarding (CAC: $15, LTV: $200)',
      timeline: 'Ongoing',
      deliverables: ['Growth marketing campaigns', 'User onboarding optimization', 'Retention programs']
    },
    {
      category: 'Team Expansion',
      amount: 600000,
      percentage: 20,
      icon: Users,
      description: 'Engineering (5), Sales (3), Customer Success (2), Product (2) roles',
      timeline: '3-12 months',
      deliverables: ['Full-stack engineers', 'Sales professionals', 'Customer success team']
    },
    {
      category: 'Operations & Infrastructure',
      amount: 525000,
      percentage: 17.5,
      icon: BarChart3,
      description: 'Legal compliance, infrastructure scaling, operational systems',
      timeline: '6-24 months',
      deliverables: ['Compliance framework', 'Infrastructure scaling', 'Operational systems']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          ← Home
        </Button>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-white text-xl font-space font-bold">13</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight font-space mb-8">
            THE <span className="text-white/80">ASK</span>
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-inter leading-relaxed">
            Strategic investment to revolutionize sports communication and capture market leadership
          </p>
        </div>

        {/* Funding Request */}
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-12 py-6 border border-white/20">
            <DollarSign className="w-12 h-12 text-white" />
            <div className="text-6xl font-bold text-white font-space">3M</div>
            <div className="text-white/80 text-xl font-inter">Series A Funding</div>
          </div>
        </div>

        {/* Hardware Agnostic Highlight */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm rounded-2xl p-6 border border-accent/30">
            <div className="flex items-center justify-center gap-4 text-center">
              <Layers className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold text-white font-space">$200K Hardware Agnostic Investment</div>
                <div className="text-accent text-sm font-inter">Key differentiator & competitive moat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Use of Funds Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {fundingBreakdown.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className={`bg-white/10 backdrop-blur-sm p-6 border transition-all duration-300 hover:scale-105 ${
                item.highlight ? 'border-accent/40 bg-accent/5' : 'border-white/20 hover:bg-white/15'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full flex-shrink-0 ${
                    item.highlight ? 'bg-accent/20' : 'bg-white/20'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${item.highlight ? 'text-accent' : 'text-white'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white font-space leading-tight">{item.category}</h3>
                      <div className="text-right ml-2">
                        <div className="text-xl font-bold text-white font-space">
                          ${(item.amount / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-white/80 text-xs font-inter">{item.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <p className="text-white/80 font-inter text-sm mb-3 leading-relaxed">{item.description}</p>
                    
                    {/* Timeline */}
                    <div className="mb-3">
                      <div className="text-xs font-inter text-white/60 mb-1">Timeline: {item.timeline}</div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-4">
                      <div className="text-xs font-inter text-white/60 mb-2">Key Deliverables:</div>
                      <div className="flex flex-wrap gap-1">
                        {item.deliverables.slice(0, 2).map((deliverable, idx) => (
                          <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded text-white/80">
                            {deliverable}
                          </span>
                        ))}
                        {item.deliverables.length > 2 && (
                          <span className="text-xs text-white/60">+{item.deliverables.length - 2} more</span>
                        )}
                      </div>
                    </div>

                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                          item.highlight ? 'bg-accent' : 'bg-white'
                        }`}
                        style={{ width: `${item.percentage}%`, animationDelay: `${index * 0.2}s` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Risk Mitigation & Staging */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold text-white mb-6 font-space text-center">Milestone-Based Fund Deployment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-space">$1M</div>
              <div className="text-white/80 font-inter text-sm mb-2">Months 1-6</div>
              <div className="text-white/60 font-inter text-xs">Team hiring & core development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-space">$1.5M</div>
              <div className="text-white/80 font-inter text-sm mb-2">Months 7-12</div>
              <div className="text-white/60 font-inter text-xs">Product launch & market entry</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-space">$500K</div>
              <div className="text-white/80 font-inter text-sm mb-2">Months 13-18</div>
              <div className="text-white/60 font-inter text-xs">Scale operations & growth</div>
            </div>
          </div>
        </div>

        {/* Key Investment Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">18 Months</div>
            <div className="text-white/80 font-inter">To Market Leadership</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">10X</div>
            <div className="text-white/80 font-inter">Revenue Growth Potential</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">$50M</div>
            <div className="text-white/80 font-inter">Market Size Opportunity</div>
          </div>
        </div>

        {/* Investment Terms Preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in" style={{ animationDelay: '1.3s' }}>
          <h3 className="text-2xl font-bold text-white mb-6 font-space text-center">Investment Opportunity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-space">What You Get</h4>
              <ul className="space-y-3 text-white/80 font-inter">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Equity stake in fastest-growing sports tech company
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Board seat and strategic input opportunities
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Quarterly progress reports and metrics
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Exit strategy targeting
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-space">Why Now</h4>
              <ul className="space-y-3 text-white/80 font-inter">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  First-mover advantage in untapped market
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Proven team with industry expertise
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Strong customer validation and demand
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Clear path to profitability and scale
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{ animationDelay: '2s' }}>
        INVEST. INNOVATE. DOMINATE.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={13}
        previousRoute="/slides/roadmap"
        nextRoute="/slides/contact"
      />
    </div>
  );
};

export default AskSlide;