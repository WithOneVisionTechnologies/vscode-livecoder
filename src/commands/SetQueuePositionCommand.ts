import * as vscode from "vscode";
import { ExtensionSettings } from "../models/ExtensionSettings";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class SetQueuePositionCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let setQueuePosition = vscode.commands.registerCommand(ExtensionConstants.Command_SetQueuePosition, async () => {
            let extensionSettings: ExtensionSettings = new ExtensionSettings();

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter Position of Queue (1 for Beginning)" });
            
            if (inputBox === undefined) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the queue position");
                return;
            }

            let queuePosition: number = 0;

            try {
                queuePosition = +inputBox;
            } catch {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the queue position");
                return;
            }

            if (queuePosition <= 0) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the queue position");
                return;
            }
            
            await extensionSettings.setCurrentQueuePosition(queuePosition);
        });

        context.subscriptions.push(setQueuePosition);
    };
}