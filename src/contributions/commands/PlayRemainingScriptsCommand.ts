import * as vscode from "vscode";
import { ExtensionService } from "../../services/ExtensionService";
import { Script } from "../../models/Script";
import { ExtensionSettings } from "../../models/ExtensionSettings";
import { ExtensionConstants } from "../../models/ExtensionConstants";

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

            let currentQueuePosition: number = extensionSettings.currentQueuePosition;

            for (let i = 0; i < scripts.length; i++) {
                if (i >= currentQueuePosition) {
                    try {
                        await scripts[0].play();
                        await extensionSettings.incrementCurrentQueuePosition();
                    } catch (e) {
                        vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to play script ${scripts[0].name}`);
                    }

                }
            }

            await extensionSettings.resetCurrentQueuePosition();
        });
    
        context.subscriptions.push(playRemainingScripts);
    };
}