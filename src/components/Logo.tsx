
import { Folder } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
      <Folder className="w-3 h-3 text-primary" />
    </div>
    <span className="font-bold text-sm tracking-tight text-foreground">
      Professional Image Gallery
    </span>
  </div>
);
