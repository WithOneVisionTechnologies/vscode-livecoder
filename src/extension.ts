import * as vscode from "vscode";
import { SetQueuePositionCommand } from "./contributions/commands/SetQueuePositionCommand";
import { PlayNextScriptCommand } from "./contributions/commands/PlayNextScriptCommand";
import { PlayAllScriptsCommand } from "./contributions/commands/PlayAllScriptsCommand";
import { PlayRemainingScriptsCommand } from "./contributions/commands/PlayRemainingScriptsCommand";
import { PlayNextNScriptsCommand } from "./contributions/commands/PlayNextNScriptsCommand";
import { PlayFromQueuePositionCommand } from "./contributions/commands/PlayFromQueuePositionCommand";
import { SetTypingDelayCommand } from "./contributions/commands/SetTypingDelayCommand";
import { PlaySpecificScriptCommand } from "./contributions/commands/PlaySpecificScriptCommand";
import { CurrentQueuePositionStatusBar } from "./contributions/statusBars/CurrentQueuePositionStatusBar";

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

	let currentQueuePositionStatusBar: CurrentQueuePositionStatusBar = CurrentQueuePositionStatusBar.getInstance();
	currentQueuePositionStatusBar.setup(context);

}

export function deactivate() { }
