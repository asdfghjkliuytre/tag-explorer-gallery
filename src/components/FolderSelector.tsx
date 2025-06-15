
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Upload, Sparkles, Info } from 'lucide-react';

interface FolderSelectorProps {
  onFolderSelect: (files: FileList) => void;
  variant?: "light" | "default";
}

export const FolderSelector = ({ onFolderSelect, variant = "default" }: FolderSelectorProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  // Unified onboarding card for all themes, with gentle fade-in + better hierarchy
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <Card
        className={`w-full p-0 overflow-visible shadow-xl border-0 rounded-3xl 
          ${isDragOver ? "ring-4 ring-primary/60 scale-[1.01]" : ""}
          animate-fade-in
          bg-gradient-to-br from-[hsl(222,90%,98%)] via-[hsl(260,96%,98%)] to-[hsl(332,100%,98%)]
          dark:from-[hsl(222,21%,11%)] dark:via-[hsl(260,26%,14%)] dark:to-[hsl(315,13%,13%)]
          bg-[length:400%_400%] transition-all duration-200
        `}
        style={{
          boxShadow:
            "0 8px 38px 0 rgba(41,54,99,0.11), 0 2.5px 16px 0 rgba(49,53,110,0.09)",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardHeader className="pt-10 pb-4 flex flex-col items-center">
          <Sparkles className="h-10 w-10 text-primary mb-2 animate-pulse" />
          <CardTitle className="font-extrabold text-2xl sm:text-2xl text-center text-foreground tracking-tight mb-1">
            Start by Selecting Your Image Folder
          </CardTitle>
          <CardDescription className="text-base text-center text-muted-foreground mt-2 mb-3 leading-relaxed">
            <span>
              <span className="font-semibold text-primary">Click <b>Browse</b></span> to choose a folder, or drag &amp; drop images or a folder here.<br />
              <span className="text-xs text-muted-foreground/80 block mt-2 mx-auto">
                Your files never leave your device.
              </span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 justify-center">
            <Button
              asChild
              className="px-6 py-3 text-base font-bold bg-primary text-primary-foreground drop-shadow focus-visible:ring-primary duration-150"
            >
              <label htmlFor="folder-input" className="cursor-pointer flex items-center gap-2">
                <Upload className="h-5 w-5 mr-2" />
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
            <span className="text-base text-primary/80 font-medium">
              or drag here
            </span>
          </div>
          {/* Info card */}
          <div
            className="flex items-start gap-2 bg-white/90 dark:bg-muted/70 px-4 py-3 rounded-xl border border-primary/10 shadow-sm mb-1"
          >
            <Info className="h-5 w-5 text-primary mt-[1px]" />
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
      <div className="text-sm text-muted-foreground mt-6 text-center w-full px-2">
        <span className="font-semibold text-primary">Tip:</span> Change the theme from the palette above
        <span className="hidden sm:inline"> for a personalized experience!</span>
      </div>
    </div>
  );
};
