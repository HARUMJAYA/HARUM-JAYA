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

// Category Pages
import ProjectCategory from "./pages/ProjectCategory";
import ServiceCategory from "./pages/ServiceCategory";
import NewsCategory from "./pages/NewsCategory";
import CareerCategory from "./pages/CareerCategory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* Project Categories */}
          <Route path="/projects/eksterior" element={<ProjectCategory category="eksterior" title="Proyek Eksterior" />} />
          <Route path="/projects/interior" element={<ProjectCategory category="interior" title="Proyek Interior" />} />
          <Route path="/projects/gedung" element={<ProjectCategory category="pekerjaan gedung" title="Pekerjaan Gedung" />} />
          <Route path="/projects/rancang-bangun" element={<ProjectCategory category="pekerjaan rancang bangun" title="Rancang & Bangun" />} />
          <Route path="/projects/sipil" element={<ProjectCategory category="pekerjaan sipil" title="Pekerjaan Sipil" />} />
          <Route path="/projects/umum" element={<ProjectCategory category="pekerjaan umum" title="Pekerjaan Umum" />} />

          <Route path="/services" element={<Services />} />
          {/* Service Categories */}
          <Route path="/services/umum" element={<ServiceCategory category="KONTRAKTOR UMUM" title="Kontraktor Umum" />} />
          <Route path="/services/rancang-bangun" element={<ServiceCategory category="RANCANG & BANGUN" title="Rancang & Bangun" />} />
          <Route path="/services/sipil" element={<ServiceCategory category="KONTRAKTOR SIPIL" title="Kontraktor Sipil" />} />
          <Route path="/services/teknologi" element={<ServiceCategory category="TEKNOLOGI & INOVASI" title="Teknologi & Inovasi" />} />
          <Route path="/services/gedung" element={<ServiceCategory category="KONTRAKTOR GEDUNG" title="Kontraktor Gedung" />} />
          <Route path="/services/magang" element={<ServiceCategory category="PROGRAM MAGANG" title="Program Magang" />} />

          <Route path="/news" element={<News />} />
          {/* News Categories */}
          <Route path="/news/berita" element={<NewsCategory category="Berita" title="Berita Utama" />} />
          <Route path="/news/csr" element={<NewsCategory category="CSR" title="CSR Perusahaan" />} />
          <Route path="/news/kegiatan" element={<NewsCategory category="Kegiatan" title="Kegiatan Kami" />} />
          <Route path="/news/galeri" element={<NewsCategory category="Galeri" title="Galeri Foto" />} />

          <Route path="/career" element={<Career />} />
          {/* Career Categories */}
          <Route path="/career/budaya" element={<CareerCategory category="Budaya kami" title="Budaya Kerja" />} />
          <Route path="/career/area" element={<CareerCategory category="Karir Area" title="Area Penempatan" />} />
          <Route path="/career/daftar-kerja" element={<CareerCategory category="Daftar kerja" title="Lowongan Pekerjaan" />} />
          <Route path="/career/daftar-praktek" element={<CareerCategory category="Daftar praktek" title="Praktek & Magang" />} />

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