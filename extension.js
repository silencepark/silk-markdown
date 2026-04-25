const vscode = require('vscode');
const { MarkdownReadProvider } = require('./src/provider');

function activate(context) {
  const provider = new MarkdownReadProvider();
  let switching = false;

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider('silk-md-preview', provider, {
      webviewOptions: { retainContextWhenHidden: true }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('silk-md.toggleModeReading', async () => {
      if (switching) return;
      const panel = provider.activePanel;
      if (!panel) return;
      const uri = panel.docUri;
      switching = true;
      await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
      await vscode.commands.executeCommand('vscode.openWith', uri, 'default');
      switching = false;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('silk-md.toggleMode', async () => {
      if (switching) return;
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') return;
      const uri = editor.document.uri;
      switching = true;
      await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
      await vscode.commands.executeCommand('vscode.openWith', uri, 'silk-md-preview');
      switching = false;
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
