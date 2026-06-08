import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import EstimatePage from "@/pages/estimate";
import TrackPage from "@/pages/track";
import AdminPage from "@/pages/admin";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import ServicePage from "@/pages/service";
import ServiceAreaPage from "@/pages/service-area";
import BookingNotifications from "@/components/booking-notifications";
import SupportBot from "@/components/support-bot";
import { usePageviewTracking } from "@/hooks/use-analytics";
import { useScrollRestore } from "@/hooks/use-scroll-restore";

function Router() {
  usePageviewTracking();
  useScrollRestore();
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/estimate" component={EstimatePage} />
      <Route path="/track" component={TrackPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/service-areas/:slug" component={ServiceAreaPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <BookingNotifications />
        <SupportBot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
