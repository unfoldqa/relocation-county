/* Relocation Guide — budget calculator */
const Calculator = {
  init() {
    const params = new URLSearchParams(location.search);
    const countryId = params.get('country');

    const countrySelect = document.getElementById('calcCountry');
    if (countrySelect) {
      countrySelect.innerHTML = COUNTRIES.map(c =>
        `<option value="${c.id}" ${c.id === countryId ? 'selected' : ''}>${c.flag} ${c.name}</option>`
      ).join('');
      countrySelect.addEventListener('change', () => this.calculate());
    }

    ['calcPeople', 'calcMonths', 'calcRent', 'calcFood', 'calcTransport', 'calcHealth', 'calcOther'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.calculate());
    });

    this.calculate();
  },

  calculate() {
    const countryId = document.getElementById('calcCountry')?.value;
    const country = App.getCountryById(countryId) || COUNTRIES[0];
    const people = parseInt(document.getElementById('calcPeople')?.value || 1);
    const months = parseInt(document.getElementById('calcMonths')?.value || 6);

    const baseRent = country.budget * 0.35;
    const baseFood = country.budget * 0.25;
    const baseTransport = country.budget * 0.1;
    const baseHealth = country.budget * 0.08;
    const baseOther = country.budget * 0.22;

    const rentMult = (document.getElementById('calcRent')?.value || 50) / 50;
    const foodMult = (document.getElementById('calcFood')?.value || 50) / 50;
    const transportMult = (document.getElementById('calcTransport')?.value || 50) / 50;
    const healthMult = (document.getElementById('calcHealth')?.value || 50) / 50;
    const otherMult = (document.getElementById('calcOther')?.value || 50) / 50;

    const rent = Math.round(baseRent * rentMult * people);
    const food = Math.round(baseFood * foodMult * people);
    const transport = Math.round(baseTransport * transportMult);
    const health = Math.round(baseHealth * healthMult * people);
    const other = Math.round(baseOther * otherMult);
    const monthly = rent + food + transport + health + other;
    const relocation = Math.round(monthly * 2 + 1500);
    const total = monthly * months + relocation;

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setRange = (id, val) => { const el = document.getElementById(id + 'Val'); if (el) el.textContent = val; };

    setVal('resMonthly', App.formatMoney(monthly));
    setVal('resRelocation', App.formatMoney(relocation));
    setVal('resTotal', App.formatMoney(total));
    setVal('resRent', App.formatMoney(rent));
    setVal('resFood', App.formatMoney(food));
    setVal('resTransport', App.formatMoney(transport));
    setVal('resHealth', App.formatMoney(health));
    setVal('resOther', App.formatMoney(other));
    setVal('resPerDay', App.formatMoney(Math.round(monthly / 30)));

    ['calcRent', 'calcFood', 'calcTransport', 'calcHealth', 'calcOther'].forEach(id => {
      const el = document.getElementById(id);
      const labels = { calcRent: 'Эконом ↔ Премиум', calcFood: 'Готовим ↔ Рестораны', calcTransport: 'Минимум ↔ Аренда авто', calcHealth: 'Базовая ↔ Премиум', calcOther: 'Минимум ↔ Активный' };
      setRange(id, labels[id]?.split(' ↔ ')[el?.value > 50 ? 1 : 0] || '');
    });

    this.renderComparison(monthly, country);
  },

  renderComparison(monthly, current) {
    const container = document.getElementById('calcComparison');
    if (!container) return;

    const others = COUNTRIES.filter(c => c.id !== current.id)
      .map(c => ({ ...c, est: Math.round(c.budget * (monthly / current.budget)) }))
      .sort((a, b) => a.est - b.est)
      .slice(0, 5);

    container.innerHTML = `
      <h3 style="margin-bottom:14px">Тот же уровень жизни в других странах</h3>
      ${others.map(c => `
        <div class="breakdown-row">
          <span>${c.flag} ${c.name}</span>
          <span style="color:${c.est < monthly ? 'var(--success)' : 'var(--error)'}">${App.formatMoney(c.est)}/мес</span>
        </div>`).join('')}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('calcCountry')) Calculator.init();
});
