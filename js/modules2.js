                            ))}
                        </div>
                    </div>

                    {/* Темы */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {MYTH_DATA.themes.map(t=>(
                            <button key={t.id} onClick={()=>{setSelTheme(t);setSelCulture(null);setAiText('');}}
                                className={`p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md ${selTheme.id===t.id?'border-amber-500 bg-amber-50 shadow-md':'border-stone-200 bg-white hover:border-stone-300'}`}>
                                <span className="text-3xl block mb-2">{t.icon}</span>
                                <p className="font-serif font-bold text-stone-900 text-sm">{t.title}</p>
                                <p className="text-[10px] text-stone-400 mt-1">{t.desc}</p>
                            </button>
                        ))}
                    </div>

                    {/* Культуры выбор */}
                    <div className="flex flex-wrap gap-2">
                        {ALL_KEYS.map(k=>(
                            <button key={k} onClick={()=>setSelCulture(selCulture===k?null:k)}
                                style={selCulture===k ? {background:CULTURE_META[k].bg, borderColor:CULTURE_META[k].border, color:CULTURE_META[k].txt, borderWidth:2} : {}}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${selCulture===k?'':'border-stone-200 bg-white text-stone-600 hover:border-stone-400'}`}>
                                {CULTURE_META[k].label}
                            </button>
                        ))}
                    </div>

                    {/* Вкладки */}
                    <div className="flex gap-2 bg-stone-100 p-1.5 rounded-2xl">
                        {[['compare','🗺️ Сравнительная таблица'],['parallel','🔗 Параллели и связи'],['ai','🤖 AI Анализ']].map(([k,l])=>(
                            <button key={k} onClick={()=>setTab(k)}
                                className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-bold transition-all ${tab===k?'bg-white shadow text-stone-900':'text-stone-500 hover:text-stone-700'}`}>
                                {l}
                            </button>
                        ))}
                    </div>

                    {/* ТАБЛИЦА СРАВНЕНИЙ */}
                    {tab==='compare' && (
                        <div className="space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                                <h3 className="font-serif font-bold text-xl text-amber-900 mb-2">{selTheme.icon} {selTheme.title}</h3>
                                <p className="text-stone-600">{selTheme.desc}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ALL_KEYS.filter(k => !selCulture || k===selCulture).map(k => {
                                    const d = selTheme.data[k];
                                    if (!d) return null;
                                    const m = CULTURE_META[k];
                                    return (
                                        <div key={k} className="bg-white rounded-2xl border-2 overflow-hidden"
                                            style={{borderColor: m.border}}>
                                            <div className="px-4 py-3 flex items-center justify-between"
                                                style={{background:m.bg, borderBottom:`1px solid ${m.border}`}}>
                                                <span className="font-bold text-sm" style={{color:m.txt}}>{m.label}</span>
                                                <span className="text-[10px] text-stone-400 italic">{d.src}</span>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-stone-700 text-sm leading-relaxed mb-3">{d.text}</p>
                                                <div className="p-2 rounded-xl text-xs font-bold" style={{background:m.bg, color:m.txt}}>
                                                    🔑 {d.key}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Академический вывод */}
                            <div className="bg-stone-900 text-white rounded-2xl p-6">
                                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">📚 Академический сравнительный анализ</p>
                                <p className="text-stone-200 leading-relaxed">{selTheme.compare}</p>
                            </div>

                            {/* ИЛЛЮСТРАЦИИ — сканы и репродукции из мировых библиотек */}
                            {MYTH_ILLUSTRATIONS[selTheme.id] && (
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                                        🖼️ Иллюстрации — репродукции из мировых библиотек и музеев
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {MYTH_ILLUSTRATIONS[selTheme.id].map((ill, idx) => (
                                            <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden group hover:shadow-lg transition-all">
                                                <div className="h-52 bg-stone-100 overflow-hidden">
                                                    <img loading="lazy" crossOrigin="anonymous" src={ill.src} alt={ill.cap}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={e => { e.target.parentNode.style.display='none'; }}
                                                        loading="lazy"/>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-sm text-stone-700 leading-snug font-serif mb-2">{ill.cap}</p>
                                                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">
                                                        📚 {ill.lib}{ill.license ? ' · ' + ill.license : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ПАРАЛЛЕЛИ */}
                    {tab==='parallel' && (
                        <div className="space-y-4">
                            <div className="bg-white border border-stone-200 rounded-2xl p-6">
                                <h3 className="font-serif font-bold text-xl mb-3">{selTheme.icon} {selTheme.title} — Ключевые параллели</h3>
                                <div className="prose prose-stone max-w-none">
                                    <p className="text-stone-700 leading-relaxed text-base">{selTheme.parallel}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    {title:'Мифология → Религия', desc:'Как языческие мифы повлияли на формирование мировых религий', q:`Объясни академически: как древние мифологии (шумерская, египетская, греческая) повлияли на формирование иудейско-христианско-исламской традиции? Конкретные примеры заимствований или параллелей в теме: ${selTheme.title}`, icon:'🌊'},
                                    {title:'Архетипы Юнга', desc:'Коллективное бессознательное и мифологические образы', q:`Проанализируй тему "${selTheme.title}" с точки зрения аналитической психологии Юнга: архетипы Тени, Анимы, Самости, Героя. Как эти образы проявляются в разных мифологиях и религиях?`, icon:'🧠'},
                                    {title:'Структурный анализ', desc:'Метод Леви-Стросса: бинарные оппозиции в мифах', q:`Применив метод структурного анализа Леви-Стросса к теме "${selTheme.title}" в разных мифологиях: найди бинарные оппозиции (жизнь/смерть, хаос/порядок, сакральное/профанное). Как структура мифа отражает устройство общества?`, icon:'⚖️'},
                                ].map(c=>(
                                    <div key={c.title} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                                        <span className="text-3xl">{c.icon}</span>
                                        <h4 className="font-serif font-bold">{c.title}</h4>
                                        <p className="text-sm text-stone-500">{c.desc}</p>
                                        <button onClick={()=>{setTab('ai');askAI(c.q);}}
                                            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-700 transition-all">
                                            ✨ AI Анализ →
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* Хронология */}
                            <div className="bg-white border border-stone-200 rounded-2xl p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">📅 Хронология текстов о теме «{selTheme.title}»</p>
                                <div className="space-y-2">
                                    {[
                                        ['~3100 до н.э.','Египет','Тексты Пирамид — первые письменные религиозные тексты мира'],
                                        ['~2600 до н.э.','Шумер','Эпос о Гильгамеше — потоп, смерть, поиск бессмертия'],
                                        ['~1500 до н.э.','Индия','Ригведа — гимны, космогония, природа богов'],
                                        ['~950 до н.э.','Израиль','Написание Торы (Яхвист) — Бытие, Исход'],
                                        ['~750 до н.э.','Греция','Гесиод «Теогония», Гомер «Илиада»'],
                                        ['~600 до н.э.','Иран','Авеста — зороастрийские гимны Заратустры'],
                                        ['~500 до н.э.','Индия','Упанишады, Бхагавад-гита'],
                                        ['~100 до н.э.','Иудея','Свитки Мёртвого моря, апокалиптика'],
                                        ['~ 30–70 н.э.','Иудея/Рим','Евангелия Нового Завета'],
                                        ['~ 610–632 н.э.','Аравия','Откровение Корана Мухаммаду ﷺ'],
                                        ['~ 700–800 н.э.','Скандинавия','Исландские саги, Эдды'],
                                        ['712 н.э.','Япония','Кодзики — первая японская хроника мифов'],
                                    ].map(([date, place, desc])=>(
                                        <div key={date} className="flex gap-3 items-start">
                                            <span className="text-amber-600 font-bold text-xs flex-shrink-0 w-28">{date}</span>
                                            <span className="text-stone-400 text-xs flex-shrink-0 w-20">{place}</span>
                                            <span className="text-stone-700 text-sm">{desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI АНАЛИЗ */}
                    {tab==='ai' && (
                        <div className="space-y-4">
                            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">🤖 Вопросы для глубокого анализа — тема: {selTheme.title}</p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        `Сравни миф о ${selTheme.title} в шумерской и библейской традиции. Что общего? Что означало заимствование?`,
                                        `Как тема "${selTheme.title}" отражает религиозное мировоззрение своей эпохи? Сравни 3 культуры.`,
                                        `Что говорит ${selTheme.title} о природе человека с точки зрения каждой религии?`,
                                        `Как современная наука (антропология, психология) объясняет универсальность мифа о ${selTheme.title}?`,
                                        `Были ли авторы Библии знакомы с ${selTheme.title} шумерской мифологии? Докажи или опровергни.`,
                                        `Сравни отношение ислама к ${selTheme.title} с христианством и язычеством.`,
                                    ].map(q=>(
                                        <button key={q} onClick={()=>askAI(q)}
                                            className="text-xs bg-stone-100 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-xl px-3 py-2 text-stone-700 transition-all text-left">
                                            {q}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input id="myth-q" placeholder="Свой вопрос о сравнительной мифологии..."
                                        className="flex-1 p-3 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
                                        onKeyDown={e=>e.key==='Enter'&&askAI(document.getElementById('myth-q').value)}/>
                                    <button onClick={()=>askAI(document.getElementById('myth-q').value)} disabled={aiLoad}
                                        className="px-4 py-3 bg-amber-600 text-white rounded-xl font-bold disabled:opacity-50">
                                        {aiLoad?'...':'✨'}
                                    </button>
                                </div>
                            </div>
                            {aiLoad && <div className="flex items-center gap-2 text-stone-400 italic p-4"><Icons.Loader c="w-4 h-4 text-amber-500"/> Нейросеть анализирует мифологию...</div>}
                            {aiText && <div className="ai-content p-6 bg-white border border-stone-200 rounded-2xl shadow-sm" dangerouslySetInnerHTML={{__html:aiText}}/>}
                        </div>
                    )}
                </div>
            );
        }

        // ════════════════════════════════════════════════════════════════════


        // МОДУЛЬ: ПОКЛОНЕНИЕ — Практики богослужения в мировых религиях
        // ════════════════════════════════════════════════════════════════════
        var WORSHIP_DATA = [
            {
                id:'islam', emoji:'☪️', name:'Ислам', place:'Мечеть (Масджид)', color:'#065f46', bg:'#ecfdf5', border:'#6ee7b7',
                img:'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=900&q=85',
                imgCap:'Намаз в мечети. Верующие выстраиваются рядами, обратившись в сторону Мекки.',
                histImg:'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
                histCap:'Интерьер Голубой мечети (Стамбул, XVII в.). Михраб (ниша Киблы), минбар (кафедра).',
                keyPrinciple:'Таухид — абсолютное единство Бога. Поклонение только Аллаху, без посредников.',
                steps:[
                    {title:'Омовение (Вуду)', icon:'💧', text:'Перед молитвой обязательно ритуальное омовение: руки, рот, нос, лицо, руки до локтей, голова, уши, ноги. Если нет воды — очищение землёй (таяммум).'},
                    {title:'Направление Киблы', icon:'🧭', text:'Все мусульмане мира молятся в сторону Священной Каабы в Мекке (Кибла). Это символизирует единство уммы — всего исламского сообщества.'},
                    {title:'Азан — призыв к молитве', icon:'📢', text:'Муэдзин с минарета возглашает: «Аллаху Акбар! Аллаху Акбар! Ашхаду алля иляха илляллах!» — 5 раз в день. Призыв звучит с VII века н.э.'},
                    {title:'Ракаат — единица молитвы', icon:'🤲', text:'Каждый намаз состоит из ракаатов: стоять (Кийам) → поклон (Руку) → выпрямиться → земной поклон (Суджуд) → сесть. Коран читается в каждом ракаате.'},
                    {title:'Пятница — Джума', icon:'🕌', text:'Пятничная молитва (Джума-намаз) — главная за неделю. Обязательна для мужчин. Имам произносит две хутбы (проповеди). Происходит в полдень.'},
                    {title:'Запреты в мечети', icon:'🚫', text:'Снять обувь при входе. Женщины — отдельный зал или секция. Нельзя разговаривать во время молитвы. Нельзя изображать людей или животных в убранстве.'},
                ],
                history:'Мечеть появилась в Медине в 622 н.э. — первая мечеть Пророка (Масджид ан-Набави). Архитектура: молитвенный зал, михраб (ниша Киблы), минбар (кафедра), минарет. Абсолютный запрет иконографии — арабская каллиграфия и геометрические орнаменты как форма богопочитания.',
                changes:'VII в.: простые земляные мечети. X–XV вв.: купола и минареты (Константинополь). XVI в.: Голубая мечеть — 6 минаретов. XX в.: микрофоны вместо живого муэдзина. XXI в.: приложения для определения Киблы и времени намаза.',
            },
            {
                id:'christianity', emoji:'✝️', name:'Христианство', place:'Церковь (Храм)', color:'#92400e', bg:'#fffbeb', border:'#fde68a',
                img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85',
                imgCap:'Литургия в православном храме. Хор, свечи, иконы — многовековая традиция богослужения.',
                histImg:'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=85',
                histCap:'Собор Святой Софии (Константинополь, 537 н.э.) — величайший христианский храм древности.',
                keyPrinciple:'Поклонение Богу через Иисуса Христа. Триединый Бог: Отец, Сын, Святой Дух.',
                steps:[
                    {title:'Крещение', icon:'💧', text:'Таинство вхождения в Церковь. Трёхкратное погружение (православие) или окропление (католицизм/протестантизм) с формулой: «Во имя Отца, и Сына, и Святого Духа».'},
                    {title:'Литургия / Месса', icon:'🍞', text:'Центральное богослужение. Включает чтение Писания, проповедь, исповедание веры (Символ Веры) и Евхаристию — причастие хлебом и вином в память о Тайной Вечере.'},
                    {title:'Молитва', icon:'🙏', text:'«Отче наш» — молитва, которую дал Иисус (Мф 6:9-13). Индивидуальная и общественная молитва. Православие: Иисусова молитва («Господи Иисусе Христе, Сыне Божий, помилуй мя»).'},
                    {title:'Иконы и символы', icon:'🎨', text:'Православие и католицизм: иконы, статуи, крест. Протестантизм: строгий запрет образов. Крест — главный символ. Венчает каждый храм.'},
                    {title:'Пост и праздники', icon:'📅', text:'Великий пост (40 дней перед Пасхой). Рождество Христово. Пасха — Воскресение Христово — главный праздник. Праздники по церковному календарю.'},
                    {title:'Поведение в храме', icon:'🕯️', text:'Одежда скромная (православие — голова покрыта у женщин). Нельзя фотографировать во время службы. Тишина. Свечи как символ молитвы. Крестное знамение при входе.'},
                ],
                history:'I в.: домашние церкви. 313 н.э.: Константин легализует христианство. 537 н.э.: Собор Святой Софии. 1054: Раскол на православных и католиков. 1517: Реформация Лютера, протестантизм. Архитектура: алтарь на востоке (к Иерусалиму), неф, купол — образ Небесного Иерусалима.',
                changes:'I в.: простые комнаты. IV–VI вв.: базилики. XI в.: романский стиль. XIII в.: готические соборы. XVI в.: протестантизм убирает алтарь и иконы. XIX–XX вв.: церковные хоры. XXI в.: онлайн-трансляции литургий.',
            },
            {
                id:'judaism', emoji:'✡️', name:'Иудаизм', place:'Синагога (Бейт Кнессет)', color:'#1d4ed8', bg:'#eff6ff', border:'#bfdbfe',
                img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
                imgCap:'Молитва у Стены Плача (Иерусалим). Мужчины слева, женщины справа, разделены.',
                histImg:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=85',
                histCap:'Ростовская синагога (XIV в.). Бима в центре, арон ха-кодеш у восточной стены.',
                keyPrinciple:'Служение единому Богу через соблюдение Торы — 613 заповедей (мицвот).',
                steps:[
                    {title:'Шаббат — Суббота', icon:'🕯️', text:'Самый важный ритуал. В пятницу вечером зажигают субботние свечи, читают Кидуш над вином. До субботы 39 видов работы запрещены. Молитва в синагоге.'},
                    {title:'Молитва — Давенинг', icon:'📖', text:'Три молитвы в день: Шахарит (утро), Минха (день), Маарив (вечер). Молятся на иврите. Молитвенник — Сидур. Мужчины надевают талит (молитвенное покрывало) и тфилин (коробочки с текстом Торы).'},
                    {title:'Чтение Торы', icon:'📜', text:'По понедельникам, четвергам и субботам Тору читают вслух из свитка. Читают специальным мелодическим речитативом. Свиток выносят к биме и к нему вызывают мужчин.'},
                    {title:'Бар- и Бат-мицва', icon:'🎉', text:'В 13 лет (мальчик) и 12 лет (девочка) ребёнок становится религиозно ответственным. Впервые читает Тору вслух перед общиной. Переход во взрослость.'},
                    {title:'Кашрут — пищевые законы', icon:'🍽️', text:'Кошерное питание: нельзя смешивать мясо и молоко, запрещена свинина и морепродукты. Животных убивают по шхите (специальным методом). Отдельная посуда для мяса и молока.'},
                    {title:'Поведение в синагоге', icon:'🤫', text:'Мужчины покрывают голову кипой (ермолкой). В традиционных синагогах мужчины и женщины разделены. Тора — священна: свиток нельзя трогать руками, только специальной указкой (ядом).'},
                ],
                history:'До 70 н.э.: Храм в Иерусалиме — центр поклонения (жертвоприношения). После разрушения Храма: синагога — место учёбы и молитвы. «Молитва вместо жертвы» (рав Иоханан). Иерусалим всегда в центре — синагоги строят лицом к востоку.',
                changes:'VI–V вв. до н.э.: первые синагоги в изгнании. 70 н.э.: разрушение Храма — поворотный момент. Средневековье: закрытые гетто-синагоги. XIX в.: реформистский иудаизм (смешанные места, орган). XX в.: Государство Израиль восстановлено. XXI в.: онлайн-служба в пандемию.',
            },
            {
                id:'buddhism', emoji:'☸️', name:'Буддизм', place:'Храм / Вихара / Дзэнский сад', color:'#ca8a04', bg:'#fefce8', border:'#fde047',
                img:'https://images.unsplash.com/photo-1538797965759-ed4d74d40c42?w=900&q=85',
                imgCap:'Медитация монахов в буддийском храме. Благовония, статуя Будды, лотосовые позиции.',
                histImg:'https://images.unsplash.com/photo-1545579133-99bb5e7dcc2f?w=800&q=85',
                histCap:'Боробудур (Индонезия, IX в.) — крупнейший буддийский храм мира. 2700 рельефов.',
                keyPrinciple:'Нет Бога-Творца. Практика направлена на освобождение от страдания и достижение Нирваны.',
                steps:[
                    {title:'Медитация (Бхавана)', icon:'🧘', text:'Сердце практики. Саматха — успокоение ума. Випассана — наблюдение за реальностью. Цель: прекратить движение мыслей, увидеть непостоянство (аниччу) всего.'},
                    {title:'Простирание перед Буддой', icon:'🙇', text:'Три простирания перед статуей Будды — не молитва Богу, а символ уважения к Просветлённому и его Учению. «Я принимаю прибежище в Будде, Дхамме, Сангхе».'},
                    {title:'Нёнгдро — подготовительные практики', icon:'📿', text:'100 000 простираний, 100 000 мантр, 100 000 подношений. Тибетский буддизм. Мантры (Ом Мани Падме Хум) и молитвенные колёса — накопление заслуг (мерита).'},
                    {title:'Подношения', icon:'🌺', text:'Перед статуей Будды ставят: воду, цветы, благовония, свечи, фрукты. Это символ отречения от привязанностей, а не жертвоприношение.'},
                    {title:'Дни Упосатха', icon:'🌕', text:'Дни новолуния и полнолуния — особо благоприятны для практики. Миряне соблюдают дополнительные заповеди (8 правил). Монахи проводят специальные церемонии.'},
                    {title:'Поведение в храме', icon:'🚶', text:'Снять обувь. Не касаться статуй. Не поворачиваться спиной к Будде. Тишина в медитационном зале. В тибетском буддизме: ходить вокруг ступы по часовой стрелке.'},
                ],
                history:'V в. до н.э.: Будда в Сарнатхе произносит первую проповедь. III в. до н.э.: Ашока распространяет буддизм по Азии. I в.: буддизм в Китай. VI в.: Бодхидхарма, Дзен. IX в.: Боробудур. XIV в.: тибетский буддизм (Далай-Лама).',
                changes:'Тхеравада (Юго-Восточная Азия) — строгий монашеский путь. Махаяна (Китай/Япония) — путь Бодхисатвы для всех. Ваджраяна (Тибет) — тантрические практики. XXI в.: светская медитация (mindfulness) в корпорациях.',
            },
            {
                id:'hinduism', emoji:'🕉️', name:'Индуизм', place:'Мандир (Храм)', color:'#ea580c', bg:'#fff7ed', border:'#fdba74',
                img:'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=900&q=85',
                imgCap:'Пуджа — ритуальное подношение. Статуя Ганеши, цветы, благовония, огонь.',
                histImg:'https://images.unsplash.com/photo-1545579133-99bb5e7dcc2f?w=800&q=80',
                histCap:'Ангкор-Ват (Камбоджа, XII в.) — крупнейший религиозный комплекс мира. Посвящён Вишну.',
                keyPrinciple:'Поклонение Брахману через мириады его форм. «Истина одна, мудрецы называют её по-разному».',
                steps:[
                    {title:'Пуджа — ритуальное поклонение', icon:'🌺', text:'Ежедневный ритуал дома и в храме. 16 шагов (упачаров): пригласить, омыть, украсить, накормить, развлечь, отпустить бога. Предметы: цветы, рис, благовония, огонь (арати), колокольчик.'},
                    {title:'Арати — огненный обряд', icon:'🔥', text:'Вращение горящей лампады (дипы) перед образом бога. Символ Атмана (огонь) перед Брахманом (образ). Сопровождается пением бхаджанов и ударами гонга.'},
                    {title:'Мантры', icon:'🎵', text:'«Ом» — священный звук, основа мироздания. «Гаятри-мантра» — самая важная (Ригведа). «Ом намах Шивайя», «Харе Кришна». Повторение мантры (джапа) 108 раз на чётках (рудракше).'},
                    {title:'Паломничество (Тиртха-ятра)', icon:'🚶', text:'Варанаси (Бенарес) — священнейший город. Купание в Ганге смывает карму. Чар-Дхам — четыре священных места. Умереть в Варанаси — прямая мокша по традиции.'},
                    {title:'Прасад', icon:'🍚', text:'Пища, освящённая перед богом. После пуджи раздаётся всем присутствующим. Принять прасад — получить благословение бога. Нельзя отказываться.'},
                    {title:'Поведение в мандире', icon:'🛕', text:'Снять обувь. Не показывать ноги статуям богов. Сделать намасте. Не трогать статуи. Мужчины нередко с голым торсом. Женщины с покрытыми плечами. Колокольчик при входе.'},
                ],
                history:'~1500 до н.э.: Ведические жертвоприношения (яджны) — огонь как посредник. ~600 до н.э.: переход от жертвоприношений к медитации (Упанишады). ~200 н.э.: бхакти-движение (личная любовь к Богу). IX в.: Шанкарачарья, реформа. XII в.: Рамануджа. XIX в.: Рамакришна и Вивекананда.',
                changes:'Ведический период: жертвоприношения животных. Классика: пуджа вместо яджны. Бхакти: эмоциональная молитва-пение. XX в.: распространение йоги на Западе. XXI в.: онлайн-пуджа через трансляции.',
            },
            {
                id:'shinto', emoji:'⛩️', name:'Синтоизм', place:'Дзиндзя (Святилище)', color:'#be185d', bg:'#fdf2f8', border:'#f0abfc',
                img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85',
                imgCap:'Тории (красные ворота) храма Фусими Инари, Киото. 10 000 тории образуют туннель.',
                histImg:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85',
                histCap:'Святилище Ицукусима (XII в.). Тории стоит в море — символ соединения миров.',
                keyPrinciple:'Уважение и контакт с ками — духами, населяющими природу. Чистота как путь к священному.',
                steps:[
                    {title:'Очищение (Темидзуя)', icon:'💧', text:'При входе в святилище — ковш воды. Порядок: левая рука → правая рука → рот → рукоятка ковша. Очищение от кегаре (нечистоты) перед встречей с ками.'},
                    {title:'Хайдэн — зал поклонения', icon:'🏯', text:'Подойти к хайдэну, бросить монету в ящик (осайсэн-баку). Поклон 90° два раза. Два хлопка. Молчаливая молитва (собственные слова). Один поклон. Всё — в мире, без суеты.'},
                    {title:'Молитва Норито', icon:'📜', text:'Традиционные молитвы-заклинания на классическом японском. Произносятся жрецами (кансями). Адресованы конкретным ками данного святилища.'},
                    {title:'Омамори и Омикудзи', icon:'🎫', text:'Омамори — амулеты-обереги (здоровье, экзамены, дорога). Омикудзи — бумажка с предсказанием судьбы. Плохое предсказание привязывают к дереву — оставляют в святилище.'},
                    {title:'Мацури — праздники', icon:'🎊', text:'Торжественные шествия с микоси (переносное святилище с ками). Музыка, танцы, уличная еда. Обон — летний праздник предков. Хацумоудэ — первый визит в Новый год.'},
                    {title:'Поведение в святилище', icon:'🌿', text:'Спокойное, уважительное поведение. Не кричать. Фотографировать снаружи — можно, внутри — спросить разрешения. Тории — граница: проходить по центру, уступая kami-дорожку середины.'},
                ],
                history:'Синтоизм существовал без письменного оформления. 712 н.э.: Кодзики — первое письменное изложение мифов. 768 н.э.: святилище Касуга (Нара). Период Мэйдзи (1868): государственный синтоизм, обожествление императора. 1945: отделён от государства.',
                changes:'До 1868: смешение с буддизмом (синбуцу сюго). 1868–1945: государственный синто — культ императора. 1945: отказ от государственного синтоизма. Сегодня: личная духовность, праздники, прагматическое отношение.',
            },
        ];

        function WorshipModule({ apiKey }) {
            const [sel, setSel]   = useState(WORSHIP_DATA[0]);
            const [tab, setTab]   = useState('practice'); // practice | history | ai
            const [aiText, setAiText] = useState('');
            const [aiLoad, setAiLoad] = useState(false);

            const askAI = async (q) => {
                setAiLoad(true); setAiText('');
                const r = await fetchZvenoAIAnalysis(q, `Богослужение: ${sel.name}`, apiKey);
                setAiText(r); setAiLoad(false);
            };

            return (
                <div className="fade-in-up space-y-6 pb-20 md:pb-6">
                    {/* Шапка */}
                    <div className="bg-[#1c1b1d] text-white rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-2">🙏 Поклонение в мировых религиях</h2>
                        <p className="text-stone-400 text-sm md:text-lg">Как молятся в мечети, церкви, синагоге, храме — подробно, с историей изменений</p>
                    </div>

                    {/* Выбор религии */}
                    <div className="flex flex-wrap gap-2">
                        {WORSHIP_DATA.map(r=>(
                            <button key={r.id} onClick={()=>{setSel(r);setAiText('');setTab('practice');}}
                                style={sel.id===r.id?{background:r.bg,borderColor:r.border,color:r.color,borderWidth:2}:{}}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${sel.id===r.id?'':'border-stone-200 bg-white text-stone-600 hover:border-stone-400'}`}>
                                {r.emoji} {r.name}
                            </button>
                        ))}
                    </div>

                    {/* Изображение + название */}
                    <div className="bg-white rounded-3xl border-2 overflow-hidden" style={{borderColor:sel.border}}>
                        <div className="relative h-56 md:h-72">
                            <img loading="lazy" crossOrigin="anonymous" src={sel.img} alt={sel.name} className="w-full h-full object-cover"
                                onError={e=>{e.target.style.display='none';}}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <div>
                                    <span className="text-4xl">{sel.emoji}</span>
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mt-2">{sel.name}</h3>
                                    <p className="text-stone-300 text-sm">{sel.place}</p>
                                </div>
                            </div>
                        </div>
                        {/* Ключевой принцип */}
                        <div className="px-6 py-4 border-b" style={{background:sel.bg, borderColor:sel.border}}>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:sel.color}}>⭐ Ключевой принцип</p>
                            <p className="font-serif font-bold" style={{color:sel.color}}>{sel.keyPrinciple}</p>
                        </div>
                    </div>

                    {/* Вкладки */}
                    <div className="flex gap-2 bg-stone-100 p-1.5 rounded-2xl">
                        {[['practice','🕌 Практика и правила'],['history','📜 История изменений'],['ai','🤖 AI Анализ']].map(([k,l])=>(
                            <button key={k} onClick={()=>setTab(k)}
                                className={`flex-1 py-2.5 px-2 rounded-xl text-xs md:text-sm font-bold transition-all ${tab===k?'bg-white shadow text-stone-900':'text-stone-500 hover:text-stone-700'}`}>
                                {l}
                            </button>
                        ))}
                    </div>

                    {/* ПРАКТИКА */}
                    {tab==='practice' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {sel.steps.map((step,i)=>(
                                    <div key={i} className="bg-white rounded-2xl border p-5" style={{borderColor:sel.border}}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{step.icon}</span>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{color:sel.color}}>Шаг {i+1}</span>
                                                <h4 className="font-serif font-bold text-stone-900">{step.title}</h4>
                                            </div>
                                        </div>
                                        <p className="text-stone-700 text-sm leading-relaxed">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ИСТОРИЯ */}
                    {tab==='history' && (
                        <div className="space-y-4">
                            {/* Историческое изображение */}
                            <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:sel.border}}>
                                <div className="h-52 bg-stone-100 overflow-hidden">
                                    <img loading="lazy" crossOrigin="anonymous" src={sel.histImg} alt="Исторический вид" className="w-full h-full object-cover"
                                        onError={e=>{e.target.parentNode.style.background='#f5f5f4';}}/>
                                </div>
                                <div className="p-4" style={{background:sel.bg}}>
                                    <p className="text-sm font-serif text-stone-700 italic">📸 {sel.histCap}</p>
                                </div>
                            </div>
                            {/* История */}
                            <div className="bg-white rounded-2xl border p-6" style={{borderColor:sel.border}}>
                                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:sel.color}}>📅 Краткая история богослужения</p>
                                <p className="text-stone-700 leading-relaxed">{sel.history}</p>
                            </div>
                            {/* Изменения */}
                            <div className="bg-white rounded-2xl border p-6" style={{borderColor:sel.border}}>
                                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:sel.color}}>🔄 Что менялось со временем</p>
                                <p className="text-stone-700 leading-relaxed">{sel.changes}</p>
                            </div>
                            {/* Сравнительная таблица */}
                            <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:sel.border}}>
                                <div className="px-5 py-3 border-b" style={{background:sel.bg, borderColor:sel.border}}>
                                    <p className="font-bold text-sm" style={{color:sel.color}}>⚖️ Сравнение с другими традициями</p>
                                </div>
                                <div className="p-4 overflow-x-auto">
                                    <table className="w-full text-xs min-w-[500px]">
                                        <thead>
                                            <tr className="border-b border-stone-100">
                                                <th className="text-left py-2 px-3 text-stone-400 font-bold uppercase tracking-wide">Аспект</th>
                                                {WORSHIP_DATA.map(r=>(
                                                    <th key={r.id} className="text-center py-2 px-2" style={{color:r.color}}>{r.emoji}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                ['Направление молитвы', ['Мекка','Восток/Иерусалим','Иерусалим','Алтарь Будды','Статуя бога','Любое','Ками-до']],
                                                ['Покрытие головы', ['Тюбетейка (у)', 'Платок (ж/пр)', 'Кипа (м)', 'Нет', 'Нет', 'Нет', 'Нет']],
                                                ['Обувь', ['Снять','Нет','Нет','Снять','Снять','Снять','Снять']],
                                                ['Изображения', ['Запрещены','Иконы/крест','Нет','Статуи','Множество','Нет','Ками-предметы']],
                                                ['Общая молитва', ['5 раз/день','1 раз/нед','3 раза/день','Ретриты','Праздники','Периодично','Мацури']],
                                            ].map(([aspect, vals])=>(
                                                <tr key={aspect} className="border-b border-stone-50">
                                                    <td className="py-2 px-3 font-bold text-stone-600 text-xs">{aspect}</td>
                                                    {vals.map((v,i)=>(
                                                        <td key={i} className="text-center py-2 px-2 text-stone-500 text-[10px]">{v}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI */}
                    {tab==='ai' && (
                        <div className="space-y-4">
                            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">🤖 Углублённый анализ</p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        `Как изменилось богослужение в ${sel.name} за последние 500 лет?`,
                                        `Что общего между молитвой в ${sel.name} и других религиях?`,
                                        `Роль тела в поклонении: поклоны, простирания, позы в ${sel.name}`,
                                        `Как современность изменила практику богослужения в ${sel.name}?`,
                                        `Сравни концепцию «священного места» в ${sel.name} и других традициях`,
                                        `Музыка и пение в ${sel.name} — история и значение`,
                                    ].map(q=>(
                                        <button key={q} onClick={()=>askAI(q)}
                                            className="text-xs bg-stone-100 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-xl px-3 py-2 text-stone-700 transition-all text-left">
                                            {q}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input id="wrsh-q" placeholder={`Вопрос о поклонении в ${sel.name}...`}
                                        className="flex-1 p-3 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
                                        onKeyDown={e=>e.key==='Enter'&&askAI(document.getElementById('wrsh-q').value)}/>
                                    <button onClick={()=>askAI(document.getElementById('wrsh-q').value)} disabled={aiLoad}
                                        className="px-4 py-3 bg-amber-600 text-white rounded-xl font-bold disabled:opacity-50">
                                        {aiLoad?'...':'✨'}
                                    </button>
                                </div>
                            </div>
                            {aiLoad && <div className="flex items-center gap-2 text-stone-400 italic p-4"><Icons.Loader c="w-4 h-4 text-amber-500"/> Нейросеть анализирует практику поклонения...</div>}
                            {aiText && <div className="ai-content p-6 bg-white border border-stone-200 rounded-2xl shadow-sm" dangerouslySetInnerHTML={{__html:aiText}}/>}
                        </div>
                    )}
                </div>
            );
        }



        // =====================================================================
        // МОДУЛЬ: АНГЕЛЫ И ДЕМОНЫ — Священные писания, иллюстрации, манускрипты
        // =====================================================================
        function AngelsDemonsModule({ apiKey }) {
            const [tab, setTab]           = useState('angels'); // angels | demons | compare
            const [selected, setSelected] = useState(null);
            const [aiText, setAiText]     = useState('');
            const [aiLoad, setAiLoad]     = useState(false);
            const [lightbox, setLightbox] = useState(null);

            const openLightbox = (src, cap) => setLightbox({src, cap});

            // ── Данные: Ангелы ─────────────────────────────────────────────
            const ANGELS = [
                {
                    id:'gabriel', name:'Гавриил / Джибриль', emoji:'📯',
                    traditions:['Христианство','Ислам','Иудаизм'],
                    role:'Архангел-вестник. Передаёт Слово Бога людям.',
                    bible:['Дан 8:16 — «Гавриил, объясни ему это видение»','Лк 1:26–38 — Благовещение Деве Марии','Лк 1:19 — «Я Гавриил, предстоящий пред Богом»'],
                    quran:['2:97 — «Кто враждует с Джибрилем, тот враждует с Аллахом»','2:253 — «Мы помогли Исе Духом Святым»','16:102 — «Его ниспослал Дух Святой»'],
                    texts:['Енох I 9:1 — Гавриил обратился к Господу за погибших','Тов 12:15 — один из семи ангелов, предстоящих Господу','Пс Соломона 8:14 — ангел света'],
                    desc:'Гавриил — главный вестник Бога в трёх авраамических традициях. В иудаизме — один из четырёх архангелов. В христианстве явился Марии. В исламе через него передан весь Коран Мухаммеду за 23 года.',
                    significance:'Именно Джибриль принёс первое откровение Мухаммеду в пещере Хира (610 н.э.). Он же возвестил Марии о рождении Исы. Единственный ангел, названный по имени в Коране.',
                    sources:[{label:'Фра Анджелико «Благовещение» (1440) — Museo di San Marco | Google Arts',url:'https://artsandculture.google.com/asset/the-annunciation/IQFYba8CwFsIWg',type:'painting'},{label:'Симоне Мартини «Благовещение» (1333) — Уффици | Google Arts',url:'https://artsandculture.google.com/asset/the-annunciation/kgGCj9K4v3nPaA',type:'painting'},{label:'Часослов XV в. с Гавриилом — British Library Add MS 18850',url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Add_MS_18850',type:'manuscript'},{label:'Бирмингемский Коран (568–645 н.э.) — University of Birmingham',url:'https://www.birmingham.ac.uk/facilities/cadbury/collections/birmingham-quran-manuscript',type:'manuscript'}]
                },
                {
                    id:'michael', name:'Михаил / Микаиль', emoji:'⚔️',
                    traditions:['Христианство','Ислам','Иудаизм'],
                    role:'Архангел-воитель. Защитник Израиля и предводитель небесного воинства.',
                    bible:['Дан 10:13 — «Михаил, один из первых князей, пришёл помочь мне»','Дан 12:1 — «Восстанет Михаил, защитник сынов твоего народа»','Откр 12:7 — «Михаил и ангелы его воевали с драконом»','Иуд 1:9 — «Михаил спорил с дьяволом о теле Моисея»'],
                    quran:['2:98 — «Кто враг Аллаху, Его ангелам, посланникам, Джибрилю и Микаилю»'],
                    texts:['Енох I 20:5 — надзирает за раем', 'Свитки Мёртвого моря (1QM) — предводитель Сынов Света','Завещание Соломона — Михаил даёт Соломону кольцо власти'],
                    desc:'Михаил — единственный ангел, названный в Библии «архангелом». Главнокомандующий небесным воинством. В книге Откровения побеждает сатану-дракона. В Свитках Мёртвого моря — полководец Сынов Света против Сынов Тьмы.',
                    significance:'Особо почитается в исламе как ангел провидения и милости. В православии — «чиноначальник ангелов». День Михаила (Михайлов день) — 21 ноября. Покровитель воинов, полицейских, врачей.',
                    sources:[{label:'Гвидо Рени «Архангел Михаил» (1636) — WGA онлайн галерея',url:'https://www.wga.hu/html_m/r/reni/michael.html',type:'painting'},{label:'Рафаэль «Михаил» (1518) — Лувр, коллекция онлайн',url:'https://collections.louvre.fr/en/ark:/53355/cl010065609',type:'painting'},{label:'Дюрер «Михаил» из Апокалипсиса (1498) — Metropolitan Museum',url:'https://www.metmuseum.org/art/collection/search/336217',type:'manuscript'},{label:'«Война сынов света» (1QM) — Свитки Мёртвого моря, цифровая библиотека',url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/1QM-1',type:'manuscript'}]
                },
                {
                    id:'raphael', name:'Рафаил / Рафаэль', emoji:'🌿',
                    traditions:['Иудаизм','Христианство'],
                    role:'Архангел-целитель. «Бог исцелил» — смысл его имени.',
                    bible:['Тов 12:15 — «Я Рафаил, один из семи ангелов»','Тов 3:17 — послан исцелить Товита и Сарру','Енох I 10:7 — «Исцели землю, исцели язву»'],
                    quran:['В Коране не назван по имени, но упоминается как один из ближайших ангелов'],
                    texts:['Книга Еноха I 20 — один из четырёх архангелов','Завещание Соломона — правит духами болезней','Мидраш — сопровождал Авраама после обрезания'],
                    desc:'Рафаил — архангел исцеления. В Книге Товита он путешествует с Товией в человеческом облике под именем «Азария» и исцеляет Товита от слепоты. Его имя означает «Бог исцелил».',
                    significance:'Покровитель врачей, фармацевтов и паломников. В эпоху Возрождения — популярнейший образ. Часто изображается с рыбой (из истории Товита) и посохом паломника.',
                    sources:[{label:'Верроккьо «Товия и ангел» (1470–1480) — National Gallery London',url:'https://www.nationalgallery.org.uk/paintings/andrea-del-verrocchio-and-workshop-tobias-and-the-angel',type:'painting'},{label:'Тициан «Товия и ангел» (1544) — Gallerie Accademia | Google Arts',url:'https://artsandculture.google.com/asset/tobias-and-the-angel/xQHMwcqQUwnFFA',type:'painting'},{label:'Книга Товита — Вульгата, British Library Add MS 10546',url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Add_MS_10546',type:'manuscript'}]
                },
                {
                    id:'seraphim', name:'Серафимы', emoji:'🔥',
                    traditions:['Иудаизм','Христианство'],
                    role:'Высший ангельский чин. «Пылающие». Непрерывно славят Бога у Его Престола.',
                    bible:['Ис 6:1–7 — «Серафимы стояли вокруг Него; у каждого шесть крыл»','Ис 6:6–7 — серафим прикасается горящим углём к устам Исайи','Откр 4:6–8 — четыре «животных», непрестанно взывающих: «Свят, Свят, Свят»'],
                    quran:['Хамалат аль-Арш — ангелы, несущие Престол Бога (40:7; 69:17)'],
                    texts:['3 Енох (Сефер Хехалот) — Метатрон описывает серафимов','Псевдо-Дионисий «О небесной иерархии» — высший чин'],
                    desc:'Серафимы — высший чин в христианской ангельской иерархии. Единственное упоминание — Исайя 6. Шесть крыл: два закрывают лицо (не смеют видеть Бога), два — ноги (смирение), двумя летят. Они кричат: «Кадош, Кадош, Кадош» — Свят, Свят, Свят.',
                    significance:'Видение Исайи стало основой для христианской литургии (Трисвятое, Санктус). В иконографии изображаются красными — цвет огня и любви.',
                    sources:[{label:'Серафимы — «Малый часослов Жана Беррийского» (1385–1390), Bibliothèque nationale de France',url:'https://gallica.bnf.fr/ark:/12148/btv1b55008392q',type:'manuscript'},{label:'Видение Исайи — Библия Кенникотта (1476), Bodleian Library Oxford',url:'https://digital.bodleian.ox.ac.uk/objects/542965b6-b3a0-44e2-b4ac-f2b87dc71b40/',type:'manuscript'},{label:'Серафимы в Книге Исайи — Великий Свиток Исайи, Dead Sea Scrolls Digital Library',url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/1QIsa-a-1',type:'manuscript'}]
                },
                {
                    id:'cherubim', name:'Херувимы', emoji:'👁️',
                    traditions:['Иудаизм','Христианство','Ислам'],
                    role:'Стражи Божественного Присутствия. Носители Его Славы (Кавод).',
                    bible:['Быт 3:24 — «Херувим с пламенным мечом охраняет путь к дереву жизни»','Иез 10 — видение «колёс» и херувимов (тетраморф)','Исх 25:18–22 — два золотых херувима на крышке Ковчега Завета','Пс 17:11 — «Воссел на херувима и полетел»'],
                    quran:['Кируввийюн (Коран 40:7) — несут Престол Всевышнего'],
                    texts:['Иезекииль 1 — Меркава (Колесница): четыре существа с ликами льва, быка, человека, орла','3 Енох — Хайот ха-Кодеш','Дионисий Ареопагит — второй чин ангелов'],
                    desc:'В Библии херувимы — вовсе не пухлые младенцы. Это грозные четырёхликие существа с четырьмя крыльями, сверкающие как раскалённый металл. Иезекииль описывает их как «Меркаву» — небесную колесницу Бога с огненными колёсами.',
                    significance:'Образ херувима из Иезекииля — один из самых загадочных в Библии. Иудейский мистицизм (Меркава) строился вокруг созерцания этого видения. В искусстве Ренессанса херувимы превратились в пухлых купидонов — полная противоположность оригиналу.',
                    sources:[{label:'Иезекиль видит Меркаву (Колесницу) — Bible Historiale (1372), National Library Netherlands',url:'https://manuscripts.kb.nl/search?q=bible+historiale&lang=en',type:'manuscript'},{label:'Херувимы — иллюминированная Библия, Morgan Library & Museum New York',url:'https://www.themorgan.org/collection/illuminated-manuscripts',type:'manuscript'},{label:'Рафаэль «Сикстинская Мадонна» с херувимами (1512) — Gemäldegalerie Dresden. Google Arts',url:'https://artsandculture.google.com/asset/sistine-madonna/iQE9kVMqSqSSGg',type:'painting'}]
                },
            ];

            // ── Данные: Демоны ─────────────────────────────────────────────
            const DEMONS = [
                {
                    id:'satan', name:'Сатана / Иблис', emoji:'🔥',
                    traditions:['Христианство','Ислам','Иудаизм'],
                    role:'Обвинитель, противник Бога. Падший ангел света.',
                    bible:['Иов 1:6–12 — сатана является в Совете Бога как «обвинитель»','Ис 14:12 — «Как упал ты с неба, денница, сын зари!»','Откр 12:9 — «Дракон, древний змий, называемый дьяволом и сатаной»','Мф 4:1–11 — Искушение Христа в пустыне'],
                    quran:['2:34 — Иблис отказывается пасть ниц перед Адамом','7:11–18 — диалог Аллаха с Иблисом','15:31–44 — «Я лучше его: Ты создал меня из огня, а его из глины»'],
                    texts:['Книга Еноха I 6 — Шемхазай, предводитель падших ангелов','Свитки Мёртвого моря — Велиал, князь тьмы','3 Енох — Самаэль, ангел-обвинитель'],
                    desc:'«Сатана» по-еврейски — «противник, обвинитель». В ранней Библии это должность в Небесном Суде (Иов 1–2), а не злой бог. Только в позднейших текстах он становится олицетворением зла. В исламе Иблис — сотворён из огня, гордыня не позволила поклониться Адаму из глины.',
                    significance:'Концепция персонифицированного зла революционна. До Библии — нет единого источника зла в большинстве религий. Через зороастрийское влияние (Ангра-Майнью) идея злого духа вошла в иудаизм, оттуда — в христианство и ислам.',
                    sources:[{label:'Уильям Блейк «Иов и Сатана» (1825) — Metropolitan Museum of Art',url:'https://www.metmuseum.org/art/collection/search/339992',type:'painting'},{label:'Блейк «Великий Красный Дракон» (1805) — National Gallery of Art Washington',url:'https://www.nga.gov/collection/art-object-page.36428.html',type:'painting'},{label:'Кодекс Гигас «Библия Дьявола» XIII в. — Национальная библиотека Швеции',url:'https://www.kb.se/samlingarna/digitala-samlingar/codex-gigas.html',type:'manuscript'},{label:'Книга Иова (4Q99) — Dead Sea Scrolls Digital Library',url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/4Q99-1',type:'manuscript'}]
                },
                {
                    id:'lilith', name:'Лилит', emoji:'🌙',
                    traditions:['Иудаизм','Каббала'],
                    role:'Первая жена Адама (по мидрашу). Демоница ночи и детей.',
                    bible:['Ис 34:14 — «И lîlît найдёт себе покой» (евр. лилит = «ночное существо»)'],
                    quran:['Не упоминается напрямую, но в исламской демонологии — джинния'],
                    texts:['Алфавит Бен-Сиры (IX в.) — полная история Лилит как первой жены Адама','Вавилонский Талмуд — лилин (ночные духи)','Зогар (XIII в.) — Лилит как «Другая Сторона»'],
                    desc:'В каноне Библии Лилит упомянута лишь раз — Исайя 34:14. Вся её история — в позднейших мидрашах. По «Алфавиту Бен-Сиры»: Адам и Лилит созданы одновременно из земли, но Лилит отказывалась подчиняться. Улетела, стала демоницей, опасной для новорождённых.',
                    significance:'Лилит — символ непокорности и независимости в иудейской мистике. Оберег «рука Хамса» и амулеты с именами трёх ангелов (Санои, Сансанои, Семангелоф) — защита от Лилит. В современной культуре — феминистский символ.',
                    sources:[{label:'Джон Коллиер «Лилит» (1892) — Atkinson Gallery Southport. ArtUK',url:'https://artuk.org/discover/artworks/lilith-152163',type:'painting'},{label:'«Рельеф Бёрни» (~1800 до н.э.) — British Museum, BM 2003,0718.1',url:'https://www.britishmuseum.org/collection/object/W_2003-0718-1',type:'manuscript'},{label:'Лилит в Алфавите Бен Сиры — еврейский манускрипт, Национальная библиотека Израиля',url:'https://www.nli.org.il/en/',type:'manuscript'}]
                },
                {
                    id:'azazel', name:'Азазель / Азазел', emoji:'🐐',
                    traditions:['Иудаизм','Раннее Христианство'],
                    role:'Падший ангел пустыни. Учитель войны и греха.',
                    bible:['Лев 16:8–26 — «Козёл для Азазела» — козёл отпущения','Лев 16:21 — первосвященник перекладывает грехи народа на козла'],
                    quran:['Не упоминается по имени'],
                    texts:['Книга Еноха I 8 — «Азазел научил людей делать мечи и ножи»','Книга Еноха I 10 — «Всели вину за всё зло на Азазела»','Апокалипсис Авраама — Азазел как противник Бога'],
                    desc:'В Книге Левит Азазел — таинственная сущность пустыни, которой отсылается козёл с грехами Израиля. В Книге Еноха — один из «Стражей» (Бней ха-Элохим), спустившихся на гору Хермон. Он научил людей войне, магии и блуду.',
                    significance:'«Козёл отпущения» (scapegoat) вошёл во все языки мира. Современное слово «scapegoat» из перевода Лев 16 — козёл для Азазела. Концепция ритуального очищения через перенос вины — основа многих религий.',
                    sources:[{label:'Уильям Холман Хант «Козёл отпущения» (1856) — Lady Lever Art Gallery, ArtUK',url:'https://artuk.org/discover/artworks/the-scapegoat-5835',type:'painting'},{label:'Книга Еноха (эфиопская рукопись) — British Library Or.509',url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Or_509',type:'manuscript'},{label:'Свиток Азазеля (4Q180) из Кумрана — DSS Digital Library',url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/4Q180-1',type:'manuscript'}]
                },
                {
                    id:'beelzebub', name:'Вельзевул', emoji:'🪰',
                    traditions:['Христианство','Иудаизм'],
                    role:'«Повелитель мух» — один из высших демонов, князь бесов.',
                    bible:['4 Цар 1:2–6 — «Баал-Зебуб», бог Аккарона (филистимский)','Мф 12:24 — «Он изгоняет бесов силою Вельзевула»','Мк 3:22 — «Вельзевул, князь бесов»','Мф 10:25 — Иисус называет его «хозяином дома»'],
                    quran:['Не упоминается по имени'],
                    texts:['Завещание Соломона — Вельзевул как второй по рангу после сатаны','Гримуар «Лемегетон» (XVII в.) — один из 72 духов','Мильтон «Потерянный Рай» — заместитель Сатаны'],
                    desc:'Изначально — Баал-Зебуб («Повелитель Принца», или «Высокий дом») — филистимский бог Аккарона. В еврейской полемике имя намеренно искажено в «Баал-Зевув» — «повелитель мух». В Новом Завете — синоним сатаны или его заместитель.',
                    significance:'«Вельзевул» — одно из самых используемых имён дьявола в западной литературе. В Средневековье считался повелителем зависти. Мухи — символ разложения и нечистоты.',
                    sources:[{label:'Вельзевул — Dictionnaire Infernal, Collin de Plancy (1863). Bibliothèque nationale de France',url:'https://gallica.bnf.fr/ark:/12148/bpt6k57256b/f1',type:'painting'},{label:'Завещание Соломона (о Вельзевуле) — греческий манускрипт, BNF',url:'https://gallica.bnf.fr/Search?adv=1&q=testament+solomon+manuscript',type:'manuscript'}]
                },
                {
                    id:'nephilim', name:'Нефилим / Стражи', emoji:'⚡',
                    traditions:['Иудаизм','Христианство'],
                    role:'«Бней ха-Элохим» — «сыны Бога». Ангелы, взявшие земных жён.',
                    bible:['Быт 6:1–4 — «сыны Божии увидели дочерей человеческих... и нефилим были на земле»','Числ 13:33 — «мы были в глазах их как кузнечики»','Иуд 1:6 — «ангелы, не сохранившие своего достоинства»'],
                    quran:['Джинны (некоторые традиции) — параллель'],
                    texts:['Книга Еноха I 6–16 — 200 Стражей спускаются на Хермон','«Книга Гигантов» (Кумран) — дети Стражей-гиганты','Юбилеев книга — Стражи посланы обучать людей, но пали'],
                    desc:'Нефилим — загадочнейшее место Библии (Быт 6:1–4). «Бней ха-Элохим» берут в жёны дочерей людских. Книга Еноха развивает эту историю: 200 ангелов под предводительством Шемхазая спустились на гору Хермон, взяли жён и научили людей запретным знаниям. Их дети — великаны-рефаимы.',
                    significance:'Эта история — объяснение происхождения зла в мире перед Потопом. Книга Еноха была канонической для ранних христиан (цитируется в Послании Иуды). Обнаружена в Кумране (7 рукописей). Мотив «падших ангелов» лёг в основу всей западной демонологии.',
                    sources:[{label:'Ари Шеффер «Искушение» (1854) — Walters Art Museum Baltimore',url:'https://art.thewalters.org/detail/2811/the-temptation-of-christ/',type:'painting'},{label:'Книга Еноха (1 Енох 6–16) — British Library Or.509 эфиопская рукопись',url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Or_509',type:'manuscript'},{label:'«Книга Гигантов» (4Q531) о Нефилим — DSS Digital Library',url:'https://www.deadseascrolls.org.il/explore-the-archive/search#q=giants',type:'manuscript'}]
                },
            ];

            // ── JSX рендер ────────────────────────────────────────────────────
            const data = tab === 'angels' ? ANGELS : DEMONS;
            const sel  = selected || data[0];
            const clr  = tab === 'angels'
                ? {main:'#d97706', bg:'#fffbeb', border:'#fde68a', badge:'#fef3c7', txt:'#92400e', dark:'#78350f'}
                : {main:'#dc2626', bg:'#fff1f2', border:'#fca5a5', badge:'#fee2e2', txt:'#7f1d1d', dark:'#450a0a'};

            const analyze = async () => {
                setAiLoad(true); setAiText('');
                const r = await fetchZvenoAIAnalysis(
                    `Проведи академический анализ: "${sel.name}" в контексте мировых религий.
Роль: ${sel.role}
Описание: ${sel.desc}
Традиции: ${sel.traditions.join(', ')}
Значение: ${sel.significance}

Рассмотри: 1) этимологию имени 2) эволюцию образа в разных традициях 3) историческое влияние 4) психологическую и культурную функцию 5) отличия между традициями 6) отражение в искусстве и литературе.`,
                    `${tab==='angels'?'Ангел':'Демон'}: ${sel.name}`, apiKey
                );
                setAiText(r); setAiLoad(false);
            };

            return (
                <div className="fade-in-up space-y-6 pb-20 md:pb-6">

                    {/* ЛАЙТБОКС */}
                    {lightbox && (
                        <div onClick={()=>setLightbox(null)}
                            style={{position:'fixed',inset:0,zIndex:99999,background:'rgba(0,0,0,0.93)',
                                    backdropFilter:'blur(8px)',display:'flex',flexDirection:'column',
                                    alignItems:'center',justifyContent:'center',padding:16}}>
                            <button onClick={()=>setLightbox(null)}
                                style={{position:'absolute',top:16,right:16,width:40,height:40,borderRadius:20,
                                        background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',
                                        color:'#fff',fontSize:18,fontWeight:700,cursor:'pointer',
                                        display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                            <img crossOrigin="anonymous" src={lightbox.src} alt={lightbox.cap||''}
                                onError={e=>{if(!e.target.src.includes('fallback'))e.target.src='https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=70';}} onClick={e=>e.stopPropagation()}
                                style={{maxWidth:'90vw',maxHeight:'78vh',objectFit:'contain',
                                        borderRadius:12,boxShadow:'0 25px 60px rgba(0,0,0,0.8)'}}/>
                            {lightbox.cap && (
                                <p style={{color:'#d6d3d1',fontSize:13,marginTop:12,textAlign:'center',
                                           maxWidth:600,lineHeight:1.5}}>{lightbox.cap}</p>
                            )}
                            <p style={{color:'#78716c',fontSize:11,marginTop:8}}>Нажмите за пределами для закрытия</p>
                        </div>
                    )}

                    {/* ШАПКА */}
                    <div style={{background:'linear-gradient(135deg,#1c1b1d 0%,#2d1a0e 40%,#1a0d1c 100%)'}}
                         className="text-white rounded-3xl p-6 md:p-10">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Шаг 4 · Углублённый анализ</p>
                                <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3">👼 Ангелы и Демоны</h2>
                                <p className="text-stone-400 text-sm md:text-base max-w-2xl">
                                    Священные писания о небесных силах — от Библии и Корана до Книги Еноха и Свитков Мёртвого моря.
                                    Иллюстрации мастеров Возрождения, фото древних рукописей.
                                </p>
                            </div>
                            <span className="text-5xl md:text-6xl hidden sm:block">⚔️</span>
                        </div>
                        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[['Книг Библии','10+','об ангелах'],['Аятов Корана','50+','о небесных силах'],['Архангелов','7','по Книге Еноха'],['Лет традиции','3000+','иудаизм→ислам']].map(([l,v,n])=>(
                                <div key={l} className="bg-white/5 rounded-2xl p-3 text-center">
                                    <div className="text-amber-400 font-bold text-sm">{v}</div>
                                    <div className="text-white font-bold text-xs mt-1">{n}</div>
                                    <div className="text-stone-500 text-[10px] uppercase tracking-widest mt-0.5">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ТАБЫ */}
                    <div className="flex gap-2 bg-stone-100 p-1.5 rounded-2xl">
                        {[['angels','👼 Ангелы','Вестники, стражи, воители'],['demons','👹 Демоны','Падшие, противники, тени']].map(([k,l,s])=>(
                            <button key={k} onClick={()=>{setTab(k);setSelected(null);setAiText('');}}
                                className={`flex-1 py-3 px-4 rounded-xl text-left transition-all ${tab===k?'bg-white shadow-sm':'hover:bg-white/50'}`}>
                                <div className={`font-bold text-sm ${tab===k?'text-stone-900':'text-stone-500'}`}>{l}</div>
                                <div className="text-[10px] text-stone-400 mt-0.5 hidden sm:block">{s}</div>
                            </button>
                        ))}
                    </div>

                    {/* ОСНОВНОЙ КОНТЕНТ */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Список */}
                        <div className="lg:col-span-1 space-y-2">
                            {data.map(item => (
                                <button key={item.id} onClick={()=>{setSelected(item);setAiText('');}}
                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all hover:shadow-md ${sel.id===item.id?'shadow-md':'bg-white'}`}
                                    style={{borderColor:sel.id===item.id?clr.main:'#e7e5e4',
                                            background:sel.id===item.id?clr.bg:'#fff'}}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                                        <div className="min-w-0">
                                            <p className="font-bold text-sm text-stone-900 truncate">{item.name}</p>
                                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide mt-0.5 truncate">{item.traditions.join(' · ')}</p>
                                            <p className="text-xs text-stone-600 mt-1 leading-tight line-clamp-2">{item.role}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Детали */}
                        <div className="lg:col-span-2 space-y-5">
                            {/* Шапка */}
                            <div className="rounded-2xl p-5 border-2" style={{background:clr.bg,borderColor:clr.border}}>
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{sel.emoji}</span>
                                    <div>
                                        <h3 className="font-serif font-bold text-2xl" style={{color:clr.dark}}>{sel.name}</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{color:clr.main}}>{sel.traditions.join(' · ')}</p>
                                        <p className="text-sm mt-2" style={{color:clr.txt}}>{sel.role}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-stone-700 leading-relaxed text-sm">{sel.desc}</p>
                            </div>

                            {/* Источники — ссылки на цифровые архивы */}
                            {sel.sources && sel.sources.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{color:clr.main}}>
                                        📚 Иллюстрации и рукописи — цифровые архивы
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {sel.sources.map((s,si)=>(
                                            <a key={si} href={s.url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-start gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all hover:shadow-md"
                                                style={{background: s.type==='manuscript' ? '#fafaf9' : '#fffbeb',
                                                        borderColor: clr.border, color: clr.dark}}>
                                                <span className="flex-shrink-0 mt-0.5">
                                                    {s.type==='manuscript' ? '📜' : '🖼'}
                                                </span>
                                                <span className="leading-snug flex-1">{s.label}</span>
                                                <span className="flex-shrink-0 opacity-40 text-xs ml-1">↗</span>
                                            </a>
                                        ))}
                                    </div>
                                    <p className="text-[10px] mt-2 opacity-60" style={{color:clr.main}}>
                                        Открываются в новой вкладке — официальные музеи и цифровые библиотеки
                                    </p>
                                </div>
                            )}xt-stone-400 mb-3">🖼 Иллюстрации из мирового искусства</p>
                                    <div className={`grid gap-3 ${sel.images.length===1?'grid-cols-1':'grid-cols-2 md:grid-cols-3'}`}>
                                        {sel.images.map((img,ii)=>(
                                            <div key={ii} className="rounded-xl overflow-hidden cursor-zoom-in relative group shadow-sm"
                                                 style={{aspectRatio:'4/3',background:'#e7e5e4'}}
                                                 onClick={()=>openLightbox(img.src,img.cap)}>
                                                <img loading="lazy" crossOrigin="anonymous" src={img.src} alt={img.cap||''}
                                                    onError={e=>e.target.style.display='none'}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 text-white text-2xl drop-shadow-lg">🔍</span>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                                                    <p className="text-white text-[10px] leading-tight">{img.cap}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Цитаты из Писания */}xt-stone-400 mb-3">📜 Древние рукописи и тексты</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {sel.manuscripts.map((ms,mi)=>(
                                            <div key={mi} className="rounded-xl overflow-hidden cursor-zoom-in relative group shadow-sm border border-stone-200"
                                                 style={{aspectRatio:'4/3',background:'#f5f5f4'}}
                                                 onClick={()=>openLightbox(ms.src,ms.cap)}>
                                                <img loading="lazy" crossOrigin="anonymous" src={ms.src} alt={ms.cap||''}
                                                    onError={e=>e.target.style.display='none'}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 text-white text-2xl drop-shadow-lg">🔍</span>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                                                    <p className="text-white text-[10px] leading-tight">{ms.cap}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Цитаты из Писания */}
                            <div className="grid md:grid-cols-3 gap-3">
                                {[['✝️ Библия', sel.bible, '#fffbeb','#92400e','#fde68a'],
                                  ['☪️ Коран',   sel.quran, '#ecfdf5','#065f46','#6ee7b7'],
                                  ['📜 Тексты',  sel.texts, '#f0f9ff','#0c4a6e','#bae6fd']
                                ].map(([title,verses,bg,col,bdr])=>(
                                    <div key={title} className="rounded-xl p-4 border"
                                         style={{background:bg,borderColor:bdr}}>
                                        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{color:col}}>{title}</p>
                                        <div className="space-y-2">
                                            {(verses||[]).map((v,vi)=>(
                                                <p key={vi} className="text-xs leading-relaxed" style={{color:col}}>— {v}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Значение */}
                            <div className="rounded-xl p-4" style={{background:clr.badge}}>
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{color:clr.main}}>🎓 Историческое значение</p>
                                <p className="text-sm font-bold leading-relaxed" style={{color:clr.dark}}>{sel.significance}</p>
                            </div>

                            {/* AI анализ */}
                            <div className="border-t border-stone-100 pt-4">
                                <button onClick={analyze} disabled={aiLoad}
                                    className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                                    style={{background:aiLoad?'#78716c':clr.main}}>
                                    {aiLoad?<><Icons.Loader c="w-4 h-4"/>Анализирую...</>:<>✨ Глубокий AI-анализ: {sel.name}</>}
                                </button>
                                {aiText && <div className="mt-4 ai-content p-5 bg-stone-50 rounded-2xl border border-stone-200" dangerouslySetInnerHTML={{__html:aiText}}/>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
