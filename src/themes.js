function getHljsDarkCss() {
  return '.hljs{color:#abb2bf;background:#282c34}' +
    '.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-type{color:#c678dd}' +
    '.hljs-variable.language_{color:#e06c75}' +
    '.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__{color:#e5c07b}' +
    '.hljs-title.function_{color:#61afef}' +
    '.hljs-attr,.hljs-attribute{color:#d19a66}' +
    '.hljs-literal,.hljs-number{color:#d19a66}' +
    '.hljs-operator{color:#56b6c2}' +
    '.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id{color:#e06c75}' +
    '.hljs-variable{color:#e06c75}' +
    '.hljs-meta,.hljs-meta .hljs-string{color:#98c379}' +
    '.hljs-regexp,.hljs-string{color:#98c379}' +
    '.hljs-built_in,.hljs-symbol{color:#56b6c2}' +
    '.hljs-code,.hljs-comment,.hljs-formula{color:#5c6370;font-style:italic}' +
    '.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#e06c75}' +
    '.hljs-subst{color:#abb2bf}' +
    '.hljs-section{color:#61afef;font-weight:700}' +
    '.hljs-bullet{color:#d19a66}' +
    '.hljs-emphasis{font-style:italic}' +
    '.hljs-strong{font-weight:700}' +
    '.hljs-addition{color:#98c379;background-color:rgba(152,195,121,0.1)}' +
    '.hljs-deletion{color:#e06c75;background-color:rgba(224,108,117,0.1)}' +
    '.hljs-doctag{color:#c678dd}' +
    '.hljs-params{color:#abb2bf}';
}

function getHljsLightCss() {
  return '.hljs{color:#383a42;background:#fafafa}' +
    '.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-type{color:#a626a4}' +
    '.hljs-variable.language_{color:#e45649}' +
    '.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__{color:#c18401}' +
    '.hljs-title.function_{color:#4078f2}' +
    '.hljs-attr,.hljs-attribute{color:#986801}' +
    '.hljs-literal,.hljs-number{color:#986801}' +
    '.hljs-operator{color:#0184bc}' +
    '.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id{color:#e45649}' +
    '.hljs-variable{color:#e45649}' +
    '.hljs-meta,.hljs-meta .hljs-string{color:#50a14f}' +
    '.hljs-regexp,.hljs-string{color:#50a14f}' +
    '.hljs-built_in,.hljs-symbol{color:#0184bc}' +
    '.hljs-code,.hljs-comment,.hljs-formula{color:#a0a1a7;font-style:italic}' +
    '.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#e45649}' +
    '.hljs-subst{color:#383a42}' +
    '.hljs-section{color:#4078f2;font-weight:700}' +
    '.hljs-bullet{color:#986801}' +
    '.hljs-emphasis{font-style:italic}' +
    '.hljs-strong{font-weight:700}' +
    '.hljs-addition{color:#50a14f;background-color:rgba(80,161,79,0.1)}' +
    '.hljs-deletion{color:#e45649;background-color:rgba(228,86,73,0.1)}' +
    '.hljs-doctag{color:#a626a4}' +
    '.hljs-params{color:#383a42}';
}

