
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
    <div className="relative w-full min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Header with title */}
      <div className="w-full pt-8 pb-6 flex justify-center z-10">
        <OnboardingBanner theme={currentTheme} />
      </div>
      
      {/* Main content area with file selection */}
      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* File selection - takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
              <FolderSelector onFolderSelect={onFolderSelect} />
              <div className="mt-8 max-w-lg mx-auto">
                <FolderOnboardingSteps />
              </div>
            </div>
          </div>
          
          {/* Quick tips sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FolderOnboardingSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
