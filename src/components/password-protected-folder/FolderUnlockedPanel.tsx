
import React from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Settings, Eye, EyeOff } from "lucide-react";

interface FolderUnlockedPanelProps {
  folderPath: string;
  handleFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUnlocked: boolean;
  setSettingsMode: (b: boolean) => void;
  settingsMode: boolean;
  dotVisible: boolean;
  handleToggleDotVisibility: () => void;
  newFolderPath: string;
  setNewFolderPath: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  handleSaveSettings: (e: React.FormEvent) => void;
}

const FolderUnlockedPanel: React.FC<FolderUnlockedPanelProps> = ({
  folderPath,
  handleFolderSelect,
  isUnlocked,
  setSettingsMode,
  settingsMode,
  dotVisible,
  handleToggleDotVisibility,
  newFolderPath,
  setNewFolderPath,
  newPassword,
  setNewPassword,
  handleSaveSettings,
}) => {
  if (!isUnlocked) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center bg-card/95 px-4 py-3 rounded-2xl border border-cyberpunk-accent gap-3 shadow-lg">
      <label
        htmlFor="hidden-folder-input"
        className="flex items-center cursor-pointer text-cyberpunk-accent font-semibold hover:underline"
        title={`Select "${folderPath}"`}
      >
        <FolderOpen className="h-5 w-5 mr-1" />
        <span>Open&nbsp;Folder</span>
      </label>
      <input
        id="hidden-folder-input"
        type="file"
        {...({ webkitdirectory: "" } as any)}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFolderSelect}
      />
      <span className="text-xs text-cyberpunk-foreground/90 font-mono truncate max-w-[120px]">
        {folderPath}
      </span>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setSettingsMode(!settingsMode)}
        title="Settings"
        className="ml-2"
      >
        <Settings className="h-4 w-4 text-cyberpunk-accent" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleToggleDotVisibility}
        title={dotVisible ? "Make Invisible" : "Make Visible"}
        className={`ml-2`}
      >
        {dotVisible ? (
          <EyeOff className="h-4 w-4 text-cyberpunk-accent" />
        ) : (
          <Eye className="h-4 w-4 text-cyberpunk-accent" />
        )}
      </Button>
      {settingsMode && (
        <form
          onSubmit={handleSaveSettings}
          className="absolute bottom-14 right-0 bg-card/95 p-5 rounded-xl border border-cyberpunk-accent z-[120] flex flex-col gap-2 min-w-[270px] shadow-lg"
        >
          <label className="text-xs text-cyberpunk-accent font-medium mb-1">
            Change Folder Path:
            <input
              type="text"
              value={newFolderPath}
              onChange={(e) => setNewFolderPath(e.target.value)}
              className="w-full px-2 py-1 mt-1 mb-2 bg-background rounded border border-border text-cyberpunk-accent"
            />
          </label>
          <label className="text-xs text-cyberpunk-accent font-medium mb-1">
            Set New Password:
            <input
              type="password"
              value={newPassword}
              placeholder="***"
              minLength={3}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-2 py-1 mt-1 mb-2 bg-background rounded border border-border text-cyberpunk-accent"
            />
          </label>
          <Button size="sm" type="submit" variant="default">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default FolderUnlockedPanel;
