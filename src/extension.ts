import * as vscode from "vscode";
import formatDict from "./indent";

function getIndentToken(activeTextEditor: vscode.TextEditor) {
  const insertSpaces = activeTextEditor.options.insertSpaces;
  if (!insertSpaces) {
    return "\t";
  }
  const tabSize = activeTextEditor.options.tabSize as number; // valid cast according to the doc
  return " ".repeat(tabSize);
}

function indentNestedDictionary() {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (activeTextEditor === undefined) {
    return;
  }
  const indentToken = getIndentToken(activeTextEditor);
  activeTextEditor.edit((editBuilder) => {
    activeTextEditor.selections.forEach((selection) => {
      const selectedValue = activeTextEditor.document.getText(selection);
      const indentedValue = formatDict(selectedValue, indentToken);
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
