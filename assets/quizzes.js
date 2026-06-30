/* Relocation Guide — quizzes */
const QUIZZES = {
  country_match: {
    title: 'Какая страна вам подходит?',
    icon: '🌍',
    desc: '12 вопросов о вашем образе жизни, бюджете и приоритетах',
    questions: [
      { q: 'Какой у вас ежемесячный бюджет на жизнь?', options: [
        { text: 'До $1 000', scores: { kyrgyzstan: 3, uzbekistan: 3, vietnam: 3, argentina: 2, bali: 2 } },
        { text: '$1 000 – $1 800', scores: { georgia: 3, armenia: 3, vietnam: 2, kazakhstan: 2, thailand: 2, mexico: 2 } },
        { text: '$1 800 – $2 800', scores: { serbia: 3, portugal: 2, spain: 2, turkey: 2, czech: 2 } },
        { text: 'Более $3 000', scores: { uae: 3, germany: 2, canada: 2, cyprus: 2, malta: 2 } }
      ]},
      { q: 'Что для вас важнее всего?', options: [
        { text: 'Минимум бюрократии', scores: { georgia: 3, armenia: 3, kyrgyzstan: 2, bali: 2 } },
        { text: 'Европа и Шенген', scores: { portugal: 3, spain: 3, czech: 2, estonia: 2, poland: 2 } },
        { text: 'Тёплый климат и море', scores: { thailand: 3, vietnam: 3, bali: 3, cyprus: 2, turkey: 2, mexico: 2 } },
        { text: 'Нулевые налоги', scores: { uae: 3, georgia: 2, cyprus: 2, thailand: 2 } }
      ]},
      { q: 'Ваш уровень английского?', options: [
        { text: 'Не говорю', scores: { georgia: 2, armenia: 3, kazakhstan: 2, latvia: 2 } },
        { text: 'Базовый', scores: { turkey: 2, thailand: 2, serbia: 2, montenegro: 2 } },
        { text: 'Средний', scores: { portugal: 2, spain: 2, uae: 2, malta: 2, cyprus: 2 } },
        { text: 'Свободный', scores: { uae: 2, malta: 3, cyprus: 2, canada: 2, estonia: 2 } }
      ]},
      { q: 'Ваш формат работы?', options: [
        { text: 'Удалённый фриланс / ИП', scores: { georgia: 3, portugal: 3, spain: 3, bali: 3, thailand: 2 } },
        { text: 'Найм в местной компании', scores: { germany: 3, poland: 2, czech: 2, uae: 2 } },
        { text: 'Свой бизнес', scores: { uae: 3, estonia: 2, serbia: 2, cyprus: 2 } },
        { text: 'Пенсия / пассивный доход', scores: { portugal: 3, turkey: 2, thailand: 2, mexico: 2 } }
      ]},
      { q: 'Насколько важно русскоязычное сообщество?', options: [
        { text: 'Критически важно', scores: { armenia: 3, georgia: 2, kazakhstan: 2, latvia: 2, israel: 2 } },
        { text: 'Желательно', scores: { serbia: 2, montenegro: 2, cyprus: 2, turkey: 2 } },
        { text: 'Не важно', scores: { portugal: 2, thailand: 2, bali: 3, mexico: 2 } },
        { text: 'Хочу полное погружение', scores: { germany: 2, finland: 2, argentina: 2 } }
      ]},
      { q: 'Как относитесь к холоду?', options: [
        { text: 'Только тепло круглый год', scores: { thailand: 3, bali: 3, uae: 2, cyprus: 2 } },
        { text: 'Умеренный климат', scores: { portugal: 3, spain: 3, georgia: 2, turkey: 2 } },
        { text: 'Не принципиально', scores: { serbia: 2, czech: 2, mexico: 2 } },
        { text: 'Люблю север', scores: { finland: 3, estonia: 2, latvia: 2, canada: 2 } }
      ]},
      { q: 'Есть ли дети?', options: [
        { text: 'Да, школьники', scores: { portugal: 2, germany: 3, canada: 3, czech: 2 } },
        { text: 'Да, дошкольники', scores: { georgia: 2, armenia: 2, serbia: 2, turkey: 2 } },
        { text: 'Планируем', scores: { portugal: 2, spain: 2, cyprus: 2 } },
        { text: 'Нет', scores: { bali: 2, thailand: 2, uae: 2, estonia: 2 } }
      ]},
      { q: 'Готовы ждать оформления визы?', options: [
        { text: 'Нужно быстро (до месяца)', scores: { georgia: 3, armenia: 3, kyrgyzstan: 2, bali: 2 } },
        { text: '2–4 месяца нормально', scores: { serbia: 2, turkey: 2, thailand: 2, mexico: 2 } },
        { text: 'Готов ждать полгода+', scores: { portugal: 3, spain: 2, germany: 2, canada: 3 } },
        { text: 'Зависит от страны', scores: { uae: 2, cyprus: 2, estonia: 2 } }
      ]},
      { q: 'Что пугает больше всего?', options: [
        { text: 'Языковой барьер', scores: { armenia: 3, georgia: 2, uae: 2, malta: 2, cyprus: 2 } },
        { text: 'Бюрократия', scores: { georgia: 3, armenia: 2, bali: 2, kyrgyzstan: 2 } },
        { text: 'Безопасность', scores: { uae: 3, portugal: 2, finland: 2, czech: 2 } },
        { text: 'Одиночество', scores: { armenia: 3, bali: 2, thailand: 2, serbia: 2 } }
      ]},
      { q: 'Ваш возраст?', options: [
        { text: '18–30', scores: { bali: 2, thailand: 2, georgia: 2, estonia: 2 } },
        { text: '30–45', scores: { portugal: 2, spain: 2, uae: 2, serbia: 2 } },
        { text: '45–60', scores: { turkey: 2, cyprus: 2, montenegro: 2, portugal: 2 } },
        { text: '60+', scores: { turkey: 2, thailand: 2, mexico: 2, portugal: 2 } }
      ]},
      { q: 'Нужен ли путь к гражданству?', options: [
        { text: 'Да, это цель', scores: { portugal: 3, canada: 3, germany: 2, argentina: 2 } },
        { text: 'Желательно, но не срочно', scores: { serbia: 2, montenegro: 2, czech: 2 } },
        { text: 'Нет, нужен ВНЖ', scores: { georgia: 2, uae: 2, thailand: 2, estonia: 2 } },
        { text: 'Пока просто попробовать', scores: { bali: 3, georgia: 2, armenia: 2, kyrgyzstan: 2 } }
      ]},
      { q: 'Идеальный ритм жизни?', options: [
        { text: 'Мегаполис и карьера', scores: { uae: 3, germany: 2, canada: 2 } },
        { text: 'Баланс город/природа', scores: { portugal: 2, georgia: 2, czech: 2, mexico: 2 } },
        { text: 'Расслабленный номад', scores: { bali: 3, thailand: 3, mexico: 2 } },
        { text: 'Тихая провинция', scores: { montenegro: 2, latvia: 2, kyrgyzstan: 2 } }
      ]}
    ],
    resultType: 'country'
  },

  barriers: {
    title: 'Что мешает переезду?',
    icon: '🚧',
    desc: 'Определите главные барьеры и получите план их преодоления',
    questions: [
      { q: 'Что больше всего останавливает вас?', options: [
        { text: 'Страх неизвестности', barrier: 'fear', score: 3 },
        { text: 'Нехватка денег', barrier: 'money', score: 3 },
        { text: 'Семья не поддерживает', barrier: 'family', score: 3 },
        { text: 'Не знаю с чего начать', barrier: 'knowledge', score: 3 }
      ]},
      { q: 'Как давно думаете о переезде?', options: [
        { text: 'Только начал думать', barrier: 'knowledge', score: 2 },
        { text: '6–12 месяцев', barrier: 'fear', score: 2 },
        { text: '1–3 года', barrier: 'procrastination', score: 3 },
        { text: 'Более 3 лет', barrier: 'procrastination', score: 4 }
      ]},
      { q: 'Есть ли финансовая подушка?', options: [
        { text: 'Нет, живу от зарплаты', barrier: 'money', score: 4 },
        { text: '1–3 месяца расходов', barrier: 'money', score: 2 },
        { text: '3–6 месяцев', barrier: 'money', score: 1 },
        { text: '6+ месяцев', barrier: 'money', score: 0 }
      ]},
      { q: 'Ваш уровень подготовки документов?', options: [
        { text: 'Ничего не собирал', barrier: 'knowledge', score: 3 },
        { text: 'Изучаю информацию', barrier: 'knowledge', score: 2 },
        { text: 'Часть документов готова', barrier: 'knowledge', score: 1 },
        { text: 'Всё собрано', barrier: 'knowledge', score: 0 }
      ]},
      { q: 'Как реагирует близкое окружение?', options: [
        { text: 'Категорически против', barrier: 'family', score: 4 },
        { text: 'Сомневаются', barrier: 'family', score: 2 },
        { text: 'Нейтрально', barrier: 'family', score: 1 },
        { text: 'Поддерживают', barrier: 'family', score: 0 }
      ]},
      { q: 'Насколько владеете иностранным языком?', options: [
        { text: 'Не владею', barrier: 'language', score: 3 },
        { text: 'Школьный уровень', barrier: 'language', score: 2 },
        { text: 'Могу общаться', barrier: 'language', score: 1 },
        { text: 'Свободно', barrier: 'language', score: 0 }
      ]},
      { q: 'Есть ли удалённый доход?', options: [
        { text: 'Нет, только найм в РФ', barrier: 'career', score: 3 },
        { text: 'Подработка', barrier: 'career', score: 2 },
        { text: 'Стабильный фриланс', barrier: 'career', score: 1 },
        { text: 'Пассивный доход', barrier: 'career', score: 0 }
      ]},
      { q: 'Что чувствуете при мысли о переезде?', options: [
        { text: 'Панику', barrier: 'fear', score: 4 },
        { text: 'Тревогу', barrier: 'fear', score: 2 },
        { text: 'Волнение и надежду', barrier: 'fear', score: 1 },
        { text: 'Уверенность', barrier: 'fear', score: 0 }
      ]}
    ],
    resultType: 'barrier'
  },

  readiness: {
    title: 'Готовность к переезду',
    icon: '📊',
    desc: 'Оцените свою подготовленность по 10 ключевым параметрам',
    questions: [
      { q: 'Финансовая подушка (6+ мес)?', options: [
        { text: 'Да, полностью', score: 10 },
        { text: '3–6 месяцев', score: 7 },
        { text: '1–3 месяца', score: 4 },
        { text: 'Нет', score: 0 }
      ]},
      { q: 'Удалённый / международный доход?', options: [
        { text: 'Стабильный $2k+/мес', score: 10 },
        { text: 'Есть, но нестабильный', score: 6 },
        { text: 'Только в рублях', score: 3 },
        { text: 'Нет', score: 0 }
      ]},
      { q: 'Знание целевой страны?', options: [
        { text: 'Был(а), изучил(а) всё', score: 10 },
        { text: 'Много читал(а)', score: 7 },
        { text: 'Поверхностно', score: 3 },
        { text: 'Только мечты', score: 0 }
      ]},
      { q: 'Язык страны назначения?', options: [
        { text: 'Свободно / не нужен', score: 10 },
        { text: 'Базовый разговорный', score: 6 },
        { text: 'Начальный', score: 3 },
        { text: 'Не знаю', score: 0 }
      ]},
      { q: 'Документы (паспорт, справки)?', options: [
        { text: 'Всё готово', score: 10 },
        { text: 'Частично', score: 6 },
        { text: 'Знаю список', score: 3 },
        { text: 'Не начинал', score: 0 }
      ]},
      { q: 'Понимание визового пути?', options: [
        { text: 'Выбрал и изучил', score: 10 },
        { text: 'Знаю варианты', score: 6 },
        { text: 'Примерно', score: 3 },
        { text: 'Не знаю', score: 0 }
      ]},
      { q: 'Поддержка близких?', options: [
        { text: 'Полная', score: 10 },
        { text: 'Частичная', score: 6 },
        { text: 'Нейтральная', score: 3 },
        { text: 'Против', score: 0 }
      ]},
      { q: 'Психологическая готовность?', options: [
        { text: 'Полностью готов', score: 10 },
        { text: 'В основном да', score: 7 },
        { text: 'Сомневаюсь', score: 3 },
        { text: 'Боюсь', score: 0 }
      ]},
      { q: 'План на первые 3 месяца?', options: [
        { text: 'Детальный', score: 10 },
        { text: 'Общий', score: 6 },
        { text: 'Примерный', score: 3 },
        { text: 'Нет', score: 0 }
      ]},
      { q: 'Сеть контактов в стране?', options: [
        { text: 'Друзья / коллеги', score: 10 },
        { text: 'Знакомые из чатов', score: 6 },
        { text: 'Только онлайн', score: 3 },
        { text: 'Никого', score: 0 }
      ]}
    ],
    resultType: 'readiness'
  },

  why_not: {
    title: 'Почему я не могу переехать?',
    icon: '🔍',
    desc: 'Честный тест: реальные причины vs отговорки',
    questions: [
      { q: '"У меня нет денег" — это правда?', options: [
        { text: 'Да, объективно нет накоплений', type: 'real', category: 'money' },
        { text: 'Есть, но боюсь потратить', type: 'excuse', category: 'fear' },
        { text: 'Не считал, просто кажется', type: 'excuse', category: 'knowledge' },
        { text: 'Достаточно для бюджетных стран', type: 'real', category: 'ready' }
      ]},
      { q: '"Я слишком стар/молод" — это правда?', options: [
        { text: 'Да, визы ограничены по возрасту', type: 'real', category: 'visa' },
        { text: 'Нет, просто кажется поздно', type: 'excuse', category: 'fear' },
        { text: 'Не проверял требования', type: 'excuse', category: 'knowledge' },
        { text: 'Возраст не проблема для моей цели', type: 'real', category: 'ready' }
      ]},
      { q: '"Не знаю язык" — это правда?', options: [
        { text: 'Да, для моей цели он обязателен', type: 'real', category: 'language' },
        { text: 'Многие страны без языка живут', type: 'excuse', category: 'knowledge' },
        { text: 'Могу учить, но ленюсь', type: 'excuse', category: 'procrastination' },
        { text: 'Знаю базовый уровень', type: 'real', category: 'ready' }
      ]},
      { q: '"Семья не отпустит" — это правда?', options: [
        { text: 'Да, объективные обязательства', type: 'real', category: 'family' },
        { text: 'Страх расставания, не запрет', type: 'excuse', category: 'fear' },
        { text: 'Не разговаривал серьёзно', type: 'excuse', category: 'communication' },
        { text: 'Семья готова к переезду', type: 'real', category: 'ready' }
      ]},
      { q: '"Нестабильная ситуация в мире" — это правда?', options: [
        { text: 'Да, моя цель страна в зоне риска', type: 'real', category: 'safety' },
        { text: 'В России тоже нестабильно', type: 'excuse', category: 'fear' },
        { text: 'Использую как оправдание', type: 'excuse', category: 'procrastination' },
        { text: 'Изучил риски, они приемлемы', type: 'real', category: 'ready' }
      ]},
      { q: '"Потеряю карьеру" — это правда?', options: [
        { text: 'Да, моя профессия не удалённая', type: 'real', category: 'career' },
        { text: 'Могу перейти на удалёнку', type: 'excuse', category: 'knowledge' },
        { text: 'Не пробовал искать', type: 'excuse', category: 'procrastination' },
        { text: 'Уже работаю удалённо', type: 'real', category: 'ready' }
      ]},
      { q: '"Слишком сложно оформить" — это правда?', options: [
        { text: 'Да, для моего случая нет пути', type: 'real', category: 'visa' },
        { text: 'Сложно, но возможно', type: 'excuse', category: 'knowledge' },
        { text: 'Не разбирался', type: 'excuse', category: 'procrastination' },
        { text: 'Знаю свой путь', type: 'real', category: 'ready' }
      ]},
      { q: '"А вдруг не понравится?" — это правда?', options: [
        { text: 'Да, нет возможности вернуться', type: 'real', category: 'safety' },
        { text: 'Можно попробовать на 3 месяца', type: 'excuse', category: 'knowledge' },
        { text: 'Страх перемен', type: 'excuse', category: 'fear' },
        { text: 'Готов к адаптации', type: 'real', category: 'ready' }
      ]}
    ],
    resultType: 'why_not'
  },

  lifestyle: {
    title: 'Страна проживания мечты',
    icon: '🏡',
    desc: 'Определите идеальный тип места для жизни',
    questions: [
      { q: 'Где хотите просыпаться?', options: [
        { text: 'У моря', vibe: 'coastal', scores: { thailand: 2, vietnam: 3, bali: 2, cyprus: 2, montenegro: 2 } },
        { text: 'В большом городе', vibe: 'urban', scores: { uae: 2, germany: 2, spain: 2, georgia: 1 } },
        { text: 'В горах', vibe: 'mountain', scores: { georgia: 2, armenia: 2, montenegro: 1 } },
        { text: 'В маленьком уютном городе', vibe: 'smalltown', scores: { portugal: 2, latvia: 2, czech: 1 } }
      ]},
      { q: 'Идеальный вечер?', options: [
        { text: 'Ресторан и культура', vibe: 'urban', scores: { spain: 2, portugal: 2, germany: 1 } },
        { text: 'Пляж и закат', vibe: 'coastal', scores: { thailand: 2, bali: 2, mexico: 2 } },
        { text: 'Природа и тишина', vibe: 'mountain', scores: { montenegro: 2, finland: 2, georgia: 1 } },
        { text: 'Коворкинг и нетворкинг', vibe: 'urban', scores: { bali: 2, estonia: 2, uae: 2 } }
      ]},
      { q: 'Ваш стиль питания?', options: [
        { text: 'Средиземноморская кухня', scores: { portugal: 2, spain: 2, cyprus: 2, turkey: 1 } },
        { text: 'Азиатская', scores: { thailand: 3, vietnam: 3, bali: 2 } },
        { text: 'Кавказская / домашняя', scores: { georgia: 3, armenia: 2 } },
        { text: 'Всё глобальное', scores: { uae: 2, canada: 2, germany: 1 } }
      ]},
      { q: 'Транспорт в идеале?', options: [
        { text: 'Пешком и велосипед', scores: { portugal: 2, czech: 2, netherlands: 2 } },
        { text: 'Скутер / байк', scores: { bali: 2, thailand: 2, vietnam: 2 } },
        { text: 'Метро и общественный', scores: { germany: 2, spain: 2, uae: 1 } },
        { text: 'Личный автомобиль', scores: { usa: 2, canada: 2, serbia: 1 } }
      ]},
      { q: 'Социальная жизнь?', options: [
        { text: 'Большое экспат-комьюнити', scores: { bali: 3, thailand: 2, portugal: 2 } },
        { text: 'Локальное погружение', scores: { argentina: 2, mexico: 2, georgia: 1 } },
        { text: 'Русскоязычные', scores: { armenia: 3, georgia: 2, serbia: 2 } },
        { text: 'Минимум общения', scores: { finland: 2, kyrgyzstan: 1 } }
      ]},
      { q: 'Климат мечты?', options: [
        { text: '+25 и солнце', scores: { thailand: 2, uae: 2, cyprus: 2, bali: 2 } },
        { text: '+18, без жары', scores: { portugal: 3, spain: 2, georgia: 1 } },
        { text: 'Четыре сезона', scores: { germany: 2, czech: 2, serbia: 2 } },
        { text: 'Не важно', scores: { estonia: 1, latvia: 1 } }
      ]}
    ],
    resultType: 'country'
  }
};

