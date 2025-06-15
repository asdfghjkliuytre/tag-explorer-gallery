
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
