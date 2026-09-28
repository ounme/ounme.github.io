/* «По следам слов» — логика сайта */
(function () {
  'use strict';

  /* ============ ДАННЫЕ ============ */

  const STOPS = [
    {
      id: 'hatastyr',
      num: 'Остановка 1',
      name: 'Хатастыр',
      tagline: '«Научись видеть небо»',
      icon: 'i-sun',
      color: '#fbbf24',
      themes: ['небо', 'погода', 'времена года'],
      mechanic:
        'Путешественник выбирает погодное явление или время года, <b>слушает слово и повторяет его</b>. После этого появляется первая коммуникативная задача — <b>представиться</b>. Фразы для представления не придумываются: их записывают и проверяют с носителем языка.',
      words: [
        ['нёлтэн', 'солнце'],
        ['удан', 'дождь'],
        ['эдэн', 'ветер; воздух'],
        ['баи', 'ясный; погожий'],
        ['нэлкэ', 'весна (первая половина)']
      ],
      foot: 'Дополнительная задача остановки — научиться представляться'
    },
    {
      id: 'billyakh',
      num: 'Остановка 2',
      name: 'Озеро Биллях',
      tagline: '«Язык воды»',
      icon: 'i-waves',
      color: '#38bdf8',
      themes: ['вода', 'водоёмы', 'речевые модели: «Что это?», «Что ты видишь?», «Я вижу…»'],
      mechanic:
        'Путешественник <b>нажимает на объекты природной сцены</b> — воду, волну, птицу — и получает слово, аудио, перевод и изображение. Речевые модели остановки: <b>«Что это?», «Что ты видишь?», «Я вижу…»</b>.',
      words: [
        ['мө', 'вода'],
        ['төңрэ', 'озеро'],
        ['окат', 'река'],
        ['ота', 'волна'],
        ['талгин', 'тихая заводь; затон'],
        ['монкэ', 'форель'],
        ['некичэн', 'утка'],
        ['амҕан', 'самец рыбы']
      ],
      foot: 'Каждый объект сцены звучит голосом носителя'
    },
    {
      id: 'buta',
      num: 'Остановка 3',
      name: 'Этно-база «Бута»',
      tagline: '«У каждого предмета есть имя»',
      icon: 'i-yurt',
      color: '#fb923c',
      themes: ['жилище', 'бытовые предметы'],
      mechanic:
        'Остановка в традиционном жилище: путешественник знакомится с устройством юрты и бытовыми предметами и узнаёт, <b>как называется каждый из них</b> на эвенском.',
      words: [
        ['дю', 'юрта; дом; жилое помещение'],
        ['дюкча', 'остов юрты, чума, урасы; заброшенное стойбище'],
        ['дюм', 'юрта, чум конической формы']
      ],
      foot: 'Слова жилища — вход в культуру оленеводов'
    },
    {
      id: 'butoma',
      num: 'Остановка 4',
      name: 'Бутома',
      tagline: '«Следы»',
      icon: 'i-paw',
      color: '#c084fc',
      themes: ['животные', 'угадай по следу'],
      mechanic:
        'Игровая механика: путешественник <b>определяет животное по следу или изображению</b>. После ответа он слышит правильное слово от носителя и добавляет его в путевой дневник. Ошибся? <b>«Почти! Давай ещё раз»</b> — и снова пробуем.',
      words: [
        ['бую', 'дикий олень'],
        ['оран', 'олень'],
        ['накат', 'медведь'],
        ['нёучак', 'волк'],
        ['мунрукан', 'заяц']
      ],
      foot: 'Правильный ответ звучит голосом носителя и уходит в дневник'
    },
    {
      id: 'pillars',
      num: 'Остановка 5',
      name: 'Ленские столбы',
      tagline: '«Язык земли»',
      icon: 'i-pillars',
      color: '#a3e635',
      themes: ['земля', 'рельеф', 'панорама'],
      mechanic:
        '<b>Интерактивная панорама</b>: путешественник нажимает на объекты рельефа, слушает слово и получает <b>короткую аудиосцену от носителя</b> — земля рассказывает о себе на своём языке.',
      words: [
        ['төр', 'земля'],
        ['дэт', 'тундра'],
        ['кунтэк', 'сухая тундра; ровное место; поле; поляна'],
        ['амкачан', 'сопка с мягкими очертаниями'],
        ['апкит', 'ущелье; теснина; узкое место']
      ],
      foot: 'Панорама рельефа + аудиосцены носителя'
    },
    {
      id: 'olekma',
      num: 'Остановка 6',
      name: 'Олёкма',
      tagline: '«Язык растёт»',
      icon: 'i-tree',
      color: '#34d399',
      themes: ['растительный мир', 'финал маршрута'],
      mechanic:
        'Финальная остановка: путешественник выбирает природный объект, слышит его название от носителя и выбирает <b>одно слово, которое забирает с собой</b> в финальный словарь. Так выглядит выпускной экзамен путешественника.',
      words: [
        ['мо', 'дерево; лес; бревно; палка; полено; дрова'],
        ['исаг', 'лес'],
        ['орат', 'трава; сено; бурьян'],
        ['чалбан', 'берёза'],
        ['нярив', 'лиственница']
      ],
      foot: 'Финал: одно слово остаётся с путешественником навсегда'
    }
  ];

  const ALPHABET = [
    ['Аа', false], ['Бб', false], ['Вв', false], ['Гг', false], ['Дд', false],
    ['Ее', false], ['Ёё', false], ['Жж', false], ['Зз', false], ['Ии', false],
    ['Йй', false], ['Кк', false], ['Лл', false], ['Мм', false], ['Нн', false],
    ['Ӈӈ', true], ['Оо', false], ['Өө', true], ['Ӫӫ', true], ['Пп', false],
    ['Рр', false], ['Сс', false], ['Тт', false], ['Уу', false], ['Фф', false],
    ['Хх', false], ['Цц', false], ['Чч', false], ['Шш', false], ['Щщ', false],
    ['Ъъ', false], ['Ыы', false], ['Ьь', false], ['Ээ', false], ['Юю', false],
    ['Яя', false]
  ];

  const TEAM = [
    ['Кудайбергенов Женисбай', 'капитан команды'],
    ['Канонян Арам', 'команда РКИШНИКИ'],
    ['Цветкова Екатерина', 'команда РКИШНИКИ'],
    ['Черенкова Полина', 'команда РКИШНИКИ'],
    ['Хуан Ли', 'команда РКИШНИКИ'],
    ['Панин Никита', 'команда РКИШНИКИ']
  ];

  /* Сборка слова «окатаӈалдулавун» («в наших реках») */
  const BUILDER_STEPS = [
    { seg: 'а', label: '+ деталь 1 — грамматическое значение присоединилось к основе' },
    { seg: 'ӈал', label: '+ деталь 2 — значение уточняется' },
    { seg: 'ду', label: '+ деталь 3 — слово растёт дальше' },
    { seg: 'лав', label: '+ деталь 4 — почти готово' },
    { seg: 'ун', label: '+ деталь 5 — конструкция завершена' }
  ];

  /* ============ УТИЛИТЫ ============ */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const initials = name => name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

  /* ============ ШАПКА ============ */

  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('#burger').addEventListener('click', () => nav.classList.toggle('menu-open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('menu-open')));

  /* ============ ПОЯВЛЕНИЕ БЛОКОВ ============ */

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ============ СЧЁТЧИКИ ============ */

  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      counterIO.unobserve(e.target);
      const el = e.target;
      const target = +el.dataset.count;
      const prefix = el.dataset.prefix || '';
      const t0 = performance.now();
      const dur = 1400;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => counterIO.observe(el));

  /* ============ АЛФАВИТ ============ */

  const grid = $('#alphabetGrid');
  ALPHABET.forEach(([pair, special]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = special ? 'special' : '';
    btn.innerHTML = pair + '<small>' + (special ? 'особая' : '') + '</small>';
    btn.setAttribute('aria-label', 'Буква ' + pair + (special ? ' (особая)' : ''));
    grid.appendChild(btn);
  });

  /* ============ МАРШРУТ ============ */

  const tabsBox = $('#routeTabs');
  const panel = $('#routePanel');

  function renderTabs() {
    tabsBox.innerHTML = '';
    STOPS.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'route__tab';
      b.style.setProperty('--tab-c', s.color);
      b.setAttribute('role', 'tab');
      b.innerHTML =
        '<span class="route__dotnum">' + (i + 1) + '</span>' +
        '<span><b>' + s.name + '</b><small>' + s.tagline + '</small></span>';
      b.addEventListener('click', () => selectStop(i));
      tabsBox.appendChild(b);
    });
  }

  function renderStop(i) {
    const s = STOPS[i];
    const words = s.words.map(w =>
      '<button type="button" class="word" aria-label="Слово ' + w[0] + ' — переворот карточки">' +
        '<span class="word__inner">' +
          '<span class="word__face word__front">' +
            '<svg class="word__sound"><use href="#i-sound"/></svg>' +
            '<span class="word__even">' + w[0] + '</span>' +
            '<span class="word__hint">нажми — перевод</span>' +
          '</span>' +
          '<span class="word__face word__back">' +
            '<span class="word__tr">' + w[1] + '</span>' +
          '</span>' +
        '</span>' +
      '</button>'
    ).join('');

    panel.innerHTML =
      '<article class="stop" style="--stop-c:' + s.color + '">' +
        '<header class="stop__head">' +
          '<span class="stop__icon"><svg><use href="#' + s.icon + '"/></svg></span>' +
          '<div><span class="stop__num">' + s.num + ' · маршрут</span><h3>' + s.name + '</h3></div>' +
        '</header>' +
        '<p class="stop__sub">' + s.tagline + '</p>' +
        '<div class="stop__theme">' + s.themes.map(t => '<span>' + t + '</span>').join('') + '</div>' +
        '<p class="stop__mech">' + s.mechanic + '</p>' +
        '<div class="words">' + words + '</div>' +
        '<p class="stop__foot"><svg><use href="#i-book"/></svg>' + s.foot + '</p>' +
      '</article>';

    $$('.word', panel).forEach(w =>
      w.addEventListener('click', () => w.classList.toggle('flipped'))
    );
  }

  function selectStop(i) {
    $$('.route__tab', tabsBox).forEach((t, j) => t.classList.toggle('active', j === i));
    renderStop(i);
  }

  renderTabs();
  selectStop(0);

  /* ============ КОНСТРУКТОР СЛОВА ============ */

  const wordBox = $('#builderWord');
  const gloss = $('#builderGloss');
  const stepLabel = $('#builderStep');
  const addBtn = $('#builderAdd');
  const resetBtn = $('#builderReset');
  const result = $('#builderResult');
  let step = 0;

  function renderBuilder() {
    wordBox.innerHTML = '<span class="builder__base seg">окат</span>' +
      BUILDER_STEPS.slice(0, step).map(st =>
        '<span class="suffix seg">' + st.seg + '</span>'
      ).join('');
    stepLabel.textContent = 'этап ' + step + ' из ' + BUILDER_STEPS.length;
    gloss.textContent = step === 0
      ? 'основа — «река»'
      : BUILDER_STEPS[step - 1].label;
    addBtn.disabled = step >= BUILDER_STEPS.length;
    result.hidden = step < BUILDER_STEPS.length;
    if (step >= BUILDER_STEPS.length) {
      gloss.textContent = 'основа «река» + пять суффиксов = одно длинное слово-конструкция';
    }
  }

  addBtn.addEventListener('click', () => { if (step < BUILDER_STEPS.length) { step++; renderBuilder(); } });
  resetBtn.addEventListener('click', () => { step = 0; renderBuilder(); });
  renderBuilder();

  /* ============ КОМАНДА ============ */

  const teamGrid = $('#teamGrid');
  TEAM.forEach(([name, role]) => {
    const el = document.createElement('div');
    el.className = 'member reveal visible';
    el.innerHTML = '<span class="member__ava">' + initials(name) + '</span>' +
      '<span><b>' + name + '</b><small>' + role + '</small></span>';
    teamGrid.appendChild(el);
  });
})();
