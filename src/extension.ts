import * as vscode from "vscode";
import ExtensionStore from "./stores/ExtensionStore";
import { ResetScriptQueueCommand } from "./commands/ResetScriptQueueCommand";
import { PlayNextScriptCommand } from "./commands/PlayNextScriptCommand";
import { PlayAllScriptsCommand } from "./commands/PlayAllScriptsCommand";
import { PlayRemainingScriptsCommand } from "./commands/PlayRemainingScriptsCommand";
import { PlayNextNScriptsCommand } from "./commands/PlayNextNScriptsCommand";

// Activate function

export function activate(context: vscode.ExtensionContext) {

	/******************* SETUP *******************/

	// Get configs
	let typingDelaySetting: number | undefined = vscode.workspace.getConfiguration("livecoder").get<number>("settings.tyingDelay");

	if (typingDelaySetting === undefined) {
		ExtensionStore.typingDelaySetting = 250;
	} else {
		ExtensionStore.typingDelaySetting = typingDelaySetting;
	}

	let scriptDirectorySetting: string | undefined = vscode.workspace.getConfiguration("livecoder").get<string>("settings.scriptDirectory");

	if (scriptDirectorySetting === undefined) {
		ExtensionStore.scriptDirectorySetting = "/.liveCoder";
	} else {
		ExtensionStore.scriptDirectorySetting = scriptDirectorySetting;
	}

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

	//////// Reset Script Queue
	let resetScriptCounterCommand: ResetScriptQueueCommand = new ResetScriptQueueCommand();
	resetScriptCounterCommand.setup(context);

}

// Deactivate function

export function deactivate() { }
