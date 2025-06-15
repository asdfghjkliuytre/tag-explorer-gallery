
import React from "react";
import { Folder as FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentFoldersPanelProps {
  recentFolders: string[];
  onSelect: (folderName: string) => void;
}

export const RecentFoldersPanel: React.FC<RecentFoldersPanelProps> = ({ recentFolders, onSelect }) => {
  if (!recentFolders.length) return null;
  return (
    <div className="bg-muted/60 rounded-2xl p-4 shadow-inner mb-6">
      <div className="flex items-center gap-2 mb-2">
        <FolderIcon className="w-4 h-4 text-primary" />
        <span className="font-semibold text-sm text-foreground/80">
          Recent Folders
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {recentFolders.slice(0, 4).map((folder, i) => (
          <Button 
            key={folder + i} 
            variant="ghost"
            className="justify-start text-left w-full text-sm !text-primary/90 hover:!bg-accent/40"
            onClick={() => onSelect(folder)}
          >
            {folder}
          </Button>
        ))}
      </div>
    </div>
  );
};
