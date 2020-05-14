import * as vscode from "vscode";
import * as fs from "fs";
import { ScriptOptions } from "./ScriptOptions";
import { ExtensionSettings } from "./ExtensionSettings";
import { ExtensionService } from "../services/ExtensionService";

export class Script {
    public options: ScriptOptions = new ScriptOptions();
    public name: string = "";
    public path: string = "";
    public content: string = "";
    public hasOptions: boolean = false;

    private extensionService: ExtensionService = new ExtensionService();

    constructor(scriptName: string) {

        if (this.extensionService.getFullScriptDirectory() === "") {
            vscode.window.showErrorMessage("Live Coder: No workspace or folders currently open");
            return;
        }

        let scriptPath: string = `${this.extensionService.getFullScriptDirectory()}/${scriptName}`;
        let fullContent: string = fs.readFileSync(scriptPath, { encoding: "utf-8" });
        let contentParts: string[] = fullContent.split(/\n\-\-\-\n/m);

        try {

            if (contentParts.length === 1) {
                this.hasOptions = false;
                this.content = contentParts[0];
            } else {
                this.hasOptions = true;
                this.options.parse(contentParts[0]);
                this.content = contentParts[1];
            }

            this.name = scriptName;
            this.path = scriptPath;
        }
        catch (e) {
            vscode.window.showErrorMessage(`Live Coder: Error ${e} while trying to parse options in script ${scriptPath}`);
            return;
        }

        if (this.options.file !== "" && !fs.existsSync(this.options.file) && !fs.existsSync(`${this.extensionService.getFullScriptDirectory()}/../${this.options.file}`)) {
            vscode.window.showErrorMessage(`Live Coder: Can"t find target file ${this.options.file}`);
            return;
        }
    }

    public play = async () => {

        let ws = vscode.workspace;

        if (ws === undefined) {
            vscode.window.showErrorMessage("Live Coder: No workspace or folders currently open");
            return;
        }

        if (this.hasOptions && this.options.file !== "") {
            let filePath: string = (this.options.file.indexOf("/") === 0) ? this.options.file :
                `${this.extensionService.getFullScriptDirectory()}/${this.options.file}`;

            const textDoc: vscode.TextDocument = await ws.openTextDocument(filePath);
            vscode.window.showTextDocument(textDoc, { preview: false });

            let docs = ws.textDocuments;
            let activeDoc: vscode.TextDocument | undefined = docs.find((textDoc: vscode.TextDocument) => { return textDoc.fileName.indexOf(this.options.file) > -1; });

            if (activeDoc === undefined) {
                return;
            }

            vscode.window.showTextDocument(activeDoc).then(() => {
                let editor = vscode.window.activeTextEditor;

                if (!activeDoc || activeDoc === undefined || !editor || editor === undefined) {
                    return;
                }

                this.type(this.content, this.getPosition(editor, activeDoc));
            });
        } else {
            let editor = vscode.window.activeTextEditor;

            if (!editor || editor === undefined) {
                return;
            }

            let activeDoc: vscode.TextDocument = editor.document;

            if (!activeDoc || activeDoc === undefined) {
                return;
            }

            await this.type(this.content, this.getPosition(editor, activeDoc));
        }
    };

    private getPosition = (editor: vscode.TextEditor, document: vscode.TextDocument): vscode.Position => {

        let position: vscode.Position;

        if (this.hasOptions) {
            let line = this.options.line;
            let col = this.options.col;

            if (line === -1) {
                line = editor.selection.active.line;
            }

            if (col === -1) {
                col = editor.selection.active.character;
            }

            let range = document.lineAt(line).range;
            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range, this.options.getTextEditorRevealType());
            position = new vscode.Position(line, col);

        } else {
            position = editor.selection.active;
        }

        return position;

    };

    private type = async (text: string, position: vscode.Position): Promise<void> => {

        if (!text) {
            return;
        }

        if (text.length === 0) {
            return;
        }

        let editor = vscode.window.activeTextEditor;

        if (editor === undefined) {
            return;
        }

        let pos: vscode.Position = position;
        let char: string = text.substring(0, 1);

        if (char === "↓") {
            pos = new vscode.Position(pos.line + 1, pos.character);
            char = "";
        }

        if (char === "↑") {
            pos = new vscode.Position(pos.line - 1, pos.character);
            char = "";
        }

        if (char === "→") {
            pos = new vscode.Position(pos.line, pos.character + 1);
            char = "";
        }

        if (char === "←") {
            pos = new vscode.Position(pos.line, pos.character - 1);
            char = "";
        }

        if (char === "⇤") {
            pos = new vscode.Position(pos.line, 0);
            char = "";
        }

        if (char === "⇥") {
            pos = editor.document.lineAt(pos.line).range.end;
            char = "";
        }

        await editor.edit((editBuilder: vscode.TextEditorEdit) => {

            if (char !== "⌫") {
                editBuilder.insert(pos, char);
            }
            else {
                pos = new vscode.Position(pos.line, pos.character - 1);
                let selection = new vscode.Selection(pos, pos);
                editBuilder.delete(selection);
                char = "";
            }

            let newSelection: vscode.Selection = new vscode.Selection(pos, pos);

            if (char === "\n") {
                newSelection = new vscode.Selection(pos, pos);
                pos = new vscode.Position(pos.line + 1, 0);
                char = "";
            }

            if (editor !== undefined) {
                editor.selection = newSelection;
            }
        });

        let extensionSettings: ExtensionSettings = new ExtensionSettings();
        let typingDelay: number = extensionSettings.typingDelay;
        let nextPosition = new vscode.Position(pos.line, char.length + pos.character);

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