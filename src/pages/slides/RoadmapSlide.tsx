import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Globe, Rocket, Target, TrendingUp, Users, Zap, BarChart3, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
const RoadmapSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const slideImage = getSlideImageForDisplay('roadmap');
  return <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button variant="outline" onClick={() => navigate('/')} className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
          ← Home
        </Button>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-white text-xl font-space font-bold">12</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-space mb-6">
            ROADMAP <span className="text-white/80">& EXPANSION</span>
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-6 animate-scale-in"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto font-inter leading-relaxed">
            Strategic roadmap for technology development, market expansion, and sustainable growth
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ImageShowcase
              imageUrl={slideImage?.url}
              imageAlt={slideImage?.alt}
              onImageSelect={() => navigate('/media')}
              variant="hero"
            />
        </div>

        {/* Financial Dashboard */}
        

        {/* Tabbed Content */}
        <Tabs defaultValue="market" className="w-full animate-fade-in" style={{
        animationDelay: '0.5s'
      }}>
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="market" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white hover:bg-white/15">
              <Clock className="w-4 h-4 mr-2" />
              Market Evolution
            </TabsTrigger>
            <TabsTrigger value="strategic" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white hover:bg-white/15">
              <Target className="w-4 h-4 mr-2" />
              Strategic Roadmap
            </TabsTrigger>
            <TabsTrigger value="technology" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white hover:bg-white/15">
              <Zap className="w-4 h-4 mr-2" />
              Technology Development
            </TabsTrigger>
          </TabsList>

          {/* Strategic Roadmap Tab */}
          <TabsContent value="strategic" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 2023: Market Launch */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-white/20">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white font-space">2023</div>
                    <div className="text-white/80 text-sm font-inter">Market Launch</div>
                  </div>
                </div>
                <ul className="space-y-2 text-white/80 font-inter text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    MVP Development & Testing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Security Infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Beta Program Launch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    First version play-calling tool
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="text-white font-medium text-sm">
                </div>
                </div>
              </Card>

              {/* Q1-Q2 2024: Foundation */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-white/20">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white font-space">Q1-Q2 2024</div>
                    <div className="text-white/80 text-sm font-inter">Foundation</div>
                  </div>
                </div>
                <ul className="space-y-2 text-white/80 font-inter text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Division I Market Entry
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Coach adoption & integration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Customer Success Program
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Product feedback collection
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-white/20">
                  
                </div>
              </Card>

              {/* 2025: Market Dominance */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-white/20">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white font-space">2025</div>
                    <div className="text-white/80 text-sm font-inter">Market Dominance</div>
                  </div>
                </div>
                <ul className="space-y-2 text-white/80 font-inter text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Cross Platform SaaS Launch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    High School Market Entry
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Feature updates & expansion
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    AI Analytics Platform
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-white/20">
                  
                </div>
              </Card>

              {/* 2025+: Scale & Innovation */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-white/20">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white font-space">2025 Q3-Q4</div>
                    <div className="text-white/80 text-sm font-inter">Scale & Innovation</div>
                  </div>
                </div>
                <ul className="space-y-2 text-white/80 font-inter text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    National Market Expansion
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    All collegiate divisions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    International markets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Platform Integrations
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="text-white font-medium text-sm">Target: 2,500+ Teams</div>
                </div>
              </Card>

              {/* 2026: Global Expansion */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-white/20">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white font-space">2026</div>
                    <div className="text-white/80 text-sm font-inter">Global Expansion</div>
                  </div>
                </div>
                <ul className="space-y-2 text-white/80 font-inter text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    International Market Launch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Enterprise Solutions Suite
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    AR/VR Integration Complete
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Professional sports entry
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="text-white font-medium text-sm">Revenue: $18M • Target: 50 Teams</div>
                </div>
              </Card>

              {/* 2027: IPO Preparation */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-white/20">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white font-space">2027</div>
                    <div className="text-white/80 text-sm font-inter">IPO Preparation</div>
                  </div>
                </div>
                <ul className="space-y-2 text-white/80 font-inter text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Public Market Readiness
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Platform Ecosystem Launch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Industry Leadership Position
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Global Market Presence
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="text-white font-medium text-sm">Revenue: $35M+</div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Technology Development Tab */}
          <TabsContent value="technology" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white font-space mb-4">Technology Development Roadmap</h3>
                <p className="text-white/80 font-inter max-w-2xl mx-auto">
                  Comprehensive technology development from core communication tools to advanced AI analytics
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current Technology */}
                <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-white" />
                    <h4 className="text-xl font-bold text-white font-space">Current Technology</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Voice To Text  Play Input</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Long Range RF Communications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">AI Assets Suggestions and Play Calling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Unified athlete performance platform</span>
                    </div>
                  </div>
                </Card>

                {/* Future Technology */}
                <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="w-6 h-6 text-white" />
                    <h4 className="text-xl font-bold text-white font-space">Future Technology</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Predictive analytics engine</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Cross Platform SaaS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">AR/VR integration capabilities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Unified athlete performance platform</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Product Evolution */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <h4 className="text-xl font-bold text-white font-space mb-6 text-center">Product Evolution Journey</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="bg-white/20 p-4 rounded-lg mb-3">
                      <div className="text-lg font-bold text-white font-space mb-2">Launch</div>
                      <div className="text-white/80 font-inter text-sm">Reliable communication & play calling</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 p-4 rounded-lg mb-3">
                      <div className="text-lg font-bold text-white font-space mb-2">Adoption</div>
                      <div className="text-white/80 font-inter text-sm">Training session integration</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 p-4 rounded-lg mb-3">
                      <div className="text-lg font-bold text-white font-space mb-2">Feedback</div>
                      <div className="text-white/80 font-inter text-sm">Real-time performance adjustments</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 p-4 rounded-lg mb-3">
                      <div className="text-lg font-bold text-white font-space mb-2">Updates</div>
                      <div className="text-white/80 font-inter text-sm">Unified athlete performance platform</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 p-4 rounded-lg mb-3">
                      <div className="text-lg font-bold text-white font-space mb-2">Expansion</div>
                      <div className="text-white/80 font-inter text-sm">Cross-league adoption</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Market Evolution Tab */}
          <TabsContent value="market" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white font-space mb-4">Market Evolution Timeline</h3>
                <p className="text-white/80 font-inter max-w-2xl mx-auto">
                  Key market events and our expansion strategy across different athletic divisions
                </p>
              </div>

              {/* Historical Timeline */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <h4 className="text-xl font-bold text-white font-space mb-6 text-center">Historical Market Milestones</h4>
                <div className="relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-1/2 hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    <div className="text-center relative">
                      <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 relative z-10 hidden md:block"></div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="text-lg font-bold text-white font-space mb-2">2021</div>
                        <div className="text-white/80 font-inter text-sm">
                          NCAA allows electronic communication devices
                        </div>
                      </div>
                    </div>
                    <div className="text-center relative">
                      <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 relative z-10 hidden md:block"></div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="text-lg font-bold text-white font-space mb-2">2023</div>
                        <div className="text-white/80 font-inter text-sm">
                          First NCAA tournament & customer pilots
                        </div>
                      </div>
                    </div>
                    <div className="text-center relative">
                      <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 relative z-10 hidden md:block"></div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="text-lg font-bold text-white font-space mb-2">2024</div>
                        <div className="text-white/80 font-inter text-sm">
                          NCAA expands rules across all divisions
                        </div>
                      </div>
                    </div>
                    <div className="text-center relative">
                      <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 relative z-10 hidden md:block"></div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="text-lg font-bold text-white font-space mb-2">2029</div>
                        <div className="text-white/80 font-inter text-sm">
                          NCAA revenue reaches $1.76B & NIL growth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Market Expansion Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-6 h-6 text-white" />
                    <h4 className="text-xl font-bold text-white font-space">Market Expansion</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">All collegiate divisions (I, II, III)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">High school athletics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">Professional sports leagues</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/80 font-inter">International markets (Canada, EU)</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-6 h-6 text-white" />
                    <h4 className="text-xl font-bold text-white font-space">Growth Metrics</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 font-inter">2024 Teams</span>
                      <span className="text-white font-space font-bold">50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 font-inter">2025 Q1-Q2</span>
                      <span className="text-white font-space font-bold">500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 font-inter">2027 Goal</span>
                      <span className="text-white font-space font-bold">2,500+</span>
                    </div>
                    
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{
      animationDelay: '2s'
    }}>
        BUILD. SCALE. DOMINATE.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={12}
        previousRoute="/slides/community-partners"
        nextRoute="/slides/ask"
      />
    </div>;
};
export default RoadmapSlide;