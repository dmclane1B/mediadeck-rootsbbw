import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StorageInitializer } from "@/components/StorageInitializer";
import LazySlideWrapper from "@/components/LazySlideWrapper";
import PerformanceMonitor from "@/components/PerformanceMonitor";

// Lazy load pages for better code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MediaDashboard = lazy(() => import("./pages/MediaDashboard"));

// Lazy load slide components
const TitleSlide = lazy(() => import("./pages/slides/TitleSlide"));
const OverviewSlide = lazy(() => import("./pages/slides/OverviewSlide"));
const ChallengesSlide = lazy(() => import("./pages/slides/ChallengesSlide"));
const ProductGlimpseSlide = lazy(() => import("./pages/slides/ProductGlimpseSlide"));
const MarketOverviewSlide = lazy(() => import("./pages/slides/MarketOverviewSlide"));
const ProofDemandSlide = lazy(() => import("./pages/slides/ProofDemandSlide"));
const SalesStrategySlide = lazy(() => import("./pages/slides/SalesStrategySlide"));
const CustomerPersonaSlide = lazy(() => import("./pages/slides/CustomerPersonaSlide"));
const ValuePropositionsSlide = lazy(() => import("./pages/slides/ValuePropositionsSlide"));
const TeamLeadershipSlide = lazy(() => import("./pages/slides/TeamLeadershipSlide"));
const RoadmapSlide = lazy(() => import("./pages/slides/RoadmapSlide"));
const AskSlide = lazy(() => import("./pages/slides/AskSlide"));
const ContactSlide = lazy(() => import("./pages/slides/ContactSlide"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PerformanceMonitor />
      <StorageInitializer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LazySlideWrapper><TitleSlide /></LazySlideWrapper>} />
            <Route path="/slides/title" element={<LazySlideWrapper><TitleSlide /></LazySlideWrapper>} />
            <Route path="/builder" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}><Index /></Suspense>} />
            <Route path="/slides/overview" element={<LazySlideWrapper><OverviewSlide /></LazySlideWrapper>} />
            <Route path="/slides/challenges" element={<LazySlideWrapper><ChallengesSlide /></LazySlideWrapper>} />
            <Route path="/slides/product-glimpse" element={<LazySlideWrapper><ProductGlimpseSlide /></LazySlideWrapper>} />
            
            <Route path="/slides/market-overview" element={<LazySlideWrapper><MarketOverviewSlide /></LazySlideWrapper>} />
            <Route path="/slides/proof-demand" element={<LazySlideWrapper><ProofDemandSlide /></LazySlideWrapper>} />
            <Route path="/slides/sales-strategy" element={<LazySlideWrapper><SalesStrategySlide /></LazySlideWrapper>} />
            <Route path="/slides/customer-persona" element={<LazySlideWrapper><CustomerPersonaSlide /></LazySlideWrapper>} />
            <Route path="/slides/value-propositions" element={<LazySlideWrapper><ValuePropositionsSlide /></LazySlideWrapper>} />
            <Route path="/slides/team-leadership" element={<LazySlideWrapper><TeamLeadershipSlide /></LazySlideWrapper>} />
            <Route path="/slides/roadmap" element={<LazySlideWrapper><RoadmapSlide /></LazySlideWrapper>} />
            <Route path="/slides/ask" element={<LazySlideWrapper><AskSlide /></LazySlideWrapper>} />
            <Route path="/slides/contact" element={<LazySlideWrapper><ContactSlide /></LazySlideWrapper>} />
            <Route path="/media" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}><MediaDashboard /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </StorageInitializer>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
