import { ScriptOptions } from "./ScriptOptions";

export class ParsedScript {
    public options: ScriptOptions = new ScriptOptions();
    public name: string = "";
    public path: string = "";
    public content: string = "";
}