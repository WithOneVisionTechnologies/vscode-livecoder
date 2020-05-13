import * as vscode from "vscode";
import ExtensionStore from "../stores/ExtensionStore";
import { ParsedScript } from "../models/ParsedScript";

export class PlayRemainingScriptsCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playRemainingScripts = vscode.commands.registerCommand("livecoder.playRemainingScripts", async () => {
    
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
                if (currentScriptNumber >= ExtensionStore.currentScriptNumber) {
                    await ExtensionStore.playScript(script);
                }

                currentScriptNumber++;
            }

            ExtensionStore.currentScriptNumber = 0;
        });
    
        context.subscriptions.push(playRemainingScripts);
    };
}