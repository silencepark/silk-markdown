const vscode = require('vscode');
const path = require('path');
const { renderPanel } = require('./renderer');

class MarkdownReadProvider {
  constructor() {
    this.activePanel = null;
  }

  openCustomDocument(uri, _openContext, _token) {
    return { uri, dispose: () => {} };
  }

  resolveCustomEditor(document, webviewPanel, _token) {
    const docUri = document.uri;
    const docDir = path.dirname(docUri.fsPath);
    const workspaceFolders = (vscode.workspace.workspaceFolders ?? []).map((f) => f.uri);

    const extensionRoot = path.join(__dirname, '..');

    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(docDir), vscode.Uri.file(extensionRoot), ...workspaceFolders]
    };

    webviewPanel.docUri = docUri;
    this.activePanel = webviewPanel;

    let currentDocDir = docDir;

    vscode.workspace.openTextDocument(docUri).then((textDoc) => {
      renderPanel(webviewPanel, textDoc.getText(), currentDocDir, false);
    });

    const onChange = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === docUri.toString()) {
        renderPanel(webviewPanel, e.document.getText(), currentDocDir, false);
      }
    });

    webviewPanel.onDidChangeViewState(() => {
      if (webviewPanel.active) {
        this.activePanel = webviewPanel;
      }
    });

    webviewPanel.webview.onDidReceiveMessage((msg) => {
      if (msg.command === 'openExternal') {
        vscode.env.openExternal(vscode.Uri.parse(msg.href));
        return;
      }
      if (msg.command === 'openFile') {
        const [filePart] = msg.href.split('#');
        const absPath = path.resolve(currentDocDir, filePart);
        const fileUri = vscode.Uri.file(absPath);
        if (/\.md$/i.test(absPath)) {
          vscode.workspace.openTextDocument(fileUri).then((newDoc) => {
            currentDocDir = path.dirname(newDoc.uri.fsPath);
            webviewPanel.docUri = newDoc.uri;
            const title = newDoc.fileName.replace(/.*[\\/]/, '').replace(/\.md$/i, '');
            webviewPanel.title = title + ' — 阅读模式';
            renderPanel(webviewPanel, newDoc.getText(), currentDocDir, true);
          });
        } else {
          vscode.window.showTextDocument(fileUri, { preview: false });
        }
      }
    });

    webviewPanel.onDidDispose(() => {
      onChange.dispose();
      if (this.activePanel === webviewPanel) {
        this.activePanel = null;
      }
    });
  }
}

module.exports = { MarkdownReadProvider };
