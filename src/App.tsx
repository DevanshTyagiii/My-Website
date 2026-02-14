import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

import TapEffect from "./components/TapEffect";
import AmbientWaveBackground from "./components/AmbientWaveBackground";

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
    <div className="animate-pulse">Loading...</div>
  </div>
);

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AmbientWaveBackground />
        <TapEffect />
        <Toaster />
        <Sonner />
        <AnimatePresence>
          {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
        </AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </motion.div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
