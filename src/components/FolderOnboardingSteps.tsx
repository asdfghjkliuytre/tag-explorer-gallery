
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
  <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6", className)}>
    {STEPS.map((step, idx) => (
      <div key={step.title} className="flex items-start gap-4 rounded-xl bg-muted/60 border border-border px-4 py-4 shadow-sm">
        <div className="flex-shrink-0">
          <step.icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <div className="font-bold text-lg text-foreground mb-1">{`Step ${idx + 1}: ${step.title}`}</div>
          <div className="text-sm text-muted-foreground">{step.desc}</div>
        </div>
      </div>
    ))}
  </div>
);
