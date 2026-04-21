
        // =====================================================================
        // МОДУЛЬ 1: ПОШАГОВОЕ ИЗУЧЕНИЕ СО СРАВНЕНИЕМ
        // =====================================================================
        var LESSONS = [
            {
                id: 1, title: "Сотворение мира", icon: "✨",
                theme: "Как появился мир? Откуда всё началось?",
                bible: {
                    ref: "Бытие 1:1-5, 26-27",
                    text: "В начале сотворил Бог небо и землю. Земля же была безвидна и пуста, и тьма над бездною, и Дух Божий носился над водою. И сказал Бог: да будет свет. И стал свет... И сказал Бог: сотворим человека по образу Нашему и по подобию Нашему... И сотворил Бог человека по образу Своему.",
                    plain: "Бог создал всё из ничего за 6 дней. Сначала — свет, потом небо, земля, растения, светила, животные. В последний день — человека, как самое особенное творение, похожее на самого Бога. Человек — венец творения.",
                    keyWord: "בְּרֵאשִׁית (Берешит) — «В начале». Первое слово Библии. На иврите глагол «bara» (сотворил) используется только с Богом как субъектом — только Бог творит из ничего.",
                    color: "amber"
                },
                quran: {
                    ref: "Аль-Бакара 2:117, Аль-Анбия 21:30",
                    text: "Он — Творец небес и земли. Когда Он решает что-либо, то лишь говорит этому: «Будь!» — и оно бывает. (2:117) Неужели неверующие не видят, что небеса и земля были единым целым и Мы разделили их? (21:30)",
                    plain: "Аллах создал всё одним словом «Кун!» (Будь!). Интересно: Коран говорит, что небеса и земля были единым целым — учёные видят в этом намёк на Большой взрыв. Сотворение заняло «шесть периодов» (дней/эпох). Человек создан из глины, в него вдохнули Дух.",
                    keyWord: "كُنْ فَيَكُونُ (Кун фаякун) — «Будь! — и оно бывает». Абсолютная творящая воля Бога. В исламе нет промежуточных этапов — Бог хочет и происходит немедленно.",
                    color: "emerald"
                },
                compare: "Оба текста утверждают: мир создан Богом целенаправленно, не случайно. Ключевое различие: Библия описывает последовательный 6-дневный процесс с детальным нарративом. Коран указывает на мгновенную творящую волю. Общее: человек — особое существо, в которого вдохнули Божественный Дух/образ. Обе традиции отвергают идею вечной материи."
            },
            {
                id: 2, title: "Единобожие (Монотеизм)", icon: "☝️",
                theme: "Кто такой Бог? Как понять Его природу?",
                bible: {
                    ref: "Второзаконие 6:4-5, Исаия 45:5",
                    text: "Слушай, Израиль: Господь, Бог наш, Господь един есть; и люби Господа, Бога твоего, всем сердцем твоим... Я Господь, и нет иного; нет Бога кроме Меня.",
                    plain: "Главная заповедь иудаизма и основа христианства — «Шма Исраэль»: Бог один, Он личность, Он любит и требует любви в ответ. Христиане добавляют учение о Троице: Бог один по существу, но троичен в лицах (Отец, Сын, Дух). Это не три бога, а один Бог в трёх ипостасях.",
                    keyWord: "אֶחָד (Эхад) — «Един». Интересно: это слово означает составное единство (как «один народ» из многих), а не абсолютную простоту. Именно это слово используется, когда мужчина и женщина становятся «одной плотью».",
                    color: "amber"
                },
                quran: {
                    ref: "Аль-Ихляс 112:1-4, Аль-Бакара 2:163",
                    text: "Скажи: «Он — Аллах Единый, Аллах Самодостаточный. Он не родил и не был рождён, и нет никого равного Ему». Ваш Бог — Бог Единый, нет божества, кроме Него, Милостивого, Милосердного.",
                    plain: "Таухид — абсолютное единобожие — центр ислама. Сура Аль-Ихляс считается равной трети Корана по значению. Аллах не рождал (нет Сына) и не был рождён (не часть природы). Он «Самодостаточный» — الصَّمَد (ас-Самад) — всё нуждается в Нём, Он ни в чём не нуждается.",
                    keyWord: "الصَّمَد (Ас-Самад) — «Самодостаточный, Вечный». Уникальное слово, встречается в Коране только один раз. Означает: у Него нет пустоты внутри — Он полный, абсолютный, всё в Нём нуждается, но Он — ни в чём.",
                    color: "emerald"
                },
                compare: "Крупнейший теологический спор авраамических религий. Иудаизм и ислам согласны: Бог абсолютно един, неделим. Христианство утверждает Троицу — что для иудеев и мусульман неприемлемо. Ислам прямо полемизирует с этим в Коране. Общее: все три традиции отвергают политеизм и идолопоклонство."
            },
            {
                id: 3, title: "Пророки и Откровение", icon: "📜",
                theme: "Как Бог говорит с людьми? Кто такие пророки?",
                bible: {
                    ref: "Евреям 1:1-2, Исаия 6:1-8",
                    text: "Бог, многократно и многообразно говоривший издревле отцам в пророках, в последние дни сии говорил нам в Сыне... В год смерти царя Озии видел я Господа, сидящего на престоле высоком... И услышал я голос Господа, говорящего: кого Мне послать? И я сказал: вот я, пошли меня.",
                    plain: "В Библии пророки — это посланники Бога, которые получали откровение по-разному: через видения, сны, прямой голос, символические действия. Исаия, Иеремия, Иезекииль — великие пророки. Для христиан финальное Слово Бога — не книга, а Личность: Иисус Христос.",
                    keyWord: "נָבִיא (Наби) — «Пророк» на иврите. Буквально «тот, кто провозглашает». Пророк не предсказатель судьбы — он «уста Бога», говорящий Его слово людям в конкретный исторический момент.",
                    color: "amber"
                },
                quran: {
                    ref: "Аль-Бакара 2:136, Ан-Ниса 4:163-165",
                    text: "Скажите: «Мы уверовали в Аллаха и в то, что ниспослано нам, и что ниспослано Ибрахиму, Исмаилу, Исхаку, Йакубу и коленам, и что было даровано Мусе и Исе...» Воистину, Мы внушили тебе откровение, как внушали его Нуху и пророкам после него.",
                    plain: "В исламе пророков (наби) и посланников (расуль) было 124 000 — ко всем народам. Все они несли одно послание: поклоняйтесь только Аллаху. Мухаммед — «Печать пророков» (Хатам ан-набийин), последний и финальный пророк. Коран — последнее, совершенное и неизменённое слово Бога.",
                    keyWord: "خَاتَمُ النَّبِيِّينَ (Хатам ан-набийин) — «Печать пророков». Мухаммед закрывает цикл пророчества. После него нет новых пророков — Коран полон и совершен. Это фундаментальный догмат ислама.",
                    color: "emerald"
                },
                compare: "Оба священных текста признают одних и тех же пророков: Адам, Ной, Авраам, Моисей, Давид, Иисус. Ключевое расхождение: статус Иисуса. Для христиан — Сын Бога, Бог во плоти. Для ислама — великий пророк и посланник, рождённый от девы, но не Бог. Коран уважает Библию, но считает её изменённой людьми."
            },
            {
                id: 4, title: "Молитва и Богослужение", icon: "🤲",
                theme: "Как человек общается с Богом?",
                bible: {
                    ref: "Матфея 6:9-13 (Отче наш), Псалом 22",
                    text: "Отче наш, сущий на небесах! Да святится имя Твоё; да придёт Царствие Твоё; да будет воля Твоя и на земле, как на небе; хлеб наш насущный дай нам на сей день; и прости нам долги наши, как и мы прощаем должникам нашим; и не введи нас в искушение, но избавь нас от лукавого.",
                    plain: "Иисус дал ученикам «Отче наш» — образец молитвы из 7 прошений. Молитва в христианстве — это разговор с Отцом напрямую, без посредников. Нет обязательного языка, позы, времени. Псалтирь — 150 молитвенных поэм: от ликования до отчаяния. Бог принимает любую искреннюю молитву.",
                    keyWord: "אַבָּא (Абба) — «Папа/Отец». Иисус обращался к Богу словом «Авва» — доверительным, интимным, как ребёнок к отцу. Это революционно: до него такое обращение к Богу было неслыханным в иудаизме.",
                    color: "amber"
                },
                quran: {
                    ref: "Аль-Фатиха 1:1-7, Аль-Бакара 2:186",
                    text: "Во имя Аллаха, Милостивого, Милосердного! Хвала Аллаху, Господу миров, Милостивому, Милосердному, Властелину Дня воздаяния! Тебе одному мы поклоняемся и Тебя одного молим о помощи. Веди нас прямым путём... Когда Мои рабы спрашивают тебя обо Мне, то ведь Я близок. (2:186)",
                    plain: "Намаз — молитва 5 раз в день — один из 5 столпов ислама. Аль-Фатиха читается 17 раз в день (в каждом ракяте). Молитва совершается на арабском, в определённые часы, в сторону Мекки. Также есть ду'а — свободная личная молитва на любом языке. Аллах «ближе, чем яремная вена» (50:16).",
                    keyWord: "صَلَاة (Салят) — «Намаз». Буквально: «связь». Молитва — это не просьба, а установление связи с Богом. Пять намазов — пять точек опоры дня. Время молитвы определяется по положению солнца.",
                    color: "emerald"
                },
                compare: "В обоих текстах молитва — основа духовной жизни. Различие в форме: ислам строго регламентирует язык (арабский), позы, время и направление (кибла). Христианство не регламентирует форму — важна искренность сердца. Общее в содержании: прославление Бога, просьба о руководстве, прощение. Аль-Фатиха и «Отче наш» удивительно схожи по структуре."
            },
            {
                id: 5, title: "Жизнь после смерти", icon: "⚡",
                theme: "Что происходит с душой после смерти?",
                bible: {
                    ref: "Иоанна 11:25-26, Откровение 21:1-4, 1 Коринфянам 15:51-54",
                    text: "Иисус сказал ей: Я есмь воскресение и жизнь; верующий в Меня, если и умрёт, оживёт. И всякий живущий и верующий в Меня не умрёт вовек... И увидел я новое небо и новую землю... И отрёт Бог всякую слезу с очей их, и смерти не будет уже.",
                    plain: "Христианство учит о воскресении тела — не просто бессмертии души, а восстановлении всего человека. Гарантия — воскресение Христа. Вечная жизнь — это единство с Богом в «Новом Иерусалиме», новом мироздании без боли и смерти. Ад — вечное отделение от Бога.",
                    keyWord: "ἀνάστασις (Анастасис) — «Воскресение» (греч.). Буквально: «вставание». Не просто переход души в другой мир, а телесное воскресение. Первым воскрес Христос — как «первенец из умерших» (1 Кор 15:20).",
                    color: "amber"
                },
                quran: {
                    ref: "Аз-Залзала 99:1-8, Ар-Рахман 55:46-61, Аль-Бакара 2:285-286",
                    text: "Когда земля содрогнётся своим сотрясением... в тот день люди выйдут толпами, чтобы им были показаны их деяния. И тот, кто сделал добро весом с пылинку, увидит его. И тот, кто сделал зло весом с пылинку, увидит его. (99) Для богобоязненных уготованы два сада... (55)",
                    plain: "Ислам детально описывает: смерть, ожидание в могиле (Барзах), Судный день, взвешивание деяний на весах (Мизан), переход по мосту Сырат. Рай (Джанна) — сады с реками, красота, присутствие Аллаха. Ад (Джаханнам) — огонь. Попасть в рай можно через веру + добрые дела + милость Аллаха.",
                    keyWord: "الْبَرْزَخ (Барзах) — «Преграда, промежуток». Состояние между смертью и воскресением. Праведники спят мирным сном, грешники — испытывают тягость. Барзах — своеобразная «антикомната» перед Судным днём.",
                    color: "emerald"
                },
                compare: "Обе традиции верят в физическое воскресение, Судный день и вечную жизнь. Детали различаются: Коран очень подробно и образно описывает Рай и Ад (особенно в мекканских сурах), создавая яркие чувственные картины. Библейский Апокалипсис более символичен. Общее: жизнь на земле — это экзамен, каждое действие имеет значение."
            }
        ];

        function StepStudyModule({ db, apiKey }) {
            // Режимы: 'menu' | 'bible_book' | 'quran_surah' | 'parallel' | 'thematic'
            const [mode, setMode] = useState('menu');

            // Для режима Bible
            const [bBook, setBBook] = useState('');
            const [bChap, setBChap] = useState('1');

            // Для режима Quran
            const [qSurah, setQSurah] = useState('');

            // Для тематического режима (старые уроки)
            const [step, setStep] = useState(0);
            const [tab, setTab] = useState('compare');

            // AI
            const [aiQuestion, setAiQuestion] = useState('');
            const [aiAnswer, setAiAnswer] = useState('');
            const [aiLoading, setAiLoading] = useState(false);
            const [verseModal, setVerseModal] = useState(null); // {text, ref}

            const lesson = LESSONS[step];

            const bibleBooks = db.order.bible || [];
            const quranSurahs = db.order.quran || [];
            const bChaps = bBook && db.texts.bible[bBook] ? Object.keys(db.texts.bible[bBook]).sort((a,b)=>+a-+b) : [];
            const bVerses = bBook && bChap && db.texts.bible[bBook]?.[bChap] ? db.texts.bible[bBook][bChap] : {};
            const qVerses = qSurah && db.texts.quran[qSurah]?.['1'] ? db.texts.quran[qSurah]['1'] : {};

            const askAI = async (q) => {
                if (!q.trim()) return;
                setAiLoading(true); setAiAnswer('');
                const ctx = mode === 'thematic'
                    ? `Урок: "${lesson.title}". Сравнение Библии и Корана.`
                    : mode === 'bible_book'
                        ? `Библия, книга ${bBook}, глава ${bChap}`
                        : `Коран, сура ${qSurah}`;
                const r = await fetchZvenoAIAnalysis(q, ctx, apiKey);
                setAiAnswer(r); setAiLoading(false);
            };

            const analyzeVerse = async (text, ref) => {
                setVerseModal({text, ref, loading: true, html: ''});
                const r = await fetchZvenoAIAnalysis(text, ref, apiKey);
                setVerseModal({text, ref, loading: false, html: r});
            };

            // ── МЕНЮ ВЫБОРА РЕЖИМА ──────────────────────────────────────
            if (mode === 'menu') return (
                <div className="fade-in-up space-y-6 pb-20 md:pb-6">
                    <div className="bg-[#1c1b1d] text-white rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3">📚 Пошаговое изучение</h2>
                        <p className="text-stone-400 text-sm md:text-lg">Читайте полный текст Библии и Корана пошагово — по книгам, главам и сурам. Каждый стих можно разобрать с AI.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Библия */}
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 space-y-3">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">📖</span>
                                <div><h3 className="font-serif font-bold text-xl text-amber-900">Библия</h3>
                                <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">Синодальный перевод · {bibleBooks.length} книг</p></div>
                            </div>
                            <select value={bBook} onChange={e=>setBBook(e.target.value)}
                                className="w-full p-3 border border-amber-300 rounded-xl text-sm font-bold bg-white outline-none focus:ring-2 focus:ring-amber-500">
                                <option value="">— Выберите книгу —</option>
                                {bibleBooks.map(b=><option key={b} value={b}>{b}</option>)}
                            </select>
                            {bBook && bChaps.length > 0 && (
                                <select value={bChap} onChange={e=>setBChap(e.target.value)}
                                    className="w-full p-3 border border-amber-300 rounded-xl text-sm font-bold bg-white outline-none focus:ring-2 focus:ring-amber-500">
                                    {bChaps.map(c=><option key={c} value={c}>Глава {c}</option>)}
                                </select>
                            )}
                            <button disabled={!bBook} onClick={()=>setMode('bible_book')}
                                className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm transition-all">
                                Читать Библию →
                            </button>
                        </div>
                        {/* Коран */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 space-y-3">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">🌙</span>
                                <div><h3 className="font-serif font-bold text-xl text-emerald-900">Коран</h3>
                                <p className="text-xs text-emerald-700 font-bold uppercase tracking-widest">Перевод Кулиева · {quranSurahs.length} сур</p></div>
                            </div>
                            <select value={qSurah} onChange={e=>setQSurah(e.target.value)}
                                className="w-full p-3 border border-emerald-300 rounded-xl text-sm font-bold bg-white outline-none focus:ring-2 focus:ring-emerald-500">
                                <option value="">— Выберите суру —</option>
                                {quranSurahs.map(s=><option key={s} value={s}>{s}</option>)}
                            </select>
                            <button disabled={!qSurah} onClick={()=>setMode('quran_surah')}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm transition-all">
                                Читать Коран →
                            </button>
                        </div>
                    </div>
                    {/* Параллельное изучение */}
                    <div className="bg-white border-2 border-stone-200 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">⚖️</span>
                            <div><h3 className="font-serif font-bold text-lg">Параллельное изучение + AI</h3>
                            <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Библия и Коран рядом с разбором</p></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <select value={bBook} onChange={e=>setBBook(e.target.value)}
                                className="p-2.5 border border-stone-200 rounded-xl text-xs font-bold bg-stone-50 outline-none">
                                <option value="">Книга Библии</option>
                                {bibleBooks.map(b=><option key={b} value={b}>{b}</option>)}
                            </select>
                            <select value={qSurah} onChange={e=>setQSurah(e.target.value)}
                                className="p-2.5 border border-stone-200 rounded-xl text-xs font-bold bg-stone-50 outline-none">
                                <option value="">Сура Корана</option>
                                {quranSurahs.map(s=><option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <button disabled={!bBook || !qSurah} onClick={()=>setMode('parallel')}
                            className="mt-3 w-full py-3 bg-stone-900 hover:bg-stone-700 disabled:opacity-40 text-white rounded-xl font-bold text-sm transition-all">
                            Читать параллельно →
                        </button>
                    </div>
                    {/* Тематические уроки */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🎓</span>
                            <div><h3 className="font-serif font-bold text-lg">Тематические уроки</h3>
                            <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">5 тем: Сотворение, Монотеизм, Пророки, Молитва, Вечная жизнь</p></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {LESSONS.map((l,i)=>(
                                <button key={i} onClick={()=>{setStep(i);setMode('thematic');setTab('compare');setAiAnswer('');}}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${step===i&&mode==='thematic'?'bg-stone-900 text-white border-stone-900':'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-400'}`}>
                                    {l.icon} {l.title}
                                </button>
                            ))}
                        </div>
                        <button onClick={()=>{setMode('thematic');setTab('compare');setAiAnswer('');}}
                            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-sm transition-all">
                            К тематическим урокам →
                        </button>
                    </div>
                </div>
            );

            // ── МОДАЛЬНОЕ ОКНО AI АНАЛИЗА СТИХА (локальное) ─────────────
            const VerseModal = () => !verseModal ? null : (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{backgroundColor:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)'}}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col" style={{maxHeight:'88vh'}}>
                        <div className="px-6 py-4 flex items-start justify-between border-b border-amber-100 bg-amber-50 rounded-t-3xl flex-shrink-0">
                            <div className="flex-1 pr-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">✨ AI Анализ · {verseModal.ref}</p>
                                <p className="font-serif text-sm text-stone-700 leading-snug">{verseModal.text.slice(0,120)}{verseModal.text.length>120?'…':''}</p>
                            </div>
                            <button onClick={()=>setVerseModal(null)} className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-red-500 font-bold text-sm ml-2">✕</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6" style={{minHeight:0}}>
                            {verseModal.loading ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3">
                                    <Icons.Loader c="w-8 h-8 text-amber-500"/>
                                    <p className="font-bold text-stone-600">Анализирую стих...</p>
                                    <p className="text-sm text-stone-400">200+ моделей</p>
                                </div>
                            ) : <div className="ai-content" dangerouslySetInnerHTML={{__html: verseModal.html}}/>}
                        </div>
                        <div className="px-6 py-3 border-t border-stone-100 bg-stone-50 flex justify-between items-center rounded-b-3xl flex-shrink-0">
                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Nikolai Rogozin</span>
                            <button onClick={()=>setVerseModal(null)} className="px-5 py-2 bg-stone-900 hover:bg-stone-700 text-white rounded-xl text-xs font-bold transition-all">Закрыть</button>
                        </div>
                    </div>
                </div>
            );

            // ── ОБЩИЙ ЗАГОЛОВОК С КНОПКОЙ НАЗАД ─────────────────────────
            const Header = ({title, sub, color='amber'}) => (
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={()=>{setMode('menu');setAiAnswer('');setVerseModal(null);}}
                        className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 transition-all">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    </button>
                    <div>
                        <h2 className={`font-serif font-bold text-xl ${color==='amber'?'text-amber-900':color==='emerald'?'text-emerald-900':'text-stone-900'}`}>{title}</h2>
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{sub}</p>
                    </div>
                </div>
            );

            // ── AI ВОПРОС БЛОК ────────────────────────────────────────────
            const AIBlock = ({placeholder}) => (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">🤖 Спросить AI о этом тексте</p>
                    <div className="flex gap-2">
                        <input value={aiQuestion} onChange={e=>setAiQuestion(e.target.value)}
                            onKeyDown={e=>e.key==='Enter'&&askAI(aiQuestion)}
                            placeholder={placeholder||'Ваш вопрос...'}
                            className="flex-1 p-3 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"/>
                        <button onClick={()=>askAI(aiQuestion)} disabled={aiLoading}
                            className="px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-sm disabled:opacity-50">
                            {aiLoading?<Icons.Loader c="w-4 h-4"/>:'✨'}
                        </button>
                    </div>
                    {aiLoading && <div className="flex items-center gap-2 text-stone-400 italic text-sm"><Icons.Loader c="w-4 h-4 text-amber-500"/>Анализирую...</div>}
                    {aiAnswer && <div className="ai-content p-4 bg-stone-50 rounded-xl border border-stone-200 text-sm" dangerouslySetInnerHTML={{__html:aiAnswer}}/>}
                </div>
            );

            // ── ОБЩИЙ РЕНДЕР СТИХОВ С КНОПКОЙ AI ─────────────────────────
            const VerseList = ({verses, color, chapLabel}) => {
                const isAmber = color==='amber';
                const entries = Object.entries(verses).sort((a,b)=>+a[0]-+b[0]);
                if (!entries.length) return <div className="text-center text-stone-400 py-12 font-serif">Тексты загружаются... Проверьте подключение к интернету.</div>;
                return (
                    <div className={`rounded-2xl border ${isAmber?'border-amber-100 bg-amber-50/30':'border-emerald-100 bg-emerald-50/30'} overflow-hidden`}>
                        {chapLabel && <div className={`px-5 py-3 border-b font-sans font-bold text-xs uppercase tracking-widest ${isAmber?'border-amber-200 text-amber-700 bg-amber-50':'border-emerald-200 text-emerald-700 bg-emerald-50'}`}>{chapLabel}</div>}
                        <div className="p-4 md:p-6 font-serif space-y-4">
                            {entries.map(([vn, vt])=>(
                                <div key={vn} className={`flex gap-3 group p-2 -mx-2 rounded-xl hover:${isAmber?'bg-amber-50':'bg-emerald-50'} transition-all`}>
                                    <sup className={`text-xs font-sans font-bold mt-1.5 flex-shrink-0 w-6 text-right ${isAmber?'text-amber-500':'text-emerald-500'}`}>{vn}</sup>
                                    <span className="flex-1 text-lg leading-relaxed text-stone-800">{vt}</span>
                                    <button onClick={()=>analyzeVerse(vt, `${chapLabel||''}, стих ${vn}`)}
                                        className={`flex-shrink-0 self-start mt-1 px-2 py-1 rounded-lg text-xs font-bold transition-all opacity-0 group-hover:opacity-100 ${isAmber?'bg-amber-100 hover:bg-amber-300 border border-amber-200 text-amber-700':'bg-emerald-100 hover:bg-emerald-300 border border-emerald-200 text-emerald-700'}`}>
                                        ✨ AI
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            };

            // ── РЕЖИМ: ЧИТАЕМ БИБЛИЮ ──────────────────────────────────────
            if (mode === 'bible_book') return (
                <div className="fade-in-up space-y-4 pb-20 md:pb-6">
                    <VerseModal/>
                    <Header title={`${bBook}`} sub={`Библия · Синодальный перевод`} color="amber"/>
                    {/* Навигация по главам */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mr-2">Глава:</span>
                        <div className="flex flex-wrap gap-1.5 flex-1">
                            {bChaps.map(c=>(
                                <button key={c} onClick={()=>setBChap(c)}
                                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${bChap===c?'bg-amber-600 text-white shadow-sm':'bg-stone-100 hover:bg-amber-100 text-stone-600'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        <select value={bBook} onChange={e=>{setBBook(e.target.value);setBChap('1');}}
                            className="ml-auto p-2 border border-stone-200 rounded-xl text-xs font-bold bg-stone-50 outline-none">
                            {bibleBooks.map(b=><option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    {/* Стихи */}
                    <VerseList verses={bVerses} color="amber" chapLabel={`${bBook}, глава ${bChap}`}/>
                    {/* Навигация назад/вперёд по главам */}
                    <div className="flex justify-between gap-3">
                        <button disabled={bChap==='1'} onClick={()=>setBChap(String(+bChap-1))}
                            className="flex-1 py-3 bg-white border border-stone-200 rounded-xl font-bold text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-30 transition-all">
                            ← Глава {+bChap-1}
                        </button>
                        <button disabled={!bChaps.length||bChap===bChaps[bChaps.length-1]} onClick={()=>setBChap(String(+bChap+1))}
                            className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-sm disabled:opacity-30 transition-all">
                            Глава {+bChap+1} →
                        </button>
                    </div>
                    <AIBlock placeholder={`Что означает ${bBook} ${bChap}? Контекст, история...`}/>
                </div>
            );

            // ── РЕЖИМ: ЧИТАЕМ КОРАН ───────────────────────────────────────
            if (mode === 'quran_surah') return (
                <div className="fade-in-up space-y-4 pb-20 md:pb-6">
                    <VerseModal/>
                    <Header title={qSurah} sub="Коран · Перевод Кулиева" color="emerald"/>
                    {/* Выбор суры */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-3 items-center">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Сура:</span>
                        <select value={qSurah} onChange={e=>setQSurah(e.target.value)}
                            className="flex-1 p-2.5 border border-stone-200 rounded-xl text-sm font-bold bg-stone-50 outline-none focus:ring-2 focus:ring-emerald-500">
                            {quranSurahs.map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    {/* Стихи */}
                    <VerseList verses={qVerses} color="emerald" chapLabel={qSurah}/>
                    {/* Навигация по сурам */}
                    <div className="flex justify-between gap-3">
                        {(() => {
                            const idx = quranSurahs.indexOf(qSurah);
                            return (<>
                                <button disabled={idx<=0} onClick={()=>setQSurah(quranSurahs[idx-1])}
                                    className="flex-1 py-3 bg-white border border-stone-200 rounded-xl font-bold text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-30 transition-all">
                                    ← Предыдущая
                                </button>
                                <button disabled={idx>=quranSurahs.length-1} onClick={()=>setQSurah(quranSurahs[idx+1])}
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm disabled:opacity-30 transition-all">
                                    Следующая →
                                </button>
                            </>);
                        })()}
                    </div>
                    <AIBlock placeholder={`Что означает ${qSurah}? Причина ниспослания...`}/>
                </div>
            );

            // ── РЕЖИМ: ПАРАЛЛЕЛЬНОЕ ЧТЕНИЕ С AI ─────────────────────────
            if (mode === 'parallel') return (
                <div className="fade-in-up space-y-4 pb-20 md:pb-6">
                    <VerseModal/>
                    <Header title="Параллельное чтение" sub="Библия и Коран рядом" color="stone"/>
                    {/* Выбор текстов */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <select value={bBook} onChange={e=>{setBBook(e.target.value);setBChap('1');}}
                                className="w-full p-2.5 border border-amber-300 rounded-xl text-xs font-bold bg-amber-50 outline-none">
                                {bibleBooks.map(b=><option key={b} value={b}>{b}</option>)}
                            </select>
                            <select value={bChap} onChange={e=>setBChap(e.target.value)}
                                className="w-full p-2.5 border border-amber-300 rounded-xl text-xs font-bold bg-amber-50 outline-none">
                                {bChaps.map(c=><option key={c} value={c}>Гл. {c}</option>)}
                            </select>
                        </div>
                        <div>
                            <select value={qSurah} onChange={e=>setQSurah(e.target.value)}
                                className="w-full p-2.5 border border-emerald-300 rounded-xl text-xs font-bold bg-emerald-50 outline-none">
                                {quranSurahs.map(s=><option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    {/* Параллельный текст */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <VerseList verses={bVerses} color="amber" chapLabel={`${bBook} ${bChap}`}/>
                        <VerseList verses={qVerses} color="emerald" chapLabel={qSurah}/>
                    </div>
                    <AIBlock placeholder={`Сравни ${bBook} ${bChap} с ${qSurah} — общие темы, различия...`}/>
                </div>
            );

            // ── РЕЖИМ: ТЕМАТИЧЕСКИЕ УРОКИ (оригинальный функционал) ─────
            const BCard = ({data}) => (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">📖 Библия · {data.ref}</span>
                    <blockquote className="font-serif text-lg leading-relaxed text-stone-800 border-l-4 border-amber-400 pl-4 italic">"{data.text}"</blockquote>
                    <div className="bg-white rounded-xl p-4 border border-amber-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">💡 Простым языком</p>
                        <p className="text-stone-700 leading-relaxed">{data.plain}</p>
                    </div>
                    <div className="bg-amber-100/50 rounded-xl p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">🔤 Ключевое слово</p>
                        <p className="text-stone-700 text-sm leading-relaxed">{data.keyWord}</p>
                    </div>
                </div>
            );
            const QCard = ({data}) => (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">🌙 Коран · {data.ref}</span>
                    <blockquote className="font-serif text-lg leading-relaxed text-emerald-900 border-l-4 border-emerald-400 pl-4 italic">"{data.text}"</blockquote>
                    <div className="bg-white rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">💡 Простым языком</p>
                        <p className="text-stone-700 leading-relaxed">{data.plain}</p>
                    </div>
                    <div className="bg-emerald-100/50 rounded-xl p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">🔤 Ключевое слово</p>
                        <p className="text-stone-700 text-sm leading-relaxed">{data.keyWord}</p>
                    </div>
                </div>
            );

            return (
                <div className="fade-in-up space-y-6 pb-20 md:pb-6">
                    <VerseModal/>
                    <Header title={`${lesson.icon} ${lesson.title}`} sub={lesson.theme} color="stone"/>
                    {/* Прогресс */}
                    <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                                <span>Урок {step+1} из {LESSONS.length}</span>
                                <span>{Math.round(((step+1)/LESSONS.length)*100)}%</span>
                            </div>
                            <div className="w-full bg-stone-100 rounded-full h-2">
                                <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full transition-all" style={{width:`${((step+1)/LESSONS.length)*100}%`}}/>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            {LESSONS.map((l,i)=>(
                                <button key={i} onClick={()=>{setStep(i);setTab('compare');setAiAnswer('');}}
                                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${i===step?'bg-amber-600 text-white shadow-md scale-110':i<step?'bg-emerald-100 text-emerald-700':'bg-stone-100 text-stone-400'}`}>
                                    {l.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Вкладки */}
                    <div className="flex gap-1.5 bg-stone-100 p-1.5 rounded-2xl">
                        {[['compare','⚖️ Сравнение'],['bible','📖 Библия'],['quran','🌙 Коран'],['practice','🤖 AI']].map(([k,l])=>(
                            <button key={k} onClick={()=>setTab(k)}
                                className={`flex-1 py-2.5 px-2 rounded-xl text-xs md:text-sm font-bold transition-all ${tab===k?'bg-white shadow-sm text-stone-900':'text-stone-500 hover:text-stone-700'}`}>
                                {l}
                            </button>
                        ))}
                    </div>
                    {/* Контент */}
                    {tab==='compare' && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <BCard data={lesson.bible}/><QCard data={lesson.quran}/>
                            </div>
                            <div className="bg-white border-2 border-stone-900 rounded-2xl p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">⚖️ Академическое сравнение</p>
                                <p className="text-stone-800 leading-relaxed">{lesson.compare}</p>
                            </div>
                        </div>
                    )}
                    {tab==='bible' && <BCard data={lesson.bible}/>}
                    {tab==='quran' && <QCard data={lesson.quran}/>}
                    {tab==='practice' && (
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">🤖 Спросить AI об этой теме</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {[`Почему Коран и Библия по-разному описывают ${lesson.title.toLowerCase()}?`,
                                  `Что думают богословы о теме "${lesson.title}"?`,
                                  `Как эта тема повлияла на историю?`].map(q=>(
                                    <button key={q} onClick={()=>{setAiQuestion(q);askAI(q);}}
                                        className="text-xs bg-stone-100 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-xl px-3 py-2 text-stone-700 text-left transition-all">
                                        {q}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <input value={aiQuestion} onChange={e=>setAiQuestion(e.target.value)}
                                    onKeyDown={e=>e.key==='Enter'&&askAI(aiQuestion)}
                                    placeholder="Ваш вопрос о теме урока..."
                                    className="flex-1 p-3 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-sm"/>
                                <button onClick={()=>askAI(aiQuestion)} disabled={aiLoading}
                                    className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-xl font-bold text-sm disabled:opacity-50">
                                    {aiLoading?'...':'Спросить'}
                                </button>
                            </div>
                            {aiLoading && <div className="flex items-center gap-3 text-stone-500 italic p-4"><Icons.Loader c="w-5 h-5 text-amber-500"/>Нейросеть думает...</div>}
                            {aiAnswer && <div className="ai-content p-4 bg-stone-50 rounded-xl border border-stone-200" dangerouslySetInnerHTML={{__html:aiAnswer}}/>}
                        </div>
                    )}
                    <div className="flex justify-between pt-2 gap-3">
                        <button onClick={()=>{setStep(Math.max(0,step-1));setTab('compare');setAiAnswer('');}} disabled={step===0}
                            className="flex-1 py-3 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 transition-all text-sm">
                            ← Предыдущий
                        </button>
                        <button onClick={()=>{setStep(Math.min(LESSONS.length-1,step+1));setTab('compare');setAiAnswer('');}} disabled={step===LESSONS.length-1}
                            className="flex-1 py-3 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-500 disabled:opacity-30 transition-all text-sm">
                            Следующий →
                        </button>
                    </div>
                </div>
            );
        }


        // =====================================================================
        // МОДУЛЬ 2: МАНУСКРИПТЫ И ОРИГИНАЛЫ
        // =====================================================================
        // ════════════════════════════════════════════════════════════════════
        // РАСШИРЕННАЯ БАЗА МАНУСКРИПТОВ — 25 рукописей мирового значения
        // Источники: British Library, Vatican Library, Bodleian, BnF и др.
        // ════════════════════════════════════════════════════════════════════
        var MANUSCRIPTS = [
            // ─── БИБЛЕЙСКИЕ РУКОПИСИ ────────────────────────────────────────
            {
                id:'codex-sinaiticus', cat:'bible', title:'Кодекс Синайский', short:'Синайский кодекс',
                date:'~ 330–360 н.э.', lang:'Греческий (койне)', place:'Монастырь Св. Екатерины, Синай',
                location:'Британский музей, Лондон', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Codex_Sinaiticus_Matthew_6_22-7_21.JPG/800px-Codex_Sinaiticus_Matthew_6_22-7_21.JPG',
                imgFb:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Codex_Alexandrinus_f41v_-_Luke_12.jpg/800px-Codex_Alexandrinus_f41v_-_Luke_12.jpg',
                original:'ΠΑΤΕΡ ΗΜΩΝ Ο ΕΝ ΤΟΙΣ ΟΥΡΑΝΟΙΣ · ΑΓΙΑΣΘΗΤΩ ΤΟ ΟΝΟΜΑ ΣΟΥ · ΕΛΘΕΤΩ Η ΒΑΣΙΛΕΙΑ ΣΟΥ',
                translation:'Отче наш, сущий на небесах, да святится имя Твоё, да придёт Царствие Твоё (Мф 6:9–10)',
                script:'Унциальное (маюскульное) греческое письмо без пробелов — скриптио континуа',
                desc:'Древнейшая почти полная Библия. Написана 4 писцами на 347 листах тонкого пергамента (велень). Открыт Константином Тишендорфом в 1844–1859 гг. Рукопись содержит Ветхий и Новый Завет полностью, а также Послание Варнавы и Пастырь Ерма — апокрифы, не вошедшие в канон.',
                url:'https://codexsinaiticus.org',
                facts:['Написан 4 писцами (~350 г.н.э.)', '23 000 исправлений разных эпох', 'Хранится в 4 местах: Лондон, Лейпциг, Петербург, Синай', 'Полностью оцифрован — codexsinaiticus.org', 'Содержит апокрифы: Варнаву и Ерма', 'Размер листа 38 × 34 см, 4 колонки на странице'],
                significance:'Основа критических изданий Нового Завета. Устраняет сотни ошибок поздних копий.'
            },
            {
                id:'codex-vaticanus', cat:'bible', title:'Кодекс Ватиканский', short:'Codex Vaticanus',
                date:'~ 300–325 н.э.', lang:'Греческий (койне)', place:'Александрия (предположительно)',
                location:'Ватиканская апостольская библиотека, Рим', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Codex_Vaticanus_B%2C_2Thess._3%2C11-18%2C_Hebr._1%2C1-2%2C2.jpg/800px-Codex_Vaticanus_B%2C_2Thess._3%2C11-18%2C_Hebr._1%2C1-2%2C2.jpg',
                imgFb:'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800',
                original:'ΕΝ ΑΡΧΗ ΗΝ Ο ΛΟΓΟΣ ΚΑΙ Ο ΛΟΓΟΣ ΗΝ ΠΡΟΣ ΤΟΝ ΘΕΟΝ ΚΑΙ ΘΕΟΣ ΗΝ Ο ΛΟΓΟΣ',
                translation:'В начале было Слово, и Слово было у Бога, и Слово было Бог (Иоанн 1:1)',
                script:'Унциальное греческое письмо, 3 колонки на странице',
                desc:'Возможно, старейший из четырёх великих унциальных кодексов — написан около 300 г. Хранится в Ватикане с XV века. Содержит Септуагинту (ВЗ по-гречески) и большую часть НЗ. Утрачены листы с Быт 1–46, Пс 105–137, Евр 9–13, Послания Тимофею/Титу, Филимону и Откровение. Предмет строжайшей охраны — Ватикан столетиями запрещал учёным его изучать.',
                url:'https://digi.vatlib.it/mss/Vat.gr.1209',
                facts:['Старейший датируемый фрагмент Библии', 'Изучен Тишендорфом лишь в 1843 г.', 'Оцифрован и выложен Ватиканом в 2012 г.', 'Отсутствует Апокалипсис — вероятно, намеренно', '759 листов сверхтонкого пергамента', 'Принадлежал греческому монастырю до 1475 г.'],
                significance:'Лучший свидетель «Западного» типа текста НЗ. Ключевой для реконструкции оригинала.'
            },
            {
                id:'codex-alexandrinus', cat:'bible', title:'Кодекс Александрийский', short:'Codex Alexandrinus',
                date:'~ 400–440 н.э.', lang:'Греческий', place:'Александрия или Константинополь',
                location:'Британская библиотека, Лондон', signal:'★★★★☆',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/2/2b/JohnRylands.jpg/800px-JohnRylands.jpg',
                imgFb:'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800',
                original:'ΚΥΡΙΟΣ ΠΟΙΜΑΙΝΕΙ ΜΕ ΚΑΙ ΟΥΔΕΝ ΜΕ ΥΣΤΕΡΗΣΕΙ · ΕΙΣ ΤΟΠΟΝ ΧΛΟΗΣ ΕΚΕΙ ΜΕ ΚΑΤΕΣΚΗΝΩΣΕΝ',
                translation:'Господь — Пастырь мой, я ни в чём не буду нуждаться, на злачных пажитях покоит меня (Пс 22:1-2)',
                script:'Унциальное, 2 колонки для НЗ и 3 для поэтических книг ВЗ',
                desc:'Богато украшенный кодекс, подаренный английскому королю Карлу I патриархом Кириллом Лукарем в 1627 году. Первый греческий кодекс в Западной Европе — поворотный момент в библеистике. Содержит 1 и 2 Климента (апокрифы). Украшен декоративными заголовками — одна из первых библейских рукописей с художественным оформлением.',
                url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Royal_MS_1_D_VIII',
                facts:['Подарен королю Карлу I в 1627 году', 'Содержит Послания Климента (апокрифы)', 'Первый опубликованный греческий НЗ в UK', '773 листа из первоначальных 820', 'Декоративные названия книг — ранний пример', 'Часть хранится в Британской библиотеке'],
                significance:'Важнейший источник для текста Апокалипсиса — Синайский там дефективен.'
            },
            {
                id:'dead-sea', cat:'bible', title:'Свитки Мёртвого моря', short:'Кумранские свитки',
                date:'250 до н.э. — 68 н.э.', lang:'Иврит, арамейский, греческий', place:'Пещеры Кумрана у Мёртвого моря',
                location:'Музей Израиля («Храм Книги»), Иерусалим', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/3/35/Great_Isaiah_Scroll.jpg/800px-Great_Isaiah_Scroll.jpg',
                imgFb:'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800',
                original:'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
                translation:'В начале сотворил Бог небо и землю (Бытие 1:1)',
                script:'Квадратное еврейское письмо (ашурит), некоторые — палеоеврейским',
                desc:'Обнаружены в 1947–1956 гг. в 11 пещерах мальчиком-пастухом Мухаммедом эд-Диибом. 972 рукописи — древнейшие известные копии ВЗ. Великий Свиток Исайи (1QIs-a, весь текст, 54 колонки!) на 1000 лет старше следующей копии. Революционное открытие: сравнение с масоретским текстом доказало поразительную точность переписки за тысячелетие.',
                url:'https://www.deadseascrolls.org.il',
                facts:['Открыты в 1947 году в пещерах Кумрана', '972 рукописи из 11 пещер', 'Великий Свиток Исайи — полностью (54 колонки)', 'Возраст до 2300 лет (радиоуглеродный анализ)', 'Включают тексты всех книг ВЗ, кроме Есфири', 'Часть — неизвестные апокрифические тексты'],
                significance:'Подтвердили точность масоретского текста Ветхого Завета. Перевернули библеистику.'
            },
            {
                id:'leningrad', cat:'bible', title:'Ленинградский кодекс', short:'Codex Leningradensis',
                date:'1008–1009 н.э.', lang:'Иврит (масоретский текст)', place:'Каир, ешива бен Ашера',
                location:'Российская национальная библиотека, СПб', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Leningrad_codex_whole_book.jpg/800px-Leningrad_codex_whole_book.jpg',
                imgFb:'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800',
                original:'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד',
                translation:'Слушай, Израиль: Господь Бог наш, Господь один (Второзаконие 6:4)',
                script:'Квадратный ашурит с тивериадскими огласовками масоретов',
                desc:'Старейшая полная рукопись Еврейской Библии (Танаха). Написана книжником Шмуэлем бен Яковом в Каире в 1008-09 гг. по образцу манускриптов Аарона бен Моше бен Ашера. Масореты разработали систему огласовок (никуд) и кантилляции (трамы/знаки чтения) — уникальная технология сохранения произношения слов Торы. Именно этот кодекс — стандарт всех академических изданий ВЗ.',
                url:'https://www.sefaria.org',
                facts:['Написан Шмуэлем бен Яковом в 1008 г.', 'Единственная полная масоретская рукопись', 'Основа Biblia Hebraica Stuttgartensia (BHS)', 'Имеет художественное оформление — «ковёр» из текста', 'Снабжён масоретскими примечаниями (масорой)', '491 лист, крупный формат'],
                significance:'Стандарт всех современных критических изданий Ветхого Завета в мире.'
            },
            {
                id:'aleppo', cat:'bible', title:'Алеппский кодекс', short:'Keter Aram Tzova',
                date:'~ 920–930 н.э.', lang:'Иврит (масоретский)', place:'Тиберия — Алеппо — Иерусалим',
                location:'Институт Бен-Цви, Иерусалим', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/1/11/Aleppo_Codex_-_Joshua.jpg/800px-Aleppo_Codex_-_Joshua.jpg',
                imgFb:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
                original:'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם',
                translation:'В начале сотворил Бог небо...',
                script:'Ашурит с тивериадскими огласовками Аарона бен Ашера',
                desc:'Долгое время считался самым авторитетным из масоретских кодексов — ещё сам Маймонид (XII в.) называл его эталонным. Создан Аароном бен Моше бен Ашером — главой тивериадской школы масоретов. В 1947 году во время погромов в Алеппо около 200 листов были утеряны или уничтожены — пропала вся Тора (Пятикнижие Моисея). Восстановить утраченное невозможно.',
                url:'https://aleppocodex.org',
                facts:['Создан ~ 920-930 г. Аароном бен Ашером', 'Маймонид называл его «правильным текстом»', 'В 1947 г. утеряно 40% — вся Тора и др.', 'Оставшиеся 294 листа вывезены в Израиль', 'Полностью оцифрован доступен онлайн', 'Считался сакральным — копировать запрещалось'],
                significance:'До 1947 — самый авторитетный еврейский текст Библии. Трагедия его утраты невосполнима.'
            },
            {
                id:'p52', cat:'bible', title:'Папирус Рилэндс P52', short:'P52 / P.Ryl.457',
                date:'~ 117–138 н.э.', lang:'Греческий', place:'Египет (предположительно Оксиринх)',
                location:'Библиотека Джона Рилэндса, Манчестер', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/0/0c/DiamondSutra.jpeg/800px-DiamondSutra.jpeg',
                imgFb:'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800',
                original:'ΗΡΩΤΗΣΑΝ ΑΥΤΟΝ · ΕΙΠ[ΩΝ ΑΥΤΩ] · ΤΙΝΑ ΚΑΤΗΓΟΡΙΑΝ [ΦΕΡΕΤΕ] · ΚΑΤΑ ΤΟΥ ΑΝΘΡΩΠΟΥ ΤΟΥΤΟΥ',
                translation:'Спросили его: какое обвинение выдвигаете против этого человека? (Иоанн 18:29)',
                script:'Ранний греческий унциал на папирусе, обе стороны листа',
                desc:'Размером с кредитную карту (9×6 см) — этот крошечный фрагмент Евангелия от Иоанна является СТАРЕЙШИМ известным фрагментом Нового Завета. Написан в Египте при жизни людей, лично знавших апостолов. Опровергает теории о позднем возникновении Евангелий. Содержит Ин 18:31-33 (лицевая) и 18:37-38 (обратная) — сцену суда Пилата над Иисусом.',
                url:'https://www.library.manchester.ac.uk/rylands/specialcollections/archives/',
                facts:['Размер: 9 × 6 см — как кредитная карта', 'Старейший фрагмент НЗ в мире', 'Написан через 15-50 лет после смерти Иисуса', 'Содержит сцену суда Пилата (Ин 18)', 'Куплен Б.П. Грэнфеллом в 1920 году', 'Датирован почерком: II в.н.э.'],
                significance:'Доказывает: Евангелие от Иоанна существовало в Египте не позднее 150 г.н.э.'
            },
            {
                id:'bodmer2', cat:'bible', title:'Папирус Бодмер P66', short:'Bodmer Papyrus P66',
                date:'~ 200 н.э.', lang:'Греческий', place:'Египет (Наг-Хаммади?)',
                location:'Biblioteca Bodmeriana, Женева', signal:'★★★★☆',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/c/c5/P66.jpg/800px-P66.jpg',
                imgFb:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
                original:'ΕΝ ΑΡΧΗ ΗΝ Ο ΛΟΓΟΣ ΚΑΙ Ο ΛΟΓΟΣ ΗΝ ΠΡΟΣ ΤΟΝ ΘΕΟΝ',
                translation:'В начале было Слово, и Слово было у Бога (Иоанн 1:1)',
                script:'Каллиграфический греческий унциал на папирусном кодексе',
                desc:'Поразительно сохранившийся папирусный кодекс Евангелия от Иоанна — практически полный текст. Написан около 200 г.н.э. в Египте. Особенность: рукопись была в процессе корректуры — видны исправления трёх разных почерков. Приобретён библиофилом Мартеном Бодмером в 1952 году из частной коллекции. Часть коллекции Бодмера ныне в Ватикане.',
                url:'https://www.fondationbodmer.ch',
                facts:['Почти полное Евангелие от Иоанна', '75 страниц из предполагаемых 108', 'Следы корректуры — рукопись «жила»', 'Куплен Мартеном Бодмером в 1952 г.', 'Часть коллекции передана Ватикану', '~ 200 г.н.э. — важнейшая датировка'],
                significance:'Старейший почти полный текст Евангелия от Иоанна. Ценнейший свидетель ранней традиции.'
            },
            {
                id:'nash', cat:'bible', title:'Папирус Нэша', short:'Nash Papyrus',
                date:'150–100 до н.э.', lang:'Иврит', place:'Фаюм, Египет',
                location:'Кембриджская университетская библиотека', signal:'★★★★☆',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/1/16/NashPapyrus.jpg/800px-NashPapyrus.jpg',
                imgFb:'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800',
                original:'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵֽינוּ יְהוָה׀ אֶחָֽד',
                translation:'Слушай, Израиль: Господь Бог наш, Господь один (Втор 6:4)',
                script:'Квадратное еврейское письмо без огласовок',
                desc:'До открытия Свитков Мёртвого моря (1947) — старейший известный фрагмент Библии на иврите. Содержит Десять Заповедей (Исх 20:2-17) и молитву Шма (Втор 6:4-5) — сердце иудейской веры. Приобретён Уолтером Нэшем у египетского торговца в 1898 году. Датирован Уильямом Олбрайтом в 1937 году — находка наделала сенсацию.',
                url:'https://cudl.lib.cam.ac.uk',
                facts:['До 1947 — старейшая библейская рукопись', 'Содержит Десять Заповедей полностью', 'Куплен Нэшем в Египте в 1898 г.', 'Датировка: I-II вв до н.э.', 'Содержит молитву «Шма Исраэль»', 'Обнаружена Джоном Нэшем'],
                significance:'Был краеугольным камнем истории еврейской письменности — пока не нашли Кумранские свитки.'
            },
            // ─── КОРАНИЧЕСКИЕ РУКОПИСИ ──────────────────────────────────────
            {
                id:'sanaa', cat:'quran', title:'Рукопись Саны', short:'Sana\'a Palimpsest',
                date:'~ 645–690 н.э.', lang:'Арабский (хиджазское письмо)', place:'Большая мечеть Саны, Йемен',
                location:'Дом рукописей, Сана, Йемен', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Quran_manuscript.jpg/800px-Quran_manuscript.jpg',
                imgFb:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800',
                original:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
                translation:'Во имя Аллаха Милостивого Милосердного. Поистине, Мы ниспослали его в Ночь Предопределения (Сура 97:1)',
                script:'Хиджазское письмо — ранняя форма арабского до реформы аль-Кисаи',
                desc:'Обнаружена в 1972 году при реставрации Большой мечети Саны — рукописи упали с потолка. Палимпсест: нижний слой письма смыт и поверх написан новый текст. УФ-спектроскопия выявила более ранний текст, отличающийся от стандартного Корана. Вероятно, один из первых коранических кодексов, предшествующих канонизации Усмана (~650 г.). Уникальный источник для изучения ранней истории Корана.',
                url:'https://www.islamic-awareness.org/quran/text/mss/',
                facts:['Обнаружена случайно при ремонте мечети', 'Палимпсест — два слоя текста', 'УФ раскрыл более ранний вариант', 'Датировка по пергаменту: 645–690 г.', 'Имеет незначительные вариации текста', 'Один из старейших коранических кодексов'],
                significance:'Редчайшее свидетельство ранних этапов кодификации Корана до Усмановской редакции.'
            },
            {
                id:'birmingham', cat:'quran', title:'Бирмингемский Коран', short:'Birmingham Quran',
                date:'568–645 н.э.', lang:'Арабский (хиджазское письмо)', place:'Хиджаз (Аравия)',
                location:'Университет Бирмингема, Великобритания', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Birmingham_Quran_manuscript.jpg/800px-Birmingham_Quran_manuscript.jpg',
                imgFb:'https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?w=800',
                original:'وَالنَّجْمِ إِذَا هَوَىٰ · مَا ضَلَّ صَاحِبُكُمْ وَمَا غَوَىٰ',
                translation:'Клянусь звездой, когда она падает! Ваш товарищ не заблудился и не впал в заблуждение (Сура 53:1-2)',
                script:'Хиджазское письмо без диакритических точек и огласовок',
                desc:'Сенсационное открытие 2015 года: радиоуглеродный анализ датировал пергамент 568–645 годами н.э. Если верхняя граница верна, рукопись написана при жизни пророка Мухаммада (570–632 н.э.) или сразу после его смерти. Хранится в Университете Бирмингема с 1936 года, но датирован лишь в 2015. Содержит суры 18–20 (Аль-Кахф, Марьям, Та Ха). Два листа — часть более крупной рукописи (остальное в Париже).',
                url:'https://www.birmingham.ac.uk/facilities/cadbury/news/2015/07/quran-manuscript',
                facts:['Датирован 568–645 г. радиоуглеродом', 'Мог быть написан при Мухаммаде ﷺ', 'Хранился в Бирмингеме с 1936 г.', 'Датирован лишь в 2015 году', 'Содержит суры 18–20 (Аль-Кахф и др.)', 'Два листа — другие в Парижской БнФ'],
                significance:'Один из старейших коранических текстов мира — возможно, современник самого Пророка.'
            },
            {
                id:'topkapi', cat:'quran', title:'Коран Топкапы', short:'Topkapi Quran',
                date:'VIII–IX вв. н.э.', lang:'Арабский (куфическое письмо)', place:'Константинополь/Стамбул',
                location:'Дворец Топкапы, Стамбул, Турция', signal:'★★★★☆',
                imgUrl:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=900&q=85',
                imgFb:'https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?w=800',
                original:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
                translation:'Во имя Аллаха Милостивого Милосердного. Хвала Аллаху, Господу миров (Аль-Фатиха 1:1-2)',
                script:'Куфическое письмо — монументальный угловатый стиль ранней каллиграфии',
                desc:'Традиционно приписывается третьему халифу Усману ибн Аффану, составившему канонический текст Корана около 650 г.н.э. и разославшему копии в крупнейшие города. Хранится в Стамбуле как священная реликвия Османской империи. Написан на пергаменте из кожи газели изысканным куфическим почерком. Мусульмане поклонялись этому Корану как подлинному экземпляру Усмана.',
                url:'https://www.topkapipalace.gov.tr',
                facts:['Приписывается халифу Усману (~650 г.)', 'Написан на коже газели', 'Куфическое письмо без точек и огласовок', 'Одна из «5 копий» Усмана', 'Хранится в Стамбуле столетия', 'Реальная датировка — VIII–IX в.н.э.'],
                significance:'Священнейшая реликвия османских халифов. Символ непрерывности Корана от Пророка.'
            },
            {
                id:'samarkand', cat:'quran', title:'Самаркандский Коран', short:'Samarkand Quran',
                date:'VII–VIII вв. н.э.', lang:'Арабский (хиджазское письмо)', place:'Медина → Самарканд → Ташкент',
                location:'Библиотека Навои, Ташкент, Узбекистан', signal:'★★★★☆',
                imgUrl:'https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?w=900&q=85',
                imgFb:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800',
                original:'الرَّحْمَٰنِ الرَّحِيمِ · مَالِكِ يَوْمِ الدِّينِ · إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
                translation:'Милостивому, Милосердному, Властелину Дня воздаяния. Тебе одному мы поклоняемся (Аль-Фатиха 1:3-5)',
                script:'Хиджазское письмо крупного формата, 353 листа (68×53 см)',
                desc:'Тимур (Тамерлан) вывез этот Коран как трофей из Багдада и поместил в соборную мечеть Самарканда. Согласно местной традиции — оригинальный экземпляр Усмана, написанный кровью халифа (предание, но не факт). Русские забрали рукопись в 1869 году в Петербург — в 1924 Ленин вернул её Узбекистану. Доступен для просмотра верующим в специальной витрине.',
                url:'https://uz.m.wikipedia.org/wiki/Samarqand_Qur%27oni',
                facts:['Вывезен Тамерланом как священный трофей', 'Предание: написан кровью халифа Усмана', 'Изъят Россией в 1869 г., возвращён в 1924 г.', '353 листа размером 68 × 53 см', 'Открыт для верующих в Ташкенте', 'Реальная датировка — VII–VIII в.н.э.'],
                significance:'Символ исламского культурного наследия Центральной Азии и истории самаркандской учёности.'
            },
            // ─── ДРУГИЕ РЕЛИГИОЗНЫЕ РУКОПИСИ ────────────────────────────────
            {
                id:'nag-hammadi', cat:'other', title:'Библиотека Наг-Хаммади', short:'Гностические кодексы',
                date:'~ 350–400 н.э.', lang:'Коптский (саидский диалект)', place:'Наг-Хаммади, Верхний Египет',
                location:'Коптский музей, Каир, Египет', signal:'★★★★☆',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/0/09/Nag_Hammadi_books.jpg/800px-Nag_Hammadi_books.jpg',
                imgFb:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
                original:'ⲡⲉϫⲉ ⲓⲥ ϫⲉ ⲡⲉⲧⲁϣⲉ ⲡⲱⲱⲛⲉ ⲛⲁⲩ ⲉⲃⲟⲗ · ⲙⲁⲣⲉϥⲣ ⲡⲉⲧϣⲟⲟⲡ',
                translation:'Иисус сказал: пусть тот, кто ищет, не перестанет искать, пока не найдёт (Евангелие Фомы 2)',
                script:'Коптский маюскул на папирусе, переплёты из кожи',
                desc:'13 кожаных кодексов, содержащих 52 текста, найдены в декабре 1945 года двумя египетскими крестьянами в горшке у скалы. Включают Евангелие Фомы, Евангелие Филиппа, Апокриф Иоанна — ключевые гностические тексты, осуждённые официальной церковью. Перевернули понимание раннего христианства: существовало множество конкурирующих версий учения.',
                url:'https://www.coptic-cairo.com',
                facts:['13 кодексов найдены в 1945 году крестьянами', '52 текста — 40 ранее неизвестных', 'Включают Евангелие Фомы и Евангелие Истины', 'Гностические тексты, запрещённые церковью', 'Написаны на коптском — перевод с греческого', 'Хранятся в Коптском музее Каира'],
                significance:'Открыли целый потерянный мир раннехристианской мысли — «другое» христианство I–II веков.'
            },
            {
                id:'diamond-sutra', cat:'buddhism', title:'Алмазная сутра', short:'Diamond Sutra / 金剛般若波羅蜜經',
                date:'868 н.э.', lang:'Китайский (вэньянь)', place:'Дуньхуан, Китай',
                location:'Британская библиотека, Лондон', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Arca_de_Noe-Athanasius_Kircher.jpg/800px-Arca_de_Noe-Athanasius_Kircher.jpg',
                imgFb:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
                original:'如是我聞。一時佛在舍衛國。祇樹給孤獨園。與大比丘衆千二百五十人俱。',
                translation:'Так я слышал. Однажды Будда пребывал в Шравасти, в роще Джеты... (начало Алмазной сутры)',
                script:'Ксилография — печать с деревянных блоков, 7 страниц склеены в свиток',
                desc:'Старейшая датированная печатная книга в мире. Colophon (послесловие) гласит: «напечатана 11 мая 868 года для бесплатного распространения». За 600 лет до Гутенберга! Текст — ключевая сутра чань/дзен буддизма о природе пустоты и освобождения. Найдена Аурелем Стейном в 1900 году в замурованной пещере-библиотеке Могао. Длина — 5 метров.',
                url:'https://www.bl.uk/onlinegallery/sacredtexts/diamondsutra.html',
                facts:['Старейшая датированная печатная книга мира', 'Напечатана 11 мая 868 года', 'За 600 лет до Гутенберга', 'Длина свитка — 5 метров', 'Найдена в замурованной пещере Могао', 'Переведена на многие языки'],
                significance:'Перевернула историю печати: доказала, что китайцы изобрели книгопечатание на 600 лет раньше Европы.'
            },
            {
                id:'book-kells', cat:'bible', title:'Книга Келлс', short:'Book of Kells / Leabhar Cheanannais',
                date:'~ 800 н.э.', lang:'Латинский', place:'Остров Иона, Шотландия или Ирландия',
                location:'Библиотека Тринити-колледжа, Дублин', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/0/09/KellsFol032vChristEnthroned.jpg/800px-KellsFol032vChristEnthroned.jpg',
                imgFb:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
                original:'IN PRINCIPIO ERAT VERBUM · ET VERBUM ERAT APUD DEUM · ET DEUS ERAT VERBUM',
                translation:'В начале было Слово, и Слово было у Бога, и Слово было Бог (Иоанн 1:1 по-латински)',
                script:'Островной маюскул — ирландский стиль с невероятными орнаментами',
                desc:'Шедевр средневекового книжного искусства. Создана ирландскими монахами-колумбанами около 800 г. Четыре Евангелия на 340 листах с 2000+ орнаментальными инициалами и полными страницами иллюминаций (миниатюр). Знаменитая «ковровая страница» — фракталоподобный орнамент, потребовавший месяцев работы. Хи-ро страница (CHI-Rho) с монограммой Христа — вершина кельтского искусства.',
                url:'https://digitalcollections.tcd.ie/concern/works/hm50tr726',
                facts:['~2000 орнаментальных инициалов', '340 листов телячьего пергамента', 'Создана в монастыре Ионы около 800 г.', 'Украдена викингами в 1007 г., найдена без крышки', '4 евангелия на латыни — Вульгата', 'Выставлена в Дублине — 500 000 посетителей в год'],
                significance:'Вершина кельтского христианского искусства. Самая известная иллюминированная рукопись Средневековья.'
            },
            {
                id:'lindisfarne', cat:'bible', title:'Евангелие Линдисфарна', short:'Lindisfarne Gospels',
                date:'~ 715–720 н.э.', lang:'Латинский + древнеанглийский', place:'Линдисфарн (Святой остров), Нортумбрия',
                location:'Британская библиотека, Лондон', signal:'★★★★★',
                imgUrl:'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/thumb/5/58/Lindisfarne_Gospels_cross_carpet_page.jpg/800px-Lindisfarne_Gospels_cross_carpet_page.jpg',
                imgFb:'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800',
                original:'INITIUM EVANGELII IESU CHRISTI FILII DEI · SICUT SCRIPTUM EST IN ESAIA PROPHETA',
                translation:'Начало Евангелия Иисуса Христа, Сына Божия, как написано у пророка Исаии (Марк 1:1)',
                script:'Островной полуунциал — дальнейшее развитие ирландского стиля',
                desc:'Создано монахом Эдфритом в одиночку как посмертный дар епископу Линдисфарна Кутберту. 259 листов телячьего пергамента с 5 большими «ковровыми» страницами. Интерлинейный перевод (глоссы) на древнеанглийский, добавленный в X веке, — один из первых переводов Евангелий на английский язык. Спасено монахами при набеге викингов — несли с собой мощи Кутберта 200 лет.',
                url:'https://www.bl.uk/onlinegallery/sacredtexts/lindisfarne.html',
                facts:['Создано монахом Эдфритом в одиночку', 'Первый перевод Евангелий на английский', '259 листов, 5 «ковровых» страниц', 'Спасено при набеге викингов в IX в.', 'Глоссы на древнеанглийском добавлены в X в.', 'Оцифровано Британской библиотекой'],
                significance:'Один из шедевров западноевропейского книжного искусства и первый перевод части Библии на английский.'
            },
            {
                id:'peshitta', cat:'bible', title:'Пешитта — Сирийская Библия', short:'Peshitta',
                date:'II в. н.э.', lang:'Сирийский (сертa)', place:'Ближний Восток (Месопотамия)',
                location:'Различные собрания мира', signal:'★★★★☆',
                imgUrl:'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=900&q=85',
                imgFb:'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800',
                original:'ܒܪܫܝܬ ܒܪܐ ܐܠܗܐ ܝܬ ܫܡܝܐ ܘܝܬ ܐܪܥܐ',
                translation:'В начале сотворил Бог небо и землю (Бытие 1:1 по-сирийски)',
                script:'Сирийский эстрангело / серта — родственник арамейского Иисуса',
                desc:'Официальная Библия сирийских христиан — одна из старейших церковных традиций мира. «Пешитта» означает «простая», «общедоступная». Написана на языке, близком к арамейскому — языку Иисуса Христа. Ветхозаветная часть, вероятно, переведена иудейскими общинами Месопотамии ещё до Рождества Христова. Используется несторианами, маронитами и другими восточными церквями.',
                url:'https://peshitta.org',
                facts:['Написана на арамейском — языке Иисуса', 'Официальная Библия сирийских церквей', 'ВЗ переведён ещё до н.э. иудеями', 'Используется до сих пор в литургии', 'Содержит 22 книги НЗ (без 5 малых)', 'Одна из трёх великих ранних традиций'],
                significance:'Связующее звено между арамейской средой Иисуса и мировым христианством. Мост к истокам.'
            },
            {
                id:'rylands-arabic', cat:'quran', title:'Рукопись Рилэндса', short:'Rylands Arabic 27',
                date:'~710–715 н.э.', lang:'Арабский (куфическое письмо)', place:'Египет или Сирия',
                location:'Библиотека Рилэндса, Манчестер', signal:'★★★★☆',
                imgUrl:'https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?w=900&q=85',
                imgFb:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800',
                original:'قُلْ هُوَ اللَّهُ أَحَدٌ · اللَّهُ الصَّمَدُ · لَمْ يَلِدْ وَلَمْ يُولَدْ',
                translation:'Скажи: Он — Аллах Единый, Аллах Самодостаточный. Он не родил и не был рождён (Аль-Ихляс 112:1-3)',
                script:'Ранний куфи без диакритики — характерный для Омейядской эпохи',
                desc:'Один из старейших датируемых Коранических фрагментов за пределами исламского мира. Приобретён для Рилэндса в начале XX века из египетских антикварных магазинов. Радиоуглеродный анализ (2010) подтвердил датировку: первая треть VIII века н.э. Содержит фрагменты нескольких сур. Образец каллиграфического стиля «Омейядский куфи» — угловатого, без точек.',
                url:'https://www.library.manchester.ac.uk',
                facts:['Один из старейших Коранов в Европе', 'Датирован 710–715 н.э.', 'Куфическое письмо без диакритики', 'Приобретён у египетских торговцев', 'Радиоуглеродный анализ 2010 года', 'Подтверждает раннюю стабилизацию текста'],
                significance:'Свидетель раннего распространения Корана в период формирования исламской цивилизации.'
            },
        ];

        // ════════════════════════════════════════════════════════════════════
        // ПЕРЕРАБОТАННЫЙ МОДУЛЬ МАНУСКРИПТОВ
        // ════════════════════════════════════════════════════════════════════
        function ManuscriptsModule({ apiKey }) {
            const [selected, setSelected] = useState(MANUSCRIPTS[0]);
            const [cat, setCat]           = useState('all');
            const [aiText, setAiText]     = useState('');
            const [aiLoad, setAiLoad]     = useState(false);
            const [view, setView]         = useState('gallery');
            // Лайтбокс для увеличения изображения
            const [lightbox, setLightbox] = useState(null); // {src, alt, caption}

            const CATS = [
                {k:'all',      l:'Все манускрипты'},
                {k:'bible',    l:'✝️ Библейские'},
                {k:'quran',    l:'☪️ Коранические'},
                {k:'buddhism', l:'☸️ Буддийские'},
                {k:'other',    l:'📚 Прочие'},
            ];

            const filtered = cat === 'all' ? MANUSCRIPTS : MANUSCRIPTS.filter(m => m.cat === cat);

            const CAT_COLOR = {
                bible:    {bg:'#fffbeb', border:'#fde68a', badge:'#fef3c7', txt:'#92400e', dot:'#d97706'},
                quran:    {bg:'#ecfdf5', border:'#6ee7b7', badge:'#d1fae5', txt:'#065f46', dot:'#059669'},
                buddhism: {bg:'#fefce8', border:'#fde047', badge:'#fef9c3', txt:'#713f12', dot:'#ca8a04'},
                other:    {bg:'#f0f9ff', border:'#bae6fd', badge:'#e0f2fe', txt:'#0c4a6e', dot:'#0ea5e9'},
            };

            const analyze = async () => {
                setAiLoad(true); setAiText('');
                const r = await fetchZvenoAIAnalysis(
                    `Проведи глубокий академический анализ рукописи: "${selected.title}" (${selected.date}, ${selected.lang}).
Описание: ${selected.desc}
Значение: ${selected.significance}
Оригинальный текст: ${selected.original}
Перевод: ${selected.translation}

Рассмотри: 1) историю открытия и хранения 2) палеографические особенности 3) текстологическую ценность 4) спорные вопросы 5) что изменило наше понимание священных текстов 6) доступность для исследователей.`,
                    `Манускрипт: ${selected.title}, ${selected.lang}, ${selected.date}`, apiKey
                );
                setAiText(r); setAiLoad(false);
            };

            const clr = CAT_COLOR[selected.cat] || CAT_COLOR.other;

            // Открыть лайтбокс
            const openLightbox = (src, alt, caption) => {
                setLightbox({src, alt: alt||'', caption: caption||''});
            };

            return (
                <div className="fade-in-up space-y-6 pb-20 md:pb-6">

                    {/* ЛАЙТБОКС — увеличение изображения */}
                    {lightbox && (
                        <div
                            onClick={()=>setLightbox(null)}
                            style={{position:'fixed', inset:0, zIndex:99999,
                                    background:'rgba(0,0,0,0.92)', backdropFilter:'blur(8px)',
                                    display:'flex', flexDirection:'column',
                                    alignItems:'center', justifyContent:'center', padding:16}}>
                            <button
                                onClick={()=>setLightbox(null)}
                                style={{position:'absolute', top:16, right:16, width:40, height:40,
                                        borderRadius:20, background:'rgba(255,255,255,0.1)',
                                        border:'1px solid rgba(255,255,255,0.2)',
                                        color:'#fff', fontSize:18, fontWeight:700,
                                        cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                ✕
                            </button>
                            <img
crossOrigin="anonymous"                                 src={lightbox.src}
                                alt={lightbox.alt}
                                onError={e=>{if(!e.target.src.includes('fallback'))e.target.src='https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=70';}} onClick={e=>e.stopPropagation()}
                                style={{maxWidth:'90vw', maxHeight:'80vh', objectFit:'contain',
                                        borderRadius:12, boxShadow:'0 25px 60px rgba(0,0,0,0.8)'}}/>
                            {lightbox.caption && (
                                <p style={{color:'#d6d3d1', fontSize:13, marginTop:12,
                                           textAlign:'center', maxWidth:600, lineHeight:1.5}}>
                                    {lightbox.caption}
                                </p>
                            )}
                            <p style={{color:'#78716c', fontSize:11, marginTop:8}}>
                                Нажмите за пределами фото чтобы закрыть · Scroll для прокрутки
                            </p>
                        </div>
                    )}

                    {/* Заголовок */}
                    <div className="bg-[#1c1b1d] text-white rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3">📜 Манускрипты мировых религий</h2>
                        <p className="text-stone-400 text-sm md:text-lg">{MANUSCRIPTS.length} рукописей · Библия · Коран · Буддизм · Гностицизм · Средневековье</p>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[['Старейший текст','2300 лет','Свитки Мёртвого моря'],['Старейшая книга','868 н.э.','Алмазная сутра'],['Полная Библия','330–360 н.э.','Кодекс Синайский'],['При жизни Пророка','568–645 н.э.','Бирмингемский Коран']].map(([l,v,n])=>(
                                <div key={l} className="bg-white/5 rounded-2xl p-3 text-center">
                                    <div className="text-amber-400 font-bold text-sm">{v}</div>
                                    <div className="text-white font-bold text-xs mt-1">{n}</div>
                                    <div className="text-stone-500 text-[10px] uppercase tracking-widest mt-0.5">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Фильтр */}
                    <div className="flex flex-wrap gap-2">
                        {CATS.map(c=>(
                            <button key={c.k} onClick={()=>setCat(c.k)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${cat===c.k?'bg-stone-900 text-white border-stone-900':'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}>
                                {c.l} {cat===c.k && <span className="ml-1 opacity-60">({filtered.length})</span>}
                            </button>
                        ))}
                    </div>

                    {/* Сетка карточек */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map(m => {
                            const c = CAT_COLOR[m.cat] || CAT_COLOR.other;
                            return (
                                <div key={m.id}
                                    className="text-left rounded-2xl border-2 overflow-hidden hover:shadow-lg transition-all duration-200"
                                    style={{borderColor: selected.id===m.id ? c.dot : '#e7e5e4',
                                            background: selected.id===m.id ? c.bg : '#fff'}}>
                                    {/* Изображение — клик открывает лайтбокс */}
                                    <div className="h-36 overflow-hidden bg-stone-100 relative group cursor-zoom-in"
                                         onClick={()=>openLightbox(m.imgUrl, m.title, m.title + ' · ' + m.date)}>
                                        <img loading="lazy" crossOrigin="anonymous" src={m.imgUrl} alt={m.title}
                                            onError={e=>{if(e.target.src!==m.imgFb)e.target.src=m.imgFb;}}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl drop-shadow-lg">🔍</span>
                                        </div>
                                    </div>
                                    {/* Инфо + кнопка детали */}
                                    <div className="p-3 cursor-pointer" onClick={()=>{setSelected(m);setAiText('');setView('detail');}}>
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <span style={{background:c.badge, color:c.txt}}
                                                className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                                                {m.date}
                                            </span>
                                            <span className="text-[10px] text-amber-500">{m.signal}</span>
                                        </div>
                                        <p className="font-serif font-bold text-sm text-stone-900 leading-tight">{m.title}</p>
                                        <p className="text-[10px] text-stone-400 mt-1 font-bold uppercase tracking-wide">{m.lang}</p>
                                        <p className="text-[10px] text-amber-600 mt-1.5 font-bold">Нажмите для подробностей →</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Детальный просмотр */}
                    {view === 'detail' && (
                        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden" style={{borderTop:`4px solid ${clr.dot}`}}>

                            {/* Главное фото — кликабельное */}
                            <div className="relative h-72 md:h-96 bg-stone-900 cursor-zoom-in group"
                                 onClick={()=>openLightbox(selected.imgUrl, selected.title, selected.title + ' · ' + selected.date + ' · ' + selected.location)}>
                                <img loading="lazy" crossOrigin="anonymous" src={selected.imgUrl} alt={selected.title}
                                    onError={e=>{if(e.target.src!==selected.imgFb)e.target.src=selected.imgFb;}}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                                            <span style={{background:clr.dot}} className="text-white text-xs font-bold px-3 py-1 rounded-full">{selected.lang}</span>
                                            <span style={{background:'rgba(255,255,255,.15)'}} className="text-white text-xs font-bold px-3 py-1 rounded-full">{selected.date}</span>
                                            <span className="text-amber-400 font-bold">{selected.signal}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">{selected.title}</h3>
                                        <p className="text-stone-300 text-sm">{selected.location}</p>
                                    </div>
                                    <span className="text-white/70 text-sm font-bold ml-4 flex-shrink-0 flex items-center gap-1 mb-1">
                                        🔍 Нажмите для увеличения
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 md:p-10 space-y-8">
                                {/* Описание */}
                                <p className="text-stone-700 leading-relaxed text-base md:text-lg">{selected.desc}</p>

                                {/* Галерея дополнительных изображений flood (если есть) */}
                                {selected.flood && selected.flood.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">📷 Галерея изображений</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {selected.flood.map((img, fi) => (
                                                <div key={fi}
                                                     className="rounded-xl overflow-hidden cursor-zoom-in relative group"
                                                     style={{aspectRatio:'4/3', background:'#e7e5e4'}}
                                                     onClick={()=>openLightbox(img.src, img.cap, img.cap)}>
                                                    <img loading="lazy" crossOrigin="anonymous" src={img.src} alt={img.cap||''}
                                                        onError={e=>{e.target.style.display='none';}}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xl drop-shadow-lg">🔍</span>
                                                    </div>
                                                    {img.cap && (
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1.5">
                                                            <p className="text-white text-[10px] leading-tight">{img.cap}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Оригинальный текст + перевод */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl border-2" style={{background:clr.bg, borderColor:clr.border}}>
                                        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{color:clr.dot}}>
                                            Оригинальный текст ({selected.script || selected.lang})
                                        </p>
                                        <p className="font-serif text-xl md:text-2xl leading-relaxed mb-3"
                                            style={{color:clr.txt, direction:selected.cat==='quran'?'rtl':'ltr', fontFamily:'serif'}}>
                                            {selected.original}
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl border-2 border-stone-200 bg-stone-50">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Перевод на русский</p>
                                        <p className="font-serif text-base leading-relaxed text-stone-700 italic">«{selected.translation}»</p>
                                    </div>
                                </div>

                                {/* Значение */}
                                <div className="p-5 rounded-2xl" style={{background:clr.badge}}>
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{color:clr.dot}}>
                                        🎓 Научное значение
                                    </p>
                                    <p className="font-bold text-base" style={{color:clr.txt}}>{selected.significance}</p>
                                </div>

                                {/* Факты */}
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">📋 Ключевые факты</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selected.facts.map((f,i)=>(
                                            <div key={i} className="flex gap-3 bg-stone-50 border border-stone-200 rounded-xl p-3">
                                                <span style={{color:clr.dot}} className="font-bold flex-shrink-0">#{i+1}</span>
                                                <span className="text-stone-700 text-sm">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Хранение */}
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div><span className="text-stone-400 font-bold uppercase text-[10px]">Место находки</span><br/><span className="font-bold">{selected.place}</span></div>
                                    <div><span className="text-stone-400 font-bold uppercase text-[10px]">Хранится сейчас</span><br/><span className="font-bold">{selected.location}</span></div>
                                </div>

                                {/* AI анализ */}
                                <div className="border-t border-stone-100 pt-6">
                                    <button onClick={analyze} disabled={aiLoad}
                                        className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                                        style={{background: aiLoad ? '#78716c' : '#1c1917'}}>
                                        {aiLoad ? <><Icons.Loader c="w-4 h-4"/>Анализирую рукопись...</> : <>✨ Глубокий AI-анализ манускрипта</>}
                                    </button>
                                    {aiText && <div className="mt-5 ai-content p-6 bg-stone-50 rounded-2xl border border-stone-200" dangerouslySetInnerHTML={{__html: aiText}}/>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
