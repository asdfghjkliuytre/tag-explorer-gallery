
import { FC } from "react";
import { Images } from "lucide-react";

export const OnboardingBanner: FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center select-none pointer-events-none">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl"></div>
        <Images className={`relative w-20 h-20 drop-shadow-2xl ${theme === "cyberpunk" ? "text-primary" : "text-primary"}`} />
      </div>
      <div className="text-center space-y-3">
        <h1 className={`font-black text-3xl lg:text-4xl tracking-tight ${theme === "cyberpunk" ? "text-foreground" : "text-foreground"} drop-shadow-sm`}>
          Welcome to <span className="gradient-text">Your Gallery</span>
        </h1>
        <p className="font-medium text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Organize, search & enjoy your images with lightning speed and powerful tagging.
        </p>
      </div>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};
