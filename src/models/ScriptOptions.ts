import * as vscode from "vscode";

enum ScriptOptionsAlign {
    middle = "middle",
    top = "top"
}

export class ScriptOptions {
    public file: string = "";
    public line: number = -1;
    public col: number = -1;
    public align: ScriptOptionsAlign = ScriptOptionsAlign.middle;

    public parse = (text: string) => {

        let builder: any = text.split("\n")
            .reduce((accumulator: any, item: string) => {
                let parts = item.split(/\s*:\s*/);
                accumulator[parts[0]] = parts[1];
                return accumulator;
            }, {});

        if (builder.file) {
            this.file = builder.file;
        }

        if (builder.line) {
            this.line = builder.line - 1;
        }

        if (builder.col) {
            this.col = builder.col - 1;
        }

        if (builder.align) {
            this.align = builder.align;
        }
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