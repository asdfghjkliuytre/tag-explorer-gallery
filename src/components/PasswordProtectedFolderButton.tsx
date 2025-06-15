
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Lock } from "lucide-react";

interface PasswordProtectedFolderButtonProps {
  onFolderSelect: (files: FileList) => void;
}

export const PasswordProtectedFolderButton = ({
  onFolderSelect,
}: PasswordProtectedFolderButtonProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const correctPassword = "qazwsx";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPassword("");
      inputRef.current?.focus();
    }
  };

  const handleFolderSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) onFolderSelect(files);
  };

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 opacity-60 hover:opacity-100 transition-all">
      {!isUnlocked ? (
        <form
          onSubmit={handlePasswordSubmit}
          className="flex items-center gap-2 bg-card/70 px-4 py-2 rounded-xl shadow-lg border border-cyberpunk-500"
        >
          <Lock className="h-5 w-5 text-cyberpunk-accent" />
          <input
            ref={inputRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      ) : (
        <div className="flex items-center bg-card/70 px-3 py-1 rounded-xl border border-cyberpunk-500 gap-2">
          <label
            htmlFor="hidden-folder-input"
            className="flex items-center cursor-pointer text-cyberpunk-accent"
            title='Select "F:\\movie\\Telegram Desktop"'
          >
            <FolderOpen className="h-5 w-5 mr-1" />
            Open Telegram Desktop Folder
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
        </div>
      )}
    </div>
  );
};

