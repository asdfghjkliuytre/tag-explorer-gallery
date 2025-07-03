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
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`
          w-full h-full min-h-[420px] max-h-[500px]
          p-6 border border-border/30 rounded-3xl 
          bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl
          transition-all duration-300 ease-out shadow-lg hover:shadow-xl
          ${isDragOver ? "ring-2 ring-primary/40 scale-[1.002] bg-gradient-to-br from-primary/8 to-accent/8 shadow-primary/10" : ""}
          animate-fade-in relative overflow-hidden group
          flex flex-col box-border
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8 animate-fade-in">
          
          {/* Enhanced title section */}
          <div className="text-center space-y-4 flex-shrink-0">
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Select Your Images
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full"></div>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed font-medium">
              Choose a folder or drag images to begin organizing your collection with intelligent tagging
            </p>
          </div>

          {/* Enhanced action section */}
          <div className="w-full flex-1 flex flex-col justify-center space-y-6 min-h-0">
            <Button
              asChild
              size="lg"
              className="w-full max-w-[450px] h-14 sm:h-16 font-bold text-lg sm:text-xl rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/95 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 relative overflow-hidden group flex-shrink-0 mx-auto hover:scale-[1.02] focus:scale-[1.02] focus:ring-4 focus:ring-primary/20"
              aria-label="Upload images"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center justify-center gap-4 w-full h-full px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Upload className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:animate-bounce-subtle" />
                <span className="relative z-10 font-bold tracking-tight">Browse Folder</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -translate-x-full"></div>
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
            
            {/* Enhanced divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-8 py-3 text-sm font-semibold text-muted-foreground tracking-wider uppercase rounded-xl border border-border/50 shadow-lg backdrop-blur-sm hover:bg-card/80 transition-colors duration-300">
                  or drag & drop
                </span>
              </div>
            </div>

            {/* Premium enhanced drop zone */}
            <div 
              className={`
                w-full max-w-[650px] mx-auto flex-1 min-h-[280px] border-2 border-dashed rounded-3xl 
                py-12 sm:py-16 px-6 sm:px-8 flex flex-col items-center justify-center 
                transition-all duration-500 ease-out relative overflow-hidden group
                ${isDragOver 
                  ? "border-primary/70 bg-gradient-to-br from-primary/15 to-accent/10 scale-[1.02] shadow-2xl ring-2 ring-primary/30 shadow-primary/20" 
                  : "border-border/60 bg-gradient-to-br from-muted/30 to-muted/15 hover:border-primary/40 hover:bg-gradient-to-br hover:from-muted/40 hover:to-muted/20 hover:shadow-lg"
                }
              `}
              aria-label="Drop images here"
            >
              {/* Enhanced animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-all duration-500 ${isDragOver ? 'opacity-100 animate-pulse' : 'group-hover:opacity-60'}`}></div>
              
              <div className={`flex flex-col items-center space-y-6 sm:space-y-8 transition-all duration-500 relative z-10 ${isDragOver ? 'scale-110' : 'group-hover:scale-105'}`}>
                <div className="relative">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 border-2 border-primary/30 flex items-center justify-center transition-all duration-500 shadow-lg ${isDragOver ? 'scale-125 border-primary/50 shadow-primary/30' : 'group-hover:scale-110'}`}>
                    <Upload className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 transition-all duration-500 ${isDragOver ? 'text-primary animate-bounce' : 'text-muted-foreground/80 group-hover:text-primary/80'}`} />
                  </div>
                  {isDragOver && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  )}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-center space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                    Drop images here
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground/80 max-w-sm sm:max-w-md leading-relaxed font-medium">
                    Supports JPG, PNG, GIF, WebP, SVG and all common formats
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>Fast • Secure • Local Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
