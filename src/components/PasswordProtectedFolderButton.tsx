
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Lock, Settings } from "lucide-react";

// Defaults
const DEFAULT_PASSWORD = "qazwsx";
const DEFAULT_FOLDER_PATH = "F:\\movie\\Telegram Desktop";

interface PasswordProtectedFolderButtonProps {
  onFolderSelect: (files: FileList) => void;
}

export const PasswordProtectedFolderButton = ({
  onFolderSelect,
}: PasswordProtectedFolderButtonProps) => {
  // State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState(
    localStorage.getItem("ppfb-password") || DEFAULT_PASSWORD
  );
  const [folderPath, setFolderPath] = useState(
    localStorage.getItem("ppfb-folder-path") || DEFAULT_FOLDER_PATH
  );
  const [inputPwd, setInputPwd] = useState("");
  const [showError, setShowError] = useState(false);

  const [clickCount, setClickCount] = useState(0);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  // Settings mode
  const [settingsMode, setSettingsMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newFolderPath, setNewFolderPath] = useState(folderPath);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Triple-tap/click logic (resets after 2s)
  const clickAreaTimeout = useRef<NodeJS.Timeout | null>(null);
  function handleClickSecretArea() {
    if (clickAreaTimeout.current) clearTimeout(clickAreaTimeout.current);
    setClickCount((c) => {
      if (c === 2) {
        setShowPasswordPrompt(true);
        return 0;
      }
      clickAreaTimeout.current = setTimeout(() => setClickCount(0), 2000);
      return c + 1;
    });
  }

  // Password submission
  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputPwd === password) {
      setIsUnlocked(true);
      setShowError(false);
      setShowPasswordPrompt(false);
      setInputPwd("");
    } else {
      setShowError(true);
      setInputPwd("");
      inputRef.current?.focus();
    }
  }

  // Settings: Change password/folder path
  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length >= 3) {
      setPassword(newPassword);
      localStorage.setItem("ppfb-password", newPassword);
    }
    setFolderPath(newFolderPath);
    localStorage.setItem("ppfb-folder-path", newFolderPath);
    setSettingsMode(false);
  }

  // Folder select handler
  function handleFolderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) onFolderSelect(files);
  }

  // UI
  return (
    <>
      {/* Invisible area (tiny dot at bottom center) */}
      <div
        className="fixed bottom-4 left-1/2 w-6 h-6 -translate-x-1/2 z-50 opacity-10 hover:opacity-30 transition rounded-full cursor-pointer bg-cyberpunk-accent"
        style={{ pointerEvents: isUnlocked ? "none" : "auto" }}
        title={isUnlocked ? undefined : "Secret"}
        onClick={handleClickSecretArea}
      />
      {/* Password Dialog */}
      {showPasswordPrompt && !isUnlocked && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50">
          <form
            onSubmit={handlePasswordSubmit}
            className="flex items-center gap-2 bg-card/90 px-4 py-3 rounded-2xl shadow-md border border-cyberpunk-500"
          >
            <Lock className="h-5 w-5 text-cyberpunk-accent" />
            <input
              ref={inputRef}
              type="password"
              placeholder="Password"
              value={inputPwd}
              onChange={(e) => setInputPwd(e.target.value)}
              className="bg-transparent outline-none text-cyberpunk-accent placeholder:text-cyberpunk-foreground px-2"
              autoComplete="off"
              style={{ minWidth: 120 }}
            />
            <Button size="sm" type="submit" variant="secondary">
              Unlock
            </Button>
            {showError && (
              <span className="text-xs text-red-500 ml-2">Wrong password</span>
            )}
          </form>
        </div>
      )}
      {/* Unlocked state */}
      {isUnlocked && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-card/90 px-4 py-2 rounded-2xl border border-cyberpunk-accent gap-3 shadow-md">
          <label
            htmlFor="hidden-folder-input"
            className="flex items-center cursor-pointer text-cyberpunk-accent"
            title={`Select "${folderPath}"`}
          >
            <FolderOpen className="h-5 w-5 mr-1" />
            <span className="text-cyberpunk-accent underline">Open Folder</span>
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
          <span className="text-xs text-cyberpunk-foreground/70">
            {folderPath}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSettingsMode((b) => !b)}
            title="Settings"
            className="ml-2"
          >
            <Settings className="h-4 w-4 text-cyberpunk-accent" />
          </Button>
          {settingsMode && (
            <form
              onSubmit={handleSaveSettings}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-card/95 p-4 rounded-xl border border-cyberpunk-accent z-50 flex flex-col gap-2 min-w-[250px]"
            >
              <label className="text-xs text-cyberpunk-accent">
                Change Folder Path:
                <input
                  type="text"
                  value={newFolderPath}
                  onChange={(e) => setNewFolderPath(e.target.value)}
                  className="w-full px-2 py-1 mt-1 mb-2 bg-background rounded border border-border text-cyberpunk-accent"
                />
              </label>
              <label className="text-xs text-cyberpunk-accent">
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
      )}
    </>
  );
};
