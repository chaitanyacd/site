/* Chaitanya · shared sidebar, mobile menu and footer (Björk-style layout) */
(function () {
  /* ===== YOUR LINKS ===== */
  var LINKS = {
    email: 'mailto:chaitanyacd.work@gmail.com',
    linkedin: 'https://www.linkedin.com/in/chaitanyad/'
  };
  /* ======================= */

  var page = document.body.getAttribute('data-page') || '';

  var pages = [
    ['Home', 'index.html', 'home'],
    ['Film Diary', 'diary.html', 'diary'],
    ['Borrowed IQ', 'borrowed-iq.html', 'iq']
  ];

  var OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"/></svg>';
  var ICON = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7.5l8.5 6 8.5-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/><rect class="cut" x="5.2" y="9.5" width="2.6" height="8"/><circle class="cut" cx="6.5" cy="6.6" r="1.5"/><path class="cut" d="M10.2 9.5h2.5v1.1c.5-.8 1.4-1.3 2.6-1.3 2.2 0 3.1 1.4 3.1 3.7v4.5h-2.6v-4c0-1-.3-1.8-1.3-1.8s-1.7.7-1.7 1.9v3.9h-2.6z"/></svg>'
  };

  function navItems() {
    return pages.map(function (p) {
      return '<li><a href="' + p[1] + '"' + (p[2] === page ? ' aria-current="page"' : '') + '>' + p[0] + '</a></li>';
    }).join('');
  }
  function social() {
    return '<ul class="social">' +
      '<li><a href="' + LINKS.email + '" aria-label="Email">' + ICON.mail + '</a></li>' +
      '<li><a href="' + LINKS.linkedin + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' + ICON.linkedin + '</a></li>' +
      '</ul>';
  }
  var title = '<a class="site-title" href="index.html" aria-label="Chaitanya Deshpande, home">CD</a>';

  /* Desktop sidebar */
  var side = document.createElement('aside');
  side.className = 'sidebar-col';
  side.innerHTML =
    '<div class="site-sidebar">' +
    '<div class="site-top">' + title + '</div>' +
    '<nav class="site-nav" aria-label="Main"><ul>' + navItems() + '</ul></nav>' +
    '<div class="site-bottom">' + social() + '</div>' +
    '</div>';

  /* Mobile header */
  var hdr = document.createElement('header');
  hdr.className = 'site-header';
  hdr.innerHTML = title +
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
    '<div class="top">' + title +
    '<button class="icon-btn" id="menuClose" type="button" aria-label="Close menu">' + CLOSE + '</button></div>' +
    '<nav aria-label="Pages"><ul class="big">' + navItems() + '</ul></nav>' +
    social();

  /* Footer */
  var ftr = document.createElement('footer');
  ftr.className = 'site-footer';
  ftr.innerHTML = '<div class="foot"><span>\u00A9 ' + new Date().getFullYear() + ' Chaitanya Deshpande</span></div>';

  /* Animated dot, top right, lined up with CD */
  var dot = document.createElement('img');
  dot.className = 'corner-dot';
  dot.src = 'dot.gif';
  dot.alt = '';
  dot.width = 96;
  dot.height = 96;
  dot.setAttribute('aria-hidden', 'true');

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
  shell.appendChild(dot);
  document.body.insertBefore(shell, document.body.firstChild);
  document.body.appendChild(menu);

  /* Any link marked data-social gets your social address */
  Array.prototype.forEach.call(document.querySelectorAll('[data-social]'), function (a) {
    a.href = LINKS[a.getAttribute('data-social')] || '#';
  });

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
