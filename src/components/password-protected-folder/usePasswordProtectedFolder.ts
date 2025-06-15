
import { useState, useRef } from "react";

const DEFAULT_PASSWORD = "qazwsx";
const DEFAULT_FOLDER_PATH = "F:\\movie\\Telegram Desktop";

export function usePasswordProtectedFolder(onFolderSelect: (files: FileList) => void) {
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

  const [settingsMode, setSettingsMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newFolderPath, setNewFolderPath] = useState(folderPath);

  const [dotVisible, setDotVisible] = useState(
    localStorage.getItem("ppfb-dot-visible") !== "false"
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Triple-tap/click logic for secret area (resets after 2s)
  const clickAreaTimeout = useRef<NodeJS.Timeout | null>(null);
  function handleClickSecretArea() {
    if (!dotVisible) return;
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

  // Settings: Change password/folder path & visibility
  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length >= 3) {
      setPassword(newPassword);
      localStorage.setItem("ppfb-password", newPassword);
    }
    setFolderPath(newFolderPath);
    localStorage.setItem("ppfb-folder-path", newFolderPath);
    localStorage.setItem("ppfb-dot-visible", dotVisible.toString());
    setSettingsMode(false);
  }

  // Folder select handler
  function handleFolderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      onFolderSelect(files);
      // After folder selection, relock and close, but ALWAYS allow secret dot access again
      setIsUnlocked(false);
      setShowPasswordPrompt(false);
      setSettingsMode(false);
      setInputPwd("");
    }
  }

  // Toggle secret dot visibility when unlocked
  function handleToggleDotVisibility() {
    setDotVisible((prev) => {
      localStorage.setItem("ppfb-dot-visible", (!prev).toString());
      return !prev;
    });
  }

  return {
    isUnlocked,
    password,
    folderPath,
    inputPwd,
    setInputPwd,
    showError,
    setShowError,
    clickCount,
    setClickCount,
    showPasswordPrompt,
    setShowPasswordPrompt,
    settingsMode,
    setSettingsMode,
    newPassword,
    setNewPassword,
    newFolderPath,
    setNewFolderPath,
    dotVisible,
    setDotVisible,
    inputRef,
    handleClickSecretArea,
    handlePasswordSubmit,
    handleSaveSettings,
    handleFolderSelect,
    handleToggleDotVisibility,
  };
}
