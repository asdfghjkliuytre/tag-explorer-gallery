import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Upload, Sparkles, Info } from "lucide-react";
import HeroFolderIcon from "./HeroFolderIcon";

interface FolderSelectorProps {
  onFolderSelect: (files: FileList) => void;
  variant?: "light" | "default";
}

export const FolderSelector = ({
  onFolderSelect,
  variant = "default",
}: FolderSelectorProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFolderSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      onFolderSelect(files);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = event.dataTransfer.files;
    if (files) {
      onFolderSelect(files);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={`
          w-full max-w-lg sm:mx-auto px-6 py-10 border-none rounded-3xl bg-card shadow-2xl
          transition-all
          ${isDragOver ? "ring-4 ring-primary/60 scale-[1.012]" : ""}
          animate-fade-in
        `}
        style={{
          boxShadow:
            "0 6px 38px 0 rgba(41,54,99,0.16), 0 1.5px 12px 0 rgba(49,53,110,0.09)",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="w-full flex flex-col items-center gap-1">
          <HeroFolderIcon />
          <div className="flex flex-col items-center w-full">
            <Button
              asChild
              className="w-full md:w-auto px-8 py-4 font-bold text-base rounded-xl bg-primary text-primary-foreground shadow-lg hover:scale-[1.04] focus-visible:ring-primary transition whitespace-nowrap mb-3"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center gap-2">
                📂
                <span>Browse Folder</span>
              </label>
            </Button>
            <input
              id="folder-input"
              type="file"
              {...({ webkitdirectory: "" } as any)}
              multiple
              accept="image/*"
              onChange={handleFolderSelect}
              className="hidden"
            />
            <span className="block text-base text-primary font-semibold opacity-80 whitespace-nowrap mt-2 mb-4">
              or drag & drop images here
            </span>
            <div 
              className={`w-full border-2 border-dashed border-primary/50 bg-card/60 py-6 flex flex-col items-center justify-center rounded-2xl mb-5 transition-all ${
                isDragOver ? "bg-accent/20 shadow-lg" : ""
              }`}
            >
              <span className="text-2xl">🖼️</span>
              <span className="mt-2 text-sm text-muted-foreground">
                Drop your folder here to get started!
              </span>
            </div>
          </div>
        </div>
        <div className="w-full bg-muted/80 dark:bg-muted/70 px-4 py-3 rounded-xl border border-border/30 flex flex-row gap-3 items-start shadow-sm mt-0">
          <ul className="text-xs sm:text-sm text-muted-foreground/90 font-mono space-y-0.5 pt-0 list-disc ml-3">
            <li><span className="font-bold">Supported:</span> JPG, PNG, GIF, WebP, SVG</li>
            <li><span className="font-bold">Tags:</span> Extracted from filenames for easy search</li>
            <li><span className="font-bold">Privacy:</span> All data stays local to your browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
