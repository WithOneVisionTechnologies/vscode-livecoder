import * as vscode from "vscode";
import * as fs from "fs";
import { ScriptOptions, ScriptOptionsAlign } from "../models/ScriptOptions";
import { ParsedScript } from "../models/ParsedScript";

class ExtensionStore {
    public currentScriptNumber: number = 0;
    public scriptDirectorySetting: string = "";
    public typingDelaySetting: number = 250;

    private getScriptDirectory = (): string => {

        let ws = vscode.workspace;
        let rootDirectory: string = "";

        if (ws !== undefined && ws.workspaceFolders !== undefined && ws.workspaceFolders.length > 0) {
            rootDirectory = ws.workspaceFolders[0].uri.fsPath;
        } else {
            vscode.window.showErrorMessage("No workspace or folders currently open");
        }

        return `${rootDirectory}${this.scriptDirectorySetting}`;
    };

    public loadScripts = (): ParsedScript[] => {

        if (!fs.existsSync(this.getScriptDirectory())) {
            vscode.window.showErrorMessage(`The script directory ${this.getScriptDirectory()} does not exist in this workspace`);
            return [];
        }

        let scripts: string[] = fs.readdirSync(this.getScriptDirectory());

        if (!scripts.length) {
            vscode.window.showWarningMessage(`No scripts found in ${this.getScriptDirectory()}`);
            return [];
        }

        return scripts.map((scriptName) => {
            return this.parseScript(scriptName);
        });
    };

    private parseOptions = (text: string): ScriptOptions => {

        let options: ScriptOptions = text.split("\n")
            .reduce((accumulator: any, item: string) => {
                let parts = item.split(/\s*:\s*/);
                accumulator[parts[0]] = parts[1];
                return accumulator;
            }, {});

        if (!options.line) {
            options.line = 1;
        }

        if (!options.col) {
            options.col = 1;
        }

        options.line = options.line - 1;
        options.col = options.col - 1;

        if (!options.align) {
            options.align = ScriptOptionsAlign.middle;
        }

        return options;
    };

    private parseScript = (scriptName: string): ParsedScript => {

        let scriptPath: string = `${this.getScriptDirectory()}/${scriptName}`;
        let fullContent: string = fs.readFileSync(scriptPath, { encoding: "utf-8" });
        let contentParts: string[] = fullContent.split(/\n\-\-\-\n/m);

        let options: ScriptOptions = new ScriptOptions();
        let content: string = "";

        try {
            options = this.parseOptions(contentParts[0]);
            content = contentParts[1];
        }
        catch (e) {
            vscode.window.showErrorMessage(`Error ${e} while trying to parse options in script ${scriptPath}`);
        }

        let parsedScript: ParsedScript = new ParsedScript();
        parsedScript.options = options;

        parsedScript.name = scriptName;
        parsedScript.path = scriptPath;
        parsedScript.content = content;

        if (!parsedScript.options.file) {
            vscode.window.showErrorMessage(`Missing file property from options in script ${scriptPath}`);
        }

        if (!fs.existsSync(parsedScript.options.file) && !fs.existsSync(`${this.getScriptDirectory()}/../${parsedScript.options.file}`)) {
            vscode.window.showErrorMessage(`Can"t find target file ${parsedScript.options.file}`);
        }

        return parsedScript;
    };

    public playScript = async (script: ParsedScript) => {
        let editor = vscode.window.activeTextEditor;

        if (!editor || editor === undefined) {
            return;
        }

        let ws = vscode.workspace;

        if (ws === undefined) {
            vscode.window.showErrorMessage("No workspace or folders currently open");
        }

        let filePath: string = (script.options.file.indexOf("/") === 0) ? script.options.file :
            `${this.getScriptDirectory()}/${script.options.file}`;

        const textDoc: vscode.TextDocument = await ws.openTextDocument(filePath);
        vscode.window.showTextDocument(textDoc, { preview: false });

        let docs = ws.textDocuments;
        let changeDoc: vscode.TextDocument | undefined = docs.find((textDoc: vscode.TextDocument) => { return textDoc.fileName.indexOf(script.options.file) > -1; });

        if (changeDoc === undefined) {
            return;
        }

        vscode.window.showTextDocument(changeDoc).then(() => {
            if (!changeDoc || changeDoc === undefined || !editor || editor === undefined) {
                return;
            }

            let range = changeDoc.lineAt(script.options.line).range;
            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range, script.options.getTextEditorRevealType());

            let pos: vscode.Position = new vscode.Position(script.options.line, script.options.col);
            this.typeText(script.content, pos);
        });
    };

    private typeText = (text: string, position: vscode.Position) => {

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

        editor.edit((editBuilder: vscode.TextEditorEdit) => {

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
        }).then(() => {
            let nextPosition = new vscode.Position(pos.line, char.length + pos.character);
            setTimeout(() => { this.typeText(text.substring(1, text.length), nextPosition); }, this.typingDelaySetting);
        });
    };
}

export default new ExtensionStore();