const BARRIER_ADVICE = {
  fear: { title: 'Страх неизвестности', icon: '😰', advice: 'Начните с короткой поездки (2–4 недели) в страну мечты. Присоединитесь к Telegram-чатам релокантов — 90% страха уходит после общения с реальными людьми. Пройдите тест готовности и составьте пошаговый план.' },
  money: { title: 'Финансы', icon: '💰', advice: 'Используйте калькулятор бюджета. Начните с бюджетных стран (Грузия, Армения, Таиланд от $1 200/мес). Копите подушку 3–6 месяцев. Рассмотрите удалённую работу — курсы английского помогут.' },
  family: { title: 'Семья', icon: '👨‍👩‍👧', advice: 'Проведите семейный совет: запишите страхи каждого и ответьте фактами. Предложите «пробный» переезд на 3 месяца. Покажите видео и отзывы семей, которые уже переехали.' },
  knowledge: { title: 'Нехватка информации', icon: '📚', advice: 'Вы на правильной платформе! Изучите 3–5 стран в каталоге, пройдите тест подбора, составьте roadmap. Подпишитесь на 2–3 Telegram-канала по вашей стране.' },
  procrastination: { title: 'Откладывание', icon: '⏰', advice: 'Поставьте дедлайн: «Через 6 месяцев я в новой стране». Разбейте на микро-шаги: эта неделя — паспорт, следующая — тест страны. Страх уходит с действием.' },
  language: { title: 'Языковой барьер', icon: '🗣️', advice: 'Выберите страны с русскоязычным сообществом (Армения, Грузия) или англоязычные (ОАЭ, Мальта, Кипр). Начните учить язык за 3 месяца до переезда — 15 мин/день достаточно.' },
  career: { title: 'Карьера', icon: '💼', advice: 'Перейдите на удалёнку за 3–6 месяцев до переезда. Освойте востребованный навык (IT, дизайн, маркетинг). LinkedIn + Remote OK + IT-каналы в Telegram.' }
};

