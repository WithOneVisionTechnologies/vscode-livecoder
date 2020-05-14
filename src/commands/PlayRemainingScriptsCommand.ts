import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { Script } from "../models/Script";
import { ExtensionSettings } from "../models/ExtensionSettings";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class PlayRemainingScriptsCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playRemainingScripts = vscode.commands.registerCommand(ExtensionConstants.Command_PlayRemainingScripts, async () => {
    
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


            await extensionSettings.resetCurrentQueuePosition();
            
            let currentScriptNumber: number = 0;

            for (let script of scripts) {
                if (currentScriptNumber >= extensionSettings.currentQueuePosition) {
                    try {
                        await script.play();
                    } catch (e) {
                        vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to play script ${script.name}`);
                    }

                }

                currentScriptNumber++;
            }
        });
    
        context.subscriptions.push(playRemainingScripts);
    };
}