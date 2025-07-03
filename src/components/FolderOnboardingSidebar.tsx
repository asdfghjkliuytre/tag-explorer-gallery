
import { Info } from "lucide-react";

export const FolderOnboardingSidebar = () => (
  <aside className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border border-border/30 rounded-xl p-5 shadow-lg animate-fade-in sticky top-32">
    <div className="flex items-center gap-2 mb-5">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
      <span className="font-bold text-base text-foreground">Quick Tips</span>
    </div>
    <div className="space-y-4">
      <div className="group p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg border-l-3 border-l-green-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/15 hover:to-green-500/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <div className="font-semibold text-sm text-foreground">Privacy First</div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">Images never leave your device. Everything stays completely local and secure.</div>
      </div>
      <div className="group p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border-l-3 border-l-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-blue-500/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <div className="font-semibold text-sm text-foreground">Smart Organization</div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">Subfolders are automatically included for complete image discovery.</div>
      </div>
      <div className="group p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg border-l-3 border-l-purple-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/15 hover:to-purple-500/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <div className="font-semibold text-sm text-foreground">Better Results</div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">Descriptive filenames dramatically improve auto-tagging accuracy.</div>
      </div>
    </div>
  </aside>
);
