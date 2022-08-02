// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  const URL = "https://codesheet-api.herokuapp.com/api/sheet";

  const { data: sheets } = await axios.get(URL);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "codesheet.sheets",
    async function () {
      const item = await vscode.window.showQuickPick(sheets);
      if (!item) {
        return vscode.window.showErrorMessage("Please select any item");
      }
      vscode.env.clipboard.writeText(item.code);
      vscode.window.showInformationMessage("Copied to clipboard");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
