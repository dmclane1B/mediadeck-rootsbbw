import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StorageInitializer } from "@/components/StorageInitializer";
import LazySlideWrapper from "@/components/LazySlideWrapper";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import MigrationManager from "@/components/MigrationManager";
import '@/utils/instantValidation'; // Auto-runs validation

// Lazy load pages for better code splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const MediaDashboard = lazy(() => import("./pages/MediaDashboard"));

// Lazy load slide components
const TitleSlide = lazy(() => import("./pages/slides/TitleSlide"));
const OverviewSlide = lazy(() => import("./pages/slides/OverviewSlide"));
const ChallengesSlide = lazy(() => import("./pages/slides/ChallengesSlide"));
const ProductGlimpseSlide = lazy(() => import("./pages/slides/ProductGlimpseSlide"));
const ExpertPanelSlide = lazy(() => import("./pages/slides/ExpertPanelSlide"));
const MarketOverviewSlide = lazy(() => import("./pages/slides/MarketOverviewSlide"));
const ProofDemandSlide = lazy(() => import("./pages/slides/ProofDemandSlide"));
const WorkoutSessionSlide = lazy(() => import("./pages/slides/WorkoutSessionSlide"));
const CustomerPersonaSlide = lazy(() => import("./pages/slides/CustomerPersonaSlide"));
const ValuePropositionsSlide = lazy(() => import("./pages/slides/ValuePropositionsSlide"));
const TeamLeadershipSlide = lazy(() => import("./pages/slides/TeamLeadershipSlide"));
const RoadmapSlide = lazy(() => import("./pages/slides/RoadmapSlide"));
const AskSlide = lazy(() => import("./pages/slides/AskSlide"));
const ContactSlide = lazy(() => import("./pages/slides/ContactSlide"));
const GallerySlide = lazy(() => import("./pages/slides/GallerySlide"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PerformanceMonitor />
      <StorageInitializer>
        <MigrationManager>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<LazySlideWrapper><TitleSlide /></LazySlideWrapper>} />
            <Route path="/slides/title" element={<LazySlideWrapper><TitleSlide /></LazySlideWrapper>} />
            <Route path="/builder" element={<Navigate to="/slides/title" replace />} />
            <Route path="/slides/overview" element={<LazySlideWrapper><OverviewSlide /></LazySlideWrapper>} />
            <Route path="/slides/challenges" element={<LazySlideWrapper><ChallengesSlide /></LazySlideWrapper>} />
            <Route path="/slides/monday-kickoff" element={<LazySlideWrapper><ProductGlimpseSlide /></LazySlideWrapper>} />
            <Route path="/slides/expert-panel" element={<LazySlideWrapper><ExpertPanelSlide /></LazySlideWrapper>} />
            <Route path="/slides/community-voices" element={<LazySlideWrapper><MarketOverviewSlide /></LazySlideWrapper>} />
            <Route path="/slides/nutrition-education" element={<LazySlideWrapper><ProofDemandSlide /></LazySlideWrapper>} />
            <Route path="/slides/workout-session" element={<LazySlideWrapper><WorkoutSessionSlide /></LazySlideWrapper>} />
            <Route path="/slides/smoothie-demo" element={<LazySlideWrapper><CustomerPersonaSlide /></LazySlideWrapper>} />
            <Route path="/slides/resources-support" element={<LazySlideWrapper><ValuePropositionsSlide /></LazySlideWrapper>} />
            <Route path="/slides/community-partners" element={<LazySlideWrapper><TeamLeadershipSlide /></LazySlideWrapper>} />
            
            {/* Legacy route redirects */}
            <Route path="/slides/product-glimpse" element={<Navigate to="/slides/monday-kickoff" replace />} />
            <Route path="/slides/market-overview" element={<Navigate to="/slides/community-voices" replace />} />
            <Route path="/slides/proof-demand" element={<Navigate to="/slides/nutrition-education" replace />} />
            <Route path="/slides/sales-strategy" element={<Navigate to="/slides/workout-session" replace />} />
            <Route path="/slides/customer-persona" element={<Navigate to="/slides/smoothie-demo" replace />} />
            <Route path="/slides/value-propositions" element={<Navigate to="/slides/resources-support" replace />} />
            <Route path="/slides/team-leadership" element={<Navigate to="/slides/community-partners" replace />} />
            <Route path="/slides/roadmap" element={<LazySlideWrapper><RoadmapSlide /></LazySlideWrapper>} />
            <Route path="/slides/ask" element={<LazySlideWrapper><AskSlide /></LazySlideWrapper>} />
            <Route path="/slides/contact" element={<LazySlideWrapper><ContactSlide /></LazySlideWrapper>} />
            <Route path="/slides/gallery" element={<LazySlideWrapper><GallerySlide /></LazySlideWrapper>} />
            <Route path="/media" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}><MediaDashboard /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}><NotFound /></Suspense>} />
          </Routes>
          </BrowserRouter>
        </MigrationManager>
      </StorageInitializer>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
