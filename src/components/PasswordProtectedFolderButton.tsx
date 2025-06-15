
import { usePasswordProtectedFolder } from "./password-protected-folder/usePasswordProtectedFolder";
import PasswordProtectedFolderContents from "./password-protected-folder/PasswordProtectedFolderContents";

interface PasswordProtectedFolderButtonProps {
  onFolderSelect: (files: FileList) => void;
}

export const PasswordProtectedFolderButton = ({
  onFolderSelect,
}: PasswordProtectedFolderButtonProps) => {
  const hook = usePasswordProtectedFolder(onFolderSelect);

  return (
    <PasswordProtectedFolderContents
      isUnlocked={hook.isUnlocked}
      dotVisible={hook.dotVisible}
      handleClickSecretArea={hook.handleClickSecretArea}
      showPasswordPrompt={hook.showPasswordPrompt}
      inputPwd={hook.inputPwd}
      setInputPwd={hook.setInputPwd}
      handlePasswordSubmit={hook.handlePasswordSubmit}
      showError={hook.showError}
      inputRef={hook.inputRef}
      folderPath={hook.folderPath}
      handleFolderSelect={hook.handleFolderSelect}
      setSettingsMode={hook.setSettingsMode}
      settingsMode={hook.settingsMode}
      handleToggleDotVisibility={hook.handleToggleDotVisibility}
      newFolderPath={hook.newFolderPath}
      setNewFolderPath={hook.setNewFolderPath}
      newPassword={hook.newPassword}
      setNewPassword={hook.setNewPassword}
      handleSaveSettings={hook.handleSaveSettings}
      onFolderSelect={onFolderSelect}
    />
  );
};
