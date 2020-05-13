import * as vscode from "vscode";
import ExtensionStore from "../stores/ExtensionStore";

export class ResetScriptQueueCommand {

    public setup = async (context: vscode.ExtensionContext) => {
        
        let resetScriptQueue = vscode.commands.registerCommand("livecoder.resetScriptQueue", () => {
            ExtensionStore.currentScriptNumber = 0;
        });

        context.subscriptions.push(resetScriptQueue);
    };
}