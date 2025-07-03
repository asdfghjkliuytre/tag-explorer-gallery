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
    <div className="w-full flex justify-center">
      <div
        className={`
          w-full max-w-2xl mx-auto p-8 border border-border/20 rounded-3xl 
          bg-gradient-to-br from-card/98 to-card/90 backdrop-blur-2xl
          transition-all duration-500 ease-out shadow-xl hover:shadow-2xl
          ${isDragOver ? "ring-4 ring-primary/30 scale-[1.02] bg-gradient-to-br from-primary/10 to-accent/10 shadow-2xl" : ""}
          animate-fade-in relative overflow-hidden
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none"></div>
        
        <div className="relative w-full flex flex-col items-center space-y-6">
          {/* Enhanced folder icon */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 border-2 border-primary/20 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <HeroFolderIcon />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>
          </div>
          
          {/* Professional title section */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Select Your Images
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Choose a folder or drag images to begin organizing your collection
            </p>
          </div>

          {/* Enhanced action section */}
          <div className="w-full space-y-6">
            <Button
              asChild
              size="lg"
              className="w-full h-14 font-semibold text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden group"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center justify-center gap-3">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Upload className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Browse Folder</span>
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
            
            {/* Professional divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-r from-card to-card px-6 py-1 text-sm font-medium text-muted-foreground tracking-wider uppercase rounded-full border border-border/30">
                  or
                </span>
              </div>
            </div>

            {/* Premium drop zone */}
            <div 
              className={`
                w-full border-2 border-dashed rounded-2xl 
                py-12 flex flex-col items-center justify-center 
                transition-all duration-500 ease-out relative overflow-hidden
                ${isDragOver 
                  ? "border-primary/70 bg-gradient-to-br from-primary/15 to-accent/10 scale-[1.01] shadow-xl" 
                  : "border-border/40 bg-gradient-to-br from-muted/30 to-muted/20 hover:border-primary/40 hover:bg-gradient-to-br hover:from-muted/40 hover:to-muted/30"
                }
              `}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity duration-500 ${isDragOver ? 'opacity-100' : ''}`}></div>
              
              <div className={`flex flex-col items-center space-y-4 transition-all duration-500 relative z-10 ${isDragOver ? 'scale-110' : ''}`}>
                <div className="relative">
                  <Upload className={`w-12 h-12 transition-all duration-500 ${isDragOver ? 'text-primary animate-bounce' : 'text-muted-foreground/60'}`} />
                  {isDragOver && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  )}
                </div>
                <div className="text-center space-y-2">
                  <span className="text-lg font-semibold text-muted-foreground">
                    Drop images here
                  </span>
                  <span className="text-sm text-muted-foreground/70 block">
                    Supports JPG, PNG, GIF, WebP, SVG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium info panel */}
        <div className="relative mt-8 p-6 bg-gradient-to-r from-muted/20 to-muted/15 rounded-2xl border border-border/30 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span><strong className="text-foreground font-semibold">Privacy:</strong> All data stays local in your browser</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span><strong className="text-foreground font-semibold">Organization:</strong> Subfolders included automatically</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span><strong className="text-foreground font-semibold">Tags:</strong> Auto-generated from filenames</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
