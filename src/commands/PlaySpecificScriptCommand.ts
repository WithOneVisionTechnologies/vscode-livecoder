import * as vscode from "vscode";
import ExtensionStore from "../stores/ExtensionStore";
import { ParsedScript } from "../models/ParsedScript";

export class PlaySpecificScriptCommand {

    public setup = async (context: vscode.ExtensionContext) => {

        let playSpecificScript = vscode.commands.registerCommand("livecoder.playSpecificScript", async () => {

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter File Name to Play" });

            if (inputBox === undefined || inputBox === "") {
                vscode.window.showErrorMessage("You must input a file name of the script to play");
                return;
            }

            let scripts: ParsedScript[] = [];

            try {
                scripts = ExtensionStore.loadScripts();
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

            await ExtensionStore.playScript(foundScripts[0]);
        });

        context.subscriptions.push(playSpecificScript);
    };
}