
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
      {/* Header Section - Compact */}
      <div className="w-full py-3 flex justify-center border-b border-border/10 shrink-0">
        <div className="text-center">
          <h1 className="font-bold text-2xl lg:text-3xl tracking-tight text-foreground leading-tight">
            Welcome to <span className="gradient-text font-black">Your Gallery</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            Organize, search & enjoy your images with lightning speed
          </p>
        </div>
      </div>
      
      {/* Main Content - 16:9 Aspect Ratio Layout */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 lg:px-6">
          {/* Desktop: 3-column layout, Mobile: stacked */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 py-6">
            
            {/* Left Panel - Quick Tips */}
            <div className="order-2 lg:order-1 overflow-y-auto">
              <FolderOnboardingSidebar />
            </div>
            
            {/* Center Panel - File Selection */}
            <div className="order-1 lg:order-2 flex items-center justify-center min-h-0">
              <div className="w-full max-w-[600px] h-full max-h-[500px] flex flex-col">
                <FolderSelector onFolderSelect={onFolderSelect} />
              </div>
            </div>
            
            {/* Right Panel - Next Steps */}
            <div className="order-3 lg:order-3 flex items-start lg:items-center">
              <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-card/60 to-card/40 border border-border/30 shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30">
                    <div className="w-6 h-6 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base text-foreground">Next Steps</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      After selecting your folder, you'll be able to organize, search, and tag your images automatically
                    </p>
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
