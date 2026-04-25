const vscode = require('vscode');
const path = require('path');
const { buildHtml } = require('./html-builder');

async function renderPanel(panel, text, docDir, isNavigation) {
  const { protected: protectedText, map } = protectMath(text);

  const rendered = await vscode.commands.executeCommand(
    'markdown.api.render',
    protectedText
  );

  const restored = restoreMath(rendered, map);
  const highlighted = processHtml(restored, panel, docDir);
  const html = buildHtml(highlighted, panel.title || '', isNavigation, panel.webview);

  if (isNavigation) {
    panel.webview.html = '<!DOCTYPE html><html><body></body></html>';
    await new Promise((r) => setTimeout(r, 50));
  }
  panel.webview.html = html;
}

function protectMath(text) {
  const map = {};
  let idx = 0;

  // 先保护块级 $$...$$（多行或单行）
  let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, inner) => {
    const key = '\x02MATH_BLOCK_' + (idx++) + '\x03';
    map[key] = { type: 'block', content: inner };
    return key;
  });

  // 再保护行内 $...$（不跨行，内容非空）
  result = result.replace(/\$([^\n$]+?)\$/g, (match, inner) => {
    const key = '\x02MATH_INLINE_' + (idx++) + '\x03';
    map[key] = { type: 'inline', content: inner };
    return key;
  });

  return { protected: result, map };
}

function restoreMath(html, map) {
  return html.replace(/\x02MATH_(BLOCK|INLINE)_\d+\x03/g, (key) => {
    const entry = map[key];
    if (!entry) return key;
    if (entry.type === 'block') {
      return '<div class="math-block">$$' + entry.content + '$$<\/div>';
    }
    return '<span class="math-inline">$' + entry.content + '$<\/span>';
  });
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
}

module.exports = { renderPanel };
