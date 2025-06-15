
import { usePasswordProtectedFolder } from "./password-protected-folder/usePasswordProtectedFolder";
import SecretDot from "./password-protected-folder/SecretDot";
import PasswordPromptDialog from "./password-protected-folder/PasswordPromptDialog";
import FolderUnlockedPanel from "./password-protected-folder/FolderUnlockedPanel";

interface PasswordProtectedFolderButtonProps {
  onFolderSelect: (files: FileList) => void;
}

export const PasswordProtectedFolderButton = ({
  onFolderSelect,
}: PasswordProtectedFolderButtonProps) => {
  const hook = usePasswordProtectedFolder(onFolderSelect);

  return (
    <>
      <SecretDot
        isUnlocked={hook.isUnlocked}
        dotVisible={hook.dotVisible}
        handleClickSecretArea={hook.handleClickSecretArea}
      />
      <PasswordPromptDialog
        showPasswordPrompt={hook.showPasswordPrompt}
        isUnlocked={hook.isUnlocked}
        inputPwd={hook.inputPwd}
        setInputPwd={hook.setInputPwd}
        handlePasswordSubmit={hook.handlePasswordSubmit}
        showError={hook.showError}
        inputRef={hook.inputRef}
      />
      <FolderUnlockedPanel
        folderPath={hook.folderPath}
        handleFolderSelect={hook.handleFolderSelect}
        isUnlocked={hook.isUnlocked}
        setSettingsMode={hook.setSettingsMode}
        settingsMode={hook.settingsMode}
        dotVisible={hook.dotVisible}
        handleToggleDotVisibility={hook.handleToggleDotVisibility}
        newFolderPath={hook.newFolderPath}
        setNewFolderPath={hook.setNewFolderPath}
        newPassword={hook.newPassword}
        setNewPassword={hook.setNewPassword}
        handleSaveSettings={hook.handleSaveSettings}
      />
    </>
  );
};
