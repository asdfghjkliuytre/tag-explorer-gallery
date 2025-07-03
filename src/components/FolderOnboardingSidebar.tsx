
import { Info } from "lucide-react";

export const FolderOnboardingSidebar = () => (
  <aside className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      <span className="font-semibold text-foreground">Quick Tips</span>
    </div>
    <div className="space-y-4 text-sm">
      <div className="p-3 bg-muted/30 rounded-lg border-l-3 border-l-primary">
        <div className="font-medium text-foreground mb-1">Privacy First</div>
        <div className="text-muted-foreground">Images never leave your device. Everything stays local.</div>
      </div>
      <div className="p-3 bg-muted/30 rounded-lg border-l-3 border-l-accent">
        <div className="font-medium text-foreground mb-1">Smart Organization</div>
        <div className="text-muted-foreground">Subfolders are included automatically for complete coverage.</div>
      </div>
      <div className="p-3 bg-muted/30 rounded-lg border-l-3 border-l-secondary">
        <div className="font-medium text-foreground mb-1">Better Results</div>
        <div className="text-muted-foreground">Descriptive filenames improve auto-tagging accuracy.</div>
      </div>
    </div>
  </aside>
);
