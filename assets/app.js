/* Relocation Guide — shared app logic */
const STORAGE_KEY = 'relocation_guide_v1';

const App = {
  data: null,

  init() {
    this.data = this.load();
    this.setActiveNav();
    this.updateAchievements();
    return this.data;
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : this.defaultData();
    } catch {
      return this.defaultData();
    }
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    this.updateAchievements();
  },

  defaultData() {
    return {
      favorites: [],
      completedQuizzes: [],
      readinessScore: null,
      quizResults: {},
      roadmapProgress: {},
      visitedCountries: [],
      achievements: [],
      profile: {}
    };
  },

  setActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  },

  toggleFavorite(id) {
    const idx = this.data.favorites.indexOf(id);
    if (idx >= 0) this.data.favorites.splice(idx, 1);
    else this.data.favorites.push(id);
    this.save();
    this.checkAchievement('first_favorite', this.data.favorites.length >= 1);
    return this.data.favorites.includes(id);
  },

  isFavorite(id) {
    return this.data.favorites.includes(id);
  },

  saveQuizResult(quizId, result) {
    this.data.quizResults[quizId] = result;
    if (!this.data.completedQuizzes.includes(quizId)) {
      this.data.completedQuizzes.push(quizId);
    }
    this.save();
    this.checkAchievement('first_quiz', this.data.completedQuizzes.length >= 1);
    this.checkAchievement('quiz_master', this.data.completedQuizzes.length >= 5);
  },

  setReadiness(score) {
    this.data.readinessScore = score;
    this.save();
  },

  toggleRoadmapStep(stepId) {
    this.data.roadmapProgress[stepId] = !this.data.roadmapProgress[stepId];
    this.save();
    const done = Object.values(this.data.roadmapProgress).filter(Boolean).length;
    this.checkAchievement('roadmap_start', done >= 1);
    this.checkAchievement('roadmap_half', done >= 5);
  },

  visitCountry(id) {
    if (!this.data.visitedCountries.includes(id)) {
      this.data.visitedCountries.push(id);
      this.save();
      this.checkAchievement('explorer', this.data.visitedCountries.length >= 5);
    }
  },

  checkAchievement(id, condition) {
    if (condition && !this.data.achievements.includes(id)) {
      this.data.achievements.push(id);
      this.save();
      this.showAchievementToast(id);
    }
  },

  showAchievementToast(id) {
    const names = {
      first_favorite: { icon: '⭐', title: 'Первый выбор' },
      first_quiz: { icon: '🧪', title: 'Исследователь' },
      quiz_master: { icon: '🏆', title: 'Мастер тестов' },
      roadmap_start: { icon: '🗺️', title: 'Путь начат' },
      roadmap_half: { icon: '🚀', title: 'На полпути' },
      explorer: { icon: '🌍', title: 'Исследователь мира' }
    };
    const ach = names[id];
    if (!ach) return;
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:400;background:var(--bg-card);border:1px solid var(--gold);border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:12px;box-shadow:var(--shadow-lg);animation:slideIn 0.4s ease';
    toast.innerHTML = `<span style="font-size:1.5rem">${ach.icon}</span><div><div style="font-weight:700;color:var(--gold)">Достижение!</div><div style="font-size:0.85rem;color:var(--text-secondary)">${ach.title}</div></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  },

  updateAchievements() {
    document.querySelectorAll('[data-achievement]').forEach(el => {
      const id = el.dataset.achievement;
      if (this.data.achievements.includes(id)) el.classList.add('unlocked');
    });
  },

  getCountryById(id) {
    return COUNTRIES.find(c => c.id === id);
  },

  avgRating(country) {
    const r = country.ratings;
    return ((r.relocation + r.benefits + r.safety + r.healthcare + r.taxes + r.nomad + r.climate + r.community) / 8).toFixed(1);
  },

  renderRatingBars(country, compact) {
    const labels = {
      relocation: 'Переезд', benefits: 'Льготы', safety: 'Безопасность',
      healthcare: 'Медицина', taxes: 'Налоги', nomad: 'Номады',
      climate: 'Климат', community: 'Сообщество'
    };
    const entries = compact
      ? Object.entries(country.ratings).slice(0, 4)
      : Object.entries(country.ratings);
    return `<div class="rating-bars">${entries.map(([k, v]) => `
      <div class="rating-row">
        <span class="rating-label">${labels[k]}</span>
        <div class="rating-track"><div class="rating-fill" style="width:${v * 10}%"></div></div>
        <span class="rating-val">${v}</span>
      </div>`).join('')}</div>`;
  },

  renderCountryCard(country) {
    const avg = this.avgRating(country);
    const fav = this.isFavorite(country.id);
    return `
      <div class="card country-card card-hover" data-country="${country.id}">
        <div class="country-header">
          <span class="country-flag">${country.flag}</span>
          <div>
            <div class="country-name">${country.name}</div>
            <div class="country-region">${country.region} · ${country.visa}</div>
          </div>
          <div class="country-score">
            <div class="score-circle" style="--pct:${avg * 10}"><span>${avg}</span></div>
          </div>
        </div>
        <div class="country-tags">
          <span class="tag accent">$${country.budget}/мес</span>
          <span class="tag">${country.timeline}</span>
          ${country.nomadFriendly ? '<span class="tag gold">Nomad</span>' : ''}
          ${country.euPath ? '<span class="tag">ЕС</span>' : ''}
        </div>
        <p class="country-pros">${country.pros.slice(0, 2).join(' · ')}</p>
        ${this.renderRatingBars(country, true)}
        <div style="margin-top:14px;display:flex;gap:8px">
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();CountriesPage.openDetail('${country.id}')">Подробнее</button>
          <button class="btn btn-sm ${fav ? 'btn-gold' : 'btn-secondary'}" onclick="event.stopPropagation();CountriesPage.toggleFav('${country.id}', this)">${fav ? '★' : '☆'}</button>
        </div>
      </div>`;
  },

  openModal(html) {
    let overlay = document.getElementById('modalOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'modalOverlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = '<div class="modal" id="modalContent"></div>';
      overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
      document.body.appendChild(overlay);
    }
    document.getElementById('modalContent').innerHTML = html + '<button class="modal-close" onclick="App.closeModal()">×</button>';
    overlay.classList.add('open');
  },

  closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('open');
  },

  confetti() {
    const colors = ['#14b8a6', '#fbbf24', '#34d399', '#60a5fa', '#f472b6'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-10px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2500);
    }
  },

  formatMoney(n) {
    return '$' + n.toLocaleString('en-US');
  }
};

function initMobileNav() {
  const btn = document.querySelector('.mobile-nav-btn');
  const menu = document.querySelector('.mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
  initMobileNav();
});

const style = document.createElement('style');
style.textContent = '@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}';
document.head.appendChild(style);
