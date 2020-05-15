import * as vscode from "vscode";
import * as fs from "fs";
import { ExtensionSettings } from "./ExtensionSettings";
import { ExtensionService } from "../services/ExtensionService";

export class Script {
    public name: string = "";
    public path: string = "";
    public content: string = "";

    private extensionService: ExtensionService = new ExtensionService();

    constructor(scriptName: string) {

        if (this.extensionService.getFullScriptDirectory() === "") {
            vscode.window.showErrorMessage("Live Coder: No workspace or folders currently open");
            return;
        }

        try {
            this.name = scriptName;
            this.path = `${this.extensionService.getFullScriptDirectory()}${this.extensionService.getOsSpecificFileSlash()}${scriptName}`;
            this.content = fs.readFileSync(this.path, { encoding: "utf-8" });
        }
        catch (e) {
            vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to parse the script ${scriptName}`);
            return;
        }
    }

    public play = async () => {

        let ws = vscode.workspace;

        if (ws === undefined) {
            vscode.window.showErrorMessage("Live Coder: No workspace or folders currently open");
            return;
        }

        let editor = vscode.window.activeTextEditor;

        if (!editor || editor === undefined) {
            vscode.window.showErrorMessage("Live Coder: No active text editor open");
            return;
        }

        if (!this.content || this.content.length === 0) {
            vscode.window.showErrorMessage("Live Coder: No content found inside of script");
        }

        await this.type(this.content, editor.selection.active);
    };

    private type = async (text: string, position: vscode.Position): Promise<void> => {

        let editor = vscode.window.activeTextEditor;

        if (!editor || editor === undefined) {
            vscode.window.showErrorMessage("Live Coder: No active text editor open");
            return;
        }

        let character: string = text.substring(0, 1);

        await editor.edit((editBuilder: vscode.TextEditorEdit) => {

            editBuilder.insert(position, character);

            let newSelection: vscode.Selection = new vscode.Selection(position, position);

            if (character === "\n") {
                newSelection = new vscode.Selection(position, position);
                position = new vscode.Position(position.line + 1, 0);
                character = "";
            }

            if (editor !== undefined) {
                editor.selection = newSelection;
            }
        });

        let extensionSettings: ExtensionSettings = new ExtensionSettings();
        let typingDelay: number = extensionSettings.typingDelay;
        let nextPosition = new vscode.Position(position.line, character.length + position.character);

        if (text.substring(1, text.length) !== "") {
            this.sleep(typingDelay);
            await this.type(text.substring(1, text.length), nextPosition);
        }
    };

    private sleep = (milliseconds: number) => {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    };
}