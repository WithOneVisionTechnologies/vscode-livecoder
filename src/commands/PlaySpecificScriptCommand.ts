import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { ParsedScript } from "../models/ParsedScript";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class PlaySpecificScriptCommand {

    public setup = async (context: vscode.ExtensionContext) => {

        let playSpecificScript = vscode.commands.registerCommand(ExtensionConstants.Command_PlaySpecificScript, async () => {

            let extensionService: ExtensionService = new ExtensionService();

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter File Name to Play" });

            if (inputBox === undefined || inputBox === "") {
                vscode.window.showErrorMessage("You must input a file name of the script to play");
                return;
            }

            let scripts: ParsedScript[] = [];

            try {
                scripts = extensionService.loadScripts();
            }
            catch (e) {
                vscode.window.showErrorMessage(`Error ${e} while trying to load scripts`);
                return;
            }

            let foundScripts: ParsedScript[] = scripts.filter((script) => script.name === inputBox);

            if (foundScripts.length === 0) {
                vscode.window.showErrorMessage(`No script was found in your script directory with the name ${inputBox}`);
            }

            if (foundScripts.length > 1) {
                vscode.window.showErrorMessage(`More than one script was found with the name ${inputBox}`);
            }

            try {
                await foundScripts[0].play();
            } catch (e) {
                vscode.window.showErrorMessage(`Error ${e} while trying to play script ${foundScripts[0].name}`);
            }
        });

        context.subscriptions.push(playSpecificScript);
    };
}