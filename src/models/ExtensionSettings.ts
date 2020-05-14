import * as vscode from "vscode";
import { ExtensionConstants } from "./ExtensionConstants";

export class ExtensionSettings {

    get currentQueuePosition(): number {
        let currentQueuePositionSetting: number | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<number>(ExtensionConstants.Setting_CurrentQueuePosition);

        if (currentQueuePositionSetting === undefined) {
            return 0;
        } else {
            return currentQueuePositionSetting - 1;
        }
    }

    get scriptDirectory(): string {
        let scriptDirectorySetting: string | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<string>(ExtensionConstants.Setting_ScriptDirectory);

        if (scriptDirectorySetting === undefined) {
            return "/.liveCoder";
        } else {
            return scriptDirectorySetting;
        }
    }

    get typingDelay(): number {
        let typingDelaySetting: number | undefined = vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).get<number>(ExtensionConstants.Setting_TypingDelay);

        if (typingDelaySetting === undefined) {
            return 250;
        } else {
            return typingDelaySetting;
        }
    }

    public incrementCurrentQueuePosition = async () => {
        await this.setCurrentQueuePosition(this.currentQueuePosition + 1);
    };

    public resetCurrentQueuePosition = async () => {
        await this.setCurrentQueuePosition(0);
    };

    public setCurrentQueuePosition = async (queueNumber: number) => {
        await vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).update(ExtensionConstants.Setting_CurrentQueuePosition, queueNumber + 1);
    };

    public setScriptDirectory = async (scriptDirectory: string) => {
        await vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).update(ExtensionConstants.Setting_ScriptDirectory, scriptDirectory);
    };

    public setTypingDelay = async (typingDelay: number) => {
        await vscode.workspace.getConfiguration(ExtensionConstants.Setting_ConfigurationSection).update(ExtensionConstants.Setting_TypingDelay, typingDelay);
    };
}