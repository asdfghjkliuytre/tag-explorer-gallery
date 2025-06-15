
import React from "react";
import SecretDot from "./SecretDot";
import PasswordPromptDialog from "./PasswordPromptDialog";
import FolderUnlockedPanel from "./FolderUnlockedPanel";

interface PasswordProtectedFolderContentsProps {
  isUnlocked: boolean;
  dotVisible: boolean;
  handleClickSecretArea: () => void;

  showPasswordPrompt: boolean;
  inputPwd: string;
  setInputPwd: (v: string) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  showError: boolean;
  inputRef: React.RefObject<HTMLInputElement>;

  folderPath: string;
  handleFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSettingsMode: (b: boolean) => void;
  settingsMode: boolean;
  handleToggleDotVisibility: () => void;
  newFolderPath: string;
  setNewFolderPath: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  handleSaveSettings: (e: React.FormEvent) => void;
  onFolderSelect: (files: FileList) => void; // not passed, but matches the parent for extensibility
}

const PasswordProtectedFolderContents: React.FC<PasswordProtectedFolderContentsProps> = (props) => {
  return (
    <>
      <SecretDot
        isUnlocked={props.isUnlocked}
        dotVisible={props.dotVisible}
        handleClickSecretArea={props.handleClickSecretArea}
      />
      <PasswordPromptDialog
        showPasswordPrompt={props.showPasswordPrompt}
        isUnlocked={props.isUnlocked}
        inputPwd={props.inputPwd}
        setInputPwd={props.setInputPwd}
        handlePasswordSubmit={props.handlePasswordSubmit}
        showError={props.showError}
        inputRef={props.inputRef}
      />
      <FolderUnlockedPanel
        folderPath={props.folderPath}
        handleFolderSelect={props.handleFolderSelect}
        isUnlocked={props.isUnlocked}
        setSettingsMode={props.setSettingsMode}
        settingsMode={props.settingsMode}
        dotVisible={props.dotVisible}
        handleToggleDotVisibility={props.handleToggleDotVisibility}
        newFolderPath={props.newFolderPath}
        setNewFolderPath={props.setNewFolderPath}
        newPassword={props.newPassword}
        setNewPassword={props.setNewPassword}
        handleSaveSettings={props.handleSaveSettings}
      />
    </>
  );
};

export default PasswordProtectedFolderContents;
