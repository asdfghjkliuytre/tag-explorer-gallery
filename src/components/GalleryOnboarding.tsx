
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
    <div className="relative w-full min-h-screen bg-background flex items-stretch justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none z-10">
        <OnboardingBanner theme={currentTheme} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center z-20 py-24 md:py-36 px-4">
        <div className="mx-auto w-full max-w-lg">
          <FolderSelector onFolderSelect={onFolderSelect} />
          <FolderOnboardingSteps className="mt-8" />
        </div>
      </div>
      <div className="hidden lg:block w-1/3 min-w-[320px] max-w-xs py-24 md:py-36 pr-12 z-20">
        <FolderOnboardingSidebar />
      </div>
    </div>
  );
}
