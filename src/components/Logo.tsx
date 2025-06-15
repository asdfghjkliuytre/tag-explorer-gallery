
import { Folder } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-3 select-none">
    <span className="inline-block rounded-xl shadow-lg bg-primary/20 p-2">
      <Folder className="w-7 h-7 text-primary drop-shadow" />
    </span>
    <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-foreground">
      Professional Image Gallery
    </span>
  </div>
);
