// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('md2pdf active.');

	let compileWithDate = vscode.commands.registerCommand('md2pdf.compileWithDate', (uri) => {
		function addLeadingZerosToDateIntegers(n) {
			if (n <= 9) {
				return "0" + n;
			}
			return n
		}
		let currentDatetime = new Date()
		let formattedDate = addLeadingZerosToDateIntegers(currentDatetime.getDate()) + "." + addLeadingZerosToDateIntegers(currentDatetime.getMonth() + 1) + "." + currentDatetime.getFullYear()
		const path = uri.fsPath
		const terminal = vscode.window.createTerminal("Compiler")
		const terminalFolderPath = uri.fsPath.split("/").slice(0, -1).join("/")
		const file = path.replaceAll(".md", ".pdf")
		vscode.window.showInformationMessage("using header: " + formattedDate)
		vscode.window.showInformationMessage("Compiling " + file)
		terminal.show()
		terminal.sendText(`cd ${terminalFolderPath} && md2pdf ${uri.fsPath} ${path.replaceAll(".md", ".pdf")} -r ${formattedDate} && exit`)
	});

	let compileInteractive = vscode.commands.registerCommand('md2pdf.compileInteractive', async (uri) => {
		vscode.window.showInformationMessage("Please enter text for the right header.")
		var response = await vscode.window.showInputBox()
		if (!response) {
			response = "NULL"
		}
		const path = uri.fsPath
		const terminal = vscode.window.createTerminal("Compiler")
		const terminalFolderPath = uri.fsPath.split("/").slice(0, -1).join("/")
		const file = path.replaceAll(".md", ".pdf")
		vscode.window.showInformationMessage("using header: " + response)
		vscode.window.showInformationMessage("Compiling " + file)
		terminal.show()
		terminal.sendText(`cd ${terminalFolderPath} && md2pdf ${uri.fsPath} ${path.replaceAll(".md", ".pdf")} -r ${response} && exit`)
	});

	context.subscriptions.push(compileInteractive);
	context.subscriptions.push(compileWithDate);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
