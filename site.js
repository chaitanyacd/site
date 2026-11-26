/* Chaitanya · shared sidebar, mobile menu and footer (Björk-style layout) */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  var pages = [
    ['Home', 'index.html', 'home'],
    ['Film Diary', 'diary.html', 'diary'],
    ['Borrowed IQ', 'borrowed-iq.html', 'iq']
  ];
  var elsewhere = [
    ['About me', 'https://chaitanyacd.wixsite.com/website/about'],
    ['My work', 'https://bit.ly/Chaitanya-portfolio']
  ];
  var TAGLINE = 'Copywriter and communication designer, Boston';

  var OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"/></svg>';

  function navItems() {
    return pages.map(function (p) {
      return '<li><a href="' + p[1] + '"' + (p[2] === page ? ' aria-current="page"' : '') + '>' + p[0] + '</a></li>';
    }).join('');
  }
  function moreItems() {
    return elsewhere.map(function (e) {
      return '<li><a href="' + e[1] + '" target="_blank" rel="noopener noreferrer">' + e[0] + ' \u2197</a></li>';
    }).join('');
  }

  /* Desktop sidebar */
  var side = document.createElement('aside');
  side.className = 'sidebar-col';
  side.innerHTML =
    '<div class="site-sidebar"><div>' +
    '<a class="site-title" href="index.html">Chaitanya</a>' +
    '<p class="site-tagline">' + TAGLINE + '</p>' +
    '<nav class="site-nav" aria-label="Main"><ul>' + navItems() + '</ul></nav>' +
    '</div><ul class="site-more">' + moreItems() + '</ul></div>';

  /* Mobile header */
  var hdr = document.createElement('header');
  hdr.className = 'site-header';
  hdr.innerHTML =
    '<a class="site-title" href="index.html">Chaitanya</a>' +
    '<button class="icon-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu">' + OPEN + '</button>';

  /* Mobile full-screen menu */
  var menu = document.createElement('div');
  menu.className = 'site-menu';
  menu.id = 'siteMenu';
  menu.hidden = true;
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-modal', 'true');
  menu.setAttribute('aria-label', 'Menu');
  menu.innerHTML =
    '<div class="top"><a class="site-title" href="index.html">Chaitanya</a>' +
    '<button class="icon-btn" id="menuClose" type="button" aria-label="Close menu">' + CLOSE + '</button></div>' +
    '<nav aria-label="Pages"><ul class="big">' + navItems() + '</ul></nav>' +
    '<ul class="more">' + moreItems() + '</ul>';

  /* Footer */
  var ftr = document.createElement('footer');
  ftr.className = 'site-footer';
  ftr.innerHTML =
    '<hr class="hatch" aria-hidden="true">' +
    '<div class="foot"><span>\u00A9 ' + new Date().getFullYear() + ' Chaitanya Deshpande</span>' +
    '<span class="theme-credit">Layout based on <a href="https://andersnoren.se/teman/bjork-wordpress-theme/" target="_blank" rel="noopener noreferrer">Bj\u00F6rk</a> by Anders Nor\u00E9n</span></div>';

  /* Move the page's own content into the content column */
  var shell = document.createElement('div');
  shell.className = 'shell';
  var cols = document.createElement('div');
  cols.className = 'cols';
  var content = document.createElement('div');
  content.className = 'content';
  var skip = /^(SCRIPT|STYLE|LINK|NOSCRIPT)$/;
  Array.prototype.slice.call(document.body.childNodes).forEach(function (n) {
    if (n.nodeType === 1 && skip.test(n.tagName)) return;
    content.appendChild(n);
  });
  content.appendChild(ftr);
  cols.appendChild(side);
  cols.appendChild(content);
  shell.appendChild(hdr);
  shell.appendChild(cols);
  document.body.insertBefore(shell, document.body.firstChild);
  document.body.appendChild(menu);

  /* Menu open and close */
  var btn = hdr.querySelector('#menuBtn');
  var close = menu.querySelector('#menuClose');
  function open() {
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    close.focus();
  }
  function shut() {
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    btn.focus();
  }
  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) shut();
  });
  menu.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = menu.querySelectorAll('a, button');
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
