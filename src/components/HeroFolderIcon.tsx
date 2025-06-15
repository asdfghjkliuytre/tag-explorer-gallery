
import React from "react";
import { Folder } from "lucide-react";
export default function HeroFolderIcon() {
  return (
    <div className="mx-auto mb-8">
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
        <span className="absolute w-28 h-28 md:w-40 md:h-40 bg-primary/10 rounded-full blur-2xl" style={{top: '-14%', left: '-12%'}}></span>
        <Folder className="w-24 h-24 md:w-32 md:h-32 text-primary drop-shadow-lg z-10" />
      </div>
    </div>
  );
}
