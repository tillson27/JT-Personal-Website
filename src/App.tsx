import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Casper from "./pages/Casper";
import CasperDeck from "./components/casper/CasperDeck";
import Hub from "./components/casper/Hub";
import PromptShowcase from "./components/casper/PromptShowcase";
import McpShowcase from "./components/casper/McpShowcase";
import OracleRmsMockup from "./components/casper/OracleRmsMockup";
import Profile from "./components/casper/Profile";
import Walkthrough from "./components/casper/Walkthrough";
import Workouts from "./pages/Workouts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/casper" element={<Casper />}>
            <Route index element={<Hub />} />
            <Route path="deck" element={<CasperDeck />} />
            <Route path="prompt" element={<PromptShowcase />} />
            <Route path="mcp" element={<McpShowcase />} />
            <Route path="mockup" element={<OracleRmsMockup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="walkthrough" element={<Walkthrough />} />
          </Route>
          <Route path="/workouts" element={<Workouts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
