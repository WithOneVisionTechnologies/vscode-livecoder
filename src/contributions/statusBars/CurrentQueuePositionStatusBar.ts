import * as vscode from "vscode";
import { ExtensionSettings } from "../../models/ExtensionSettings";

export class CurrentQueuePositionStatusBar {

    public currentQueueNumberStatusBar: vscode.StatusBarItem;

    constructor() {
        this.currentQueueNumberStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
    }
    
    public setup = async (context: vscode.ExtensionContext) => {
                
        context.subscriptions.push(this.currentQueueNumberStatusBar);
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.updateStatusBarItem));
        context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(this.updateStatusBarItem));

        this.updateStatusBarItem();
    };

    public updateStatusBarItem = (): void => {
        let extensionSettings: ExtensionSettings = new ExtensionSettings();
        this.currentQueueNumberStatusBar.text = extensionSettings.getCurrentQueuePositionStatusBarText();
        this.currentQueueNumberStatusBar.show();
    };
}