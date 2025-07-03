
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
    <div className="relative w-full min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/5 flex flex-col">
      {/* Header Section */}
      <div className="w-full pt-4 pb-3 flex justify-center border-b border-border/10 shrink-0">
        <OnboardingBanner theme={currentTheme} />
      </div>
      
      {/* Main Content - Full Viewport Responsive Layout */}
      <div className="flex-1 flex items-center justify-center min-h-0 py-4 lg:py-8">
        <div className="w-full h-full max-w-[1200px] mx-auto px-4 lg:px-8 box-border">
          {/* Desktop: 3-column grid, Tablet/Mobile: stacked */}
          <div className="h-full grid grid-cols-1 xl:grid-cols-[1fr_2fr_1fr] gap-4 lg:gap-8 items-start xl:items-center">
            
            {/* Left Sidebar - Quick Tips */}
            <div className="order-2 xl:order-1 w-full">
              <FolderOnboardingSidebar />
            </div>
            
            {/* Center Content - File Selection */}
            <div className="order-1 xl:order-2 w-full flex items-center justify-center">
              <div className="w-full max-w-[600px] mx-auto bg-muted/20 rounded-3xl p-4 lg:p-6">
                <FolderSelector onFolderSelect={onFolderSelect} />
              </div>
            </div>
            
            {/* Right Panel - Next Steps */}
            <div className="order-3 xl:order-3 w-full">
              <div className="w-full flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Next Steps</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    After selecting your folder, you'll be able to organize, search, and tag your images automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section - Steps */}
      <div className="w-full pb-4 px-4 lg:px-6 border-t border-border/10 bg-card/30 shrink-0">
        <div className="max-w-6xl mx-auto pt-4">
          <FolderOnboardingSteps />
        </div>
      </div>
    </div>
  );
}