const QuizEngine = {
  current: null,
  quizId: null,
  step: 0,
  answers: [],
  scores: {},

  start(quizId) {
    this.quizId = quizId;
    this.current = QUIZZES[quizId];
    this.step = 0;
    this.answers = [];
    this.scores = {};
    this.render();
  },

  render() {
    const container = document.getElementById('quizArea');
    if (!container || !this.current) return;

    if (this.step >= this.current.questions.length) {
      this.showResult();
      return;
    }

    const q = this.current.questions[this.step];
    const pct = ((this.step) / this.current.questions.length) * 100;

    container.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:8px">Вопрос ${this.step + 1} из ${this.current.questions.length}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<div class="quiz-option" data-idx="${i}">${o.text}</div>`).join('')}
      </div>`;

    container.querySelectorAll('.quiz-option').forEach(el => {
      el.addEventListener('click', () => this.select(parseInt(el.dataset.idx)));
    });
  },

  select(idx) {
    const q = this.current.questions[this.step];
    const opt = q.options[idx];
    this.answers.push(opt);

    if (opt.scores) {
      Object.entries(opt.scores).forEach(([k, v]) => {
        this.scores[k] = (this.scores[k] || 0) + v;
      });
    }
    if (opt.barrier) {
      this.scores[opt.barrier] = (this.scores[opt.barrier] || 0) + (opt.score || 1);
    }

    this.step++;
    setTimeout(() => this.render(), 300);
  },

  showResult() {
    const container = document.getElementById('quizArea');
    const type = this.current.resultType;
    let html = '';

    if (type === 'country') {
      const sorted = Object.entries(this.scores).sort((a, b) => b[1] - a[1]);
      const top3 = sorted.slice(0, 3).map(([id]) => App.getCountryById(id)).filter(Boolean);
      html = `
        <div class="quiz-result">
          <div class="result-icon">🎯</div>
          <h2>Ваши идеальные страны</h2>
          <p class="result-desc">На основе ${this.current.questions.length} ответов мы подобрали лучшие направления</p>
          <div class="card-grid" style="margin-top:24px;text-align:left">
            ${top3.map((c, i) => `
              <div class="card" style="padding:20px">
                <div style="font-size:2rem;margin-bottom:8px">${c.flag}</div>
                <h3>#${i + 1} ${c.name}</h3>
                <p style="font-size:0.85rem;color:var(--text-secondary);margin:8px 0">${c.description.slice(0, 120)}…</p>
                <a href="countries.html#${c.id}" class="btn btn-primary btn-sm">Подробнее →</a>
              </div>`).join('')}
          </div>
          <button class="btn btn-secondary" style="margin-top:24px" onclick="QuizEngine.start('${this.quizId}')">Пройти заново</button>
        </div>`;
    } else if (type === 'barrier') {
      const sorted = Object.entries(this.scores).sort((a, b) => b[1] - a[1]);
      const top = sorted[0]?.[0];
      const advice = BARRIER_ADVICE[top] || BARRIER_ADVICE.knowledge;
      html = `
        <div class="quiz-result">
          <div class="result-icon">${advice.icon}</div>
          <h2>Главный барьер: ${advice.title}</h2>
          <p class="result-desc">${advice.advice}</p>
          ${sorted.slice(0, 3).map(([k]) => {
            const a = BARRIER_ADVICE[k];
            return a ? `<div class="card" style="padding:16px;margin:8px 0;text-align:left"><strong>${a.icon} ${a.title}</strong><p style="font-size:0.85rem;color:var(--text-secondary);margin-top:6px">${a.advice.slice(0, 100)}…</p></div>` : '';
          }).join('')}
          <a href="roadmap.html" class="btn btn-primary" style="margin-top:16px">Составить план →</a>
          <button class="btn btn-secondary" style="margin-top:12px;margin-left:8px" onclick="QuizEngine.start('${this.quizId}')">Заново</button>
        </div>`;
    } else if (type === 'readiness') {
      const total = this.answers.reduce((s, a) => s + (a.score || 0), 0);
      const max = this.current.questions.length * 10;
      const pct = Math.round((total / max) * 100);
      App.setReadiness(pct);
      let level, desc, color;
      if (pct >= 80) { level = 'Готов к переезду!'; desc = 'У вас отличная подготовка. Пора выбирать страну и бронировать билеты.'; color = 'var(--success)'; }
      else if (pct >= 60) { level = 'Почти готов'; desc = 'Осталось закрыть 2–3 пробела. Используйте roadmap и калькулятор.'; color = 'var(--accent)'; }
      else if (pct >= 40) { level = 'Нужна подготовка'; desc = 'Есть база, но важно поработать над финансами, языком или документами.'; color = 'var(--warning)'; }
      else { level = 'Начальный этап'; desc = 'Не спешите — изучите страны, пройдите другие тесты, начните копить подушку.'; color = 'var(--error)'; }
      html = `
        <div class="quiz-result">
          <div class="result-score" style="color:${color}">${pct}%</div>
          <h2>${level}</h2>
          <p class="result-desc">${desc}</p>
          <div style="margin:24px 0">
            <a href="countries.html" class="btn btn-primary">Каталог стран</a>
            <a href="calculator.html" class="btn btn-secondary" style="margin-left:8px">Калькулятор</a>
          </div>
          <button class="btn btn-secondary" onclick="QuizEngine.start('${this.quizId}')">Заново</button>
        </div>`;
      App.confetti();
    } else if (type === 'why_not') {
      const real = this.answers.filter(a => a.type === 'real' && a.category !== 'ready').length;
      const excuses = this.answers.filter(a => a.type === 'excuse').length;
      const ready = this.answers.filter(a => a.category === 'ready').length;
      const pct = Math.round((ready / this.answers.length) * 100);
      html = `
        <div class="quiz-result">
          <div class="result-icon">${excuses > real ? '💪' : '📋'}</div>
          <h2>${excuses > real ? 'Большинство — отговорки!' : 'Есть реальные препятствия'}</h2>
          <p class="result-desc">
            Реальных барьеров: <strong>${real}</strong> · Отговорок: <strong>${excuses}</strong> · Готовых пунктов: <strong>${ready}</strong>
          </p>
          <p class="result-desc" style="margin-top:12px">
            ${excuses > real
              ? 'Хорошая новость: большинство ваших «причин» — не объективные барьеры, а страх и незнание. Начните с малого шага сегодня.'
              : 'У вас есть конкретные препятствия. Но у каждого есть решение — используйте roadmap и каталог стран для альтернативных путей.'}
          </p>
          <a href="tests.html" class="btn btn-primary" style="margin-top:16px">Другие тесты</a>
          <button class="btn btn-secondary" style="margin-left:8px" onclick="QuizEngine.start('${this.quizId}')">Заново</button>
        </div>`;
    }

    container.innerHTML = html;
    App.saveQuizResult(this.quizId, { scores: this.scores, answers: this.answers.length });
    if (type !== 'readiness') App.confetti();
  }
};

const QuizPage = {
  init() {
    const tabs = document.getElementById('quizTabs');
    const area = document.getElementById('quizArea');
    if (!tabs) return;

    tabs.innerHTML = Object.entries(QUIZZES).map(([id, q], i) =>
      `<button class="quiz-tab ${i === 0 ? 'active' : ''}" data-quiz="${id}">${q.icon} ${q.title}</button>`
    ).join('');

    tabs.querySelectorAll('.quiz-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('.quiz-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const q = QUIZZES[btn.dataset.quiz];
        document.getElementById('quizDesc').textContent = q.desc;
        QuizEngine.start(btn.dataset.quiz);
      });
    });

    const first = Object.keys(QUIZZES)[0];
    document.getElementById('quizDesc').textContent = QUIZZES[first].desc;
    QuizEngine.start(first);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quizTabs')) QuizPage.init();
});
