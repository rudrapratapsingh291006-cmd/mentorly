import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0c0c] text-[#f9f6ef] p-6">
      <div className="w-full max-w-md text-center rounded-3xl border border-[#262a28] bg-[#151717] p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#ef765e]/15 border border-[#ef765e]/30">
            <AlertCircle className="h-8 w-8 text-[#ef765e]" />
          </div>
        </div>

        <h1 className="font-display text-5xl font-bold text-white mb-2">404</h1>

        <h2 className="text-xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-sm text-[#a6aba6] mb-8 leading-relaxed">
          The page or venture resource you are looking for does not exist or may have been archived.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 rounded-full bg-[#ef765e] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#e9654c]"
          >
            <Home className="w-4 h-4" /> Return to Campus Hub
          </button>
        </div>
      </div>
    </div>
  );
}
