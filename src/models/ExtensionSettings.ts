import * as vscode from "vscode";
import { ExtensionConstants } from "./ExtensionConstants";

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

    get randomizeTypingSpeed(): boolean {

        if (vscode.workspace.workspaceFolders === undefined) {
            return false;
        }

        let randomizeTypingSpeedSetting: boolean | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<boolean>(ExtensionConstants.Setting_RandomizeTypingSpeed);

        if (randomizeTypingSpeedSetting === undefined) {
            return false;
        } else {
            return randomizeTypingSpeedSetting;
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

    public incrementCurrentQueuePosition = async (): Promise<void> => {
        
        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }
        
        await this.setCurrentQueuePosition(this.currentQueuePosition + 1);
    };

    public resetCurrentQueuePosition = async (): Promise<void> => {

        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }

        await this.setCurrentQueuePosition(0);
    };

    public setCurrentQueuePosition = async (queueNumber: number): Promise<void> => {

        if (vscode.workspace.workspaceFolders === undefined) {
            return;
        }

        await vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).update(ExtensionConstants.Setting_CurrentQueuePosition, queueNumber + 1);
    };
}