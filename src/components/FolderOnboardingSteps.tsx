
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
  <div className={clsx("space-y-4", className)}>
    <h3 className="text-lg font-semibold text-center text-foreground mb-6">How it works</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {STEPS.map((step, idx) => (
        <div 
          key={step.title} 
          className="flex items-start gap-3 rounded-lg bg-card/60 border border-border/40 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <step.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-foreground mb-1">
              {`${idx + 1}. ${step.title}`}
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              {step.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
