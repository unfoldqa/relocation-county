/* Relocation Guide — budget calculator with concrete options */
const CALC_OPTIONS = {
  city: [
    { id: 'capital', label: 'Столица', desc: 'Тбилиси, Бангкок, Белград…', mult: 1.15 },
    { id: 'mid', label: 'Средний город', desc: 'Батуми, Дананг, Нови-Сад…', mult: 0.88 },
    { id: 'resort', label: 'Курорт / пригород', desc: 'Пхукет, Бали, побережье', mult: 1.05 }
  ],
  people: [
    { id: '1', label: '1', value: 1 },
    { id: '2', label: '2', value: 2 },
    { id: '3', label: '3', value: 3 },
    { id: '4', label: '4+', value: 4 }
  ],
  months: [
    { id: '3', label: '3 мес.', value: 3 },
    { id: '6', label: '6 мес.', value: 6 },
    { id: '12', label: '1 год', value: 12 },
    { id: '24', label: '2 года', value: 24 }
  ],
  housing: [
    { id: 'room', label: 'Комната', desc: 'Shared flat, коливинг', share: 0.22 },
    { id: 'studio', label: 'Студия', desc: '1-комн., отдельный вход', share: 0.35 },
    { id: 'apt2', label: '2-комнатная', desc: 'Для пары или семьи', share: 0.48 },
    { id: 'premium', label: 'Премиум', desc: 'Центр, новострой, вид', share: 0.62 }
  ],
  food: [
    { id: 'home', label: 'Готовлю дома', desc: 'Рынок + супермаркет', share: 0.18 },
    { id: 'mix', label: 'Дом + кафе', desc: 'Обеды вне дома 2–3 раза', share: 0.25 },
    { id: 'eatout', label: 'Часто вне дома', desc: 'Рестораны почти каждый день', share: 0.38 },
    { id: 'family', label: 'Семейный', desc: 'Качественные продукты, дети', share: 0.32 }
  ],
  transport: [
    { id: 'walk', label: 'Пешком / метро', desc: 'Общественный транспорт', share: 0.05 },
    { id: 'scooter', label: 'Скутер / байк', desc: 'Аренда или свой', share: 0.09 },
    { id: 'taxi', label: 'Такси + каршеринг', desc: 'Смешанный режим', share: 0.14 },
    { id: 'car', label: 'Свой автомобиль', desc: 'Аренда авто + бензин', share: 0.22 }
  ],
  health: [
    { id: 'none', label: 'Без страховки', desc: 'Только аптека при необходимости', share: 0.03 },
    { id: 'travel', label: 'Туристическая', desc: 'Базовое покрытие на год', share: 0.06 },
    { id: 'local', label: 'Местная ОМС/частная', desc: 'Стандартный полис', share: 0.10 },
    { id: 'premium', label: 'Премиум', desc: 'Международная, стоматология', share: 0.16 }
  ],
  lifestyle: [
    { id: 'minimal', label: 'Минимум', desc: 'Только необходимое', share: 0.10 },
    { id: 'standard', label: 'Стандарт', desc: 'Связь, одежда, быт', share: 0.18 },
    { id: 'active', label: 'Активный', desc: 'Спорт, кино, развлечения', share: 0.28 },
    { id: 'comfort', label: 'Комфорт', desc: 'Премиум-быт, подписки, хобби', share: 0.38 }
  ],
  flight: [
    { id: 'oneway', label: 'Туда (1 чел.)', fixed: 350 },
    { id: 'round', label: 'Туда-обратно (1 чел.)', fixed: 600 },
    { id: 'family2', label: 'Семья 2 чел.', fixed: 1100 },
    { id: 'family4', label: 'Семья 4 чел.', fixed: 2000 }
  ],
  visa: [
    { id: 'free', label: 'Не нужна', fixed: 0 },
    { id: 'low', label: 'До $300', fixed: 150 },
    { id: 'mid', label: '$300–1000', fixed: 600 },
    { id: 'high', label: 'От $1000', fixed: 1500 }
  ],
  deposit: [
    { id: 'none', label: 'Без депозита', mult: 0 },
    { id: '1mo', label: '1 месяц аренды', mult: 1 },
    { id: '2mo', label: '2 месяца аренды', mult: 2 }
  ],
  setup: [
    { id: 'min', label: 'Минимум', desc: 'Чемодан, SIM, базовый быт', fixed: 300 },
    { id: 'std', label: 'Стандарт', desc: 'Мебель, техника, посуда', fixed: 800 },
    { id: 'full', label: 'С нуля', desc: 'Полное обустройство квартиры', fixed: 2000 }
  ],
  children: [
    { id: '0', label: 'Нет детей', value: 0, costPer: 0 },
    { id: '1', label: '1 ребёнок', value: 1, costPer: 0.18 },
    { id: '2', label: '2 детей', value: 2, costPer: 0.16 },
    { id: '3', label: '3+ детей', value: 3, costPer: 0.14 }
  ],
  coworking: [
    { id: 'no', label: 'Не нужен', fixed: 0 },
    { id: 'occasional', label: 'Иногда', fixed: 80 },
    { id: 'monthly', label: 'Абонемент', fixed: 180 },
    { id: 'premium', label: 'Премиум-коворкинг', fixed: 350 }
  ]
};

