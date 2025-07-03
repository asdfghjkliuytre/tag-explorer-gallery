
import { Info } from "lucide-react";

export const FolderOnboardingSidebar = () => (
  <aside className="bg-card/80 backdrop-blur-xl border border-border/30 rounded-lg p-3 shadow-lg animate-fade-in">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
      <span className="font-bold text-sm text-foreground">Quick Tips</span>
    </div>
    <div className="space-y-2">
      <div className="p-2 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-md border-l-2 border-l-green-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/15 hover:to-green-500/10">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-green-500"></div>
          <div className="font-semibold text-xs text-foreground">Privacy First</div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">Images never leave your device. Everything stays local.</div>
      </div>
      <div className="p-2 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-md border-l-2 border-l-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-blue-500/10">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
          <div className="font-semibold text-xs text-foreground">Smart Organization</div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">Subfolders are included automatically for complete coverage.</div>
      </div>
      <div className="p-2 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-md border-l-2 border-l-purple-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/15 hover:to-purple-500/10">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-purple-500"></div>
          <div className="font-semibold text-xs text-foreground">Better Results</div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">Descriptive filenames improve auto-tagging accuracy.</div>
      </div>
    </div>
  </aside>
);
