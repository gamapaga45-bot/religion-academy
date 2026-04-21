// ═══════════════════════════════════════════════════════════════
// NAV.JS — SidebarNav, AudioPlayer, Dashboard, EnzyklopädieModule
// ═══════════════════════════════════════════════════════════════
        // Компонент: Навигация сайдбара (общий для desktop и mobile)
        function SidebarNav({ view, setView, apiKey, setApiKeyInput, setShowSettings }) {
            const NI = ({emoji, label, v, badge}) => (
                <button onClick={()=>setView(v)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200
                        ${view===v ? 'bg-amber-600/15 text-amber-400' : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'}`}>
                    <span className="text-base flex-shrink-0">{emoji}</span>
                    <span className="truncate text-xs lg:text-sm flex-1 text-left">{label}</span>
                    {badge && <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full flex-shrink-0
                        ${view===v ? 'bg-amber-600/30 text-amber-400' : 'bg-stone-700 text-stone-500'}`}>{badge}</span>}
                </button>
            );

            const Sep = ({label, step}) => (
                <div className="px-3 pt-5 pb-1.5 flex items-center gap-2">
                    {step && <span className="w-5 h-5 rounded-full bg-stone-700 text-stone-400 text-[10px] font-black flex items-center justify-center flex-shrink-0">{step}</span>}
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{label}</span>
                </div>
            );

            return (
                <div className="space-y-0.5 pb-4">

                    {/* СТАРТ */}
                    <NI emoji="🏠" label="Главная" v="dashboard"/>

                    {/* УРОВЕНЬ 1 — ОСНОВЫ */}
                    <Sep label="Шаг 1 — Основы" step="1"/>
                    <NI emoji="📖" label="Просто о сложном" v="plain" badge="Начало"/>
                    <NI emoji="🌍" label="Религии мира" v="religions"/>
                    <NI emoji="🙏" label="Практики и поклонение" v="worship"/>

                    {/* УРОВЕНЬ 2 — ТЕКСТЫ */}
                    <Sep label="Шаг 2 — Священные тексты" step="2"/>
                    <NI emoji="✝️" label="Библия — читать" v="bible"/>
                    <NI emoji="☪️" label="Коран — читать" v="quran"/>
                    <NI emoji="📚" label="Пошаговое изучение" v="step"/>

                    {/* УРОВЕНЬ 3 — СРАВНЕНИЕ */}
                    <Sep label="Шаг 3 — Сравнение" step="3"/>
                    <NI emoji="⚖️" label="Параллельное чтение" v="reader"/>
                    <NI emoji="🔲" label="Разделённый экран" v="split"/>
                    <NI emoji="🔍" label="Глобальный поиск" v="search"/>

                    {/* УРОВЕНЬ 4 — УГЛУБЛЁННЫЙ АНАЛИЗ */}
                    <Sep label="Шаг 4 — Анализ" step="4"/>
                    <NI emoji="✨" label="AI Анализ тем" v="deep" badge="AI"/>
                    <NI emoji="⚡" label="Мифология религий" v="mythology" badge="AI"/>
                    <NI emoji="📜" label="Рукописи и источники" v="manuscripts"/>
                    <NI emoji="👼" label="Ангелы и Демоны" v="angels" badge="NEW"/>
                    <NI emoji="🏛" label="Энциклопедия" v="simple"/>

                    {/* AI КЛЮЧ */}
                    {!apiKey ? (
                        <div className="mt-4 space-y-2">
                            <button onClick={()=>setShowSettings(true)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-600/10 border border-amber-600/20 text-amber-500 text-xs font-bold hover:bg-amber-600/20 transition-all">
                                🔑 Ввести ключ AI
                            </button>
                            <button onClick={()=>setShowKeyRequest(true)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold hover:bg-blue-600/20 transition-all">
                                ✉️ Запросить ключ
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 px-3 py-2 rounded-xl bg-emerald-900/20 border border-emerald-800/30 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"/>
                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wide">AI активен</span>
                        </div>
                    )}
                </div>
            );
        }

        // --- УМНЫЙ АУДИО ДВИЖОК ---
        function AudioPlayer({ versesObj, theme, apiKey }) {
            const [voices, setVoices]           = useState([]);
            const [selectedVoice, setSelectedVoice] = useState('BROWSER');
            const [isPlaying, setIsPlaying]     = useState(false);
            const [statusMsg, setStatusMsg]     = useState('');
            const [progress, setProgress]       = useState('');

            // ── useRef: всегда актуальное значение в async-callback ──────────
            const playingRef   = useRef(false);   // истинный флаг воспроизведения
            const chunksRef    = useRef([]);       // массив фрагментов
            const indexRef     = useRef(0);        // текущий индекс

            // ── Загрузка голосов ──────────────────────────────────────────────
            useEffect(() => {
                const load = () => {
                    const all = window.speechSynthesis.getVoices();
                    // Предпочитаем русские голоса, затем любые
                    const ru = all.filter(v => v.lang && v.lang.startsWith('ru'));
                    setVoices(ru.length ? ru : all);
                };
                load();
                if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
                    window.speechSynthesis.onvoiceschanged = load;
                }
                return () => {
                    window.speechSynthesis.cancel();
                    playingRef.current = false;
                };
            }, []);

            // ── Разбивка текста на фрагменты ≤ 200 символов ─────────────────
            const buildChunks = (texts) => {
                const chunks = [];
                texts.forEach(raw => {
                    // Убираем разметку markdown, скобки, номера стихов
                    const clean = raw
                        .replace(/\*\*/g, '').replace(/\*/g, '')
                        .replace(/ — /g, ', ').replace(/ - /g, ', ')
                        .replace(/\s+/g, ' ').trim();
                    if (!clean) return;
                    // Разбиваем по предложениям (без lookbehind — совместимо с Safari)
                    const sentences = clean.split(/([.?!;])\s+/).reduce((acc, part, i, arr) => {
                        if (i % 2 === 0) {
                            const punct = arr[i+1] || '';
                            const s = (part + punct).trim();
                            if (s) acc.push(s);
                        }
                        return acc;
                    }, []);
                    (sentences.length ? sentences : [clean]).forEach(s => {
                        // Нарезаем на куски ≤ 200 символов
                        for (let i = 0; i < s.length; i += 200) {
                            chunks.push(s.slice(i, i + 200));
                        }
                    });
                });
                return chunks.filter(c => c.trim().length > 0);
            };

            // ── Произнести следующий фрагмент ─────────────────────────────────
            const speakNext = () => {
                // playingRef.current — всегда актуальный флаг (нет stale closure)
                if (!playingRef.current || indexRef.current >= chunksRef.current.length) {
                    playingRef.current = false;
                    setIsPlaying(false);
                    setProgress('');
                    setStatusMsg('');
                    return;
                }

                const idx   = indexRef.current;
                const total = chunksRef.current.length;
                const text  = chunksRef.current[idx];
                setProgress(`${idx + 1}/${total}`);

                const utt = new SpeechSynthesisUtterance(text);
                utt.lang  = 'ru-RU';
                utt.rate  = 0.88;
                utt.pitch = 1.0;

                // Установить выбранный голос
                const v = voices.find(vv => vv.name === selectedVoice);
                if (v) utt.voice = v;
                else if (voices.length > 0) utt.voice = voices[0];

                utt.onend = () => {
                    indexRef.current++;
                    // Небольшая пауза между фрагментами
                    setTimeout(speakNext, 180);
                };
                utt.onerror = (e) => {
                    // 'interrupted' возникает при cancel() — это норма
                    if (e.error === 'interrupted' || e.error === 'canceled') return;
                    console.warn('SpeechSynthesis error:', e.error);
                    // Пробуем следующий фрагмент вместо полной остановки
                    indexRef.current++;
                    setTimeout(speakNext, 300);
                };

                window.speechSynthesis.speak(utt);
            };

            // ── Кнопка Play/Stop ──────────────────────────────────────────────
            const handlePlay = () => {
                if (playingRef.current) {
                    // Остановить
                    playingRef.current = false;
                    window.speechSynthesis.cancel();
                    setIsPlaying(false);
                    setProgress('');
                    setStatusMsg('');
                    return;
                }

                if (!versesObj || Object.keys(versesObj).length === 0) {
                    setStatusMsg('Нет текста для воспроизведения');
                    return;
                }

                // Браузер должен поддерживать Speech API
                if (!window.speechSynthesis) {
                    setStatusMsg('Браузер не поддерживает озвучивание');
                    return;
                }

                const texts = Object.entries(versesObj)
                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                    .map(([, t]) => t)
                    .filter(Boolean);

                const chunks = buildChunks(texts);
                if (!chunks.length) {
                    setStatusMsg('Нет текста для воспроизведения');
                    return;
                }

                // Сброс состояния
                chunksRef.current = chunks;
                indexRef.current  = 0;
                playingRef.current = true;

                // Очищаем очередь и запускаем
                window.speechSynthesis.cancel();
                setIsPlaying(true);
                setStatusMsg('');

                // Небольшая задержка после cancel() — браузерный quirk
                setTimeout(speakNext, 100);
            };

            const accent = theme === 'bible' ? 'amber' : 'emerald';

            return (
                <div className="flex flex-col items-end gap-1">
                    <div className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border bg-${accent}-50 border-${accent}-200 shadow-sm`}>
                        <Icons.Volume c={`w-4 h-4 mx-1 text-${accent}-500`}/>

                        {/* Выбор голоса */}
                        <select
                            value={selectedVoice}
                            onChange={e => setSelectedVoice(e.target.value)}
                            className="text-xs bg-transparent font-bold text-stone-600 outline-none w-28 md:w-44 truncate cursor-pointer"
                            title="Выберите голос">
                            <option value="BROWSER">
                                {voices.length > 0
                                    ? (voices.find(v => v.lang && v.lang.startsWith('ru'))?.name || voices[0]?.name || 'Системный голос')
                                    : 'Загрузка голосов...'}
                            </option>
                            {voices.map(v => (
                                <option key={v.name} value={v.name}>{v.name}</option>
                            ))}
                        </select>

                        {/* Прогресс */}
                        {isPlaying && progress && (
                            <span className={`text-[10px] font-bold text-${accent}-600 mx-1`}>{progress}</span>
                        )}

                        {/* Play / Stop */}
                        <button
                            onClick={handlePlay}
                            className={`p-1.5 rounded-lg transition-colors text-${accent}-600 hover:bg-${accent}-100`}
                            title={isPlaying ? 'Остановить' : 'Слушать текст'}>
                            {isPlaying
                                ? <Icons.Square c="w-5 h-5 fill-current"/>
                                : <Icons.Play  c="w-5 h-5 fill-current"/>}
                        </button>
                    </div>

                    {/* Статусная строка */}
                    {statusMsg && (
                        <span className="text-[10px] text-rose-500 font-bold px-1">{statusMsg}</span>
                    )}
                    {isPlaying && !statusMsg && (
                        <span className={`text-[10px] text-${accent}-600 font-bold px-1 animate-pulse`}>
                            ▶ Озвучивание...
                        </span>
                    )}
                </div>
            );
        }

        // --- DASHBOARD ---
        function Dashboard({ setView, apiKey, setShowSettings }) {
            const steps = [
                {
                    step:'1', emoji:'📖', color:'amber',
                    title:'Основы религий',
                    desc:'Начните здесь. Узнайте главное о каждой мировой религии простым языком — без сложных терминов.',
                    items:[
                        {label:'Просто о сложном', v:'plain', hint:'Ключевые концепции простыми словами'},
                        {label:'Религии мира',     v:'religions', hint:'10 традиций — обзор, тексты, сравнение'},
                        {label:'Практики и обряды',v:'worship', hint:'Как молятся в разных традициях'},
                    ]
                },
                {
                    step:'2', emoji:'📜', color:'emerald',
                    title:'Священные тексты',
                    desc:'Читайте первоисточники. Полные тексты с AI-анализом каждого стиха — нажмите ✨ на любом стихе.',
                    items:[
                        {label:'Библия (AI)',        v:'bible',  hint:'66 книг, Синодальный перевод'},
                        {label:'Коран (AI)',          v:'quran',  hint:'114 сур, перевод Кулиева'},
                        {label:'Пошаговое изучение', v:'step',   hint:'По темам: сотворение, пророки, молитва...'},
                    ]
                },
                {
                    step:'3', emoji:'⚖️', color:'blue',
                    title:'Сравнение традиций',
                    desc:'Читайте разные тексты рядом. Найдите общее и различное между традициями.',
                    items:[
                        {label:'Параллельное чтение', v:'reader', hint:'Библия и Коран рядом'},
                        {label:'Разделённый экран',   v:'split',  hint:'Любые два текста рядом'},
                        {label:'Глобальный поиск',    v:'search', hint:'Одно слово во всех 9 религиях'},
                    ]
                },
                {
                    step:'4', emoji:'✨', color:'purple',
                    title:'Углублённый анализ',
                    desc:'Используйте AI для глубокого разбора. Этимология, история, богословие, мифология.',
                    items:[
                        {label:'AI Анализ тем',    v:'deep',        hint:'Тематический разбор с нейросетью'},
                        {label:'Ангелы и Демоны', v:'angels', hint:'Писания, иллюстрации, манускрипты'},
                        {label:'Мифология',         v:'mythology',   hint:'Сравнительная мифология религий'},
                        {label:'Рукописи',          v:'manuscripts', hint:'Оригинальные манускрипты'},
                    ]
                },
            ];

            const colors = {
                amber:  {bg:'bg-amber-50',   border:'border-amber-200',   badge:'bg-amber-100 text-amber-800',   btn:'bg-white hover:bg-amber-100 text-amber-900 border border-amber-200',   num:'bg-amber-500',  title:'text-amber-900', desc:'text-amber-700'},
                emerald:{bg:'bg-emerald-50', border:'border-emerald-200', badge:'bg-emerald-100 text-emerald-800',btn:'bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200',num:'bg-emerald-500',title:'text-emerald-900',desc:'text-emerald-700'},
                blue:   {bg:'bg-blue-50',    border:'border-blue-200',    badge:'bg-blue-100 text-blue-800',     btn:'bg-white hover:bg-blue-100 text-blue-900 border border-blue-200',     num:'bg-blue-500',   title:'text-blue-900',  desc:'text-blue-700'},
                purple: {bg:'bg-purple-50',  border:'border-purple-200',  badge:'bg-purple-100 text-purple-800', btn:'bg-white hover:bg-purple-100 text-purple-900 border border-purple-200', num:'bg-purple-500', title:'text-purple-900',desc:'text-purple-700'},
            };

            return (
                <div className="space-y-6 pb-20 md:pb-6 fade-in-up">
                    {/* Приветствие */}
                    <div className="rounded-3xl overflow-hidden" style={{background:'linear-gradient(135deg,#1c1b1d 0%,#2d1f0e 50%,#0d1f17 100%)'}}>
                        <div className="p-6 md:p-10">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Академия Религиоведения</p>
                                    <h1 className="text-white font-serif text-2xl md:text-4xl font-bold leading-tight mb-3">
                                        Изучайте мировые<br/>религии шаг за шагом
                                    </h1>
                                    <p className="text-stone-400 text-sm md:text-base max-w-lg">
                                        Полные священные тексты 10 традиций с AI-анализом каждого стиха.
                                        Следуйте учебному пути — от основ к глубокому анализу.
                                    </p>
                                </div>
                                <span className="text-5xl md:text-7xl flex-shrink-0 hidden sm:block">🌍</span>
                            </div>
                            {!apiKey && (
                                <button onClick={()=>setShowSettings(true)}
                                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all">
                                    🔑 Подключить AI для полного доступа →
                                </button>
                            )}
                            {apiKey && (
                                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/30 border border-emerald-700/40">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400"/>
                                    <span className="text-emerald-400 text-xs font-bold">AI активен — нажмите ✨ на любом стихе для анализа</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4 шага */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {steps.map(s => {
                            const c = colors[s.color];
                            return (
                                <div key={s.step} className={`rounded-2xl border p-5 ${c.bg} ${c.border}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`w-7 h-7 rounded-full ${c.num} text-white text-xs font-black flex items-center justify-center flex-shrink-0`}>{s.step}</span>
                                        <span className="text-xl">{s.emoji}</span>
                                        <div>
                                            <h3 className={`font-bold text-base leading-tight ${c.title}`}>{s.title}</h3>
                                        </div>
                                    </div>
                                    <p className={`text-xs leading-relaxed mb-4 ${c.desc}`}>{s.desc}</p>
                                    <div className="space-y-2">
                                        {s.items.map(item => (
                                            <button key={item.v} onClick={()=>setView(item.v)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${c.btn}`}>
                                                <span>{item.label}</span>
                                                <span className="text-stone-400 font-normal text-[10px] hidden sm:block">{item.hint}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Быстрый старт */}
                    <div className="bg-white rounded-2xl border border-stone-200 p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">⚡ Быстрый старт</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                {emoji:'📖', label:'Бытие 1', hint:'Сотворение мира', action:()=>setView('bible')},
                                {emoji:'☪️', label:'Аль-Фатиха', hint:'Открывающая', action:()=>setView('quran')},
                                {emoji:'☸️', label:'Дхаммапада', hint:'Путь Будды', action:()=>setView('religions')},
                                {emoji:'🔍', label:'Найти: Бог', hint:'Во всех текстах', action:()=>setView('search')},
                            ].map((q,i) => (
                                <button key={i} onClick={q.action}
                                    className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-center transition-all group">
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{q.emoji}</span>
                                    <span className="text-xs font-bold text-stone-700">{q.label}</span>
                                    <span className="text-[10px] text-stone-400">{q.hint}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Статистика */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            {n:'10', label:'Религий мира', emoji:'🌍'},
                            {n:'31 000+', label:'Стихов Библии', emoji:'✝️'},
                            {n:'6 236', label:'Аятов Корана', emoji:'☪️'},
                            {n:'200+', label:'AI моделей', emoji:'✨'},
                        ].map((stat,i) => (
                            <div key={i} className="bg-white rounded-2xl border border-stone-200 p-4 text-center">
                                <p className="text-2xl mb-1">{stat.emoji}</p>
                                <p className="text-lg font-serif font-bold text-stone-900">{stat.n}</p>
                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        function DeepExplanationModule() {
            return (
                <div className="space-y-12 fade-in-up pb-12">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6 flex justify-center items-center">
                            <Icons.Smile c="w-10 h-10 mr-4 text-amber-500"/> Полная Энциклопедия
                        </h2>
                        <p className="text-stone-600 text-lg leading-relaxed">
                            Глубокий разбор структуры, истории и теологии главных священных текстов. Иллюстрации загружаются из открытых исторических архивов.
                        </p>
                    </div>
                    
                    {/* БИБЛИЯ */}
                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                        <div className="w-full h-64 md:h-96 relative bg-stone-100">
                             <img crossOrigin="anonymous" 
                               src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=85" 
                               alt="Библия Гутенберга"
                               onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1024&q=80"; }}
                               className="absolute inset-0 w-full h-full object-cover" />
                             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                 <p className="text-sm font-bold uppercase tracking-widest opacity-80">Исторический архив</p>
                                 <p className="text-xl font-serif">Библия Гутенберга (XV век) — первая печатная книга в Европе.</p>
                             </div>
                        </div>
                        
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="flex items-center mb-8 pb-6 border-b border-stone-200">
                                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                                    <Icons.Book c="w-8 h-8 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-900">Анатомия Библии</h3>
                                    <span className="text-amber-600 font-bold uppercase tracking-widest text-xs">Библиотека Заветов</span>
                                </div>
                            </div>
                            
                            <div className="space-y-8 text-stone-700 leading-loose text-lg">
                                <p>Слово «Библия» переводится с греческого как «Книги» (во множественном числе). Это не одно монолитное произведение, а гигантская <strong>древняя библиотека</strong>, писавшаяся более 1000 лет десятками разных авторов: царями, пастухами, священниками, пророками и рыбаками.</p>
                                
                                <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                                    <h4 className="text-2xl font-bold font-serif text-stone-900 mb-4 text-amber-800">Часть 1: Ветхий Завет (Танах)</h4>
                                    <p className="mb-6">Написан в основном на древнееврейском языке (иврите) с небольшими фрагментами на арамейском. Иудейская традиция делит этот корпус на три части (Т-Н-Х):</p>
                                    
                                    <div className="space-y-6 pl-4 border-l-4 border-amber-300">
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Т — Тора (Пятикнижие Моисея)</strong> 
                                            Первые 5 книг (Бытие, Исход, Левит, Числа, Второзаконие). Описывают сотворение мира, историю патриархов (Авраама, Исаака, Иакова), грандиозный исход из египетского рабства и дарование Закона (613 заповедей) на горе Синай. Эти законы заложили моральный фундамент западной цивилизации.
                                        </div>
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Н — Невиим (Пророки)</strong> 
                                            Исторические хроники завоевания Ханаана, эпохи судей, правления царей (Давида, Соломона) и предупреждения пророков о грядущих наказаниях за отступничество от Бога. Пророки выступали как строгая моральная совесть нации.
                                        </div>
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Х — Ктувим (Писания)</strong> 
                                            Сборник мудрости и поэзии. Сюда входят Псалтирь (молитвенные гимны), Притчи Соломона, философские трактаты Екклесиаста и Иова (о проблеме страдания невинных), а также Песнь Песней.
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                                    <h4 className="text-2xl font-bold font-serif text-stone-900 mb-4 text-amber-800">Часть 2: Новый Завет</h4>
                                    <p className="mb-6">Написан на древнегреческом языке (койне) в I веке н.э. Является священным исключительно для христиан и состоит из 27 книг:</p>
                                    
                                    <div className="space-y-6 pl-4 border-l-4 border-amber-500">
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Евангелия (Благая весть)</strong> 
                                            Четыре биографии Иисуса Христа от Матфея, Марка, Луки и Иоанна. Описывают Его рождение, чудеса, Нагорную проповедь, распятие и воскресение. Первые три называют "синоптическими", а Евангелие от Иоанна — более философским и теологическим.
                                        </div>
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Деяния Апостолов и Послания</strong> 
                                            История создания первых христианских церквей и 21 письмо апостолов (в основном Павла). В них объясняется теология: как смерть Христа спасает человечество от греха.
                                        </div>
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Откровение Иоанна (Апокалипсис)</strong> 
                                            Пророческая книга, полная мистических символов, описывающая конец света, Страшный суд и создание "Нового Иерусалима", где не будет ни плача, ни болезней.
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-amber-100/50 rounded-2xl border border-amber-200 text-amber-950 font-serif shadow-inner">
                                    <strong className="block mb-2 text-amber-700 text-xl">Главный теологический посыл:</strong> 
                                    Вся Библия — это история развития «Заветов» (договоров) между Богом и человечеством. Христиане верят, что Ветхий Завет был подготовкой мира к пришествию Мессии, а Новый Завет — это кульминация Божьего плана спасения через искупительную жертву Иисуса Христа.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КОРАН */}
                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                        <div className="w-full h-64 md:h-96 relative bg-stone-100">
                             <img crossOrigin="anonymous" 
                               src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=85" 
                               alt="Древний Коран"
                               onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1024&q=80"; }}
                               className="absolute inset-0 w-full h-full object-cover" />
                             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                 <p className="text-sm font-bold uppercase tracking-widest opacity-80">Исламское искусство</p>
                                 <p className="text-xl font-serif">Древний манускрипт Корана с изысканной арабской каллиграфией.</p>
                             </div>
                        </div>
                        
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="flex items-center mb-8 pb-6 border-b border-stone-200">
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                                    <Icons.Moon c="w-8 h-8 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-900">Анатомия Корана</h3>
                                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Прямая Речь Творца</span>
                                </div>
                            </div>
                            
                            <div className="space-y-8 text-stone-700 leading-loose text-lg">
                                <p>Коран (от араб. <em>al-qurʾān</em> — «Чтение вслух») — это священная книга ислама. В отличие от Библии, которая воспринимается как боговдохновенный труд разных людей, мусульмане верят, что Коран — это <strong>несотворенная, прямая и дословная речь Бога (Аллаха)</strong>, переданная пророку Мухаммеду через ангела Джибриля (Гавриила) в течение 23 лет (610–632 гг. н.э.).</p>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
                                        <h4 className="text-2xl font-bold font-serif text-emerald-900 mb-4">Суры (Главы)</h4>
                                        <p className="text-base text-stone-600">Коран состоит из 114 сур. Уникальная особенность: они расположены не в хронологическом порядке, а (за исключением первой суры Аль-Фатиха) <strong>от самых длинных к самым коротким</strong>. Поэтому в начале книги обсуждаются сложные законы, а в конце — короткие яркие молитвы.</p>
                                    </div>
                                    <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
                                        <h4 className="text-2xl font-bold font-serif text-emerald-900 mb-4">Аяты (Стихи)</h4>
                                        <p className="text-base text-stone-600">Каждая сура состоит из аятов. Слово «аят» буквально означает «знамение» или «чудо». Мусульмане верят, что сам по себе арабский текст Корана с его идеальной рифмой и ритмом является главным чудом, которое невозможно повторить человеку (концепция Иджаз).</p>
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 mt-8">
                                    <h4 className="text-2xl font-bold font-serif text-stone-900 mb-6 text-emerald-800">Два исторических периода</h4>
                                    <p className="mb-6">Жизнь Мухаммеда и текст Корана делятся на два этапа, которые кардинально отличаются по стилю:</p>
                                    
                                    <div className="space-y-6 pl-4 border-l-4 border-emerald-400">
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Мекканские суры (86 сур)</strong> 
                                            Ниспосланы в первые 13 лет в Мекке, когда мусульмане были угнетаемым меньшинством. Эти суры короткие, невероятно поэтичные, с сильным ритмом. Их главная цель — пробудить людей. Темы: Единство Бога (Таухид), критика идолопоклонства, истории древних пророков, живописание Рая и Ада.
                                        </div>
                                        <div>
                                            <strong className="text-stone-900 block mb-2 text-xl font-serif">Мединские суры (28 сур)</strong> 
                                            Ниспосланы после переселения (Хиджры) в город Медина, где Мухаммед стал главой государства. Эти суры длинные, прозаичные. Они содержат <strong>основы Шариата</strong>: законы брака, развода, наследства, правила ведения войны, поста и отношения с христианами и иудеями («Людьми Писания»).
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                                    <h4 className="text-2xl font-bold font-serif text-stone-900 mb-4 text-emerald-800">Как понимать Коран? (Тафсир)</h4>
                                    <p className="text-base text-stone-600 mb-4">Коран нельзя толковать произвольно. Исламские ученые используют:</p>
                                    <ul className="list-disc pl-5 text-base text-stone-600 space-y-3">
                                        <li><strong>Асбаб ан-Нузуль:</strong> Наука о «причинах ниспослания». Без знания того, в ответ на какое историческое событие или вопрос был произнесен аят, его легко вырвать из контекста.</li>
                                        <li><strong>Сунна (Хадисы):</strong> Предания о словах и поступках пророка Мухаммеда. Коран дает общие правила (например, "совершайте молитву"), а Сунна детально объясняет, как именно это делать.</li>
                                    </ul>
                                </div>
                                
                                <div className="p-6 bg-emerald-100/50 rounded-2xl border border-emerald-200 text-emerald-950 font-serif shadow-inner">
                                    <strong className="block mb-2 text-emerald-700 text-xl">Главный теологический посыл:</strong> 
                                    Абсолютный и бескомпромиссный монотеизм. Бог Один, Он всемогущ, не рождал и не был рожден. Ислам (покорность) — это возвращение к изначальной чистой вере праотца Авраама (Ибрахима).
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        // --- АККОРДЕОН ДЛЯ AI ОТВЕТА ---
        function AiAccordion({ html, isBible }) {
            // Первый раздел открыт по умолчанию
            const [openSections, setOpenSections] = React.useState({ 0: true });

            const sections = React.useMemo(() => {
                if (!html) return [];
                // Создаём временный DOM-элемент для парсинга
                const tmp = document.createElement('div');
                tmp.innerHTML = html;
                const children = Array.from(tmp.children); // только элементы, не текстовые узлы
                
                const result = [];
                let current = null;

                children.forEach(el => {
                    const tag = el.tagName.toLowerCase();
                    if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
                        if (current) result.push(current);
                        current = { title: el.textContent.trim(), bodyHtml: '' };
                    } else {
                        if (!current) {
                            // Текст до первого заголовка — общий раздел
                            if (result.length === 0 || result[0].__intro !== true) {
                                result.unshift({ title: '📋 Краткое резюме', bodyHtml: '', __intro: true });
                            }
                            result[0].bodyHtml += el.outerHTML;
                        } else {
                            current.bodyHtml += el.outerHTML;
                        }
                    }
                });
                if (current) result.push(current);
                // Убираем пустые секции
                return result.filter(s => s.title && (s.bodyHtml.trim().length > 0));
            }, [html]);

            // Нет разделов или один без заголовка — рендерим как есть
            if (sections.length === 0) {
                return <div className="ai-content leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: html }}/>;
            }

            // Если только один раздел — без аккордеона, просто контент
            if (sections.length === 1) {
                return (
                    <div className={`rounded-xl border p-4 ${isBible ? 'border-amber-100 bg-amber-50/50' : 'border-emerald-100 bg-emerald-50/50'}`}>
                        <div className="ai-content text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sections[0].bodyHtml }}/>
                    </div>
                );
            }

            const toggle = (i) => setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));
            const A = isBible
                ? { border: 'border-amber-300', activeBg: 'bg-amber-50', activeText: 'text-amber-800', dot: 'bg-amber-500', hdr: 'hover:bg-amber-50/60' }
                : { border: 'border-emerald-300', activeBg: 'bg-emerald-50', activeText: 'text-emerald-800', dot: 'bg-emerald-500', hdr: 'hover:bg-emerald-50/60' };

            return (
                <div className="space-y-1.5 font-sans">
                    {sections.map((sec, i) => {
                        const isOpen = !!openSections[i];
                        return (
                            <div key={i} className={`rounded-xl overflow-hidden border transition-all duration-200 ${isOpen ? A.border : 'border-stone-200'}`}>
                                {/* Заголовок-кнопка */}
                                <button
                                    type="button"
                                    onClick={() => toggle(i)}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-150 ${isOpen ? A.activeBg : 'bg-white ' + A.hdr}`}>
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${isOpen ? A.dot : 'bg-stone-300'}`}/>
                                        <span className={`font-bold text-sm leading-snug truncate ${isOpen ? A.activeText : 'text-stone-600'}`}>
                                            {sec.title}
                                        </span>
                                    </div>
                                    <span className={`ml-3 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-black transition-all duration-200 ${isOpen ? A.activeBg + ' ' + A.activeText : 'bg-stone-100 text-stone-400'}`}
                                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                                        +
                                    </span>
                                </button>
                                {/* Тело раздела */}
                                {isOpen && (
                                    <div className="accordion-body px-4 pb-4 pt-3 bg-white border-t border-stone-100">
                                        <div className="ai-content text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}/>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }