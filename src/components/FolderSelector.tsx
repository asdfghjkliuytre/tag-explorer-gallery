
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Upload, Sparkles } from 'lucide-react';

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

  if (variant === "light") {
    // Figma-like "centered onboarding card on white bg"
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <Card
          className={`w-full p-0 overflow-visible shadow-xl border-0 rounded-3xl bg-gradient-to-br from-[#dadcff] via-[#e8dbfa] to-[#fcebf5]`}
          style={{
            boxShadow: "0 8px 40px 0 rgba(49,54,99,0.10), 0 1.5px 12px 0 rgba(49,53,110,0.09)",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="p-7 pb-3 sm:p-9 sm:pb-3">
            <div className="font-black text-2xl mb-2 text-foreground tracking-tight">
              Start by Selecting Your Image Folder
            </div>
            <div className="mb-5 text-base text-muted-foreground">
              <span className="block">
                <span className="font-semibold text-primary">Click <b>Browse</b></span> to choose a folder, or simply <span className="font-semibold text-primary">drag &amp; drop</span> images or a folder here.
              </span>
              <span className="text-xs text-muted-foreground/80 block mt-1">
                Your files never leave your device.
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Button asChild className="px-6 py-3 text-base font-bold bg-primary text-primary-foreground shadow-lg focus-visible:ring-primary">
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
            <div className="bg-white/90 rounded-xl px-5 py-4 border border-primary/15 text-primary/90 text-xs font-mono shadow-[0_0_18px_0_rgba(49,54,99,0.09)]">
              <ul className="space-y-1 pl-2">
                <li>
                  <span className="font-bold">Supported:</span> JPG, PNG, GIF, WebP, SVG
                </li>
                <li>
                  <span className="font-bold">Tags:</span> Automatically extracted from filenames
                </li>
                <li>
                  <span className="font-bold">Privacy:</span> All data stays 100% local
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <div className="text-sm text-muted-foreground mt-5 text-center w-full">
          Tip: Try the <span className="font-bold text-primary">cyberpunk/neon theme</span> for an immersive experience!
        </div>
      </div>
    );
  }

  // Theme-aware card styling for light theme
  return (
    <Card
      className={`transition-colors shadow-xl border-primary/70 rounded-3xl ${isDragOver ? 'border-primary bg-primary/10 scale-[1.02]' : ''} card-hover bg-card`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        maxWidth: 480,
        margin: "0 auto",
        borderWidth: 2,
        background: "var(--card)" // Remove gradients, use tailwind bg-card/css var for proper theme
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl tracking-tight font-black text-primary drop-shadow">
          <Sparkles className="h-7 w-7 animate-pulse text-primary" />
          Start by Selecting Your Image Folder
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 text-foreground/80 mt-2">
          <span>
            <span className="font-semibold text-primary">Click Browse</span> to choose a folder, or simply <span className="font-semibold text-primary">drag & drop</span> images or a folder here.
          </span>
          <span className="text-primary/60 text-xs">
            Your files never leave your device.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 py-2">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild className="px-6 py-3 text-base font-bold bg-primary text-primary-foreground shadow-lg focus-visible:ring-primary">
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
          <div className="bg-muted rounded-xl mt-3 px-5 py-4 border-primary/30 border text-primary/80 text-xs font-mono shadow-inner">
            <ul className="space-y-1 pl-2">
              <li>
                <span className="font-bold">Supported:</span> JPG, PNG, GIF, WebP, SVG
              </li>
              <li>
                <span className="font-bold">Tags:</span> Automatically extracted from filenames
              </li>
              <li>
                <span className="font-bold">Privacy:</span> All data stays 100% local
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
