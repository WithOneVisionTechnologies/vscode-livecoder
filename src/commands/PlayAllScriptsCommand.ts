import * as vscode from "vscode";
import { ExtensionService } from "../services/ExtensionService";
import { ParsedScript } from "../models/ParsedScript";
import { ExtensionSettings } from "../models/ExtensionSettings";
import { ExtensionConstants } from "../models/ExtensionConstants";

export class PlayAllScriptsCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let playAllScripts = vscode.commands.registerCommand(ExtensionConstants.Command_PlayAllScripts, async () => {
    
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
    
            await extensionSettings.resetCurrentQueuePosition();
            
            for (let script of scripts) {
                try {
                    await script.play();
                } catch (e) {
                    vscode.window.showErrorMessage(`Error ${e} while trying to play script ${script.name}`);
                }
            }
        });
    
        context.subscriptions.push(playAllScripts);
    };
}