/* Relocation Guide — countries page */
const CountriesPage = {
  filters: { region: '', visa: '', budget: '', climate: '', nomad: '', eu: '', sort: 'rating' },
  filtered: [],

  init() {
    this.filtered = [...COUNTRIES];
    this.renderFilters();
    this.renderChips();
    this.applyFilters();
    this.renderRanking();

    if (location.hash) {
      const id = location.hash.slice(1);
      if (App.getCountryById(id)) this.openDetail(id);
    }
  },

  renderFilters() {
    const bar = document.getElementById('filtersBar');
    if (!bar) return;

    const regions = [...new Set(COUNTRIES.map(c => c.region))];
    bar.innerHTML = `
      <div class="filter-group">
        <label>Регион</label>
        <select id="fRegion"><option value="">Все</option>${regions.map(r => `<option value="${r}">${r}</option>`).join('')}</select>
      </div>
      <div class="filter-group">
        <label>Виза</label>
        <select id="fVisa">
          <option value="">Все</option>
          <option value="visa-free">Безвиз</option>
          <option value="evisa">e-Visa / по прилёту</option>
          <option value="schengen">Шенген / ВНЖ</option>
          <option value="immigration">Иммиграция</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Бюджет до</label>
        <select id="fBudget">
          <option value="">Любой</option>
          <option value="1000">$1 000</option>
          <option value="1500">$1 500</option>
          <option value="2000">$2 000</option>
          <option value="3000">$3 000</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Климат</label>
        <select id="fClimate">
          <option value="">Любой</option>
          <option value="warm">Тёплый</option>
          <option value="continental">Умеренный</option>
          <option value="cold">Холодный</option>
          <option value="hot">Жаркий</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Особенности</label>
        <select id="fNomad">
          <option value="">Все</option>
          <option value="nomad">Digital Nomad</option>
          <option value="eu">Путь в ЕС</option>
        </select>
      </div>`;

    bar.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', () => this.applyFilters());
    });
  },

  renderChips() {
    const chips = document.getElementById('filterChips');
    if (!chips) return;
    const presets = [
      { label: '⭐ Топ рейтинг', sort: 'rating' },
      { label: '💰 Бюджетные', budget: '1500' },
      { label: '🌴 Для номадов', nomad: 'nomad' },
      { label: '🇪🇺 Путь в ЕС', eu: 'eu' },
      { label: '✈️ Безвиз', visa: 'visa-free' },
      { label: '☀️ Тёплый климат', climate: 'warm' },
      { label: '🏥 Медицина', sort: 'healthcare' },
      { label: '💸 Налоги', sort: 'taxes' }
    ];
    chips.innerHTML = presets.map((p, i) =>
      `<button class="chip ${i === 0 ? 'active' : ''}" data-preset='${JSON.stringify(p)}'>${p.label}</button>`
    ).join('');

    chips.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const p = JSON.parse(chip.dataset.preset);
        this.filters = { region: '', visa: '', budget: '', climate: '', nomad: '', eu: '', sort: 'rating', ...p };
        this.syncFiltersUI();
        this.applyFilters();
      });
    });
  },

  syncFiltersUI() {
    const map = { fRegion: 'region', fVisa: 'visa', fBudget: 'budget', fClimate: 'climate' };
    Object.entries(map).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.value = this.filters[key] || '';
    });
    const nomad = document.getElementById('fNomad');
    if (nomad) {
      if (this.filters.nomad) nomad.value = 'nomad';
      else if (this.filters.eu) nomad.value = 'eu';
      else nomad.value = '';
    }
  },

  applyFilters() {
    const region = document.getElementById('fRegion')?.value || this.filters.region;
    const visa = document.getElementById('fVisa')?.value || this.filters.visa;
    const budget = document.getElementById('fBudget')?.value || this.filters.budget;
    const climate = document.getElementById('fClimate')?.value || this.filters.climate;
    const nomad = document.getElementById('fNomad')?.value || '';

    this.filtered = COUNTRIES.filter(c => {
      if (region && c.region !== region) return false;
      if (visa && c.visaType !== visa) return false;
      if (budget && c.budget > parseInt(budget)) return false;
      if (climate && c.climate !== climate) return false;
      if (nomad === 'nomad' && !c.nomadFriendly) return false;
      if (nomad === 'eu' && !c.euPath) return false;
      return true;
    });

    const sort = this.filters.sort || 'rating';
    if (sort === 'rating') {
      this.filtered.sort((a, b) => App.avgRating(b) - App.avgRating(a));
    } else if (sort === 'healthcare') {
      this.filtered.sort((a, b) => b.ratings.healthcare - a.ratings.healthcare);
    } else if (sort === 'taxes') {
      this.filtered.sort((a, b) => b.ratings.taxes - a.ratings.taxes);
    } else if (sort === 'budget') {
      this.filtered.sort((a, b) => a.budget - b.budget);
    }

    this.renderGrid();
    const count = document.getElementById('countryCount');
    if (count) count.textContent = this.filtered.length;
  },

  renderGrid() {
    const grid = document.getElementById('countriesGrid');
    if (!grid) return;
    if (!this.filtered.length) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>Нет стран по фильтрам. Попробуйте изменить критерии.</p></div>';
      return;
    }
    grid.innerHTML = this.filtered.map(c => App.renderCountryCard(c)).join('');
    grid.querySelectorAll('[data-country]').forEach(card => {
      card.addEventListener('click', () => this.openDetail(card.dataset.country));
    });
  },

  renderRanking() {
    const table = document.getElementById('rankingTable');
    if (!table) return;

    const sorted = [...COUNTRIES].sort((a, b) => App.avgRating(b) - App.avgRating(a));
    const medals = ['🥇', '🥈', '🥉'];

    table.innerHTML = `
      <table class="ranking-table">
        <thead><tr>
          <th>#</th><th>Страна</th><th>Переезд</th><th>Льготы</th><th>Налоги</th><th>Nomad</th><th>Итого</th><th>Бюджет</th>
        </tr></thead>
        <tbody>${sorted.map((c, i) => `
          <tr style="cursor:pointer" onclick="CountriesPage.openDetail('${c.id}')">
            <td class="rank-num">${i < 3 ? `<span class="rank-medal">${medals[i]}</span>` : i + 1}</td>
            <td>${c.flag} ${c.name}</td>
            <td>${c.ratings.relocation}</td>
            <td>${c.ratings.benefits}</td>
            <td>${c.ratings.taxes}</td>
            <td>${c.ratings.nomad}</td>
            <td><strong style="color:var(--accent)">${App.avgRating(c)}</strong></td>
            <td>$${c.budget}</td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  },

  openDetail(id) {
    const c = App.getCountryById(id);
    if (!c) return;
    App.visitCountry(id);

    const html = `
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <span style="font-size:3rem">${c.flag}</span>
        <div>
          <h2 style="margin:0">${c.name}</h2>
          <p style="color:var(--text-muted);font-size:0.9rem">${c.region} · ${c.visa}</p>
        </div>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">${c.description}</p>
      <div class="country-tags" style="margin-bottom:20px">
        <span class="tag accent">$${c.budget}/мес</span>
        <span class="tag">${c.timeline}</span>
        <span class="tag">${c.language}</span>
        <span class="tag">Сложность: ${'★'.repeat(c.difficulty)}${'☆'.repeat(10 - c.difficulty)}</span>
      </div>
      ${App.renderRatingBars(c, false)}
      <div class="pros-cons">
        <div><h4 style="color:var(--success)">✓ Плюсы</h4><ul class="pros-cons">${c.pros.map(p => `<li>${p}</li>`).join('')}</ul></div>
        <div><h4 style="color:var(--error)">✗ Минусы</h4><ul class="pros-cons cons-list">${c.cons.map(p => `<li>${p}</li>`).join('')}</ul></div>
      </div>
      <h4 style="margin:16px 0 8px">Пути переезда</h4>
      <div class="country-tags">${c.pathways.map(p => `<span class="tag">${p}</span>`).join('')}</div>
      <h4 style="margin:16px 0 8px">Telegram-каналы</h4>
      <div class="country-tags">${c.channels.map(ch => `<span class="tag accent">${ch}</span>`).join('')}</div>
      <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
        <a href="compare.html?a=${c.id}" class="btn btn-primary btn-sm">Сравнить</a>
        <a href="calculator.html?country=${c.id}" class="btn btn-secondary btn-sm">Калькулятор</a>
        <a href="roadmap.html?country=${c.id}" class="btn btn-secondary btn-sm">Roadmap</a>
        <button class="btn btn-sm ${App.isFavorite(c.id) ? 'btn-gold' : 'btn-secondary'}" onclick="CountriesPage.toggleFav('${c.id}', this)">${App.isFavorite(c.id) ? '★ В избранном' : '☆ В избранное'}</button>
      </div>`;

    App.openModal(html);
  },

  toggleFav(id, btn) {
    const fav = App.toggleFavorite(id);
    if (btn) btn.textContent = fav ? '★' : '☆';
    if (btn && btn.classList) {
      btn.classList.toggle('btn-gold', fav);
      btn.classList.toggle('btn-secondary', !fav);
    }
    this.applyFilters();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('countriesGrid')) CountriesPage.init();
});
