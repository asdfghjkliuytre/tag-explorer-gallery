
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
    <div className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute top-8 left-0 w-full flex justify-center pointer-events-none z-10">
        <OnboardingBanner theme={currentTheme} />
      </div>
      <div className="flex flex-1 items-center justify-center z-20 px-6 py-16">
        <div className="w-full max-w-4xl grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="w-full max-w-lg">
              <FolderSelector onFolderSelect={onFolderSelect} />
              <FolderOnboardingSteps className="mt-8" />
            </div>
          </div>
          <div className="hidden lg:block">
            <FolderOnboardingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
