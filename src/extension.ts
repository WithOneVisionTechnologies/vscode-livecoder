import * as vscode from "vscode";
import { SetQueuePositionCommand } from "./commands/SetQueuePositionCommand";
import { PlayNextScriptCommand } from "./commands/PlayNextScriptCommand";
import { PlayAllScriptsCommand } from "./commands/PlayAllScriptsCommand";
import { PlayRemainingScriptsCommand } from "./commands/PlayRemainingScriptsCommand";
import { PlayNextNScriptsCommand } from "./commands/PlayNextNScriptsCommand";
import { PlayFromQueuePositionCommand } from "./commands/PlayFromQueuePositionCommand";
import { SetTypingDelayCommand } from "./commands/SetTypingDelayCommand";
import { PlaySpecificScriptCommand } from "./commands/PlaySpecificScriptCommand";
import { CurrentQueuePositionStatusBar } from "./statusBars/CurrentQueuePositionStatusBar";

export function activate(context: vscode.ExtensionContext) {

	let playAllScriptsCommand: PlayAllScriptsCommand = new PlayAllScriptsCommand();
	playAllScriptsCommand.setup(context);

	let playNextScriptCommand: PlayNextScriptCommand = new PlayNextScriptCommand();
	playNextScriptCommand.setup(context);

	let playNextNScriptsCommand: PlayNextNScriptsCommand = new PlayNextNScriptsCommand();
	playNextNScriptsCommand.setup(context);

	let playRemainingScriptsCommand: PlayRemainingScriptsCommand = new PlayRemainingScriptsCommand();
	playRemainingScriptsCommand.setup(context);

	let playSpecificScriptCommand: PlaySpecificScriptCommand = new PlaySpecificScriptCommand();
	playSpecificScriptCommand.setup(context);

	let playFromQueuePositionCommand: PlayFromQueuePositionCommand = new PlayFromQueuePositionCommand();
	playFromQueuePositionCommand.setup(context);

	let setQueuePositionCommand: SetQueuePositionCommand = new SetQueuePositionCommand();
	setQueuePositionCommand.setup(context);

	let setTypingDelayCommand: SetTypingDelayCommand = new SetTypingDelayCommand();
	setTypingDelayCommand.setup(context);

	let currentQueuePositionStatusBar: CurrentQueuePositionStatusBar = new CurrentQueuePositionStatusBar();
	currentQueuePositionStatusBar.setup(context);

}

export function deactivate() { }
