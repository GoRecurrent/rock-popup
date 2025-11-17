import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WizardModal from "@/components/WizardModal";

const queryClient = new QueryClient();

const App = () => (
  <div className="rock-popup-container" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div style={{ pointerEvents: 'auto' }}>
          <WizardModal />
          {/* You could also put a "main page behind" or just this modal if the app's sole purpose is the popup */}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
