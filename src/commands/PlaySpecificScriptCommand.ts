import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { Script } from "../models/Script";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class PlaySpecificScriptCommand {

    public setup = async (context: vscode.ExtensionContext) => {

        let playSpecificScript = vscode.commands.registerCommand(ExtensionConstants.Command_PlaySpecificScript, async () => {

            let extensionService: ExtensionService = new ExtensionService();

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter File Name to Play" });

            if (inputBox === undefined || inputBox === "") {
                vscode.window.showErrorMessage("Live Coder: You must input a file name of the script to play");
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

            let foundScripts: Script[] = scripts.filter((script) => script.name === inputBox);

            if (foundScripts.length === 0) {
                vscode.window.showErrorMessage(`Live Coder: No script was found in your script directory with the name ${inputBox}`);
                return;
            }

            if (foundScripts.length > 1) {
                vscode.window.showErrorMessage(`Live Coder: More than one script was found with the name ${inputBox}`);
                return;
            }

            try {
                await foundScripts[0].play();
            } catch (e) {
                vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to play script ${foundScripts[0].name}`);
            }
        });

        context.subscriptions.push(playSpecificScript);
    };
}