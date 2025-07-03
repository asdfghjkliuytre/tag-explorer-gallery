
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
      <div className="relative w-full min-h-screen flex items-center justify-center bg-white bg-gradient-to-br from-[#fafbfe] via-[#f6f3ff] to-[#fdeff5]">
        <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none z-10">
          <OnboardingBanner theme={currentTheme} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center z-20 px-4 py-24">
          <FolderSelector onFolderSelect={onFolderSelect} variant="light" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="w-full pt-4 pb-3 flex justify-center">
        <OnboardingBanner theme={currentTheme} />
      </div>
      
      {/* Main Content - Centered Layout */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-5 gap-6 items-start">
          {/* Left Sidebar - Quick Tips */}
          <div className="hidden lg:block lg:col-span-1">
            <FolderOnboardingSidebar />
          </div>
          
          {/* Center Content - File Selection */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
              <FolderSelector onFolderSelect={onFolderSelect} />
            </div>
          </div>
          
          {/* Right Spacer for balance */}
          <div className="hidden lg:block lg:col-span-1"></div>
        </div>
      </div>
      
      {/* Bottom Section - Steps */}
      <div className="w-full pb-4 px-4">
        <div className="max-w-5xl mx-auto">
          <FolderOnboardingSteps />
        </div>
      </div>
    </div>
  );
}
