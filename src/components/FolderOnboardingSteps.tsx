
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STEPS.map((step, idx) => (
        <div 
          key={step.title} 
          className="flex flex-col items-center text-center p-6 rounded-xl bg-card/60 border border-border/40 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <step.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              Step {idx + 1}: {step.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
