const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getHljsDarkCss, getHljsLightCss, getLangColorsDark, getLangColorsLight } = require('./themes');

const cssPath = path.join(__dirname, '..', 'styles', 'preview.css');
const jsPath = path.join(__dirname, '..', 'scripts', 'preview.js');

function buildHtml(body, title, isNavigation) {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const isDark = vscode.window.activeColorTheme.kind !== vscode.ColorThemeKind.Light;
  const hljsCss = isDark ? getHljsDarkCss() : getHljsLightCss();
  const langCss = isDark ? getLangColorsDark() : getLangColorsLight();
  const previewCss = fs.readFileSync(cssPath, 'utf8');
  const previewJs = fs.readFileSync(jsPath, 'utf8');
  const fadeInCss = isNavigation ? 'body { animation: fadeIn 0.3s ease; }' : '';

  return '<!DOCTYPE html>\n' +
    '<html lang="zh">\n' +
    '<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '<title>' + safeTitle + '</title>\n' +
    '<style>' + hljsCss + '</style>\n' +
    '<style>\n' + previewCss + '\n' + fadeInCss + '\n</style>\n' +
    '<style>' + langCss + '</style>\n' +
    '</head>\n' +
    '<body>\n' +
    '<div id="search-bar">\n' +
    '  <input id="search-input" type="text" placeholder="搜索..." />\n' +
    '  <span id="search-info"></span>\n' +
    '  <button class="search-btn" id="search-prev" title="上一个">↑</button>\n' +
    '  <button class="search-btn" id="search-next" title="下一个">↓</button>\n' +
    '  <button class="search-btn" id="search-close" title="关闭">✕</button>\n' +
    '</div>\n' +
    '<button id="toc-toggle" title="大纲">☰</button>\n' +
    '<div id="toc-panel"><div id="toc-header">大纲</div><ul id="toc-list"></ul></div>\n' +
    '<div id="content">' + body + '</div>\n' +
    '<script>\n' + previewJs + '\n<\/script>\n' +
    '</body>\n' +
    '</html>';
}

module.exports = { buildHtml };
