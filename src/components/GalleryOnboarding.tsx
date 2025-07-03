
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
    <div className="w-full h-screen overflow-hidden bg-background flex flex-col">
      {/* Header Section - Clean and Minimal */}
      <div className="w-full py-4 flex justify-center border-b border-border/20 shrink-0">
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <div className="w-12 h-12 rounded-xl bg-card border border-border/40 flex items-center justify-center shadow-sm">
              <Images className="w-6 h-6 text-foreground" />
            </div>
          </div>
          <h1 className="font-bold text-3xl tracking-tight text-foreground leading-tight mb-2">
            Welcome to
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed font-medium">
            Organize, search & enjoy your images with lightning speed and powerful tagging
          </p>
        </div>
      </div>
      
      {/* Main Content - Three Column Layout */}
      <div className="flex-1 min-h-0 py-8 px-6">
        <div className="h-full max-w-6xl mx-auto">
          <div className="h-full grid grid-cols-1 lg:grid-cols-[350px_1fr_350px] gap-8 items-start">
            
            {/* Left Panel - Quick Tips */}
            <div className="order-2 lg:order-1">
              <div className="bg-card border border-border/30 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-bold text-lg text-foreground">Quick Tips</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200/40 dark:border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">Privacy First</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Images never leave your device. Everything stays completely local and secure.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200/40 dark:border-blue-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">Smart Organization</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Subfolders are automatically included for complete image discovery.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-violet-50 dark:bg-violet-500/10 rounded-xl border border-violet-200/40 dark:border-violet-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">Better Results</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Descriptive filenames dramatically improve auto-tagging accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Center Panel - File Selection */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="w-full max-w-2xl">
                <FolderSelector onFolderSelect={onFolderSelect} />
              </div>
            </div>
            
            {/* Right Panel - Next Steps */}
            <div className="order-3 lg:order-3">
              <div className="bg-card border border-border/30 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-muted/50 border border-border/40 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-muted border border-border/60"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg text-foreground">Next Steps</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      After selecting your folder, you'll be able to organize, search, and tag your images automatically with our intelligent system
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span>Privacy guaranteed • All processing happens locally</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
