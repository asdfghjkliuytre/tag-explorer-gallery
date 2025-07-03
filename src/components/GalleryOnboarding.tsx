
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
    <div className="relative w-full h-screen bg-gradient-to-br from-background via-background/95 to-muted/5 flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="w-full pt-6 pb-4 flex justify-center border-b border-border/10">
        <OnboardingBanner theme={currentTheme} />
      </div>
      
      {/* Main Content - Perfectly Centered Layout */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-7xl grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Sidebar - Quick Tips */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <FolderOnboardingSidebar />
            </div>
          </div>
          
          {/* Center Content - File Selection */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
              <FolderSelector onFolderSelect={onFolderSelect} />
            </div>
          </div>
          
          {/* Right Spacer for balance */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20">
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
      
      {/* Bottom Section - Steps */}
      <div className="w-full pb-6 px-6 border-t border-border/10 bg-card/30">
        <div className="max-w-6xl mx-auto pt-6">
          <FolderOnboardingSteps />
        </div>
      </div>
    </div>
  );
}
