
import { FC } from "react";
import { FolderOpen, Tag, Search, Heart } from "lucide-react";
import clsx from "clsx";

interface FolderOnboardingStepsProps {
  className?: string;
}

const STEPS = [
  {
    icon: FolderOpen,
    title: "Select Folder",
    desc: "Pick a folder containing your images – privacy guaranteed.",
  },
  {
    icon: Tag,
    title: "Organize with Tags",
    desc: "Tags are extracted automatically from image filenames.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    desc: "Find your favorite images instantly using tags or keywords.",
  },
  {
    icon: Heart,
    title: "Mark Favorites",
    desc: "Click the heart to quickly access your best shots.",
  },
];

export const FolderOnboardingSteps: FC<FolderOnboardingStepsProps> = ({ className }) => (
  <div className={clsx("w-full", className)}>
    <div className="text-center mb-3">
      <h3 className="text-sm font-bold text-foreground mb-1">How it works</h3>
      <p className="text-xs text-muted-foreground">Four simple steps to organize your collection</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {STEPS.map((step, idx) => (
        <div 
          key={step.title} 
          className="relative flex flex-col items-center text-center p-3 rounded-lg bg-card/60 border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Step number */}
          <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
            {idx + 1}
          </div>
          
          {/* Icon */}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2 border border-primary/20">
            <step.icon className="h-4 w-4 text-primary" />
          </div>
          
          <div className="space-y-1">
            <h4 className="font-semibold text-xs text-foreground">
              {step.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
