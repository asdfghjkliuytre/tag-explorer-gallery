
import { FC } from "react";
import { Images } from "lucide-react";

export const OnboardingBanner: FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="w-full max-w-3xl pt-16 flex flex-col items-center select-none pointer-events-none">
      <Images className={`w-28 h-28 mb-2 drop-shadow-xl ${theme === "cyberpunk" ? "text-cyberpunk-accent" : "text-primary"}`} />
      <div className={`font-extrabold text-4xl md:text-5xl tracking-tight ${theme === "cyberpunk" ? "text-cyberpunk-accent" : "text-primary"} drop-shadow-lg`}>
        Welcome to <span className="gradient-text">Your Gallery</span>
      </div>
      <div className="font-normal text-lg md:text-2xl mt-2 text-muted-foreground max-w-lg text-center">
        Organize, search & enjoy your images with lightning speed.
      </div>
      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #c471f5 0%, #fa71cd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};
