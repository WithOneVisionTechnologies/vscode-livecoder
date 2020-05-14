import * as vscode from "vscode";

enum ScriptOptionsAlign {
    middle = "middle",
    top = "top"
}

export class ScriptOptions {
    public file: string = "";
    public line: number = 0;
    public col: number = 0;
    public align: ScriptOptionsAlign = ScriptOptionsAlign.middle;

    public parse = (text: string) => {

        let builder: any = text.split("\n")
            .reduce((accumulator: any, item: string) => {
                let parts = item.split(/\s*:\s*/);
                accumulator[parts[0]] = parts[1];
                return accumulator;
            }, {});

        if (!builder.file) {
            builder.file = "";
        }

        if (!builder.line) {
            builder.line = 1;
        }

        if (!builder.col) {
            builder.col = 1;
        }

        builder.line = builder.line - 1;
        builder.col = builder.col - 1;

        if (!builder.align) {
            builder.align = ScriptOptionsAlign.middle;
        }

        this.file = builder.file;
        this.line = builder.line;
        this.col = builder.col;
        this.align = builder.align;
    };

    public getTextEditorRevealType = (): vscode.TextEditorRevealType => {
        switch (this.align) {
            case ScriptOptionsAlign.middle:
                return vscode.TextEditorRevealType.InCenterIfOutsideViewport;
            case ScriptOptionsAlign.top:
                return vscode.TextEditorRevealType.AtTop;
        }
    };
}