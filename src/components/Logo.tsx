
import { Folder } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
      <Folder className="w-4 h-4 text-primary" />
    </div>
    <span className="font-bold text-lg tracking-tight text-foreground">
      Professional Image Gallery
    </span>
  </div>
);
