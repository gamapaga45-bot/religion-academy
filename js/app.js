
        const { useState, useEffect, useRef } = React;

        const copyToClipboard = (text) => {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        };

        // --- ИКОНКИ ---
        const IconBase = ({ children, className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>;
        const Icons = {
            Book: ({c}) => <IconBase className={c}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconBase>,
            Compare: ({c}) => <IconBase className={c}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><polyline points="16 9 18 11 20 9"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/><polyline points="4 15 6 17 8 15"/></IconBase>,
            Dash: ({c}) => <IconBase className={c}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></IconBase>,
            Search: ({c}) => <IconBase className={c}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconBase>,
            Moon: ({c}) => <IconBase className={c}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></IconBase>,
            Copy: ({c}) => <IconBase className={c}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></IconBase>,
            Play: ({c}) => <IconBase className={c}><polygon points="5 3 19 12 5 21 5 3"/></IconBase>,
            Square: ({c}) => <IconBase className={c}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></IconBase>,
            Info: ({c}) => <IconBase className={c}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></IconBase>,
            Volume: ({c}) => <IconBase className={c}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></IconBase>,
            Smile: ({c}) => <IconBase className={c}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></IconBase>,
            Video: ({c}) => <IconBase className={c}><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></IconBase>,
            MessageSquare: ({c}) => <IconBase className={c}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></IconBase>,
            Settings: ({c}) => <IconBase className={c}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></IconBase>,
            Key: ({c}) => <IconBase className={c}><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></IconBase>,
            Scroll: ({c}) => <IconBase className={c}><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></IconBase>,
            Heart: ({c}) => <IconBase className={c}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconBase>,
            Home: ({c}) => <IconBase className={c}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconBase>,
            Sparkles: ({c}) => <IconBase className={c}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></IconBase>,
            Loader: ({c}) => <IconBase className={`animate-spin ${c}`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></IconBase>
        };

        // --- БАЗОВЫЕ КОНСТАНТЫ ---
        var BIBLE_BOOKS_RU = {
            "Genesis": "Бытие", "Exodus": "Исход", "Leviticus": "Левит", "Numbers": "Числа", "Deuteronomy": "Второзаконие",
            "Joshua": "Иисус Навин", "Judges": "Судьи", "Ruth": "Руфь", "1 Samuel": "1 Царств", "2 Samuel": "2 Царств",
            "1 Kings": "3 Царств", "2 Kings": "4 Царств", "1 Chronicles": "1 Паралипоменон", "2 Chronicles": "2 Паралипоменон",
            "Ezra": "Ездра", "Nehemiah": "Неемия", "Esther": "Есфирь", "Job": "Иов", "Psalms": "Псалтирь", "Proverbs": "Притчи",
            "Ecclesiastes": "Екклесиаст", "Song of Solomon": "Песнь Песней", "Isaiah": "Исаия", "Jeremiah": "Иеремия",
            "Lamentations": "Плач Иеремии", "Ezekiel": "Иезекииль", "Daniel": "Даниил", "Hosea": "Осия", "Joel": "Иоиль",
            "Amos": "Амос", "Obadiah": "Авдий", "Jonah": "Иона", "Micah": "Михей", "Nahum": "Наум", "Habakkuk": "Аввакум",
            "Zephaniah": "Софония", "Haggai": "Аггей", "Zechariah": "Захария", "Malachi": "Малахия", "Matthew": "От Матфея",
            "Mark": "От Марка", "Luke": "От Луки", "John": "От Иоанна", "Acts": "Деяния", "Romans": "Римлянам",
            "1 Corinthians": "1 Коринфянам", "2 Corinthians": "2 Коринфянам", "Galatians": "Галатам", "Ephesians": "Ефесянам",
            "Philippians": "Филиппийцам", "Colossians": "Колоссянам", "1 Thessalonians": "1 Фессалоникийцам", "2 Thessalonians": "2 Фессалоникийцам",
            "1 Timothy": "1 Тимофею", "2 Timothy": "2 Тимофею", "Titus": "Титу", "Philemon": "Филимону", "Hebrews": "Евреям",
            "James": "Иакова", "1 Peter": "1 Петра", "2 Peter": "2 Петра", "1 John": "1 Иоанна", "2 John": "2 Иоанна",
            "3 John": "3 Иоанна", "Jude": "Иуды", "Revelation": "Откровение"
        };

        var SURAH_NAMES_RU = [
            "Аль-Фатиха", "Аль-Бакара", "Аль Имран", "Ан-Ниса", "Аль-Маида", "Аль-Ан'ам", "Аль-А'раф", "Аль-Анфаль", "Ат-Тауба", "Йунус",
            "Худ", "Йусуф", "Ар-Ра'д", "Ибрахим", "Аль-Хиджр", "Ан-Нахль", "Аль-Исра", "Аль-Кахф", "Марьям", "Та Ха",
            "Аль-Анбия", "Аль-Хаджж", "Аль-Му'минун", "Ан-Нур", "Аль-Фуркан", "Аш-Шу'ара", "Ан-Намль", "Аль-Касас", "Аль-Анкабут", "Ар-Рум",
            "Лукман", "Ас-Сажда", "Аль-Ахзаб", "Саба", "Фатыр", "Йа Син", "Ас-Саффат", "Сад", "Аз-Зумар", "Гафир",
            "Фуссилят", "Аш-Шура", "Аз-Зухруф", "Ад-Духан", "Аль-Джасия", "Аль-Ахкаф", "Мухаммад", "Аль-Фатх", "Аль-Худжурат", "Каф",
            "Аз-Зарият", "Ат-Тур", "Ан-Наджм", "Аль-Камар", "Ар-Рахман", "Аль-Ваки'а", "Аль-Хадид", "Аль-Муджадила", "Аль-Хашр", "Аль-Мумтахана",
            "Ас-Сафф", "Аль-Джуму'а", "Аль-Мунафикун", "Ат-Тагабун", "Ат-Талак", "Ат-Тахрим", "Аль-Мульк", "Аль-Калам", "Аль-Хакка", "Аль-Ма'аридж",
            "Нух", "Аль-Джинн", "Аль-Муззаммиль", "Аль-Муддассир", "Аль-Кыяма", "Аль-Инсан", "Аль-Мурсалят", "Ан-Наба", "Ан-Нази'ат", "Абаса",
            "Ат-Таквир", "Аль-Инфитар", "Аль-Мутаффифин", "Аль-Иншикак", "Аль-Бурудж", "Ат-Тарик", "Аль-А'ля", "Аль-Гашия", "Аль-Фаджр", "Аль-Баляд",
            "Аш-Шамс", "Аль-Лайл", "Ад-Духа", "Аш-Шарх", "Ат-Тин", "Аль-Аляк", "Аль-Кадр", "Аль-Баййина", "Аз-Залзала", "Аль-Адият",
            "Аль-Кари'а", "Ат-Такасур", "Аль-Аср", "Аль-Хумаза", "Аль-Филь", "Курайш", "Аль-Ма'ун", "Аль-Каусар", "Аль-Кафирун", "Ан-Наср",
            "Аль-Масад", "Аль-Ихляс", "Аль-Фалак", "Ан-Нас"
        ];

        // Полные тексты ключевых молитв как запасной вариант
        var FALLBACK_QURAN = {
            "1. Аль-Фатиха": {
                "1": "Во имя Аллаха, Милостивого, Милосердного!",
                "2": "Хвала Аллаху, Господу миров,",
                "3": "Милостивому, Милосердному,",
                "4": "Властелину Дня воздаяния!",
                "5": "Тебе одному мы поклоняемся и Тебя одного молим о помощи.",
                "6": "Веди нас прямым путём,",
                "7": "путём тех, кого Ты облагодетельствовал, не тех, на кого пал гнев, и не заблудших."
            },
            "112. Аль-Ихляс": {
                "1": "Скажи: «Он — Аллах Единый,",
                "2": "Аллах Самодостаточный.",
                "3": "Он не родил и не был рождён,",
                "4": "и нет никого равного Ему.»"
            },
            "2. Аль-Бакара": {
                "1": "Алиф Лям Мим.",
                "2": "Это Писание, в котором нет сомнения, является руководством для богобоязненных,",
                "3": "которые веруют в сокровенное, совершают намаз и расходуют из того, чем Мы их наделили,",
                "4": "которые веруют в ниспосланное тебе и ниспосланное до тебя и убеждены в Последней жизни.",
                "5": "Они следуют верному руководству от их Господа, и они являются преуспевшими.",
                "255": "Аллах — нет божества, кроме Него, Живого, Вседержителя. Им не овладевают ни дремота, ни сон. Ему принадлежит то, что на небесах, и то, что на земле. Кто заступится перед Ним без Его дозволения? Он знает их будущее и прошлое. Они не постигают ничего из Его знания, кроме того, что Он пожелает. Его Престол объемлет небеса и землю, и охрана их не обременяет Его. Он — Возвышенный, Великий."
            }
        };


        var FALLBACK_BIBLE = {
            "Бытие": {
                "1": {
                    "1": "В начале сотворил Бог небо и землю.",
                    "2": "Земля же была безвидна и пуста, и тьма над бездною, и Дух Божий носился над водою.",
                    "3": "И сказал Бог: да будет свет. И стал свет.",
                    "4": "И увидел Бог свет, что он хорош, и отделил Бог свет от тьмы.",
                    "5": "И назвал Бог свет днём, а тьму ночью. И был вечер, и было утро: день один.",
                    "26": "И сказал Бог: сотворим человека по образу Нашему и по подобию Нашему, и да владычествуют они над рыбами морскими, и над птицами небесными, и над зверями, и над всею землёю, и над всеми гадами, пресмыкающимися по земле.",
                    "27": "И сотворил Бог человека по образу Своему, по образу Божию сотворил его; мужчину и женщину сотворил их."
                }
            },
            "Псалтирь": {
                "22": {
                    "1": "Господь — Пастырь мой; я ни в чём не буду нуждаться.",
                    "2": "Он покоит меня на злачных пажитях и водит меня к водам тихим,",
                    "3": "подкрепляет душу мою, направляет меня на стези правды ради имени Своего.",
                    "4": "Если я пойду и долиною смертной тени, не убоюсь зла, потому что Ты со мной; Твой жезл и Твой посох — они успокаивают меня.",
                    "5": "Ты приготовил предо мною трапезу в виду врагов моих; умастил елеем голову мою; чаша моя преисполнена.",
                    "6": "Так, благость и милость да сопровождают меня во все дни жизни моей, и я пребуду в доме Господнем многие дни."
                }
            },
            "От Иоанна": {
                "1": {
                    "1": "В начале было Слово, и Слово было у Бога, и Слово было Бог.",
                    "2": "Оно было в начале у Бога.",
                    "3": "Всё чрез Него начало быть, и без Него ничто не начало быть, что начало быть.",
                    "4": "В Нём была жизнь, и жизнь была свет человеков.",
                    "5": "И свет во тьме светит, и тьма не объяла его.",
                    "14": "И Слово стало плотию, и обитало с нами, полное благодати и истины; и мы видели славу Его, славу, как Единородного от Отца."
                }
            }
        };

        var DEFAULT_DB = {
            order: { bible: ["Бытие"], quran: ["1. Аль-Фатиха"] },
            texts: { bible: { "Бытие": { "1": { "1": "В начале сотворил Бог небо и землю." } } }, quran: { "1. Аль-Фатиха": { "1": { "1": "Во имя Аллаха, Милостивого, Милосердного!" } } } }
        };

        // --- ZVENO AI API ИНТЕГРАЦИЯ (OpenAI-совместимый шлюз) ---
        // ZVENO AI — академический анализ. Разработано Nikolai Rogozin.
        async function fetchZvenoAIAnalysis(textToAnalyze, context, apiKey) {
            if (!apiKey) return marked.parse("⚙️ **Для AI-анализа укажите API ключ в настройках** (иконка шестерёнки ⚙️ в левом боковом меню).\n\nДля получения ключа свяжитесь с разработчиком: **8-950-827-22-27** (Nikolai Rogozin).");

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 60000); // 60 сек тайм-аут

            try {
                const response = await fetch('https://api.zveno.ai/v1/chat/completions', {
                    method: 'POST',
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "openai/gpt-4o",
                        models: ["openai/gpt-4o", "anthropic/claude-sonnet-4-20250514", "google/gemini-2.5-pro"],
                        messages: [
                            {
                                role: "system",
                                content: "Ты — профессор-религиовед с учёными степенями в семитологии и сравнительном богословии. Проведи глубокий академический анализ текста. ОБЯЗАТЕЛЬНО структурируй ответ строго по этим разделам с заголовками ##:\n\n## 📖 Смысл и богословский посыл\n## 🔤 Этимология ключевых слов\n## 🏛 Исторический контекст\n## 🔗 Связи с другими текстами\n## 💡 Практическое значение\n\nКаждый раздел — минимум 2-3 предложения. Используй жирный текст и списки внутри разделов. Отвечай на русском языке."
                            },
                            {
                                role: "user",
                                content: `Проанализируй следующий текст:\n\n"${textToAnalyze}"\n\nКонтекст: ${context}.`
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 1500
                    })
                });
                clearTimeout(timeout);

                if (!response.ok) {
                    let errMsg = '';
                    try { const e = await response.json(); errMsg = e.error?.message || e.message || ''; } catch(_) {}
                    if (response.status === 401) return marked.parse("❌ **Ошибка 401 — Неверный API ключ.** Проверьте ключ в настройках (⚙️).");
                    if (response.status === 402) return marked.parse("💳 **Ошибка 402 — Недостаточно средств.** Обратитесь к разработчику: **8-950-827-22-27**.");
                    if (response.status === 429) return marked.parse("⏳ **Ошибка 429 — Лимит запросов.** Подождите 10–20 секунд и повторите.");
                    if (response.status === 503) return marked.parse("🔧 **Ошибка 503 — Сервис временно недоступен.** Попробуйте через минуту.");
                    return marked.parse(`❌ **Ошибка API ${response.status}:** ${errMsg || 'Неизвестная ошибка'}. Проверьте ключ или обратитесь: **8-950-827-22-27**.`);
                }

                const data = await response.json();
                const text = data.choices?.[0]?.message?.content;
                if (!text) return marked.parse("⚠️ **Пустой ответ от API.** Попробуйте ещё раз.");
                return marked.parse(text);

            } catch (err) {
                clearTimeout(timeout);
                console.error("Zveno AI error:", err);
                if (err.name === 'AbortError') return marked.parse("⏱️ **Превышено время ожидания (60 сек).** Сервер не ответил. Проверьте интернет и попробуйте снова.");
                return marked.parse(`❌ **Ошибка соединения с AI сервисом.**\n\nВозможные причины:\n- Неверный или просроченный API ключ\n- Нет соединения с интернетом\n\n*Детали: ${err.message}*\n\nПо вопросам ключа: **8-950-827-22-27** (Nikolai Rogozin).`);
            }
        }

        // --- ОСНОВНОЕ ПРИЛОЖЕНИЕ ---
        function App() {
            const [view, setView] = useState('dashboard');
            const [db, setDb] = useState(DEFAULT_DB);
            const [loading, setLoading] = useState(true);
            const [dataStatus, setDataStatus] = useState('loading');
            
            const [apiKey, setApiKey] = useState(localStorage.getItem('zveno_api_key') || '');
            const [showSettings, setShowSettings] = useState(false);
            const [showCookiePolicy, setShowCookiePolicy] = useState(false);
            const [showKeyRequest, setShowKeyRequest] = useState(false);
            const [cookieAccepted, setCookieAccepted] = useState(() => !!localStorage.getItem('cookie_accepted'));
            const [keyReqName, setKeyReqName] = useState('');
            const [keyReqEmail, setKeyReqEmail] = useState('');
            const [keyReqMsg, setKeyReqMsg] = useState('');
            const [keyReqSent, setKeyReqSent] = useState(false);
            const [apiKeyInput, setApiKeyInput] = useState(localStorage.getItem('zveno_api_key') || '');
            // Глобальная модалка AI анализа
            const [aiModal, setAiModal] = useState(null);
            // Мобильное меню
            const [mobileOpen, setMobileOpen] = useState(false);

            const saveApiSettings = () => {
                const key = apiKeyInput.trim();
                setApiKey(key);
                localStorage.setItem('zveno_api_key', key);
                setShowSettings(false);
            };

            const acceptCookie = () => {
                localStorage.setItem('cookie_accepted', '1');
                setCookieAccepted(true);
            };

            // Загрузка полных текстов Библии и Корана с надежных CDN
            useEffect(() => {
                const loadFullTexts = async () => {
                    try {
                        // 1. Библия — несколько источников
                        const bibleMap = {};
                        const bibleOrder = [];
                        let bibleLoaded = false;

                        // Источник 1: thiagobodruk (Синодальный перевод)
                        try {
                            const r = await fetch('https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/ru_synodal.json');
                            const d = await r.json();
                            d.forEach(book => {
                                const ruName = BIBLE_BOOKS_RU[book.name] || book.name;
                                bibleOrder.push(ruName);
                                bibleMap[ruName] = {};
                                book.chapters.forEach((chap, cIdx) => {
                                    bibleMap[ruName][String(cIdx+1)] = {};
                                    chap.forEach((v, vIdx) => { bibleMap[ruName][String(cIdx+1)][String(vIdx+1)] = v; });
                                });
                            });
                            bibleLoaded = true;
                        } catch(e) { console.warn('Bible CDN1 failed:', e); }

                        // Источник 2: scrollmapper (если первый упал)
                        if (!bibleLoaded) try {
                            const BIBLE_BOOKS_EN = Object.keys(BIBLE_BOOKS_RU);
                            for (const enName of BIBLE_BOOKS_EN.slice(0, 5)) {
                                const ruName = BIBLE_BOOKS_RU[enName];
                                if (!bibleOrder.includes(ruName)) bibleOrder.push(ruName);
                            }
                            // Применяем встроенные тексты
                            Object.keys(FALLBACK_BIBLE).forEach(book => {
                                if (!bibleMap[book]) bibleMap[book] = {};
                                Object.keys(FALLBACK_BIBLE[book]).forEach(ch => {
                                    bibleMap[book][ch] = { ...FALLBACK_BIBLE[book][ch] };
                                });
                                if (!bibleOrder.includes(book)) bibleOrder.unshift(book);
                            });
                            bibleLoaded = true;
                        } catch(e) { console.warn('Bible CDN2 failed:', e); }

                        // Всегда применяем встроенные ключевые тексты поверх загруженных
                        Object.keys(FALLBACK_BIBLE).forEach(book => {
                            if (!bibleMap[book]) { bibleMap[book] = {}; if (!bibleOrder.includes(book)) bibleOrder.push(book); }
                            Object.keys(FALLBACK_BIBLE[book]).forEach(ch => {
                                if (!bibleMap[book][ch]) bibleMap[book][ch] = {};
                                Object.assign(bibleMap[book][ch], FALLBACK_BIBLE[book][ch]);
                            });
                        });

                        // 2. Коран — 4 источника с автоматическим переключением
                        const quranMap = {};
                        const quranOrder = []; 
                        SURAH_NAMES_RU.forEach((ruName, index) => {
                            const title = `${index + 1}. ${ruName}`;
                            quranOrder.push(title);
                            quranMap[title] = { "1": {} }; 
                        });

                        let quranLoaded = false;

                        // Валидация данных: текст должен быть реальным, не заглушкой
                        const validateQuran = (map) => Object.values(map).some(s => {
                            const ayahs = s['1'];
                            return ayahs && Object.values(ayahs).some(t =>
                                t && typeof t === 'string' && t.length > 20 && !t.startsWith('Текст Корана:')
                            );
                        });

                        // Источник 1: quran-json@3.1.2 (Russian Kuliev) — РАБОТАЕТ
                        if (!quranLoaded) try {
                            const r = await fetch('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_ru.json');
                            if (!r.ok) throw new Error('HTTP ' + r.status);
                            const d = await r.json();
                            d.forEach((surah, si) => {
                                const title = quranOrder[si];
                                if (title && surah.verses) {
                                    surah.verses.forEach((v, vi) => {
                                        quranMap[title]["1"][String(vi+1)] = v.text || (typeof v === 'string' ? v : '');
                                    });
                                }
                            });
                            if (validateQuran(quranMap)) quranLoaded = true;
                            else Object.values(quranMap).forEach(s => s["1"] = {});
                        } catch(e) { console.warn('Quran CDN1 failed:', e); }

                        // Источник 2: fawazahmed0 via jsDelivr gh
                        if (!quranLoaded) try {
                            const r = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/rus-elmir-kuliev.json');
                            if (!r.ok) throw new Error('HTTP ' + r.status);
                            const d = await r.json();
                            (d.quran || d).forEach(item => {
                                const title = quranOrder[(item.chapter||item.surah) - 1];
                                if (title) quranMap[title]["1"][String(item.verse||item.ayah)] = item.text;
                            });
                            if (validateQuran(quranMap)) quranLoaded = true;
                        } catch(e) { console.warn('Quran CDN2 failed:', e); }

                        // Источник 3: alquran.cloud
                        if (!quranLoaded) try {
                            const r = await fetch('https://api.alquran.cloud/v1/quran/ru.kuliev');
                            if (!r.ok) throw new Error('HTTP ' + r.status);
                            const d = await r.json();
                            d.data.surahs.forEach(surah => {
                                const title = quranOrder[surah.number - 1];
                                if (title) surah.ayahs.forEach(a => { quranMap[title]["1"][String(a.numberInSurah)] = a.text; });
                            });
                            if (validateQuran(quranMap)) quranLoaded = true;
                        } catch(e) { console.warn('Quran CDN3 failed:', e); }

                        // Источник 4: fawazahmed0 npm (другой путь)
                        if (!quranLoaded) try {
                            const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/quran-api@latest/editions/rus-kuliev.json');
                            if (!r.ok) throw new Error('HTTP ' + r.status);
                            const d = await r.json();
                            (d.quran || d).forEach(item => {
                                const title = quranOrder[(item.chapter||item.surah) - 1];
                                if (title) quranMap[title]["1"][String(item.verse||item.ayah)] = item.text;
                            });
                            if (validateQuran(quranMap)) quranLoaded = true;
                        } catch(e) { console.warn('Quran CDN4 failed:', e); }

                        // Источник 5: raw GitHub (openquran)
                        if (!quranLoaded) try {
                            const r = await fetch('https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_translation.json');
                            if (!r.ok) throw new Error('HTTP ' + r.status);
                            const d = await r.json();
                            if (Array.isArray(d)) {
                                d.filter(x => x.language_name === 'russian' || x.iso_code === 'ru').forEach(item => {
                                    const title = quranOrder[item.surah_number - 1];
                                    if (title) quranMap[title]["1"][String(item.verse_number)] = item.text;
                                });
                                if (validateQuran(quranMap)) quranLoaded = true;
                            }
                        } catch(e) { console.warn('Quran CDN5 failed:', e); }

                        if (!quranLoaded) console.warn('All Quran CDNs failed — using embedded fallback only');

                        // Count loaded ayahs for status
                        const quranAyahCount = Object.values(quranMap).reduce((sum, s) => sum + Object.keys(s['1']||{}).length, 0);
                        const loadLabel = quranAyahCount > 5000 ? '100%' : quranAyahCount > 100 ? Math.round(quranAyahCount/62) + '%' : 'мин';

                        // Применяем встроенные тексты поверх (аят аль-Курси и др.)
                        Object.entries(FALLBACK_QURAN).forEach(([surah, verses]) => {
                            const key = quranOrder.find(k => k.includes(surah.split('.')[1]?.trim())) || surah;
                            if (quranMap[key]) Object.assign(quranMap[key]["1"], verses);
                        });

                        // Применяем расширенные встроенные тексты EMBEDDED_QURAN (всегда)
                        if (typeof EMBEDDED_QURAN !== 'undefined') {
                            Object.entries(EMBEDDED_QURAN).forEach(([idx, verses]) => {
                                const title = quranOrder[parseInt(idx) - 1];
                                if (title && quranMap[title]) {
                                    Object.assign(quranMap[title]["1"], verses);
                                }
                            });
                        }

                        setDb({ order: { bible: bibleOrder, quran: quranOrder }, texts: { bible: bibleMap, quran: quranMap } });
                        setDataStatus('success:' + loadLabel);
                    } catch (e) {
                        console.warn("CDN загрузка не удалась, используем запасные тексты:", e);
                        // Используем локальные JSON + встроенные запасные тексты
                        try {
                            const [bibleLocal, quranLocal] = await Promise.all([
                                fetch('./data/bible.json').then(r => r.json()),
                                fetch('./data/quran.json').then(r => r.json())
                            ]);
                            
                            const bibleMap = bibleLocal.content || {};
                            const bibleOrder = bibleLocal.books || Object.keys(bibleMap);
                            
                            // Применяем запасные тексты поверх заглушек
                            Object.keys(FALLBACK_BIBLE).forEach(book => {
                                if (!bibleMap[book]) bibleMap[book] = {};
                                Object.keys(FALLBACK_BIBLE[book]).forEach(ch => {
                                    bibleMap[book][ch] = { ...bibleMap[book][ch], ...FALLBACK_BIBLE[book][ch] };
                                });
                            });

                            const quranContent = quranLocal.content || {};
                            const quranOrder = quranLocal.surahs || Object.keys(quranContent);
                            const quranMap = {};
                            quranOrder.forEach(title => {
                                quranMap[title] = { "1": quranContent[title] || {} };
                            });
                            // Применяем запасные тексты Корана
                            Object.keys(FALLBACK_QURAN).forEach(surah => {
                                const key = quranOrder.find(k => k.includes(surah.split('.')[1]?.trim())) || surah;
                                if (quranMap[key]) quranMap[key]["1"] = { ...quranMap[key]["1"], ...FALLBACK_QURAN[surah] };
                            });

                            setDb({ order: { bible: bibleOrder, quran: quranOrder }, texts: { bible: bibleMap, quran: quranMap } });
                            setDataStatus('error'); // Показываем что загрузили локально
                        } catch (e2) {
                            console.error("Даже локальные файлы не загрузились:", e2);
                            setDataStatus('error');
                        }
                    }
                    setLoading(false);
                };
                loadFullTexts();
            }, []);

            return (
                <div className="min-h-screen flex font-sans">
                    {/* МОДАЛКА НАСТРОЕК API */}
                    {showSettings && (
                        <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 fade-in-up">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-4"><Icons.Key c="w-6 h-6" /></div>
                                    <h3 className="text-2xl font-bold font-serif text-stone-900">Настройки AI анализа</h3>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-xl mb-6">
                                    <p className="text-stone-700 text-sm mb-3 font-bold">Нейросеть использует 200+ AI моделей для академического анализа текстов.</p>
                                    <p className="text-stone-600 text-sm mb-2">С API ключом вы получите:</p>
                                    <ul className="text-sm text-stone-600 list-disc pl-5 space-y-1">
                                        <li>✨ Глубокий AI-анализ любого стиха (200+ моделей)</li>
                                        <li>🔊 Высококачественное аудио TTS (HD-голоса)</li>
                                        <li>⚡ Автоматический failover между моделями</li>
                                    </ul>
                                    <span className="text-xs text-amber-700 font-bold">
                                        Получить ключ:{' '}
                                        <button onClick={()=>{setShowSettings(false);setShowKeyRequest(true);}}
                                            className="underline text-blue-600 hover:text-blue-800 font-bold bg-transparent border-none cursor-pointer text-xs p-0">
                                            Запросить по Email
                                        </button>{' '}или{' '}
                                        <a href="tel:+79508272227" className="underline">8-950-827-22-27</a> (Nikolai Rogozin)
                                    </span>
                                </div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">API Ключ</label>
                                <input type="password" placeholder="sk-zveno-..." value={apiKeyInput} onChange={e => setApiKeyInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveApiSettings()} className="w-full p-4 border border-stone-300 rounded-xl mb-6 focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm" />
                                
                                {apiKey && (
                                    <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                                        <span className="text-xs font-bold text-emerald-700">Ключ сохранён и активен</span>
                                        <button onClick={() => { setApiKeyInput(''); setApiKey(''); localStorage.removeItem('zveno_api_key'); }} className="ml-auto text-xs text-red-400 hover:text-red-600 font-bold">Удалить</button>
                                    </div>
                                )}
                                <div className="flex gap-4 justify-end">
                                    <button onClick={() => setShowSettings(false)} className="px-6 py-3 rounded-xl font-bold text-stone-500 hover:bg-stone-100">Отмена</button>
                                    <button onClick={saveApiSettings} className="px-6 py-3 rounded-xl font-bold bg-[#1c1b1d] text-white hover:bg-stone-800">Сохранить ключ</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════════════════
                        COOKIE BANNER
                    ══════════════════════════════════════════════════════════ */}
                    {!cookieAccepted && (
                        <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:9999,background:'#fff',borderTop:'1px solid #e7e5e4',boxShadow:'0 -4px 24px rgba(0,0,0,0.10)'}}>
                            <div style={{maxWidth:1200,margin:'0 auto',padding:'14px 20px',display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
                                <svg style={{flexShrink:0,color:'#0ea5e9'}} width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21.6 12.4a2 2 0 01-1.8-1.8 2 2 0 00-2-1.6 2 2 0 01-1.8-1.8A10 10 0 002 12a10 10 0 0010 10 10 10 0 009.6-9.6zM12 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-4-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                                </svg>
                                <p style={{flex:1,fontSize:13,color:'#44403c',margin:0,minWidth:200}}>
                                    Мы используем cookie-файлы для улучшения пользовательского опыта и сбора статистики.
                                    Для получения дополнительной информации вы можете ознакомиться с нашей{' '}
                                    <button onClick={()=>setShowCookiePolicy(true)}
                                        style={{color:'#2563eb',textDecoration:'underline',background:'none',border:'none',cursor:'pointer',fontSize:13,padding:0}}>
                                        Политикой использования cookie-файлов
                                    </button>.
                                </p>
                                <div style={{display:'flex',gap:8,flexShrink:0}}>
                                    <button onClick={acceptCookie}
                                        style={{background:'#1d4ed8',color:'#fff',fontWeight:700,fontSize:13,padding:'9px 22px',borderRadius:8,border:'none',cursor:'pointer',letterSpacing:'0.05em',textTransform:'uppercase'}}>
                                        Принять
                                    </button>
                                    <button onClick={()=>setCookieAccepted(true)}
                                        style={{background:'none',border:'none',cursor:'pointer',color:'#78716c',fontSize:18,padding:'4px 8px',lineHeight:1}}>
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════════════════
                        ПОЛИТИКА COOKIE
                    ══════════════════════════════════════════════════════════ */}
                    {showCookiePolicy && (
                        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
                            <div style={{background:'#fff',borderRadius:20,maxWidth:640,width:'100%',maxHeight:'85vh',overflowY:'auto',padding:'32px',boxShadow:'0 20px 60px rgba(0,0,0,0.25)'}}>
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                                    <h2 style={{fontFamily:'Georgia,serif',fontSize:22,fontWeight:700,color:'#1c1917',margin:0}}>Политика использования cookie-файлов</h2>
                                    <button onClick={()=>setShowCookiePolicy(false)}
                                        style={{background:'#f5f5f4',border:'none',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:18,color:'#57534e',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                        ×
                                    </button>
                                </div>
                                <p style={{fontSize:12,color:'#78716c',marginBottom:20}}>Последнее обновление: 21 апреля 2026 г.</p>

                                {[
                                    ['1. Что такое cookie-файлы?',
                                     'Cookie-файлы — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего сайта «Академия Религиоведения». Они позволяют сайту запоминать ваши предпочтения и обеспечивать корректную работу всех функций.'],
                                    ['2. Какие cookie мы используем',
                                     'Технические (необходимые): хранят ваши настройки API-ключа и факт принятия данной политики (localStorage). Без них невозможна работа AI-анализа и других персональных функций сайта.\n\nФункциональные: запоминают выбранный вами раздел, режим чтения и прочие пользовательские настройки для удобства навигации.\n\nАналитические: анонимные данные о посещаемости страниц помогают нам улучшать образовательный контент.'],
                                    ['3. Срок хранения',
                                     'Технические и функциональные данные хранятся в localStorage вашего браузера бессрочно до их ручного удаления. Они не передаются на сторонние серверы.'],
                                    ['4. Данные третьих сторон',
                                     'Сайт использует внешние сервисы: CDN jsDelivr (загрузка текстов Библии и Корана), Unsplash (иллюстрации), Wikimedia Commons (исторические изображения), API Zveno.ai (AI-анализ). Каждый из них имеет собственную политику конфиденциальности. Мы не передаём ваши персональные данные этим сервисам.'],
                                    ['5. Управление cookie',
                                     'Вы можете удалить сохранённые данные в любой момент через настройки браузера или через меню «Инструменты разработчика → Приложение → localStorage». Отказ от технических cookie может ограничить функциональность AI-анализа.'],
                                    ['6. Согласие',
                                     'Нажимая кнопку «Принять» или продолжая использование сайта, вы соглашаетесь с настоящей политикой. Сайт предназначен исключительно для образовательных целей в области религиоведения.'],
                                    ['7. Контакт',
                                     'По вопросам, связанным с обработкой данных, обращайтесь: Nikolai Rogozin · uraloil018@yandex.ru · 8-950-827-22-27'],
                                ].map(([title, text]) => (
                                    <div key={title} style={{marginBottom:20}}>
                                        <h3 style={{fontSize:14,fontWeight:700,color:'#1c1917',marginBottom:6}}>{title}</h3>
                                        {text.split('\n\n').map((p, i) => (
                                            <p key={i} style={{fontSize:13,color:'#44403c',lineHeight:1.7,margin:'0 0 8px'}}>{p}</p>
                                        ))}
                                    </div>
                                ))}

                                <button onClick={()=>{acceptCookie();setShowCookiePolicy(false);}}
                                    style={{width:'100%',background:'#1d4ed8',color:'#fff',fontWeight:700,fontSize:14,padding:'12px',borderRadius:10,border:'none',cursor:'pointer',marginTop:8}}>
                                    Принять и закрыть
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════════════════
                        ЗАПРОС AI КЛЮЧА — модальное окно
                    ══════════════════════════════════════════════════════════ */}
                    {showKeyRequest && (
                        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
                            <div style={{background:'#fff',borderRadius:20,maxWidth:500,width:'100%',padding:'32px',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                                    <h2 style={{fontFamily:'Georgia,serif',fontSize:20,fontWeight:700,color:'#1c1917',margin:0}}>Получить AI ключ</h2>
                                    <button onClick={()=>{setShowKeyRequest(false);setKeyReqSent(false);}}
                                        style={{background:'#f5f5f4',border:'none',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:18,color:'#57534e'}}>
                                        ×
                                    </button>
                                </div>

                                {keyReqSent ? (
                                    <div style={{textAlign:'center',padding:'24px 0'}}>
                                        <div style={{fontSize:48,marginBottom:16}}>✅</div>
                                        <h3 style={{fontFamily:'Georgia,serif',fontSize:18,color:'#065f46',marginBottom:8}}>Заявка отправлена!</h3>
                                        <p style={{fontSize:13,color:'#44403c',lineHeight:1.7}}>
                                            Ваша заявка направлена разработчику.<br/>
                                            Ответ придёт на <strong>{keyReqEmail}</strong><br/>
                                            в течение 24 часов.<br/><br/>
                                            По срочным вопросам:<br/>
                                            <a href="tel:+79508272227" style={{color:'#1d4ed8',fontWeight:700}}>8-950-827-22-27</a>
                                        </p>
                                        <button onClick={()=>{setShowKeyRequest(false);setKeyReqSent(false);}}
                                            style={{marginTop:20,background:'#1c1917',color:'#fff',fontWeight:700,fontSize:14,padding:'12px 32px',borderRadius:10,border:'none',cursor:'pointer'}}>
                                            Закрыть
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:12,padding:'12px 16px',marginBottom:20}}>
                                            <p style={{fontSize:13,color:'#92400e',margin:0,lineHeight:1.6}}>
                                                🔑 AI ключ открывает доступ к глубокому анализу текстов (200+ моделей).<br/>
                                                Заполните форму — ответ придёт на вашу почту.
                                            </p>
                                        </div>
                                        <div style={{marginBottom:14}}>
                                            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#78716c',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:6}}>Ваше имя *</label>
                                            <input value={keyReqName} onChange={e=>setKeyReqName(e.target.value)}
                                                placeholder="Иван Иванов"
                                                style={{width:'100%',padding:'10px 14px',border:'1px solid #d6d3d1',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
                                        </div>
                                        <div style={{marginBottom:14}}>
                                            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#78716c',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:6}}>Ваш Email *</label>
                                            <input type="email" value={keyReqEmail} onChange={e=>setKeyReqEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                style={{width:'100%',padding:'10px 14px',border:'1px solid #d6d3d1',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
                                        </div>
                                        <div style={{marginBottom:20}}>
                                            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#78716c',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:6}}>Цель использования</label>
                                            <textarea value={keyReqMsg} onChange={e=>setKeyReqMsg(e.target.value)}
                                                placeholder="Например: учёба, научная работа, личное изучение религиоведения..."
                                                rows={3}
                                                style={{width:'100%',padding:'10px 14px',border:'1px solid #d6d3d1',borderRadius:10,fontSize:14,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                                        </div>
                                        <a href={`mailto:uraloil018@yandex.ru?subject=Запрос AI ключа — Академия Религиоведения&body=Имя: ${encodeURIComponent(keyReqName)}%0D%0AEmail: ${encodeURIComponent(keyReqEmail)}%0D%0A%0D%0AЦель использования:%0D%0A${encodeURIComponent(keyReqMsg || 'Не указано')}%0D%0A%0D%0A----%0D%0AОтправлено с сайта Академия Религиоведения`}
                                            onClick={()=>{
                                                if (!keyReqName.trim() || !keyReqEmail.trim()) return;
                                                setKeyReqSent(true);
                                            }}
                                            style={{
                                                display:'block',textAlign:'center',
                                                background: (!keyReqName.trim() || !keyReqEmail.trim()) ? '#d6d3d1' : '#1c1917',
                                                color:'#fff',fontWeight:700,fontSize:14,
                                                padding:'13px',borderRadius:10,
                                                textDecoration:'none',
                                                pointerEvents: (!keyReqName.trim() || !keyReqEmail.trim()) ? 'none' : 'auto',
                                            }}>
                                            ✉️ Отправить заявку на uraloil018@yandex.ru
                                        </a>
                                        <p style={{textAlign:'center',fontSize:12,color:'#a8a29e',marginTop:12}}>
                                            Или позвоните: <a href="tel:+79508272227" style={{color:'#1d4ed8',fontWeight:700}}>8-950-827-22-27</a>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* МОБИЛЬНАЯ ШАПКА */}
                    <div className="mobile-header">
                        <div className="flex items-center gap-3">
                            <button onClick={()=>setMobileOpen(true)} className="text-stone-400 hover:text-white p-1">
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                            </button>
                            <span className="text-white font-serif font-bold text-lg uppercase tracking-tight">Академия</span>
                            <span className="text-amber-500 text-[10px] font-bold tracking-widest">4 ШАГА</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {dataStatus.startsWith('success') && <span className="w-2 h-2 rounded-full bg-emerald-500"/>}
                            {dataStatus==='loading' && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>}
                            <button onClick={()=>{setApiKeyInput(apiKey);setShowSettings(true);}} className="text-stone-400 hover:text-white p-1">
                                <Icons.Settings c="w-5 h-5"/>
                            </button>
                        </div>
                    </div>

                    {/* МОБИЛЬНОЕ БОКОВОЕ МЕНЮ (drawer) */}
                    {mobileOpen && (
                        <div className="mobile-drawer">
                            <div className="mobile-drawer-bg" onClick={()=>setMobileOpen(false)}/>
                            <div className="mobile-drawer-panel">
                                <div className="p-5 border-b border-stone-800 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-white font-serif font-bold text-xl uppercase">Академия</h1>
                                        <span className="text-amber-500 text-[10px] font-bold tracking-widest">РЕЛИГИОВЕДЕНИЯ</span>
                                    </div>
                                    <button onClick={()=>setMobileOpen(false)} className="text-stone-500 hover:text-white text-xl font-bold">✕</button>
                                </div>
                                <nav className="flex-1 py-4 px-2 overflow-y-auto">
                                    <SidebarNav view={view} setView={(v)=>{setView(v);setMobileOpen(false);}} loading={loading} dataStatus={dataStatus} apiKey={apiKey} setApiKeyInput={setApiKeyInput} setShowSettings={setShowSettings}/>
                                </nav>
                                <div className="p-4 border-t border-stone-800 text-center">
                                    <p className="text-[9px] text-stone-600 font-bold uppercase">© Nikolai Rogozin</p>
                                    <a href="tel:+79508272227" className="text-[9px] text-stone-500 mt-0.5 block">8-950-827-22-27</a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ДЕСКТОП САЙДБАР */}
                    <aside className="sidebar-desktop w-64 lg:w-72 bg-[#0f0f11] text-stone-400 flex flex-col fixed inset-y-0 shadow-2xl z-20 border-r border-stone-800">
                        <div className="p-6 border-b border-stone-800/60 flex flex-col justify-center relative" style={{minHeight:'88px'}}>
                            <h1 className="text-stone-100 font-serif text-xl lg:text-2xl font-bold tracking-tight uppercase leading-none">Академия</h1>
                            <span className="text-amber-600 text-[10px] font-sans font-bold tracking-[0.2em] mt-1">РЕЛИГИОВЕДЕНИЯ</span>
                            <span className="text-stone-600 text-[9px] font-sans font-bold tracking-widest mt-0.5 uppercase">Учебный курс · 4 шага</span>
                            <button onClick={() => { setApiKeyInput(apiKey); setShowSettings(true); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-white transition-colors" title="Настройки API"><Icons.Settings c="w-5 h-5"/></button>
                        </div>
                        <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto px-2">
                            <SidebarNav view={view} setView={setView} loading={loading} dataStatus={dataStatus} apiKey={apiKey} setApiKeyInput={setApiKeyInput} setShowSettings={setShowSettings}/>
                        </nav>
                        <div className="p-3 border-t border-stone-800/60 bg-[#161618]">
                            <div className="flex items-center">
                                {loading && <><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2"></div><span className="text-[10px] font-bold tracking-wider text-amber-500">Синхронизация...</span></>}
                                {!loading && dataStatus.startsWith('success') && <><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div><span className="text-[10px] font-bold tracking-wider text-emerald-500">Базы загружены ({dataStatus.split(':')[1] || '100%'})</span></>}
                                {!loading && dataStatus==='error' && <><div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div><span className="text-[10px] font-bold tracking-wider text-amber-500">Офлайн режим</span></>}
                            </div>
                            <div className="mt-2 pt-2 border-t border-stone-800/40">
                                <p className="text-[9px] text-stone-600 font-bold uppercase tracking-widest">© Разработано</p>
                                <p className="text-[10px] text-amber-600/70 font-bold mt-0.5">Nikolai Rogozin</p>
                                <a href="tel:+79508272227" className="text-[9px] text-stone-500 hover:text-amber-500 transition-colors mt-0.5 block">8-950-827-22-27</a>
                            </div>
                        </div>
                    </aside>

                    {/* МОБИЛЬНАЯ НИЖНЯЯ НАВИГАЦИЯ */}
                    <nav className="mobile-nav">
                        {[
                            {v:'dashboard', icon:'🏠', label:'Старт'},
                            {v:'plain',     icon:'📖', label:'Основы'},
                            {v:'bible',     icon:'📜', label:'Тексты'},
                            {v:'search',    icon:'🔍', label:'Поиск'},
                            {v:'angels',    icon:'👼', label:'Ангелы'},
                            {v:'deep',      icon:'✨', label:'AI'},
                            {v:'split', icon:'⚖️', label:'Экран'},
                        ].map(({v,icon,label})=>(
                            <button key={v} className={`mobile-nav-item ${view===v?'active':''}`} onClick={()=>setView(v)}>
                                <span style={{fontSize:20}}>{icon}</span>
                                <span>{label}</span>
                            </button>
                        ))}
                    </nav>

                    <main className="main-tablet flex-1 ml-64 lg:ml-72 main-mobile" style={{paddingBottom:'0'}}>
                        <div className="content-pad p-4 md:p-6 lg:p-10 min-h-screen bg-[#f5f4f0] pt-16 md:pt-6 pb-24 md:pb-6">
                            <div className="max-w-6xl mx-auto">
                            {view === 'dashboard' && <Dashboard setView={setView} apiKey={apiKey} setShowSettings={setShowSettings} />}
                            {view === 'step' && <StepStudyModule db={db} apiKey={apiKey} />}
                            {view === 'plain' && <PlainLanguageModule apiKey={apiKey} />}
                            {view === 'deep' && <DeepCommentaryModule apiKey={apiKey} />}
                            {view === 'manuscripts' && <ManuscriptsModule apiKey={apiKey} />}
                            {view === 'simple' && <DeepExplanationModule />}
                            {view === 'mythology' && <MythologyModule apiKey={apiKey} />}
                            {view === 'search' && <SearchModule db={db} />}
                            {view === 'reader' && <ParallelReaderModule db={db} />}
                            {view === 'bible' && <SingleReaderModule type="bible" db={db} apiKey={apiKey} setAiModal={setAiModal} loading={loading} />}
                            {view === 'quran' && <SingleReaderModule type="quran" db={db} apiKey={apiKey} setAiModal={setAiModal} loading={loading} />}
                            {view === 'religions' && <WorldReligionsModule apiKey={apiKey} setAiModal={setAiModal} setView={setView} />}
                            {view === 'worship' && <WorshipModule apiKey={apiKey} />}
                            {view === 'angels' && <AngelsDemonsModule apiKey={apiKey} />}
                            {view === 'religion_reader' && <ReligionReaderModule apiKey={apiKey} setAiModal={setAiModal} setView={setView} />}
                            {view === 'split' && <SplitViewModule db={db} apiKey={apiKey} setAiModal={setAiModal} />}
                            </div>
                        </div>
                    </main>

                    {/* ═══ ГЛОБАЛЬНАЯ МОДАЛКА AI АНАЛИЗА ═══ */}
                    {aiModal && (
                        <div
                            className="fixed inset-0 flex items-center justify-center p-4"
                            style={{position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:99999,
                                    backgroundColor:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)',
                                    display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div
                                style={{background:'#fff', borderRadius:24, boxShadow:'0 25px 60px rgba(0,0,0,0.4)',
                                        width:'100%', maxWidth:680, maxHeight:'88vh',
                                        display:'flex', flexDirection:'column', overflow:'hidden'}}>
                                {/* Шапка */}
                                <div style={{background: aiModal.isBible ? '#fffbeb' : '#f0fdf4',
                                             borderBottom:'1px solid', borderColor: aiModal.isBible ? '#fde68a' : '#bbf7d0',
                                             padding:'16px 24px', display:'flex', alignItems:'flex-start',
                                             justifyContent:'space-between', flexShrink:0}}>
                                    <div style={{flex:1, minWidth:0, paddingRight:12}}>
                                        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                                            <span style={{fontSize:14}}>✨</span>
                                            <span style={{fontSize:10, fontWeight:700, textTransform:'uppercase',
                                                          letterSpacing:'0.1em', color: aiModal.isBible ? '#92400e' : '#065f46'}}>
                                                ✨ AI Анализ · {aiModal.label}
                                            </span>
                                        </div>
                                        <p style={{fontFamily:'Merriweather,serif', fontSize:14, lineHeight:1.5,
                                                   color: aiModal.isBible ? '#44403c' : '#064e3b', margin:0}}>
                                            <sup style={{fontSize:10, fontWeight:700, marginRight:4,
                                                         color: aiModal.isBible ? '#d97706' : '#059669'}}>
                                                {aiModal.verseId}
                                            </sup>
                                            {aiModal.verseText}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setAiModal(null)}
                                        style={{flexShrink:0, width:32, height:32, borderRadius:16,
                                                background:'white', border:'1px solid #e5e7eb',
                                                display:'flex', alignItems:'center', justifyContent:'center',
                                                cursor:'pointer', fontSize:16, color:'#6b7280', fontWeight:700,
                                                marginLeft:8}}>
                                        ✕
                                    </button>
                                </div>
                                {/* Тело */}
                                <div style={{flex:1, overflowY:'auto', padding:24, minHeight:0}}>
                                    {aiModal.loading ? (
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'center',
                                                     justifyContent:'center', padding:'64px 0', gap:16}}>
                                            <Icons.Loader c={`w-8 h-8 ${aiModal.isBible ? 'text-amber-500' : 'text-emerald-500'}`}/>
                                            <p style={{fontWeight:700, color:'#374151', margin:0}}>Нейросеть анализирует...</p>
                                            <p style={{fontSize:13, color:'#9ca3af', margin:0}}>200+ моделей изучают текст</p>
                                        </div>
                                    ) : (
                                        <AiAccordion html={aiModal.html} isBible={aiModal.isBible} />
                                    )}
                                </div>
                                {/* Подвал */}
                                <div style={{padding:'12px 24px', borderTop:'1px solid #f3f4f6',
                                             background:'#f9fafb', display:'flex', alignItems:'center',
                                             justifyContent:'space-between', flexShrink:0}}>
                                    <span style={{fontSize:10, color:'#9ca3af', fontWeight:700,
                                                  textTransform:'uppercase', letterSpacing:'0.1em'}}>
                                        Nikolai Rogozin · 8-950-827-22-27
                                    </span>
                                    <button
                                        onClick={() => setAiModal(null)}
                                        style={{padding:'8px 20px', borderRadius:12, background:'#111827',
                                                color:'white', fontSize:12, fontWeight:700, border:'none',
                                                cursor:'pointer'}}>
                                        Закрыть
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        function NavItem({ icon: Icon, label, active, onClick }) {
            return (
                <button onClick={onClick} className={`w-full flex items-center px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 group ${active ? 'bg-amber-600/10 text-amber-500 shadow-sm' : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'}`}>
                    <Icon c={`w-4 h-4 mr-3 flex-shrink-0 transition-colors ${active ? 'text-amber-500' : 'text-stone-600 group-hover:text-stone-400'}`} /> 
                    <span className="truncate text-xs lg:text-sm">{label}</span>
                </button>
            );
        }