function getLangColorsDark() {
  return [
    'pre[data-lang="javascript"] .hljs-keyword,pre[data-lang="js"] .hljs-keyword,pre[data-lang="typescript"] .hljs-keyword,pre[data-lang="ts"] .hljs-keyword{color:#e6b450}',
    'pre[data-lang="javascript"] .hljs-string,pre[data-lang="js"] .hljs-string,pre[data-lang="typescript"] .hljs-string,pre[data-lang="ts"] .hljs-string{color:#98c379}',
    'pre[data-lang="javascript"] .hljs-title.function_,pre[data-lang="js"] .hljs-title.function_,pre[data-lang="typescript"] .hljs-title.function_,pre[data-lang="ts"] .hljs-title.function_{color:#61afef}',
    'pre[data-lang="javascript"] .hljs-number,pre[data-lang="js"] .hljs-number,pre[data-lang="typescript"] .hljs-number,pre[data-lang="ts"] .hljs-number{color:#d19a66}',
    'pre[data-lang="python"] .hljs-keyword,pre[data-lang="py"] .hljs-keyword{color:#c678dd}',
    'pre[data-lang="python"] .hljs-string,pre[data-lang="py"] .hljs-string{color:#56b6c2}',
    'pre[data-lang="python"] .hljs-title.function_,pre[data-lang="py"] .hljs-title.function_{color:#e5c07b}',
    'pre[data-lang="python"] .hljs-built_in,pre[data-lang="py"] .hljs-built_in{color:#61afef}',
    'pre[data-lang="html"] .hljs-name,pre[data-lang="xml"] .hljs-name{color:#e06c75}',
    'pre[data-lang="html"] .hljs-attr,pre[data-lang="xml"] .hljs-attr{color:#d19a66}',
    'pre[data-lang="html"] .hljs-string,pre[data-lang="xml"] .hljs-string{color:#98c379}',
    'pre[data-lang="css"] .hljs-selector-class,pre[data-lang="css"] .hljs-selector-id{color:#e06c75}',
    'pre[data-lang="css"] .hljs-attribute{color:#d19a66}',
    'pre[data-lang="css"] .hljs-number{color:#56b6c2}',
    'pre[data-lang="java"] .hljs-keyword,pre[data-lang="c"] .hljs-keyword,pre[data-lang="cpp"] .hljs-keyword,pre[data-lang="csharp"] .hljs-keyword,pre[data-lang="go"] .hljs-keyword,pre[data-lang="rust"] .hljs-keyword{color:#569cd6}',
    'pre[data-lang="java"] .hljs-type,pre[data-lang="c"] .hljs-type,pre[data-lang="cpp"] .hljs-type,pre[data-lang="csharp"] .hljs-type,pre[data-lang="go"] .hljs-type,pre[data-lang="rust"] .hljs-type{color:#4ec9b0}',
    'pre[data-lang="java"] .hljs-string,pre[data-lang="c"] .hljs-string,pre[data-lang="cpp"] .hljs-string,pre[data-lang="csharp"] .hljs-string,pre[data-lang="go"] .hljs-string,pre[data-lang="rust"] .hljs-string{color:#ce9178}',
    'pre[data-lang="java"] .hljs-title.function_,pre[data-lang="c"] .hljs-title.function_,pre[data-lang="cpp"] .hljs-title.function_,pre[data-lang="csharp"] .hljs-title.function_,pre[data-lang="go"] .hljs-title.function_,pre[data-lang="rust"] .hljs-title.function_{color:#dcdcaa}',
    'pre[data-lang="bash"] .hljs-keyword,pre[data-lang="shell"] .hljs-keyword,pre[data-lang="sh"] .hljs-keyword{color:#8ddb8c}',
    'pre[data-lang="bash"] .hljs-string,pre[data-lang="shell"] .hljs-string,pre[data-lang="sh"] .hljs-string{color:#96d0ff}',
    'pre[data-lang="bash"] .hljs-built_in,pre[data-lang="shell"] .hljs-built_in,pre[data-lang="sh"] .hljs-built_in{color:#f69d50}',
    'pre[data-lang="json"] .hljs-attr{color:#c678dd}',
    'pre[data-lang="json"] .hljs-string{color:#98c379}',
    'pre[data-lang="json"] .hljs-number{color:#d19a66}',
    'pre[data-lang="yaml"] .hljs-attr{color:#c678dd}',
    'pre[data-lang="yaml"] .hljs-string{color:#98c379}',
    'pre[data-lang="sql"] .hljs-keyword{color:#56b6c2}',
    'pre[data-lang="sql"] .hljs-string{color:#98c379}',
    'pre[data-lang="sql"] .hljs-number{color:#d19a66}',
  ].join('');
}

