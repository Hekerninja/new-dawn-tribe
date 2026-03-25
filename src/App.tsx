"use client"; import { Toaster } from "@/components/ui/toaster"; import { Toaster as Sonner } from "@/components/ui/sonner"; import { TooltipProvider } from "@/components/ui/tooltip"; import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; import { BrowserRouter, Routes, Route } from "react-router-dom"; import { FaviconGenerator } from "./components/FaviconGenerator"; import CustomCursor from "./components/CustomCursor"; import Index from "./pages/Index"; import Blog from "./pages/Blog"; import BlogPost from "./pages/BlogPost"; import About from "./pages/About"; import Services from "./pages/Services"; import Contact from "./pages/Contact"; import SobrietyTracker from "./pages/SobrietyTracker"; import AdminPanel from "./components/AdminPanel"; import Quiz from "./pages/Quiz"; import NotFound from "./pages/NotFound"; import TestData from "./pages/TestData"; import SplashScreen from "./components/SplashScreen"; import { SobrietyTrackerProvider } from "./contexts/SobrietyTrackerContext"; const queryClient = new QueryClient(); const App = () => ( <QueryClientProvider client={queryClient}> <SobrietyTrackerProvider> <TooltipProvider> <Toaster /> <Sonner /> <FaviconGenerator /> <CustomCursor /> <BrowserRouter> <div className="theme-transition cursor-none relative"> 
    {/* Splash Screen - will be conditionally rendered by the component itself */}
    <SplashScreen />
    
    <Routes>       <Route path="/" element={<Index />} /> 
      <Route path="/about" element={<About />} /> 
      <Route path="/services" element={<Services />} />       <Route path="/blog" element={<Blog />} /> 
      <Route path="/blog/:id" element={<BlogPost />} /> 
      <Route path="/contact" element={<Contact />} /> 
      <Route path="/tracker" element={<SobrietyTracker />} /> 
      <Route path="/quiz" element={<Quiz />} /> 
      <Route path="/admin" element={<AdminPanel />} /> 
      <Route path="/test-data" element={<TestData />} /> 
      <Route path="*" element={<NotFound />} /> 
    </Routes> 
  </div> 
</BrowserRouter> 
</TooltipProvider> 
</SobrietyTrackerProvider> 
</QueryClientProvider> 
); export default App;