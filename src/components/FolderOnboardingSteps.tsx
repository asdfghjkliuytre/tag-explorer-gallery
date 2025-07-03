
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
      <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">How It Works</h3>
      <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Four simple steps to transform your image collection into an organized, searchable gallery
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STEPS.map((step, idx) => (
        <div 
          key={step.title} 
          className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-card/70 to-card/50 border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in group hover:scale-105"
          style={{ animationDelay: `${idx * 150}ms` }}
        >
          {/* Step number */}
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white text-sm font-bold flex items-center justify-center shadow-lg border-2 border-background">
            {idx + 1}
          </div>
          
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 border border-primary/30 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <step.icon className="h-8 w-8 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-base text-foreground tracking-tight">
              {step.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.desc}
            </p>
          </div>
          
          {/* Connecting arrow for desktop */}
          {idx < STEPS.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/40 to-transparent"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);
