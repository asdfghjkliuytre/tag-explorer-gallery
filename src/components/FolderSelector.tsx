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
          w-full max-w-md mx-auto p-8 border border-border/20 rounded-2xl bg-card/95 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isDragOver ? "ring-2 ring-primary/40 scale-[1.02] bg-primary/5" : ""}
          hover:shadow-xl animate-fade-in
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="relative">
            <HeroFolderIcon />
          </div>
          
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Select Your Images</h2>
            <p className="text-sm text-muted-foreground">Choose a folder or drag images to get started</p>
          </div>

          <div className="w-full space-y-4">
            <Button
              asChild
              size="lg"
              className="w-full font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
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
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div 
              className={`
                w-full border-2 border-dashed border-border/40 bg-muted/20 
                py-8 flex flex-col items-center justify-center rounded-xl 
                transition-all duration-300
                ${isDragOver ? "border-primary/60 bg-primary/10" : "hover:border-border/60 hover:bg-muted/30"}
              `}
            >
              <Upload className="w-8 h-8 text-muted-foreground/60 mb-3" />
              <span className="text-sm text-muted-foreground font-medium">
                Drop images here
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/20">
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
