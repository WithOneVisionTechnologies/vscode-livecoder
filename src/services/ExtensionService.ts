import * as vscode from "vscode";
import * as fs from "fs";
import { ParsedScript } from "../models/ParsedScript";
import { ExtensionSettings } from "../models/ExtensionSettings";

export class ExtensionService {

    public getFullScriptDirectory = (): string => {

        let extensionSettings: ExtensionSettings = new ExtensionSettings();

        let ws = vscode.workspace;
        let rootDirectory: string = "";

        if (ws !== undefined && ws.workspaceFolders !== undefined && ws.workspaceFolders.length > 0) {
            rootDirectory = ws.workspaceFolders[0].uri.fsPath;
        } else {
            vscode.window.showErrorMessage("No workspace or folders currently open");
            throw new Error("No workspace or folders currently open");
        }

        return `${rootDirectory}${extensionSettings.scriptDirectory}`;
    };

    public loadScripts = (): ParsedScript[] => {

        if (!fs.existsSync(this.getFullScriptDirectory())) {
            vscode.window.showErrorMessage(`The script directory ${this.getFullScriptDirectory()} does not exist in this workspace`);
            return [];
        }

        let scripts: string[] = fs.readdirSync(this.getFullScriptDirectory());

        if (!scripts.length) {
            vscode.window.showWarningMessage(`No scripts found in ${this.getFullScriptDirectory()}`);
            return [];
        }

        return scripts.map((scriptName) => {
            return new ParsedScript(scriptName);
        });
    };

}