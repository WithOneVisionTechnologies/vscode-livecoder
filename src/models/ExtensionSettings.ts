import * as vscode from "vscode";
import { ExtensionConstants } from "./ExtensionConstants";
import { CurrentQueuePositionStatusBar } from "../contributions/statusBars/CurrentQueuePositionStatusBar";

export class ExtensionSettings {

    get currentQueuePosition(): number {

        if (vscode.workspace.workspaceFolders === undefined) {
            return ExtensionConstants.Default_CurrentQueuePosition - 1;
        }

        let currentQueuePositionSetting: number | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<number>(ExtensionConstants.Setting_CurrentQueuePosition);

        if (currentQueuePositionSetting === undefined) {
            return ExtensionConstants.Default_CurrentQueuePosition - 1;
        } else {
            return currentQueuePositionSetting - 1;
        }
    }

    get scriptDirectory(): string {

        if (vscode.workspace.workspaceFolders === undefined) {
            return ExtensionConstants.Default_ScriptDirectory;
        }

        let scriptDirectorySetting: string | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<string>(ExtensionConstants.Setting_ScriptDirectory);

        if (scriptDirectorySetting === undefined) {
            return ExtensionConstants.Default_ScriptDirectory;
        } else {
            return scriptDirectorySetting;
        }
    }

    get typingDelay(): number {

        if (vscode.workspace.workspaceFolders === undefined) {
            return ExtensionConstants.Default_TypingDelay;
        }

        let typingDelaySetting: number | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<number>(ExtensionConstants.Setting_TypingDelay);

        if (typingDelaySetting === undefined) {
            return ExtensionConstants.Default_TypingDelay;
        } else {
            return typingDelaySetting;
        }
    }

    public getCurrentQueuePositionStatusBarText = (): string => {

        let preText: string = "Live Coder Current Queue Position: ";

        if (vscode.workspace.workspaceFolders === undefined) {
            return preText + ExtensionConstants.Default_CurrentQueuePosition;
        }

        let currentQueuePositionSetting: number | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<number>(ExtensionConstants.Setting_CurrentQueuePosition);

        if (currentQueuePositionSetting === undefined) {
            return preText + ExtensionConstants.Default_CurrentQueuePosition;
        } else {
            return preText + currentQueuePositionSetting;
        }

    };

    public incrementCurrentQueuePosition = async (): Promise<void> => {
        
        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }
        
        await this.setCurrentQueuePosition(this.currentQueuePosition + 1);

        const statusBar: CurrentQueuePositionStatusBar = CurrentQueuePositionStatusBar.getInstance();
        statusBar.updateStatusBarItem();
    };

    public resetCurrentQueuePosition = async (): Promise<void> => {

        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }

        await this.setCurrentQueuePosition(0);

        const statusBar: CurrentQueuePositionStatusBar = CurrentQueuePositionStatusBar.getInstance();
        statusBar.updateStatusBarItem();
    };

    public setCurrentQueuePosition = async (queueNumber: number): Promise<void> => {

        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }

        await vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).update(ExtensionConstants.Setting_CurrentQueuePosition, queueNumber + 1);

        const statusBar: CurrentQueuePositionStatusBar = CurrentQueuePositionStatusBar.getInstance();
        statusBar.updateStatusBarItem();
    };

    public setTypingDelay = async (typingDelay: number): Promise<void> => {

        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }

        await vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).update(ExtensionConstants.Setting_TypingDelay, typingDelay);
    };
}