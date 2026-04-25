const vscode = require('vscode');
const hljs = require('highlight.js');
const path = require('path');
const { buildHtml } = require('./html-builder');

async function renderPanel(panel, text, docDir, isNavigation) {
  const rendered = await vscode.commands.executeCommand(
    'markdown.api.render',
    text
  );

  const highlighted = processHtml(rendered, panel, docDir);
  const html = buildHtml(highlighted, panel.title || '', isNavigation);

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

  return imgFixed.replace(
    /<pre[^>]*>\s*<code class="language-(\w+)">([\s\S]*?)<\/code>\s*<\/pre>/g,
    (match, lang, code) => {
      const raw = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"');
      try {
        const result = hljs.getLanguage(lang)
          ? hljs.highlight(raw, { language: lang, ignoreIllegals: true }).value
          : hljs.highlightAuto(raw).value;
        return '<pre data-lang="' + lang + '"><code class="language-' + lang + ' hljs">' + result + '</code></pre>';
      } catch {
        return match;
      }
    }
  );
}

module.exports = { renderPanel };
