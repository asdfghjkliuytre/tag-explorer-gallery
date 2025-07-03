
import { Images } from "lucide-react";
import { FolderSelector } from "@/components/FolderSelector";
import { OnboardingBanner } from "@/components/OnboardingBanner";
import { FolderOnboardingSteps } from "@/components/FolderOnboardingSteps";
import { FolderOnboardingSidebar } from "@/components/FolderOnboardingSidebar";

interface GalleryOnboardingProps {
  currentTheme: string;
  onFolderSelect: (files: FileList) => void;
}

export function GalleryOnboarding({ currentTheme, onFolderSelect }: GalleryOnboardingProps) {
  if (currentTheme === "light") {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100/50 to-neutral-200/30">
        <div className="absolute top-8 left-0 w-full flex justify-center pointer-events-none z-10">
          <OnboardingBanner theme={currentTheme} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center z-20 px-6 py-20">
          <FolderSelector onFolderSelect={onFolderSelect} variant="light" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/5 flex flex-col">
      {/* Header Section - Enhanced */}
      <div className="w-full py-6 flex justify-center border-b border-border/20 shrink-0 bg-card/30 backdrop-blur-sm">
        <div className="text-center animate-fade-in-up">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl opacity-60 animate-glow"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/30 flex items-center justify-center shadow-lg">
                <Images className="w-8 h-8 text-primary drop-shadow-sm" />
              </div>
            </div>
          </div>
          <h1 className="font-bold text-3xl lg:text-4xl tracking-tight text-foreground leading-tight mb-2">
            Welcome to <span className="gradient-text font-black">Your Gallery</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed font-medium max-w-2xl mx-auto">
            Organize, search & enjoy your images with lightning speed and powerful tagging
          </p>
        </div>
      </div>
      
      {/* Main Content - Enhanced 16:9 Layout */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Responsive 3-column layout */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 py-8 items-start lg:items-center">
            
            {/* Left Panel - Enhanced Quick Tips */}
            <div className="order-2 lg:order-1 overflow-y-auto animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <FolderOnboardingSidebar />
            </div>
            
            {/* Center Panel - Enhanced File Selection */}
            <div className="order-1 lg:order-2 flex items-center justify-center min-h-0 animate-scale-in">
              <div className="w-full max-w-[650px] h-full max-h-[550px] flex flex-col">
                <FolderSelector onFolderSelect={onFolderSelect} />
              </div>
            </div>
            
            {/* Right Panel - Enhanced Next Steps */}
            <div className="order-3 lg:order-3 flex items-start lg:items-center animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="w-full p-8 rounded-3xl bg-gradient-to-br from-card/70 to-card/50 border border-border/30 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg animate-pulse"></div>
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 flex items-center justify-center border border-primary/30 shadow-lg">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent animate-bounce-subtle shadow-sm"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg text-foreground tracking-tight">Next Steps</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      After selecting your folder, you'll be able to organize, search, and tag your images automatically with our intelligent system
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>Privacy guaranteed • All processing happens locally</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
