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
          w-full max-w-3xl mx-auto p-8 border border-border/30 rounded-3xl 
          bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl
          transition-all duration-300 ease-out shadow-2xl hover:shadow-3xl
          ${isDragOver ? "ring-2 ring-primary/40 scale-[1.01] bg-gradient-to-br from-primary/8 to-accent/8 shadow-primary/10" : ""}
          animate-fade-in relative overflow-hidden group
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2 pointer-events-none"></div>
        
        <div className="relative w-full flex flex-col items-center space-y-8">
          
          {/* Professional title section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
              Select Your Images
            </h2>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              Choose a folder or drag images to begin organizing your collection with intelligent tagging
            </p>
          </div>

          {/* Enhanced action section */}
          <div className="w-full space-y-6">
            <Button
              asChild
              size="lg"
              className="w-full h-16 font-semibold text-lg rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/95 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden group"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center justify-center gap-4">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Upload className="w-6 h-6 relative z-10" />
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
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-8 py-2 text-sm font-medium text-muted-foreground tracking-wide uppercase rounded-xl border border-border/40 shadow-sm">
                  or drag & drop
                </span>
              </div>
            </div>

            {/* Premium drop zone with enhanced styling */}
            <div 
              className={`
                w-full border-2 border-dashed rounded-3xl 
                py-16 px-8 flex flex-col items-center justify-center 
                transition-all duration-300 ease-out relative overflow-hidden
                ${isDragOver 
                  ? "border-primary/60 bg-gradient-to-br from-primary/12 to-accent/8 scale-[1.005] shadow-lg ring-1 ring-primary/20" 
                  : "border-border/50 bg-gradient-to-br from-muted/20 to-muted/10 hover:border-primary/30 hover:bg-gradient-to-br hover:from-muted/30 hover:to-muted/15"
                }
              `}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/3 to-accent/3 opacity-0 transition-opacity duration-300 ${isDragOver ? 'opacity-100' : ''}`}></div>
              
              <div className={`flex flex-col items-center space-y-6 transition-all duration-300 relative z-10 ${isDragOver ? 'scale-105' : ''}`}>
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 border-2 border-primary/20 flex items-center justify-center transition-all duration-300 ${isDragOver ? 'scale-110 border-primary/40' : ''}`}>
                    <Upload className={`w-10 h-10 transition-all duration-300 ${isDragOver ? 'text-primary animate-bounce' : 'text-muted-foreground/70'}`} />
                  </div>
                  {isDragOver && (
                    <div className="absolute inset-0 rounded-full bg-primary/15 animate-ping"></div>
                  )}
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    Drop images here
                  </h3>
                  <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
                    Supports JPG, PNG, GIF, WebP, SVG and all common formats
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
