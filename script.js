function downloadIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>`;
}

function appOf(versions, id) {
  return versions.find(v => (v.app || 'muddetname') === id);
}

function buildCard(app, latest) {
  const card = document.createElement('div');
  card.className = 'app-card' + (app.accent === 'cyan' ? ' cyan-card' : '');

  const head = document.createElement('div');
  head.className = 'app-head';

  const icon = document.createElement('div');
  icon.className = 'app-icon';
  icon.textContent = app.icon || '📦';

  const headText = document.createElement('div');

  const title = document.createElement('div');
  title.className = 'app-title';
  title.textContent = app.name;

  const sub = document.createElement('div');
  sub.className = 'app-sub';

  const version = document.createElement('span');
  version.className = 'app-version';
  version.textContent = 'v' + latest.version;

  const date = document.createElement('span');
  date.className = 'app-date';
  date.textContent = latest.date;

  const badge = document.createElement('span');
  badge.className = 'badge-latest';
  badge.textContent = 'GÜNCEL';

  sub.appendChild(version);
  sub.appendChild(date);
  sub.appendChild(badge);
  headText.appendChild(title);
  headText.appendChild(sub);
  head.appendChild(icon);
  head.appendChild(headText);

  const desc = document.createElement('p');
  desc.className = 'app-desc';
  desc.innerHTML = app.description || '';

  const shot = document.createElement('div');
  shot.className = 'shot';
  if (app.screenshot) {
    const img = document.createElement('img');
    img.src = app.screenshot;
    img.alt = app.name + ' ekran görüntüsü';
    shot.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'shot-placeholder';
    ph.innerHTML = `<div class="ph-icon">${app.icon || '📦'}</div>
      <div class="ph-text">${(app.name || '').toUpperCase()} ÖNİZLEME</div>`;
    shot.appendChild(ph);
  }

  const row = document.createElement('div');
  row.className = 'download-row';

  const link = document.createElement('a');
  link.href = latest.download;
  link.className = 'btn-download';
  link.innerHTML = downloadIcon();
  const label = document.createElement('span');
  label.textContent = 'İndir — v' + latest.version;
  link.appendChild(label);

  row.appendChild(link);

  card.appendChild(head);
  card.appendChild(desc);
  card.appendChild(shot);
  card.appendChild(row);
  return card;
}

function buildHistoryRow(apps, v) {
  const appId = v.app || 'muddetname';
  const app = apps.find(a => a.id === appId) || { name: appId };

  const row = document.createElement('div');
  row.className = 'history-row';

  const appCell = document.createElement('div');
  appCell.className = 'hist-app ' + (app.accent === 'cyan' ? 'nob' : 'mud');
  appCell.textContent = app.name.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '');

  const ver = document.createElement('div');
  ver.className = 'hist-version';
  ver.textContent = 'v' + v.version;

  const date = document.createElement('div');
  date.className = 'hist-date';
  date.textContent = v.date;

  const linkCell = document.createElement('div');
  const link = document.createElement('a');
  link.href = v.download;
  link.className = 'btn-small' + (app.accent === 'cyan' ? ' nob' : '');
  link.innerHTML = downloadIcon();
  link.appendChild(document.createTextNode(' İndir'));
  linkCell.appendChild(link);

  row.appendChild(appCell);
  row.appendChild(ver);
  row.appendChild(date);
  row.appendChild(linkCell);
  return row;
}

async function init() {
  const data = await fetch('versions.json').then(r => r.json());
  const apps = data.apps || [];
  const versions = data.versions || [];

  const grid = document.getElementById('apps-grid');
  for (const app of apps) {
    const latest = appOf(versions, app.id);
    if (latest) grid.appendChild(buildCard(app, latest));
  }

  const body = document.getElementById('history-body');
  for (const v of versions) {
    body.appendChild(buildHistoryRow(apps, v));
  }
}

init();
