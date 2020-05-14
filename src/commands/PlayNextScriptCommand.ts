import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { ParsedScript } from "../models/ParsedScript";
import { ExtensionSettings } from "../models/ExtensionSettings";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class PlayNextScriptCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playNextScript = vscode.commands.registerCommand(ExtensionConstants.Command_PlayNextScript, async () => {
    
            let extensionService: ExtensionService = new ExtensionService();
            let extensionSettings: ExtensionSettings = new ExtensionSettings();
            let scripts: ParsedScript[] = [];
    
            try {
                scripts = extensionService.loadScripts();
            }
            catch (e) {
                vscode.window.showErrorMessage(`Error ${e} while trying to load scripts`);
                return;
            }
    
            if (extensionSettings.currentQueuePosition >= scripts.length) {
                vscode.window.showInformationMessage("No more scripts");
                return;
            }
    
            let script: ParsedScript = scripts[extensionSettings.currentQueuePosition];
            await extensionSettings.incrementCurrentQueuePosition();
            
            try {
                await script.play();
            } catch (e) {
                vscode.window.showErrorMessage(`Error ${e} while trying to play script ${script.name}`);
            }

        });
    
        context.subscriptions.push(playNextScript);
    };
}