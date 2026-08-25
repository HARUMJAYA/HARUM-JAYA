import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import News from "./pages/News";
import Career from "./pages/Career";
import Training from "./pages/Training";
import GuestHouse from "./pages/GuestHouse";
import Company from "./pages/Company";
import VisionMission from "./pages/VisionMission";
import Strategy from "./pages/Strategy";
import Organization from "./pages/Organization";
import Awards from "./pages/Awards";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/career" element={<Career />} />
          <Route path="/training" element={<Training />} />
          <Route path="/guest-house" element={<GuestHouse />} />
          <Route path="/company" element={<Company />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;