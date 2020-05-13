import * as vscode from "vscode";
import ExtensionStore from "../stores/ExtensionStore";
import { ParsedScript } from "../models/ParsedScript";

export class PlayNextNScriptsCommand {

    public setup = async (context: vscode.ExtensionContext) => {

        let playNextNScripts = vscode.commands.registerCommand("livecoder.playNextNScripts", async () => {

            let inputBox: string | undefined = await vscode.window.showInputBox({ placeHolder: "Enter Number of Scripts to Play" });

            if (inputBox === undefined) {
                vscode.window.showErrorMessage("You must input a valid positive number for the number of scripts to play");
                return;
            }

            let numberOfScripts: number = 0;

            try {
                numberOfScripts = +inputBox;
            } catch {
                vscode.window.showErrorMessage("You must input a valid positive number for the number of scripts to play");
            }

            if (numberOfScripts <= 0) {
                vscode.window.showErrorMessage("You must input a valid positive number for the number of scripts to play");
            }

            let scripts: ParsedScript[] = [];

            try {
                scripts = ExtensionStore.loadScripts();
            }
            catch (e) {
                vscode.window.showErrorMessage(`Error ${e} while trying to load scripts`);
                return;
            }

            if (ExtensionStore.currentScriptNumber >= scripts.length) {
                vscode.window.showInformationMessage("No more scripts");
                return;
            }

            let currentScriptNumber: number = 0;

            for (let script of scripts) {
                if (currentScriptNumber >= ExtensionStore.currentScriptNumber && currentScriptNumber < (ExtensionStore.currentScriptNumber + numberOfScripts)) {
                    await ExtensionStore.playScript(script);
                }

                currentScriptNumber++;
            }

            ExtensionStore.currentScriptNumber = ExtensionStore.currentScriptNumber + numberOfScripts;
        });

        context.subscriptions.push(playNextNScripts);
    };
}