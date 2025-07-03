
import { Info } from "lucide-react";

export const FolderOnboardingSidebar = () => (
  <aside className="h-full max-h-[500px] overflow-y-auto bg-gradient-to-br from-card/90 to-card/75 backdrop-blur-2xl border border-border/40 rounded-2xl p-4 shadow-lg animate-fade-in">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/20">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-sm"></div>
      <h3 className="font-bold text-base text-foreground tracking-tight">Quick Tips</h3>
    </div>
    <div className="space-y-5">
      <div className="group p-5 bg-gradient-to-r from-emerald-50 to-emerald-25 dark:from-emerald-500/8 dark:to-emerald-500/4 rounded-xl border border-emerald-200/30 dark:border-emerald-500/20 transition-all duration-300 hover:from-emerald-100 hover:to-emerald-50 dark:hover:from-emerald-500/12 dark:hover:to-emerald-500/6 cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <h4 className="font-bold text-sm text-foreground">Privacy First</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">Images never leave your device. Everything stays completely local and secure.</p>
      </div>
      
      <div className="group p-5 bg-gradient-to-r from-blue-50 to-blue-25 dark:from-blue-500/8 dark:to-blue-500/4 rounded-xl border border-blue-200/30 dark:border-blue-500/20 transition-all duration-300 hover:from-blue-100 hover:to-blue-50 dark:hover:from-blue-500/12 dark:hover:to-blue-500/6 cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <h4 className="font-bold text-sm text-foreground">Smart Organization</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">Subfolders are automatically included for complete image discovery.</p>
      </div>
      
      <div className="group p-5 bg-gradient-to-r from-violet-50 to-violet-25 dark:from-violet-500/8 dark:to-violet-500/4 rounded-xl border border-violet-200/30 dark:border-violet-500/20 transition-all duration-300 hover:from-violet-100 hover:to-violet-50 dark:hover:from-violet-500/12 dark:hover:to-violet-500/6 cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
          </div>
          <h4 className="font-bold text-sm text-foreground">Better Results</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">Descriptive filenames dramatically improve auto-tagging accuracy.</p>
      </div>
    </div>
  </aside>
);
