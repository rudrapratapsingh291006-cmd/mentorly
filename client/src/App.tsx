import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import Startups from "./pages/Startups";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import VideoCallRoom from "./pages/VideoCallRoom";
import Messages from "./pages/Messages";
import MentorAuth from "./pages/MentorAuth";
import MentorDashboard from "./pages/MentorDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/mentors" component={Directory} />
            <Route path="/startups" component={Startups} />
            <Route path="/mentor/join" component={MentorAuth} />
            <Route path="/mentor/login" component={MentorAuth} />
            <Route path="/mentor/dashboard" component={MentorDashboard} />
            <Route path="/login/:role" component={Login} />
            <Route path="/dashboard/:role" component={Dashboard} />
            <Route path="/call/:roomId" component={VideoCallRoom} />
            <Route path="/messages/:contactId?" component={Messages} />
            <Route path="/messages" component={Messages} />
            <Route path="/admin" component={Admin} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