const Calculator = {
  state: {
    country: 'georgia',
    city: 'capital',
    people: '1',
    months: '6',
    housing: 'studio',
    food: 'mix',
    transport: 'walk',
    health: 'travel',
    lifestyle: 'standard',
    flight: 'round',
    visa: 'free',
    deposit: '1mo',
    setup: 'std',
    children: '0',
    coworking: 'no'
  },

  init() {
    const params = new URLSearchParams(location.search);
    if (params.get('country')) this.state.country = params.get('country');
    this.renderForm();
    this.calculate();
  },

  renderForm() {
    const form = document.getElementById('calcForm');
    if (!form) return;

    const countryOpts = COUNTRIES.map(c =>
      `<option value="${c.id}" ${c.id === this.state.country ? 'selected' : ''}>${c.flag} ${c.name} · от $${c.budget}/мес</option>`
    ).join('');

    form.innerHTML = `
      <div class="calc-section">
        <div class="calc-section-title">Куда переезжаем</div>
        <div class="calc-field">
          <label>Страна</label>
          <select id="calcCountry">${countryOpts}</select>
        </div>
        ${this.renderPills('city', 'Тип города', CALC_OPTIONS.city)}
      </div>

      <div class="calc-section">
        <div class="calc-section-title">Состав и срок</div>
        <div class="calc-row">
          <div>${this.renderPills('people', 'Взрослых', CALC_OPTIONS.people)}</div>
          <div>${this.renderPills('children', 'Дети', CALC_OPTIONS.children)}</div>
        </div>
        ${this.renderPills('months', 'На сколько планируете', CALC_OPTIONS.months)}
      </div>

      <div class="calc-section">
        <div class="calc-section-title">Жильё</div>
        ${this.renderOptions('housing', CALC_OPTIONS.housing, 'housing')}
      </div>

      <div class="calc-section">
        <div class="calc-section-title">Питание</div>
        ${this.renderOptions('food', CALC_OPTIONS.food, 'food')}
      </div>

      <div class="calc-section">
        <div class="calc-section-title">Транспорт</div>
        ${this.renderOptions('transport', CALC_OPTIONS.transport, 'transport')}
      </div>

      <div class="calc-section">
        <div class="calc-row">
          <div>
            <div class="calc-section-title">Медицина</div>
            ${this.renderOptions('health', CALC_OPTIONS.health, 'health')}
          </div>
          <div>
            <div class="calc-section-title">Коворкинг</div>
            ${this.renderOptions('coworking', CALC_OPTIONS.coworking, 'coworking')}
          </div>
        </div>
      </div>

      <div class="calc-section">
        <div class="calc-section-title">Быт, связь, досуг</div>
        ${this.renderOptions('lifestyle', CALC_OPTIONS.lifestyle, 'lifestyle')}
      </div>

      <div class="calc-section">
        <div class="calc-section-title">Разовые расходы на переезд</div>
        <div class="calc-field" style="margin-bottom:14px">
          <label>Перелёт</label>
          <div class="calc-options">${CALC_OPTIONS.flight.map(o => this.optionCard('flight', o, 'fixed')).join('')}</div>
        </div>
        <div class="calc-field" style="margin-bottom:14px">
          <label>Виза и документы</label>
          <div class="calc-options">${CALC_OPTIONS.visa.map(o => this.optionCard('visa', o, 'fixed')).join('')}</div>
        </div>
        <div class="calc-field" style="margin-bottom:14px">
          <label>Депозит за жильё</label>
          <div class="calc-options">${CALC_OPTIONS.deposit.map(o => `
            <div class="calc-option ${this.state.deposit === o.id ? 'selected' : ''}" data-group="deposit" data-id="${o.id}">
              <span class="opt-label">${o.label}</span>
              <span class="opt-desc">${o.mult === 0 ? 'Хостел, у знакомых' : o.mult === 1 ? 'Стандартный договор' : 'Часто в Европе'}</span>
            </div>`).join('')}</div>
        </div>
        <div class="calc-field">
          <label>Обустройство</label>
          <div class="calc-options">${CALC_OPTIONS.setup.map(o => this.optionCard('setup', o, 'fixed')).join('')}</div>
        </div>
      </div>`;

    form.querySelector('#calcCountry')?.addEventListener('change', e => {
      this.state.country = e.target.value;
      this.calculate();
    });

    form.querySelectorAll('.calc-option').forEach(el => {
      el.addEventListener('click', () => {
        const group = el.dataset.group;
        const id = el.dataset.id;
        this.state[group] = id;
        form.querySelectorAll(`.calc-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        this.calculate();
      });
    });

    form.querySelectorAll('.calc-pill').forEach(el => {
      el.addEventListener('click', () => {
        const group = el.dataset.group;
        const id = el.dataset.id;
        this.state[group] = id;
        form.querySelectorAll(`.calc-pill[data-group="${group}"]`).forEach(p => p.classList.remove('selected'));
        el.classList.add('selected');
        this.calculate();
      });
    });
  },

  renderPills(group, title, options) {
    return `
      <div class="calc-field">
        <label>${title}</label>
        <div class="calc-pills">
          ${options.map(o => `
            <button type="button" class="calc-pill ${this.state[group] === o.id ? 'selected' : ''}"
              data-group="${group}" data-id="${o.id}">${o.label}</button>`).join('')}
        </div>
      </div>`;
  },

  renderOptions(group, options, priceKey) {
    const country = App.getCountryById(this.state.country) || COUNTRIES[0];
    const cityMult = CALC_OPTIONS.city.find(c => c.id === this.state.city)?.mult || 1;
    const base = country.budget * cityMult;

    return `<div class="calc-options">
      ${options.map(o => {
        const price = priceKey === 'coworking'
          ? o.fixed
          : Math.round(base * (o.share || 0));
        return this.optionCard(group, o, null, price);
      }).join('')}
    </div>`;
  },

  optionCard(group, opt, priceType, price) {
    const priceLabel = priceType === 'fixed'
      ? App.formatMoney(opt.fixed)
      : price != null ? `~${App.formatMoney(price)}/мес` : '';
    return `
      <div class="calc-option ${this.state[group] === opt.id ? 'selected' : ''}" data-group="${group}" data-id="${opt.id}">
        <span class="opt-label">${opt.label}</span>
        ${opt.desc ? `<span class="opt-desc">${opt.desc}</span>` : ''}
        ${priceLabel ? `<span class="opt-price">${priceLabel}</span>` : ''}
      </div>`;
  },

  getOpt(group) {
    const lists = CALC_OPTIONS;
    for (const key of Object.keys(lists)) {
      const found = lists[key].find(o => o.id === this.state[group]);
      if (found) return found;
    }
    return null;
  },

  calculate() {
    const country = App.getCountryById(this.state.country) || COUNTRIES[0];
    const cityMult = this.getOpt('city')?.mult || 1;
    const people = this.getOpt('people')?.value || 1;
    const months = this.getOpt('months')?.value || 6;
    const childOpt = this.getOpt('children');
    const children = childOpt?.value || 0;

    const base = country.budget * cityMult;

    const rent = Math.round(base * (this.getOpt('housing')?.share || 0.35));
    const food = Math.round(base * (this.getOpt('food')?.share || 0.25) * (people + children * 0.6));
    const transport = Math.round(base * (this.getOpt('transport')?.share || 0.1));
    const health = Math.round(base * (this.getOpt('health')?.share || 0.08) * (people + children));
    const other = Math.round(base * (this.getOpt('lifestyle')?.share || 0.18) * people);
    const coworking = this.getOpt('coworking')?.fixed || 0;
    const childCost = children > 0 ? Math.round(base * (childOpt.costPer || 0.15) * children) : 0;

    const monthly = rent + food + transport + health + other + coworking + childCost;

    const flight = this.getOpt('flight')?.fixed || 0;
    const visa = this.getOpt('visa')?.fixed || 0;
    const depositMult = this.getOpt('deposit')?.mult || 1;
    const deposit = Math.round(rent * depositMult);
    const setup = this.getOpt('setup')?.fixed || 0;
    const relocation = flight + visa + deposit + setup;

    const total = monthly * months + relocation;
    const cushion = Math.round(monthly * 3);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set('resMonthly', App.formatMoney(monthly));
    set('resPerDay', App.formatMoney(Math.round(monthly / 30)));
    set('resPerPerson', App.formatMoney(Math.round(monthly / Math.max(people + children, 1))));
    set('resRent', App.formatMoney(rent));
    set('resFood', App.formatMoney(food));
    set('resTransport', App.formatMoney(transport));
    set('resHealth', App.formatMoney(health));
    set('resOther', App.formatMoney(other));
    set('resFlight', App.formatMoney(flight));
    set('resVisa', App.formatMoney(visa));
    set('resDeposit', App.formatMoney(deposit));
    set('resSetup', App.formatMoney(setup));
    set('resRelocation', App.formatMoney(relocation));
    set('resTotal', App.formatMoney(total));
    set('resMonthsLabel', months);
    set('resCushion', `Рекомендуемая подушка: ${App.formatMoney(cushion)} (3 мес. расходов) · Итого с подушкой: ${App.formatMoney(total + cushion)}`);

    const cwRow = document.getElementById('resCoworkingRow');
    const chRow = document.getElementById('resChildRow');
    if (cwRow) {
      cwRow.style.display = coworking > 0 ? 'flex' : 'none';
      set('resCoworking', App.formatMoney(coworking));
    }
    if (chRow) {
      chRow.style.display = childCost > 0 ? 'flex' : 'none';
      set('resChild', App.formatMoney(childCost));
    }

    this.renderComparison(monthly, country);
    this.updateOptionPrices();
  },

  updateOptionPrices() {
    const country = App.getCountryById(this.state.country) || COUNTRIES[0];
    const cityMult = this.getOpt('city')?.mult || 1;
    const base = country.budget * cityMult;

    ['housing', 'food', 'transport', 'health', 'lifestyle'].forEach(group => {
      const opts = CALC_OPTIONS[group];
      const cards = document.querySelectorAll(`.calc-option[data-group="${group}"]`);
      cards.forEach((card, i) => {
        const priceEl = card.querySelector('.opt-price');
        if (priceEl && opts[i]) {
          priceEl.textContent = `~${App.formatMoney(Math.round(base * opts[i].share))}/мес`;
        }
      });
    });
  },

  renderComparison(monthly, current) {
    const container = document.getElementById('calcComparison');
    if (!container) return;

    const cityMult = this.getOpt('city')?.mult || 1;
    const ratio = monthly / (current.budget * cityMult);

    const others = COUNTRIES.filter(c => c.id !== current.id)
      .map(c => ({ ...c, est: Math.round(c.budget * cityMult * ratio) }))
      .sort((a, b) => a.est - b.est)
      .slice(0, 6);

    container.innerHTML = `
      <h3 style="margin-bottom:6px">Тот же образ жизни в других странах</h3>
      <p class="calc-hint" style="margin-bottom:14px">При выбранных параметрах (${this.getOpt('housing')?.label}, ${this.getOpt('food')?.label})</p>
      ${others.map(c => `
        <div class="breakdown-row">
          <span>${c.flag} ${c.name}</span>
          <span style="color:${c.est < monthly ? 'var(--success)' : 'var(--error)'}">${App.formatMoney(c.est)}/мес</span>
        </div>`).join('')}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('calcForm')) Calculator.init();
});
