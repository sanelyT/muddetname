function downloadIcon() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>`;
}

async function init() {
  const data = await fetch('versions.json').then(r => r.json());
  const latest = data.versions[0];

  document.getElementById('latest-version').textContent = 'v' + latest.version;
  document.getElementById('latest-date').textContent = latest.date;
  document.getElementById('latest-download').href = latest.download;
  document.getElementById('latest-download-label').textContent = `İndir — v${latest.version}`;

  if (latest.notes && latest.notes.length > 0) {
    const ul = document.createElement('ul');
    for (const note of latest.notes) {
      const li = document.createElement('li');
      li.textContent = note;
      ul.appendChild(li);
    }
    document.getElementById('latest-notes').appendChild(ul);
  } else {
    document.getElementById('latest-notes').style.display = 'none';
  }

  const historyBody = document.getElementById('history-body');
  for (const v of data.versions.slice(1)) {
    const row = document.createElement('div');
    row.className = 'history-row';

    const ver = document.createElement('div');
    ver.className = 'hist-version';
    ver.textContent = 'v' + v.version;

    const date = document.createElement('div');
    date.className = 'hist-date';
    date.textContent = v.date;

    const link = document.createElement('a');
    link.href = v.download;
    link.className = 'btn-small';
    link.innerHTML = downloadIcon();
    link.appendChild(document.createTextNode(' İndir'));

    row.appendChild(ver);
    row.appendChild(date);
    row.appendChild(link);
    historyBody.appendChild(row);
  }
}

init();
