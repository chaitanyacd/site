/* Chaitanya · shared header, full-screen menu and footer */
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

  var mark = '<svg class="mark" viewBox="0 0 36 22" aria-hidden="true">' +
    '<rect x="0" y="6" width="6" height="16" fill="#EF4B3C"/>' +
    '<rect x="6" y="0" width="6" height="22" fill="#FFBD17"/>' +
    '<rect x="12" y="10" width="6" height="12" fill="#1973C0"/>' +
    '<rect x="18" y="3" width="6" height="19" fill="#1DA849"/>' +
    '<rect x="24" y="8" width="6" height="14" fill="#F9B6B1"/>' +
    '<rect x="30" y="12" width="6" height="10" fill="#E8C5AC"/></svg>';
  var logo = '<a class="site-logo" href="index.html">' + mark + '<span>Chaitanya</span></a>';

  var hdr = document.createElement('header');
  hdr.className = 'site-hdr' + (page === 'home' ? ' over' : '');
  hdr.innerHTML = logo +
    '<button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="siteMenu">Menu</button>';

  var menu = document.createElement('div');
  menu.className = 'site-menu';
  menu.id = 'siteMenu';
  menu.hidden = true;
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-modal', 'true');
  menu.setAttribute('aria-label', 'Menu');
  menu.innerHTML =
    '<div class="site-menu-top">' + logo + '<button class="menu-btn" id="menuClose" type="button">Close</button></div>' +
    '<nav aria-label="Pages"><ul class="big">' +
    pages.map(function (p) {
      return '<li><a href="' + p[1] + '"' + (p[2] === page ? ' aria-current="page"' : '') + '>' + p[0] + '</a></li>';
    }).join('') +
    '</ul></nav>' +
    '<ul class="small">' +
    elsewhere.map(function (e) {
      return '<li><a href="' + e[1] + '" target="_blank" rel="noopener noreferrer">' + e[0] + ' \u2197</a></li>';
    }).join('') +
    '</ul>';

  var ftr = document.createElement('footer');
  ftr.className = 'site-ftr';
  ftr.textContent = '\u00A9 ' + new Date().getFullYear() + ' Chaitanya Deshpande';

  document.body.insertBefore(hdr, document.body.firstChild);
  document.body.appendChild(menu);
  document.body.appendChild(ftr);

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
