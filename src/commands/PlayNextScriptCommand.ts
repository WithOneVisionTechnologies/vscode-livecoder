import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { Script } from "../models/Script";
import { ExtensionSettings } from "../models/ExtensionSettings";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class PlayNextScriptCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playNextScript = vscode.commands.registerCommand(ExtensionConstants.Command_PlayNextScript, async () => {
    
            let extensionService: ExtensionService = new ExtensionService();
            let extensionSettings: ExtensionSettings = new ExtensionSettings();
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
    
            let script: Script = scripts[extensionSettings.currentQueuePosition];
            
            try {
                await script.play();
                await extensionSettings.incrementCurrentQueuePosition();
            } catch (e) {
                vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to play script ${script.name}`);
            }

        });
    
        context.subscriptions.push(playNextScript);
    };
}