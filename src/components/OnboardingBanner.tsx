
import { FC } from "react";
import { Images } from "lucide-react";

export const OnboardingBanner: FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center text-center select-none pointer-events-none">
      <div className="relative mb-3">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl opacity-50"></div>
        <Images className="relative w-14 h-14 text-primary drop-shadow-lg" />
      </div>
      <div className="space-y-2">
        <h1 className="font-black text-2xl lg:text-3xl tracking-tight text-foreground">
          Welcome to <span className="gradient-text">Your Gallery</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
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
