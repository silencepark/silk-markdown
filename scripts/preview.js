var vscode = acquireVsCodeApi();

// === 链接拦截 ===
document.addEventListener("click", function(e) {
  var a = e.target.closest("a");
  if (!a) return;
  e.preventDefault();
  var href = a.getAttribute("href") || "";
  if (href.startsWith("#")) {
    var target = document.getElementById(href.slice(1))
      || document.querySelector('[name="' + href.slice(1) + '"]');
    if (target) target.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (/^https?:\/\//i.test(href)) {
    vscode.postMessage({ command: "openExternal", href: href });
    return;
  }
  vscode.postMessage({ command: "openFile", href: decodeURIComponent(href) });
});

// === 代码块复制按钮 ===
document.querySelectorAll("pre").forEach(function(pre) {
  var btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.textContent = "复制";
  btn.addEventListener("click", function() {
    var code = pre.querySelector("code");
    var text = code ? code.textContent : pre.textContent;
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = "✓";
      setTimeout(function() { btn.textContent = "复制"; }, 1500);
    });
  });
  pre.appendChild(btn);
});

// === 大纲 TOC ===
var tocToggle = document.getElementById("toc-toggle");
var tocPanel = document.getElementById("toc-panel");
var tocList = document.getElementById("toc-list");

function buildToc() {
  tocList.innerHTML = "";
  var headings = document.querySelectorAll("#content h1, #content h2, #content h3, #content h4, #content h5, #content h6");
  headings.forEach(function(h, i) {
    if (!h.id) h.id = "heading-" + i;
    var li = document.createElement("li");
    li.textContent = h.textContent;
    li.setAttribute("data-level", h.tagName[1]);
    li.setAttribute("data-target", h.id);
    tocList.appendChild(li);
  });
}

buildToc();

tocToggle.addEventListener("click", function(e) {
  e.stopPropagation();
  var visible = tocPanel.classList.toggle("visible");
  tocToggle.classList.toggle("active", visible);
});

tocList.addEventListener("click", function(e) {
  var li = e.target.closest("li");
  if (!li) return;
  var target = document.getElementById(li.getAttribute("data-target"));
  if (target) target.scrollIntoView({ behavior: "smooth" });
  tocPanel.classList.remove("visible");
  tocToggle.classList.remove("active");
});

document.addEventListener("click", function(e) {
  if (!tocPanel.contains(e.target) && e.target !== tocToggle) {
    tocPanel.classList.remove("visible");
    tocToggle.classList.remove("active");
  }
});

function updateTocHighlight() {
  var headings = document.querySelectorAll("#content h1, #content h2, #content h3, #content h4, #content h5, #content h6");
  var tocItems = tocList.querySelectorAll("li");
  var current = -1;
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].getBoundingClientRect().top <= 60) current = i;
  }
  tocItems.forEach(function(li, i) {
    li.classList.toggle("active", i === current);
    if (i === current) li.scrollIntoView({ block: "nearest" });
  });
}

var scrollTimer;
window.addEventListener("scroll", function() {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(updateTocHighlight, 50);
});
updateTocHighlight();

// === 搜索 ===
var searchBar = document.getElementById("search-bar");
var searchInput = document.getElementById("search-input");
var searchInfo = document.getElementById("search-info");
var searchMarks = [];
var searchIdx = -1;

document.addEventListener("keydown", function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "f") {
    e.preventDefault();
    searchBar.classList.add("visible");
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === "Escape" && searchBar.classList.contains("visible")) {
    closeSearch();
  }
  if (e.key === "Enter" && document.activeElement === searchInput) {
    e.preventDefault();
    if (e.shiftKey) navSearch(-1); else navSearch(1);
  }
});

document.getElementById("search-close").addEventListener("click", closeSearch);
document.getElementById("search-prev").addEventListener("click", function() { navSearch(-1); });
document.getElementById("search-next").addEventListener("click", function() { navSearch(1); });

searchInput.addEventListener("input", function() {
  doSearch(searchInput.value);
});

function doSearch(query) {
  clearHighlights();
  searchMarks = [];
  searchIdx = -1;
  if (!query) { searchInfo.textContent = ""; return; }
  var content = document.getElementById("content");
  var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null);
  var textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  var lowerQuery = query.toLowerCase();
  textNodes.forEach(function(node) {
    var text = node.textContent;
    var lower = text.toLowerCase();
    var idx = lower.indexOf(lowerQuery);
    if (idx === -1) return;
    var parts = [];
    var lastIdx = 0;
    while (idx !== -1) {
      if (idx > lastIdx) parts.push(document.createTextNode(text.slice(lastIdx, idx)));
      var mark = document.createElement("mark");
      mark.className = "search-highlight";
      mark.textContent = text.slice(idx, idx + query.length);
      parts.push(mark);
      searchMarks.push(mark);
      lastIdx = idx + query.length;
      idx = lower.indexOf(lowerQuery, lastIdx);
    }
    if (lastIdx < text.length) parts.push(document.createTextNode(text.slice(lastIdx)));
    var parent = node.parentNode;
    parts.forEach(function(p) { parent.insertBefore(p, node); });
    parent.removeChild(node);
  });
  if (searchMarks.length > 0) { searchIdx = 0; highlightCurrent(); }
  updateSearchInfo();
}

function navSearch(dir) {
  if (searchMarks.length === 0) return;
  searchIdx = (searchIdx + dir + searchMarks.length) % searchMarks.length;
  highlightCurrent();
  updateSearchInfo();
}

function highlightCurrent() {
  searchMarks.forEach(function(m, i) {
    m.classList.toggle("current", i === searchIdx);
  });
  if (searchMarks[searchIdx]) searchMarks[searchIdx].scrollIntoView({ block: "center", behavior: "smooth" });
}

function updateSearchInfo() {
  if (searchMarks.length === 0) { searchInfo.textContent = searchInput.value ? "无结果" : ""; return; }
  searchInfo.textContent = (searchIdx + 1) + " / " + searchMarks.length;
}

function clearHighlights() {
  document.querySelectorAll("mark.search-highlight").forEach(function(mark) {
    var parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function closeSearch() {
  searchBar.classList.remove("visible");
  clearHighlights();
  searchMarks = []; searchIdx = -1;
  searchInfo.textContent = "";
  searchInput.value = "";
}
