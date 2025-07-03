
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
    <div className="relative w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col">
      {/* Header Section */}
      <div className="w-full pt-6 pb-4 flex justify-center">
        <OnboardingBanner theme={currentTheme} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-6xl">
          {/* File Selection Card */}
          <div className="mb-8">
            <FolderSelector onFolderSelect={onFolderSelect} />
          </div>
          
          {/* Steps and Tips Grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Steps take 3 columns */}
            <div className="lg:col-span-3">
              <FolderOnboardingSteps />
            </div>
            
            {/* Tips sidebar takes 1 column */}
            <div className="lg:col-span-1">
              <FolderOnboardingSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
