import * as vscode from "vscode";
import { ExtensionSettings } from "../../models/ExtensionSettings";
import { ExtensionConstants } from "../../models/ExtensionConstants";

export class SetTypingDelayCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let typingDelay = vscode.commands.registerCommand(ExtensionConstants.Command_SetTypingDelay, async () => {
            let extensionSettings: ExtensionSettings = new ExtensionSettings();

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter Typing Delay (in milliseconds)" });
            
            if (inputBox === undefined) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the typing delay");
                return;
            }

            let typingDelay: number = 0;

            try {
                typingDelay = +inputBox;
            } catch {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the typing delay");
                return;
            }

            if (typingDelay <= 0) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the typing delay");
                return;
            }
            
            await extensionSettings.setTypingDelay(typingDelay);
        });

        context.subscriptions.push(typingDelay);
    };
}