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
          w-full max-w-2xl mx-auto p-6 border border-border/20 rounded-2xl 
          bg-card/90 backdrop-blur-xl
          transition-all duration-300 ease-out shadow-lg hover:shadow-xl
          ${isDragOver ? "ring-2 ring-primary/40 scale-[1.01] bg-primary/5" : ""}
          animate-fade-in
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="w-full flex flex-col items-center space-y-6">
          {/* Folder icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
              <HeroFolderIcon />
            </div>
          </div>
          
          {/* Title and description */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">Select Your Images</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Choose a folder or drag images to get started
            </p>
          </div>

          {/* Action buttons */}
          <div className="w-full space-y-4">
            <Button
              asChild
              size="lg"
              className="w-full h-12 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
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
                <span className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  or
                </span>
              </div>
            </div>

            {/* Drop zone */}
            <div 
              className={`
                w-full border-2 border-dashed rounded-xl 
                py-8 flex flex-col items-center justify-center 
                transition-all duration-300
                ${isDragOver 
                  ? "border-primary/60 bg-primary/10" 
                  : "border-border/40 bg-muted/20 hover:border-border/60 hover:bg-muted/30"
                }
              `}
            >
              <Upload className={`w-8 h-8 mb-2 transition-colors ${isDragOver ? 'text-primary' : 'text-muted-foreground/60'}`} />
              <span className="text-sm text-muted-foreground font-medium">
                Drop images here
              </span>
            </div>
          </div>
        </div>
        
        {/* Info panel */}
        <div className="mt-6 p-4 bg-muted/20 rounded-xl border border-border/20">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground space-y-1">
              <div><strong>Supported:</strong> JPG, PNG, GIF, WebP, SVG</div>
              <div><strong>Privacy:</strong> All data stays local in your browser</div>
              <div><strong>Tags:</strong> Auto-generated from filenames</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
