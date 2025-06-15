
import { FC } from "react";
import { Images } from "lucide-react";

export const OnboardingBanner: FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="w-full max-w-3xl pt-12 flex flex-col items-center select-none pointer-events-none">
      <Images className={`w-28 h-28 mb-2 drop-shadow-lg ${theme === "cyberpunk" ? "text-cyberpunk-accent" : "text-primary"}`} />
      <div className={`font-black text-3xl md:text-4xl tracking-tight ${theme === "cyberpunk" ? "text-cyberpunk-accent" : "text-primary"}`}>
        Welcome to <span className="gradient-text">Your Gallery</span>
      </div>
      <div className="font-normal text-base md:text-lg mt-2 text-muted-foreground">
        Organize, search &amp; enjoy your images with lightning speed.
      </div>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #c471f5 0%, #fa71cd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};
