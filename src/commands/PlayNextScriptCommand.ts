import * as vscode from "vscode";
import ExtensionStore from "../stores/ExtensionStore";
import { ParsedScript } from "../models/ParsedScript";

export class PlayNextScriptCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playNextScript = vscode.commands.registerCommand("livecoder.playNextScript", async () => {
    
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
    
            let script: ParsedScript = scripts[ExtensionStore.currentScriptNumber];
            ExtensionStore.currentScriptNumber += 1;
            
            await ExtensionStore.playScript(script);
        });
    
        context.subscriptions.push(playNextScript);
    };
}