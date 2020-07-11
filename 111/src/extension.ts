// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "111" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World!');
    }
  );
  // let testHehe = vscode.commands.registerCommand('extension.hehe', () => {
  //   vscode.window
  //     .showInputBox({
  //       ignoreFocusOut: false,
  //       prompt: '我就呵呵了丫 你说点啥呢?',
  //     })
  //     .then((value) => {
  //       if (typeof value === undefined) {
  //         vscode.window.showInformationMessage('你取消了输入框');
  //         return;
  //       }
  //       if (typeof value === 'string') {
  //         if (value.trim() !== '') {
  //           vscode.window.showInformationMessage(`u input ${value}`);
  //         } else {
  //           vscode.window.showInformationMessage('输入为空');
  //         }
  //       }
  //     });
  // });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
