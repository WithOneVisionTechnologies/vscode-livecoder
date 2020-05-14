import * as vscode from "vscode";
import { ExtensionService } from "../../services/ExtensionService";
import { Script } from "../../models/Script";
import { ExtensionSettings } from "../../models/ExtensionSettings";
import { ExtensionConstants } from "../../models/ExtensionConstants";

export class PlayNextNScriptsCommand {

    public setup = async (context: vscode.ExtensionContext) => {

        let playNextNScripts = vscode.commands.registerCommand(ExtensionConstants.Command_PlayNextNScripts, async () => {

            let extensionService: ExtensionService = new ExtensionService();
            let extensionSettings: ExtensionSettings = new ExtensionSettings();

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter Number of Scripts to Play" });

            if (inputBox === undefined) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the number of scripts to play");
                return;
            }

            let numberOfScripts: number = 0;

            try {
                numberOfScripts = +inputBox;
            } catch {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the number of scripts to play");
                return;
            }

            if (numberOfScripts <= 0) {
                vscode.window.showErrorMessage("Live Coder: You must input a valid positive number for the number of scripts to play");
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

            if (extensionSettings.currentQueuePosition >= scripts.length) {
                vscode.window.showInformationMessage("Live Coder: No more scripts to play");
                return;
            }

            let currentQueuePosition: number = extensionSettings.currentQueuePosition;

            for (let i = 0; i < scripts.length; i++) {
                if (i >= currentQueuePosition && i <= (currentQueuePosition + (numberOfScripts - 1))) {
                    try {
                        await scripts[i].play();
                        await extensionSettings.incrementCurrentQueuePosition();
                    } catch (e) {
                        vscode.window.showErrorMessage(`Error ${e} while trying to play script ${scripts[i].name}`);
                    }
                }
            }
        });

        context.subscriptions.push(playNextNScripts);
    };
}