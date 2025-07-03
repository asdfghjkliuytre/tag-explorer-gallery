
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
      <div className="w-full pt-6 pb-4 flex justify-center z-10">
        <OnboardingBanner theme={currentTheme} />
      </div>
      
      {/* Main content area with file selection */}
      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="w-full max-w-7xl grid lg:grid-cols-4 gap-6 lg:gap-8 items-start mt-4">
          {/* File selection - takes 3 columns */}
          <div className="lg:col-span-3 flex flex-col items-center">
            <div className="w-full max-w-4xl">
              <FolderSelector onFolderSelect={onFolderSelect} />
            </div>
            {/* Steps below the file selector */}
            <div className="w-full max-w-5xl mt-6">
              <FolderOnboardingSteps />
            </div>
          </div>
          
          {/* Quick tips sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <FolderOnboardingSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
