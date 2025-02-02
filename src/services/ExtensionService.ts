import * as vscode from "vscode";
import * as fs from "fs";
import { Script } from "../models/Script";
import { ExtensionSettings } from "../models/ExtensionSettings";

export class ExtensionService {

    public getFullScriptDirectory = (): string => {

        let extensionSettings: ExtensionSettings = new ExtensionSettings();
        let rootDirectory: string = this.getRootDirectory();
        let scriptDirectory: string = `${this.getRootDirectory()}${extensionSettings.scriptDirectory}`;

        if (rootDirectory.includes("/")) {
            return scriptDirectory = scriptDirectory.replace(/\\/g, '/');
        }
        
        if (rootDirectory.includes("\\")) {
            return scriptDirectory = scriptDirectory.replace(/\//g, '\\');
        }

        return scriptDirectory;
    };

    public getOsSpecificFileSlash = (): string => {
        let rootDirectory: string = this.getRootDirectory();

        if (rootDirectory.includes("/")) {
            return "/";
        }
        
        if (rootDirectory.includes("\\")) {
            return "\\";
        }

        return "/";
    };

    public getRootDirectory = (): string => {

        let ws = vscode.workspace;
        let rootDirectory: string = "";

        if (ws !== undefined && ws.workspaceFolders !== undefined && ws.workspaceFolders.length > 0) {
            rootDirectory = ws.workspaceFolders[0].uri.fsPath;
        } else {
            vscode.window.showErrorMessage("Live Coder: No workspace or folders currently open");
            return "";
        }

        return rootDirectory;
    };

    public loadScripts = (): Script[] => {

        if (this.getFullScriptDirectory() === "") {
            return [];
        }

        if (!fs.existsSync(this.getFullScriptDirectory())) {
            vscode.window.showErrorMessage(`Live Coder: The script directory ${this.getFullScriptDirectory()} does not exist in this workspace`);
            return [];
        }

        let scripts: string[] = fs.readdirSync(this.getFullScriptDirectory());

        if (!scripts.length) {
            vscode.window.showWarningMessage(`Live Coder: No scripts found in ${this.getFullScriptDirectory()}`);
            return [];
        }

        return scripts.map((scriptName) => {
            return new Script(scriptName);
        });
    };

}