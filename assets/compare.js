/* Relocation Guide — country comparison */
const Compare = {
  init() {
    const params = new URLSearchParams(location.search);
    const slots = ['compareA', 'compareB', 'compareC'];

    slots.forEach((id, i) => {
      const sel = document.getElementById(id);
      if (!sel) return;
      sel.innerHTML = '<option value="">— Выберите —</option>' +
        COUNTRIES.map(c => `<option value="${c.id}">${c.flag} ${c.name}</option>`).join('');
      sel.addEventListener('change', () => this.render());
    });

    const a = params.get('a');
    if (a && document.getElementById('compareA')) {
      document.getElementById('compareA').value = a;
    }
    this.render();
  },

  getSelected() {
    return ['compareA', 'compareB', 'compareC']
      .map(id => document.getElementById(id)?.value)
      .filter(Boolean)
      .map(id => App.getCountryById(id))
      .filter(Boolean);
  },

  render() {
    const countries = this.getSelected();
    const container = document.getElementById('compareTable');
    if (!container) return;

    if (countries.length < 2) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">⚖️</div><p>Выберите минимум 2 страны для сравнения</p></div>';
      return;
    }

    const rows = [
      { label: 'Регион', key: 'region' },
      { label: 'Виза', key: 'visa' },
      { label: 'Бюджет/мес', key: 'budget', fmt: v => '$' + v },
      { label: 'Сложность', key: 'difficulty', fmt: v => '★'.repeat(v) + '☆'.repeat(10 - v) },
      { label: 'Срок оформления', key: 'timeline' },
      { label: 'Язык', key: 'language' },
      { label: 'Климат', key: 'climate' },
      { label: 'Digital Nomad', key: 'nomadFriendly', fmt: v => v ? '✅ Да' : '❌ Нет' },
      { label: 'Путь в ЕС', key: 'euPath', fmt: v => v ? '✅ Да' : '❌ Нет' },
      { label: 'Рейтинг переезда', key: 'ratings.relocation', rating: true },
      { label: 'Льготы', key: 'ratings.benefits', rating: true },
      { label: 'Безопасность', key: 'ratings.safety', rating: true },
      { label: 'Медицина', key: 'ratings.healthcare', rating: true },
      { label: 'Налоги', key: 'ratings.taxes', rating: true },
      { label: 'Nomad', key: 'ratings.nomad', rating: true },
      { label: 'Климат (рейтинг)', key: 'ratings.climate', rating: true },
      { label: 'Сообщество', key: 'ratings.community', rating: true },
      { label: 'ИТОГО', key: 'avg', rating: true, bold: true }
    ];

    const getVal = (c, row) => {
      if (row.key === 'avg') return parseFloat(App.avgRating(c));
      if (row.rating) {
        const k = row.key.split('.')[1];
        return c.ratings[k];
      }
      const parts = row.key.split('.');
      let v = c;
      parts.forEach(p => v = v?.[p]);
      return row.fmt ? row.fmt(v) : v;
    };

    container.innerHTML = `
      <div class="card" style="overflow-x:auto;padding:0">
        <table class="compare-table">
          <thead><tr><th>Параметр</th>${countries.map(c => `<th>${c.flag} ${c.name}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(row => {
            const vals = countries.map(c => getVal(c, row));
            const numVals = row.rating ? vals.map(Number) : null;
            const max = numVals ? Math.max(...numVals) : null;
            return `<tr>
              <td>${row.label}</td>
              ${vals.map((v, i) => {
                const isWinner = numVals && numVals[i] === max && max > 0;
                return `<td class="${isWinner ? 'compare-winner' : ''}" ${row.bold ? 'style="font-weight:700;font-size:1.05rem"' : ''}>${v}</td>`;
              }).join('')}
            </tr>`;
          }).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:24px" class="card-grid">
        ${countries.map(c => `
          <div class="card" style="padding:20px">
            <h3>${c.flag} ${c.name}</h3>
            <p style="font-size:0.85rem;color:var(--text-secondary);margin:10px 0"><strong>Плюсы:</strong> ${c.pros.slice(0, 3).join(', ')}</p>
            <p style="font-size:0.85rem;color:var(--text-muted)"><strong>Минусы:</strong> ${c.cons.slice(0, 2).join(', ')}</p>
          </div>`).join('')}
      </div>`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('compareA')) Compare.init();
});
