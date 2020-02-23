import * as vscode from "vscode";
import formatDict from "./indent";

function indentNestedDictionary() {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (activeTextEditor === undefined) {
    return;
  }
  activeTextEditor.edit(editBuilder => {
    activeTextEditor.selections.forEach(selection => {
      const selectedValue = activeTextEditor.document.getText(selection);
      const indentedValue = formatDict(selectedValue);
      editBuilder.replace(selection, indentedValue);
    });
  });
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.indentNestedDictionary",
    indentNestedDictionary
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
