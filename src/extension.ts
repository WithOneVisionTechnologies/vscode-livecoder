import * as vscode from "vscode";
import { SetQueuePositionCommand } from "./commands/SetQueuePositionCommand";
import { PlayNextScriptCommand } from "./commands/PlayNextScriptCommand";
import { PlayAllScriptsCommand } from "./commands/PlayAllScriptsCommand";
import { PlayRemainingScriptsCommand } from "./commands/PlayRemainingScriptsCommand";
import { PlayNextNScriptsCommand } from "./commands/PlayNextNScriptsCommand";
import { PlayFromQueuePositionCommand } from "./commands/PlayFromQueuePositionCommand";

export function activate(context: vscode.ExtensionContext) {

	let playAllScriptsCommand: PlayAllScriptsCommand = new PlayAllScriptsCommand();
	playAllScriptsCommand.setup(context);

	let playNextScriptCommand: PlayNextScriptCommand = new PlayNextScriptCommand();
	playNextScriptCommand.setup(context);

	let playNextNScriptsCommand: PlayNextNScriptsCommand = new PlayNextNScriptsCommand();
	playNextNScriptsCommand.setup(context);

	let playRemainingScriptsCommand: PlayRemainingScriptsCommand = new PlayRemainingScriptsCommand();
	playRemainingScriptsCommand.setup(context);

	let playFromQueuePositionCommand: PlayFromQueuePositionCommand = new PlayFromQueuePositionCommand();
	playFromQueuePositionCommand.setup(context);

	let setQueuePosition: SetQueuePositionCommand = new SetQueuePositionCommand();
	setQueuePosition.setup(context);

}

export function deactivate() { }
