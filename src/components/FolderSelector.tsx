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
          w-full max-w-xl mx-auto p-10 border border-border/30 rounded-3xl 
          bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm
          transition-all duration-300 ease-out shadow-xl
          ${isDragOver ? "ring-2 ring-primary/50 scale-[1.02] bg-primary/5 shadow-2xl" : "hover:shadow-2xl"}
          animate-fade-in
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="w-full flex flex-col items-center space-y-8">
          {/* Large folder icon */}
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
              <HeroFolderIcon />
            </div>
          </div>
          
          {/* Title and description */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Select Your Images</h2>
            <p className="text-muted-foreground max-w-sm">
              Choose a folder or drag images to get started with your gallery
            </p>
          </div>

          {/* Action buttons */}
          <div className="w-full space-y-6">
            <Button
              asChild
              size="lg"
              className="w-full h-14 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
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
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-sm uppercase tracking-wider">
                <span className="bg-card px-4 text-muted-foreground font-medium">or</span>
              </div>
            </div>

            {/* Drop zone */}
            <div 
              className={`
                w-full border-2 border-dashed rounded-xl 
                py-12 flex flex-col items-center justify-center 
                transition-all duration-300
                ${isDragOver 
                  ? "border-primary/70 bg-primary/10 scale-[1.01]" 
                  : "border-border/50 bg-muted/20 hover:border-border/70 hover:bg-muted/30"
                }
              `}
            >
              <Upload className={`w-12 h-12 mb-4 transition-colors ${isDragOver ? 'text-primary' : 'text-muted-foreground/60'}`} />
              <span className="text-base text-muted-foreground font-medium mb-1">
                Drop images here
              </span>
              <span className="text-sm text-muted-foreground/70">
                Supports JPG, PNG, GIF, WebP, SVG
              </span>
            </div>
          </div>
        </div>
        
        {/* Info panel */}
        <div className="mt-8 p-5 bg-muted/20 rounded-xl border border-border/30">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span><strong>Privacy:</strong> All data stays local in your browser</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span><strong>Organization:</strong> Subfolders included automatically</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <span><strong>Tags:</strong> Auto-generated from filenames</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
