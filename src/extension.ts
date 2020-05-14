import * as vscode from "vscode";
import { SetQueuePositionCommand } from "./commands/SetQueuePositionCommand";
import { PlayNextScriptCommand } from "./commands/PlayNextScriptCommand";
import { PlayAllScriptsCommand } from "./commands/PlayAllScriptsCommand";
import { PlayRemainingScriptsCommand } from "./commands/PlayRemainingScriptsCommand";
import { PlayNextNScriptsCommand } from "./commands/PlayNextNScriptsCommand";

// Activate function

export function activate(context: vscode.ExtensionContext) {

	/******************* COMMANDS *******************/

	//////// Play All Scripts
	let playAllScriptsCommand: PlayAllScriptsCommand = new PlayAllScriptsCommand();
	playAllScriptsCommand.setup(context);

	//////// Play Next Script
	let playNextScriptCommand: PlayNextScriptCommand = new PlayNextScriptCommand();
	playNextScriptCommand.setup(context);

	//////// Play Next <#> Scripts
	let playNextNScriptsCommand: PlayNextNScriptsCommand = new PlayNextNScriptsCommand();
	playNextNScriptsCommand.setup(context);

	//////// Play Remaining Scripts
	let playRemainingScriptsCommand: PlayRemainingScriptsCommand = new PlayRemainingScriptsCommand();
	playRemainingScriptsCommand.setup(context);

	//////// Set Queue Position
	let setQueuePosition: SetQueuePositionCommand = new SetQueuePositionCommand();
	setQueuePosition.setup(context);

}

// Deactivate function

export function deactivate() { }
