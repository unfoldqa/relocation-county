/* Relocation Guide — personalized roadmap */
const ROADMAP_STEPS = [
  { id: 'research', title: 'Исследование', desc: 'Изучите 3–5 стран: пройдите тесты, сравните рейтинги, почитайте Telegram-каналы.', duration: '1–2 недели', icon: '🔍' },
  { id: 'budget', title: 'Финансовый план', desc: 'Рассчитайте бюджет в калькуляторе. Накопите подушку на 3–6 месяцев + релокацию.', duration: '1–3 месяца', icon: '💰' },
  { id: 'income', title: 'Источник дохода', desc: 'Обеспечьте удалённый доход или найдите работодателя в целевой стране.', duration: '1–6 месяцев', icon: '💼' },
  { id: 'language', title: 'Язык', desc: 'Начните учить язык страны или английский. Минимум A2 для комфортной жизни.', duration: '2–6 месяцев', icon: '🗣️' },
  { id: 'documents', title: 'Документы', desc: 'Загранпаспорт, справки, апостили, переводы. Соберите пакет для визы.', duration: '2–4 недели', icon: '📄' },
  { id: 'visa', title: 'Виза / ВНЖ', desc: 'Подайте документы по выбранному пути. Отслеживайте статус.', duration: '1–6 месяцев', icon: '🛂' },
  { id: 'housing', title: 'Жильё', desc: 'Найдите жильё через Airbnb (первый месяц), затем долгосрочная аренда.', duration: '2–4 недели', icon: '🏠' },
  { id: 'banking', title: 'Банки и финансы', desc: 'Откройте счёт, оформите Wise/Revolut, настройте переводы.', duration: '1–2 недели', icon: '🏦' },
  { id: 'insurance', title: 'Страховка', desc: 'Медицинская страховка для визы и первых месяцев жизни.', duration: '1 неделя', icon: '🏥' },
  { id: 'move', title: 'Переезд!', desc: 'Билеты, багаж, прощание. Первые 2 недели — адаптация.', duration: '1 неделя', icon: '✈️' },
  { id: 'register', title: 'Регистрация', desc: 'Получите ВНЖ, зарегистрируйтесь, оформите налоговый статус.', duration: '2–4 недели', icon: '📋' },
  { id: 'community', title: 'Сообщество', desc: 'Вступите в экспат-чаты, найдите друзей, изучайте город.', duration: 'ongoing', icon: '👥' }
];

const Roadmap = {
  init() {
    const params = new URLSearchParams(location.search);
    const countryId = params.get('country');
    const country = countryId ? App.getCountryById(countryId) : null;

    const header = document.getElementById('roadmapHeader');
    if (header && country) {
      header.innerHTML = `<span class="section-tag">${country.flag} ${country.name}</span>
        <h2>Персональный план переезда</h2>
        <p class="lead">Путь: ${country.pathways[0]} · Срок: ${country.timeline} · Бюджет: $${country.budget}/мес</p>`;
    }

    this.render();
    this.updateProgress();
  },

  render() {
    const container = document.getElementById('roadmapTimeline');
    if (!container) return;

    container.innerHTML = ROADMAP_STEPS.map((step, i) => {
      const done = App.data.roadmapProgress[step.id];
      return `
        <div class="roadmap-step ${done ? 'done' : ''}" data-step="${step.id}">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span style="font-size:1.3rem">${step.icon}</span>
            <h3 style="margin:0">${i + 1}. ${step.title}</h3>
            <button class="btn btn-sm ${done ? 'btn-gold' : 'btn-secondary'}" style="margin-left:auto" onclick="Roadmap.toggle('${step.id}')">${done ? '✓ Готово' : 'Отметить'}</button>
          </div>
          <p>${step.desc}</p>
          <div class="step-meta"><span>⏱ ${step.duration}</span></div>
        </div>`;
    }).join('');
  },

  toggle(stepId) {
    App.toggleRoadmapStep(stepId);
    this.render();
    this.updateProgress();
  },

  updateProgress() {
    const done = Object.values(App.data.roadmapProgress).filter(Boolean).length;
    const total = ROADMAP_STEPS.length;
    const pct = Math.round((done / total) * 100);

    const fill = document.getElementById('roadmapProgress');
    const label = document.getElementById('roadmapProgressLabel');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = `${done}/${total} шагов (${pct}%)`;

    if (pct === 100) App.confetti();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('roadmapTimeline')) Roadmap.init();
});
