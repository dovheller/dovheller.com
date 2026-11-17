import legacy from './legacy.html?raw';
import contentStyles from './sections.css?raw';

const routes = ['home', 'about', 'capabilities', 'cyber', 'proofs', 'approach', 'contact'];
const base = 'https://dovheller.com';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const legacyClient = [...legacy.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const configureURL = `function pageUrl(route, language) {
  return new URL('/' + language + (route === 'home' ? '' : '/' + route), PUBLIC_SITE);
}
function restorePageFromUrl() {
  const [, language, route] = location.pathname.split('/');
  STATE.route = ROUTES.includes(route) ? route : 'home';
  STATE.lang = language === 'en' ? 'en' : 'he';
}`;
const app = legacyClient
  .replace(/function pageUrl\(route, language\)[\s\S]*?(?=    function renderCyberDashboard)/, configureURL + '\n\n')
  .replace(/(pageUrl\('[^']+', STATE.lang\))\.search/g, '$1.pathname');
const server = new Function(app.split("    window.addEventListener('popstate'")[0] + `
  return {STATE, DATA, renderHome, renderAbout, renderCyber, renderCapabilities, renderProofs, renderApproach, renderContact};
`)();

const client = app
  .replace(/    function navigate\(route\)[\s\S]*?(?=    function render\(\))/,
    `    function navigate(route) {
      location.assign(pageUrl(route, STATE.lang).pathname);
    }

`)
  .replace(/      const main = document\.getElementById\('main-content'\);[\s\S]*?(?=      bindViewEvents\(d\);)/,
    `      const views = {home: () => renderHome(d), about: () => renderAbout(d), capabilities: () => renderCapabilities(d),
        cyber: () => renderCyber(), proofs: () => renderProofs(d), approach: () => renderApproach(d), contact: () => renderContact(d)};
      if (views[STATE.route]) document.getElementById('main-content').innerHTML = views[STATE.route]();

`)
  .replace(/    document\.querySelectorAll\('\[data-route\]'\)\.forEach\(btn => \{\n      btn\.addEventListener.*?\n    \}\);\n    document\.getElementById\('lang-toggle'\)[\s\S]*?(?=    document\.getElementById\('mobile-menu-btn'\))/, '')
  .replace(/    \/\/ Consent banner[\s\S]*?(?=    restorePageFromUrl\(\);\n    render\(\);\s*$)/, '');

export function createShell({language, view, title, description, body}) {
  const lang = language === 'en' ? 'en' : 'he';
  const route = routes.includes(view) ? view : 'home';
  const path = (l, r) => '/' + l + (r === 'home' ? '' : '/' + r);
  const canonical = base + path(lang, route);
  const opposite = lang === 'he' ? 'en' : 'he';
  server.STATE.lang = lang;
  server.STATE.route = route;
  const data = server.DATA[lang];
  const fallback = {home: () => server.renderHome(data), about: () => server.renderAbout(data), cyber: () => server.renderCyber(),
    capabilities: () => server.renderCapabilities(data), proofs: () => server.renderProofs(data), approach: () => server.renderApproach(data), contact: () => server.renderContact(data)};
  const content = fallback[route]?.() || body?.trim() || '';
  const meta = (name, value) => '<meta ' + (name.startsWith('og:') ? 'property' : 'name') +
    '="' + name + '" content="' + escape(value) + '">';
  const og = base + '/og/' + lang + '.png';

  let html = legacy
    .replace('<html lang="he" dir="rtl">', '<html lang="' + lang + '" dir="' + (lang === 'he' ? 'rtl' : 'ltr') + '">')
    .replace(/  <title>[\s\S]*?(?=  <link rel="preload")/,
      '  <title>' + escape(title) + '</title>\n' + [
        meta('description', description), meta('og:title', title), meta('og:description', description),
        meta('og:site_name', 'HDIGITAL'), meta('og:type', 'website'), meta('og:url', canonical),
        meta('og:locale', lang === 'he' ? 'he_IL' : 'en_US'), meta('og:image', og), meta('og:image:width', 1200),
        meta('og:image:height', 630), meta('twitter:card', 'summary_large_image'), meta('twitter:image', og),
        '<link rel="canonical" href="' + canonical + '">',
        ...['he','en'].map(l => '<link rel="alternate" hreflang="' + l + '" href="' + base + path(l, route) + '">'),
        '<link rel="alternate" hreflang="x-default" href="' + base + path('he', route) + '">'
      ].join('\n') + '\n')
    .replace('  <link rel="preload"', () => `  <script>
    const legacyParams = new URLSearchParams(location.search);
    const legacyView = legacyParams.get('view');
    const legacyLang = legacyParams.get('lang');
    const validViews = ['about', 'capabilities', 'cyber', 'proofs', 'approach', 'contact'];
    if ((location.pathname === '/he' || location.pathname === '/en') && (legacyView || legacyLang)) {
      const lang = legacyLang === 'en' ? 'en' : legacyLang === 'he' ? 'he' : location.pathname.slice(1);
      const path = '/' + lang + (validViews.includes(legacyView) ? '/' + legacyView : '');
      if (path !== location.pathname) location.replace(path + location.hash);
    }
  </script>
  <link rel="preload"`)
    .replace(/  <script src="https:\/\/cdn.tailwindcss.com[^"]*"><\/script>\s*<script>\s*tailwind.config[\s\S]*?<\/script>/, '  <link rel="stylesheet" href="/styles/legacy.css">')
    .replace(legacyClient, () => client)
    .replace(/(<main id="main-content"[^>]*>)[\s\S]*?(<\/main>)/, (_, start, end) => start + content + end)
    .replace(/(src|href)="(assets\/[^"]+)"/g, '$1="/$2"')
    .replace(/<img src="\/assets\/hdigital-logo-opaque.png"[^>]*>/, '<img src="/assets/logo-96x48.png" srcset="/assets/logo-96x48.png 1x, /assets/logo-192x96.png 2x" alt="HDIGITAL" width="96" height="48" class="h-10 w-auto object-contain rounded-sm">')
    .replace(/<button type="button" data-route="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,
      (_, target, attrs, label) => '<a href="' + path(lang, target) + '" data-route="' + target + '"' +
        (target === route ? ' aria-current="page"' : '') + attrs.replace(/\bactive\s*/g, '').replace('class="nav-link ', target === route ? 'class="nav-link active ' : 'class="nav-link ') + '>' +
        (target === 'cyber' && label.includes('<span') ? label.replace(/<span>[^<]+<\/span>/, '<span>' + escape(data.nav.cyber) + '</span>') : escape(data.nav[target])) + '</a>')
    .replace(/<button id="lang-toggle" type="button"([^>]*)>[\s\S]*?<\/button>/,
      (_, attrs) => '<a id="lang-toggle" href="' + path(opposite, route) + '" hreflang="' + opposite + '"' + attrs + '>' + escape(data.nav.langBtn) + '</a>')
    .replace('  </style>', contentStyles + '\n  </style>');
  if (route === 'cyber') html = html.replace('<body class="', '<body class="cyber-mode ');
  return html;
}