function getLangColorsLight() {
  return [
    'pre[data-lang="javascript"] .hljs-keyword,pre[data-lang="js"] .hljs-keyword,pre[data-lang="typescript"] .hljs-keyword,pre[data-lang="ts"] .hljs-keyword{color:#c18401}',
    'pre[data-lang="javascript"] .hljs-string,pre[data-lang="js"] .hljs-string,pre[data-lang="typescript"] .hljs-string,pre[data-lang="ts"] .hljs-string{color:#50a14f}',
    'pre[data-lang="javascript"] .hljs-title.function_,pre[data-lang="js"] .hljs-title.function_,pre[data-lang="typescript"] .hljs-title.function_,pre[data-lang="ts"] .hljs-title.function_{color:#4078f2}',
    'pre[data-lang="javascript"] .hljs-number,pre[data-lang="js"] .hljs-number,pre[data-lang="typescript"] .hljs-number,pre[data-lang="ts"] .hljs-number{color:#986801}',
    'pre[data-lang="python"] .hljs-keyword,pre[data-lang="py"] .hljs-keyword{color:#a626a4}',
    'pre[data-lang="python"] .hljs-string,pre[data-lang="py"] .hljs-string{color:#0184bc}',
    'pre[data-lang="python"] .hljs-title.function_,pre[data-lang="py"] .hljs-title.function_{color:#c18401}',
    'pre[data-lang="python"] .hljs-built_in,pre[data-lang="py"] .hljs-built_in{color:#4078f2}',
    'pre[data-lang="html"] .hljs-name,pre[data-lang="xml"] .hljs-name{color:#e45649}',
    'pre[data-lang="html"] .hljs-attr,pre[data-lang="xml"] .hljs-attr{color:#986801}',
    'pre[data-lang="html"] .hljs-string,pre[data-lang="xml"] .hljs-string{color:#50a14f}',
    'pre[data-lang="css"] .hljs-selector-class,pre[data-lang="css"] .hljs-selector-id{color:#e45649}',
    'pre[data-lang="css"] .hljs-attribute{color:#986801}',
    'pre[data-lang="css"] .hljs-number{color:#0184bc}',
    'pre[data-lang="java"] .hljs-keyword,pre[data-lang="c"] .hljs-keyword,pre[data-lang="cpp"] .hljs-keyword,pre[data-lang="csharp"] .hljs-keyword,pre[data-lang="go"] .hljs-keyword,pre[data-lang="rust"] .hljs-keyword{color:#0000ff}',
    'pre[data-lang="java"] .hljs-type,pre[data-lang="c"] .hljs-type,pre[data-lang="cpp"] .hljs-type,pre[data-lang="csharp"] .hljs-type,pre[data-lang="go"] .hljs-type,pre[data-lang="rust"] .hljs-type{color:#267f99}',
    'pre[data-lang="java"] .hljs-string,pre[data-lang="c"] .hljs-string,pre[data-lang="cpp"] .hljs-string,pre[data-lang="csharp"] .hljs-string,pre[data-lang="go"] .hljs-string,pre[data-lang="rust"] .hljs-string{color:#a31515}',
    'pre[data-lang="java"] .hljs-title.function_,pre[data-lang="c"] .hljs-title.function_,pre[data-lang="cpp"] .hljs-title.function_,pre[data-lang="csharp"] .hljs-title.function_,pre[data-lang="go"] .hljs-title.function_,pre[data-lang="rust"] .hljs-title.function_{color:#795e26}',
    'pre[data-lang="bash"] .hljs-keyword,pre[data-lang="shell"] .hljs-keyword,pre[data-lang="sh"] .hljs-keyword{color:#50a14f}',
    'pre[data-lang="bash"] .hljs-string,pre[data-lang="shell"] .hljs-string,pre[data-lang="sh"] .hljs-string{color:#4078f2}',
    'pre[data-lang="bash"] .hljs-built_in,pre[data-lang="shell"] .hljs-built_in,pre[data-lang="sh"] .hljs-built_in{color:#e36209}',
    'pre[data-lang="json"] .hljs-attr{color:#a626a4}',
    'pre[data-lang="json"] .hljs-string{color:#50a14f}',
    'pre[data-lang="json"] .hljs-number{color:#986801}',
    'pre[data-lang="yaml"] .hljs-attr{color:#a626a4}',
    'pre[data-lang="yaml"] .hljs-string{color:#50a14f}',
    'pre[data-lang="sql"] .hljs-keyword{color:#0184bc}',
    'pre[data-lang="sql"] .hljs-string{color:#50a14f}',
    'pre[data-lang="sql"] .hljs-number{color:#986801}',
  ].join('');
}

module.exports = { getHljsDarkCss, getHljsLightCss, getLangColorsDark, getLangColorsLight };
