
import React from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasswordPromptDialogProps {
  showPasswordPrompt: boolean;
  isUnlocked: boolean;
  inputPwd: string;
  setInputPwd: (v: string) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  showError: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const PasswordPromptDialog: React.FC<PasswordPromptDialogProps> = ({
  showPasswordPrompt,
  isUnlocked,
  inputPwd,
  setInputPwd,
  handlePasswordSubmit,
  showError,
  inputRef,
}) => {
  if (!showPasswordPrompt || isUnlocked) return null;
  return (
    <div className="fixed bottom-16 right-1/2 md:right-10 md:left-auto left-1/2 -translate-x-1/2 md:translate-x-0 z-[70]">
      <form
        onSubmit={handlePasswordSubmit}
        className="flex items-center gap-2 bg-card/90 px-5 py-4 rounded-2xl shadow-md border border-cyberpunk-500"
      >
        <Lock className="h-5 w-5 text-cyberpunk-accent" />
        <input
          ref={inputRef}
          type="password"
          placeholder="Password"
          value={inputPwd}
          onChange={(e) => setInputPwd(e.target.value)}
          className="bg-transparent outline-none text-cyberpunk-accent placeholder:text-cyberpunk-foreground px-2 text-base"
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
  );
};

export default PasswordPromptDialog;
