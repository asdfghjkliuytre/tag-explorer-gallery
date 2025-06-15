
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Upload, Sparkles } from 'lucide-react';

interface FolderSelectorProps {
  onFolderSelect: (files: FileList) => void;
}

export const FolderSelector = ({ onFolderSelect }: FolderSelectorProps) => {
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

  return (
    <Card
      className={`transition-colors shadow-xl border-cyberpunk-accent/70 rounded-3xl ${
        isDragOver ? 'border-primary bg-primary/10 scale-[1.02]' : ''
      } card-hover`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        maxWidth: 420,
        margin: "0 auto",
        background: "linear-gradient(120deg, rgba(49,29,81,0.95) 85%, rgba(255,227,89,0.07) 100%)",
        borderWidth: 2,
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl tracking-tight font-black text-cyberpunk-accent drop-shadow-glow">
          <Sparkles className="h-7 w-7 animate-pulse text-cyberpunk-accent" />
          Start by Selecting Your Image Folder
        </CardTitle>
        <CardDescription className="flex flex-col gap-2 text-cyberpunk-foreground/80 mt-2">
          <span>
            <span className="font-semibold text-cyberpunk-accent">Click Browse</span> to choose a folder, or simply <span className="font-semibold text-cyberpunk-accent">drag & drop</span> images or a folder here.
          </span>
          <span className="text-cyberpunk-accent/60 text-xs">
            Your files never leave your device.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 py-2">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild className="px-6 py-3 text-base font-bold shadow-cyberpunk-card focus-visible:ring-cyberpunk-accent">
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
            <span className="text-base text-cyberpunk-accent/80 font-medium">
              or drag here
            </span>
          </div>
          <div className="bg-card/80 rounded-xl mt-3 px-5 py-4 border-cyberpunk-accent/50 border text-cyberpunk-accent/70 text-xs font-mono shadow-inner">
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
