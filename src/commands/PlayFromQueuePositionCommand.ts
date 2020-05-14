import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { Script } from "../models/Script";
import { ExtensionConstants } from "../models/ExtensionConstants";
import { ExtensionSettings } from "../models/ExtensionSettings";

export class PlayFromQueuePositionCommand {

    public setup = async (context: vscode.ExtensionContext) => {

        let playFromQueuePosition = vscode.commands.registerCommand(ExtensionConstants.Command_PlayFromQueuePosition, async () => {

            let extensionService: ExtensionService = new ExtensionService();
            let extensionSettings: ExtensionSettings = new ExtensionSettings();

            let beginningPositionInputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter the beginning queue position" });

            if (beginningPositionInputBox === undefined) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for beginning queue position");
                return;
            }

            let beginningPosition: number = 0;

            try {
                beginningPosition = +beginningPositionInputBox - 1;
            } catch {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for beginning queue position");
                return;
            }

            let endingPositionInputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter the ending queue position" });

            if (endingPositionInputBox === undefined) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for ending queue position");
                return;
            }

            let endingPosition: number = 0;

            try {
                endingPosition = +endingPosition - 1; 
            } catch {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for ending queue position");
                return;
            }

            let scripts: Script[] = [];

            try {
                scripts = extensionService.loadScripts();
            }
            catch (e) {
                vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to load scripts`);
                return;
            }

            if (scripts.length === 0) {
                vscode.window.showErrorMessage(`Live Coder: No scripts have been loaded`);
            }

            await extensionSettings.setCurrentQueuePosition(beginningPosition);

            for (let i = 0; i < scripts.length; i++) {      
                if (i >= (beginningPosition - 1) && i <= (endingPosition - 1)) {
                    try {
                        await scripts[i].play();
                        await extensionSettings.incrementCurrentQueuePosition();
                    } catch (e) {
                        vscode.window.showErrorMessage(`Error ${e} while trying to play script ${scripts[i].name}`);
                    }
                }
            }
        });

        context.subscriptions.push(playFromQueuePosition);
    };
}