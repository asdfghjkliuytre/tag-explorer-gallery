
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Upload } from 'lucide-react';

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
      className={`transition-colors ${isDragOver ? 'border-primary bg-primary/5' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Select Image Folder
        </CardTitle>
        <CardDescription>
          Choose a folder containing images to display in the gallery
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button asChild>
              <label htmlFor="folder-input" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Browse Folder
              </label>
            </Button>
            <input
              id="folder-input"
              type="file"
              webkitdirectory=""
              multiple
              accept="image/*"
              onChange={handleFolderSelect}
              className="hidden"
            />
            <span className="text-sm text-muted-foreground">
              or drag and drop images here
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Supported formats: JPG, PNG, GIF, WebP, SVG</p>
            <p>Tags will be automatically extracted from filenames</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
