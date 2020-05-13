import * as vscode from "vscode";
import ExtensionStore from "../stores/ExtensionStore";
import { ParsedScript } from "../models/ParsedScript";

export class PlayAllScriptsCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playAllScripts = vscode.commands.registerCommand("livecoder.playAllScripts", async () => {
    
            let scripts: ParsedScript[] = [];
    
            try {
                scripts = ExtensionStore.loadScripts();
            }
            catch (e) {
                vscode.window.showErrorMessage(`Error ${e} while trying to load scripts`);
                return;
            }
    
            for (let script of scripts) {
                await ExtensionStore.playScript(script);
            }
    
            ExtensionStore.currentScriptNumber = 0;
        });
    
        context.subscriptions.push(playAllScripts);
    };
}