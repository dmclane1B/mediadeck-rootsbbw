import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StorageInitializer } from "@/components/StorageInitializer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TitleSlide from "./pages/slides/TitleSlide";
import OverviewSlide from "./pages/slides/OverviewSlide";
import ChallengesSlide from "./pages/slides/ChallengesSlide";
import ProductGlimpseSlide from "./pages/slides/ProductGlimpseSlide";

import MarketOverviewSlide from "./pages/slides/MarketOverviewSlide";
import ProofDemandSlide from "./pages/slides/ProofDemandSlide";
import SalesStrategySlide from "./pages/slides/SalesStrategySlide";
import CustomerPersonaSlide from "./pages/slides/CustomerPersonaSlide";
import ValuePropositionsSlide from "./pages/slides/ValuePropositionsSlide";
import TeamLeadershipSlide from "./pages/slides/TeamLeadershipSlide";
import RoadmapSlide from "./pages/slides/RoadmapSlide";
import AskSlide from "./pages/slides/AskSlide";
import ContactSlide from "./pages/slides/ContactSlide";
import MediaDashboard from "./pages/MediaDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StorageInitializer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TitleSlide />} />
            <Route path="/slides/title" element={<TitleSlide />} />
            <Route path="/builder" element={<Index />} />
            <Route path="/slides/overview" element={<OverviewSlide />} />
            <Route path="/slides/challenges" element={<ChallengesSlide />} />
            <Route path="/slides/product-glimpse" element={<ProductGlimpseSlide />} />
            
            <Route path="/slides/market-overview" element={<MarketOverviewSlide />} />
            <Route path="/slides/proof-demand" element={<ProofDemandSlide />} />
            <Route path="/slides/sales-strategy" element={<SalesStrategySlide />} />
            <Route path="/slides/customer-persona" element={<CustomerPersonaSlide />} />
            <Route path="/slides/value-propositions" element={<ValuePropositionsSlide />} />
            <Route path="/slides/team-leadership" element={<TeamLeadershipSlide />} />
            <Route path="/slides/roadmap" element={<RoadmapSlide />} />
            <Route path="/slides/ask" element={<AskSlide />} />
            <Route path="/slides/contact" element={<ContactSlide />} />
            <Route path="/media" element={<MediaDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StorageInitializer>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
