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
          w-full max-w-3xl mx-auto p-10 border border-border/20 rounded-3xl 
          bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl
          transition-all duration-500 ease-out shadow-xl hover:shadow-2xl
          ${isDragOver ? "ring-4 ring-primary/30 scale-[1.02] bg-gradient-to-br from-primary/10 to-accent/10" : ""}
          animate-fade-in relative overflow-hidden
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        
        <div className="relative w-full flex flex-col items-center space-y-8">
          {/* Folder icon with enhanced styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 flex items-center justify-center shadow-lg">
              <HeroFolderIcon />
            </div>
          </div>
          
          {/* Title and description */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              Select Your Images
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Choose a folder or drag images to get started with your personal gallery
            </p>
          </div>

          {/* Action buttons */}
          <div className="w-full space-y-8">
            <Button
              asChild
              size="lg"
              className="w-full h-14 font-semibold text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center justify-center gap-3">
                <Upload className="w-5 h-5" />
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
            
            {/* Enhanced divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-r from-card to-card px-6 text-sm font-medium text-muted-foreground tracking-wider uppercase">
                  or
                </span>
              </div>
            </div>

            {/* Enhanced drop zone */}
            <div 
              className={`
                w-full border-2 border-dashed rounded-2xl 
                py-12 flex flex-col items-center justify-center 
                transition-all duration-500 ease-out relative overflow-hidden
                ${isDragOver 
                  ? "border-primary/70 bg-gradient-to-br from-primary/10 to-accent/10 scale-[1.01] shadow-lg" 
                  : "border-border/40 bg-gradient-to-br from-muted/20 to-muted/10 hover:border-border/60 hover:bg-gradient-to-br hover:from-muted/30 hover:to-muted/20"
                }
              `}
            >
              <div className={`flex flex-col items-center space-y-4 transition-all duration-300 ${isDragOver ? 'scale-110' : ''}`}>
                <Upload className={`w-12 h-12 transition-all duration-300 ${isDragOver ? 'text-primary animate-bounce' : 'text-muted-foreground/60'}`} />
                <div className="text-center space-y-2">
                  <span className="text-lg font-medium text-muted-foreground">
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
        
        {/* Enhanced info panel */}
        <div className="relative mt-10 p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/20 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span><strong className="text-foreground">Privacy:</strong> All data stays local in your browser</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span><strong className="text-foreground">Organization:</strong> Subfolders included automatically</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span><strong className="text-foreground">Tags:</strong> Auto-generated from filenames</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
