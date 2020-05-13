import * as vscode from "vscode";

export enum ScriptOptionsAlign {
    middle = "middle",
    top = "top"
}

export class ScriptOptions {
    public file: string;
    public line: number;
    public col: number;
    public align: ScriptOptionsAlign;

    constructor(file: string = "", line: number = 1, col: number = 1, align: ScriptOptionsAlign = ScriptOptionsAlign.middle) {
        this.file = file;
        this.line = line;
        this.col = col;
        this.align = align;
    }

    public getTextEditorRevealType = (): vscode.TextEditorRevealType => {
        switch (this.align) {
            case ScriptOptionsAlign.middle:
                return vscode.TextEditorRevealType.InCenterIfOutsideViewport;
            case ScriptOptionsAlign.top:
                return vscode.TextEditorRevealType.AtTop;
        }
    };
}