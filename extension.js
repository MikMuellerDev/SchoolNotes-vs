const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let compileWithDate = vscode.commands.registerCommand('md2pdf.compileWithDate', (uri=null) => {
		let path
		let terminalFolderPath
		if (!uri) {
			const activeEditor = vscode.window.activeTextEditor;
    		if(activeEditor) {
				if (vscode.window.activeTextEditor.document.languageId !== "markdown") {
					vscode.window.showErrorMessage("Only markdown (.md) files can be converted.")
					return
				}
       		path = activeEditor.document.uri.path;
			terminalFolderPath = path.split("/").slice(0, -1).join("/")
			} else {
				vscode.window.showErrorMessage("You must select a file or or have an editor opened.")
				vscode.window.pla
				return
			}
		} else {
			path = uri.fsPath
			terminalFolderPath = uri.fsPath.split("/").slice(0, -1).join("/")
		}
		function addLeadingZerosToDateIntegers(n) {
			if (n <= 9) {
				return "0" + n;
			}
			return n
		}
		let currentDatetime = new Date()
		let formattedDate = addLeadingZerosToDateIntegers(currentDatetime.getDate()) + "." + addLeadingZerosToDateIntegers(currentDatetime.getMonth() + 1) + "." + currentDatetime.getFullYear()
		const terminal = vscode.window.createTerminal("Compiler")
		const file = path.replaceAll(".md", ".pdf")
		vscode.window.showInformationMessage("Using date: " + formattedDate)
		vscode.window.showInformationMessage("Converting " + file)
		terminal.show()
		terminal.sendText(`cd ${terminalFolderPath} && md2pdf ${path} ${path.replaceAll(".md", ".pdf")} -r ${formattedDate} && exit`)
	});

	let compileInteractive = vscode.commands.registerCommand('md2pdf.compileInteractive', async (uri=null) => {
		let path
		let terminalFolderPath
		if (!uri) {
			const activeEditor = vscode.window.activeTextEditor;
    		if(activeEditor) {
				if (vscode.window.activeTextEditor.document.languageId !== "markdown") {
					vscode.window.showErrorMessage("Only markdown (.md) files can be converted.")
					return
				}
       		path = activeEditor.document.uri.path;
			terminalFolderPath = path.split("/").slice(0, -1).join("/")
			} else {
				vscode.window.showErrorMessage("You must select a file or or have an editor opened.")
				return
			}
		} else {
			path = uri.fsPath
			terminalFolderPath = uri.fsPath.split("/").slice(0, -1).join("/")
		}

		vscode.window.showInformationMessage("Please enter text for the left head.")
		var leftHead = await vscode.window.showInputBox()
		if (!leftHead) { leftHead = ' ' }

		vscode.window.showInformationMessage("Please enter text for the center head.")
		var centerHead = await vscode.window.showInputBox()
		if (!centerHead) { centerHead = ' ' }

		vscode.window.showInformationMessage("Please enter text for the right head.")
		var rightHead = await vscode.window.showInputBox()
		if (!rightHead) { rightHead = ' ' }

		const terminal = vscode.window.createTerminal("Compiler")
		const file = path.replaceAll(".md", ".pdf")
		vscode.window.showInformationMessage("Converting " + file)
		terminal.show()
		terminal.sendText(`cd ${terminalFolderPath} && md2pdf ${path} ${path.replaceAll(".md", ".pdf")} -l "${leftHead}" -c "${centerHead}" -r "${rightHead}" && exit`)
	});

	context.subscriptions.push(compileInteractive);
	context.subscriptions.push(compileWithDate);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
