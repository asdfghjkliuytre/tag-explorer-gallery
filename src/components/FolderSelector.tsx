
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

  // Professional, clean onboarding card
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card
        className={`
          w-full max-w-lg p-8 border-none rounded-3xl bg-card shadow-2xl
          transition-all
          ${isDragOver ? "ring-4 ring-primary/60 scale-[1.015]" : ""}
          animate-fade-in
        `}
        style={{
          boxShadow:
            "0 4px 28px 0 rgba(41,54,99,0.12), 0 1.5px 12px 0 rgba(49,53,110,0.08)",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardHeader className="flex flex-col items-center space-y-3 pb-4 pt-2">
          <Sparkles className="h-11 w-11 text-primary mb-2 animate-pulse" />
          <CardTitle className="font-extrabold text-center text-2xl tracking-tight leading-tight">
            Select Your Image Folder
          </CardTitle>
          <CardDescription className="text-base text-center text-muted-foreground mt-0 mb-2 leading-normal">
            <span className="font-semibold text-primary">Browse a folder or drag & drop images here.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full flex flex-col sm:flex-row items-center gap-3 justify-center mb-2">
            <Button
              asChild
              className="px-7 py-3 font-bold text-base bg-primary text-primary-foreground shadow focus-visible:ring-primary transition"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center gap-2">
                <Upload className="h-5 w-5 mr-1" />
                Browse Folder
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
            <span className="text-base text-primary font-semibold opacity-80">
              or drag here
            </span>
          </div>
          <div className="w-full bg-muted/80 dark:bg-muted/70 px-4 py-3 rounded-xl border border-border/30 flex gap-3 items-start shadow-sm">
            <Info className="h-5 w-5 text-primary mt-[2px]" />
            <ul className="text-xs sm:text-sm text-primary/90 font-mono space-y-1 pt-[2px]">
              <li>
                <span className="font-bold">Supported:</span> JPG, PNG, GIF, WebP, SVG
              </li>
              <li>
                <span className="font-bold">Tags:</span> Extracted from filenames for easy search
              </li>
              <li>
                <span className="font-bold">Privacy:</span> All data stays local
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="text-sm text-muted-foreground mt-7 text-center w-full px-2">
        <span className="font-semibold text-primary">Tip:</span> Change the theme above for a personalized experience!
      </div>
    </div>
  );
};
