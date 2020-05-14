import * as vscode from "vscode";
import { ExtensionSettings } from "../../models/ExtensionSettings";

export class CurrentQueuePositionStatusBar {

    private currentQueueNumberStatusBar: vscode.StatusBarItem;
    private static instance: CurrentQueuePositionStatusBar;

    private constructor() {
        this.currentQueueNumberStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    }

    public static getInstance(): CurrentQueuePositionStatusBar {
        if (!CurrentQueuePositionStatusBar.instance) {
            CurrentQueuePositionStatusBar.instance = new CurrentQueuePositionStatusBar();
        }

        return CurrentQueuePositionStatusBar.instance;
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