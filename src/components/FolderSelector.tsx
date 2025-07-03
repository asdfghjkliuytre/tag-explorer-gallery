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
    <div className="w-full">
      <div
        className={`
          w-full bg-card border border-border/30 rounded-2xl p-8 shadow-sm
          transition-all duration-300 ease-out relative overflow-hidden
          ${isDragOver ? "ring-2 ring-primary/40 border-primary/60 bg-primary/5" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        
        <div className="flex flex-col items-center space-y-8 text-center">
          
          {/* Title Section */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Select Your Images
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Choose a folder or drag images to begin organizing your collection with intelligent tagging
            </p>
          </div>

          {/* Browse Button */}
          <Button
            asChild
            size="lg"
            className="w-full max-w-md h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Upload images"
          >
            <label htmlFor="folder-input" className="cursor-pointer flex items-center justify-center gap-3 w-full h-full">
              <Upload className="w-6 h-6" />
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
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-sm text-muted-foreground uppercase tracking-wider font-medium">
                OR DRAG & DROP
              </span>
            </div>
          </div>

          {/* Drop Zone */}
          <div 
            className={`
              w-full min-h-[200px] border-2 border-dashed rounded-xl 
              p-12 flex flex-col items-center justify-center space-y-4
              transition-all duration-300 relative
              ${isDragOver 
                ? "border-primary bg-primary/5 scale-[1.02]" 
                : "border-border hover:border-primary/50 hover:bg-muted/20"
              }
            `}
            aria-label="Drop images here"
          >
            <div className={`transition-all duration-300 ${isDragOver ? 'scale-110' : ''}`}>
              <div className={`w-16 h-16 rounded-full bg-muted/50 border-2 flex items-center justify-center transition-all duration-300 ${isDragOver ? 'border-primary bg-primary/10' : 'border-border'}`}>
                <Upload className={`w-8 h-8 transition-colors duration-300 ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-base font-medium text-foreground">
                Drop images here
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, GIF, WebP, SVG and all common formats
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
