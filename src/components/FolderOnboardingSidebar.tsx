
import { Info } from "lucide-react";

export const FolderOnboardingSidebar = () => (
  <aside className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-xl animate-fade-in">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
      <span className="font-bold text-lg text-foreground">Quick Tips</span>
    </div>
    <div className="space-y-4">
      <div className="group p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border-l-4 border-l-green-500 hover:bg-gradient-to-r hover:from-green-500/15 hover:to-green-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="font-semibold text-foreground">Privacy First</div>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">Images never leave your device. Everything stays completely local and secure.</div>
      </div>
      <div className="group p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-xl border-l-4 border-l-blue-500 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-blue-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="font-semibold text-foreground">Smart Organization</div>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">Subfolders are automatically included for complete image discovery.</div>
      </div>
      <div className="group p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl border-l-4 border-l-purple-500 hover:bg-gradient-to-r hover:from-purple-500/15 hover:to-purple-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="font-semibold text-foreground">Better Results</div>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">Descriptive filenames dramatically improve auto-tagging accuracy.</div>
      </div>
    </div>
  </aside>
);
