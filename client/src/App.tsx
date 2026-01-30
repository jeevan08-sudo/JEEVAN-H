import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { ThreeBackground } from "@/components/ThreeBackground";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <PageWrapper>
            <Home />
          </PageWrapper>
        </Route>
        <Route path="/about">
          <PageWrapper>
            <About />
          </PageWrapper>
        </Route>
        <Route path="/skills">
          <PageWrapper>
            <Skills />
          </PageWrapper>
        </Route>
        <Route path="/contact">
          <PageWrapper>
            <Contact />
          </PageWrapper>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Global Effects */}
      <div className="scanlines" />
      <ThreeBackground />
      
      {/* UI Layer */}
      <div className="relative z-10">
        <Navigation />
        <Router />
      </div>
      
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
