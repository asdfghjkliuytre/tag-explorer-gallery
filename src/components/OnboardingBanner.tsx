
import { FC } from "react";
import { Images } from "lucide-react";

export const OnboardingBanner: FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center text-center select-none pointer-events-none">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl opacity-60"></div>
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center">
          <Images className="w-8 h-8 text-primary drop-shadow-sm" />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-foreground leading-tight">
          Welcome to <span className="gradient-text font-black">Your Gallery</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
          Organize, search & enjoy your images with lightning speed and powerful tagging
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
