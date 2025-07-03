
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
    <div className="text-center mb-8">
      <h3 className="text-xl font-bold text-foreground mb-2">How it works</h3>
      <p className="text-sm text-muted-foreground">Four simple steps to organize your image collection</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STEPS.map((step, idx) => (
        <div 
          key={step.title} 
          className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-card/90 to-card/60 border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Step number badge */}
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-lg">
            {idx + 1}
          </div>
          
          {/* Icon with enhanced styling */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <step.icon className="h-7 w-7 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-base text-foreground">
              {step.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.desc}
            </p>
          </div>
          
          {/* Connecting line for desktop */}
          {idx < STEPS.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-border to-transparent"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);
