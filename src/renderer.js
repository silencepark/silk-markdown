const vscode = require('vscode');
const path = require('path');
const { buildHtml } = require('./html-builder');

async function renderPanel(panel, text, docDir, isNavigation) {
  const rendered = await vscode.commands.executeCommand(
    'markdown.api.render',
    text
  );

  const highlighted = processHtml(rendered, panel, docDir);
  const html = buildHtml(highlighted, panel.title || '', isNavigation, panel.webview);

  if (isNavigation) {
    panel.webview.html = '<!DOCTYPE html><html><body></body></html>';
    await new Promise((r) => setTimeout(r, 50));
  }
  panel.webview.html = html;
}

function processHtml(rendered, panel, docDir) {
  const imgFixed = rendered.replace(
    /src="([^"]+)"/g,
    (match, src) => {
      if (/^(https?:|data:)/i.test(src)) return match;
      const absPath = src.startsWith('/')
        ? src
        : path.resolve(docDir, src);
      const webviewUri = panel.webview.asWebviewUri(vscode.Uri.file(absPath));
      return 'src="' + webviewUri + '"';
    }
  );

  var mermaidFixed = imgFixed.replace(
    /<pre[^>]*>\s*<code[^>]*class="[^"]*language-mermaid"[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/g,
    (match, code) => {
      const raw = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"');
      return '<div class="mermaid">' + raw + '</div>';
    }
  );

  return mermaidFixed;
}

module.exports = { renderPanel };
