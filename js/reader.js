
        // --- МОДУЛЬ ЧТЕНИЯ С ИНТЕГРАЦИЕЙ ZVENO AI ---
        function SingleReaderModule({ type, db, apiKey, setAiModal, loading }) {
            const isBible = type === 'bible';
            const order = isBible ? db.order.bible : db.order.quran;
            
            const [selectedBook, setSelectedBook] = useState(order[0] || "");
            const chaptersObj = isBible && selectedBook ? db.texts.bible[selectedBook] : {};
            const chapters = Object.keys(chaptersObj).sort((a,b)=>Number(a)-Number(b));
            const [selectedChapter, setSelectedChapter] = useState(chapters[0] || "");
            const [fuzzyMode, setFuzzyMode] = useState(false);
            const [lightbox, setLightbox] = useState(null); // {src, label, desc}
            
            // aiModal и setAiModal получены из App (глобальные)

            useEffect(() => {
                if (order.length > 0 && !selectedBook) setSelectedBook(order[0]);
            }, [order, selectedBook]);

            useEffect(() => {
                if (isBible && chapters.length > 0 && !chapters.includes(selectedChapter)) setSelectedChapter(chapters[0]);
            }, [selectedBook, chapters, isBible, selectedChapter]);

            const content = isBible ? (chaptersObj[selectedChapter] || {}) : (db.texts.quran[selectedBook]?.["1"] || {});

            // ── Иллюстрации к книгам Библии и сурам Корана ──────────────────
            const BOOK_SOURCES = {
                'Бытие':     [
                    {label:'Создание Адама — Микеланджело (1512)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/6/6b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg', desc:'Сикстинская капелла. Бытие 2:7 — «И создал Господь Бог человека из праха земного».'},
                    {label:'Кодекс Синайский — страница Бытия (IV в.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/a/a3/Codex_Sinaiticus_Matthew_6_22-7_21.JPG', desc:'Древнейшая полная рукопись Библии ~350 н.э. Хранится в Британском музее. codexsinaiticus.org'},
                ],
                'Исход':     [
                    {label:'Великий Свиток Исайи из Кумрана (125 до н.э.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/e/e4/Great_Isaiah_Scroll.jpg', desc:'Свитки Мёртвого моря — старейшие рукописи Ветхого Завета. deadseascrolls.org.il'},
                    {label:'Моисей со скрижалями — Рембрандт (1659)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/2/2e/Rembrandt_Harmensz._van_Rijn_-_Moses_Breaking_the_Tablets_of_the_Law_-_Google_Art_Project.jpg', desc:'Исход 32:19 — Моисей разбивает скрижали закона, увидев золотого тельца.'},
                ],
                'Псалтирь':  [
                    {label:'Давид, играющий на арфе — Тикхиллская Псалтирь (1310)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/4/42/Tickhill_Psalter%2C_David_Playing_the_Harp.jpg', desc:'Иллюминированная Псалтирь начала XIV в. Британская библиотека, Add MS 42130.'},
                ],
                'Иов':       [
                    {label:'Сатана поражает Иова — Уильям Блейк (1826)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/4/4b/William_Blake_-_Satan_smiting_Job_with_Sore_Boils.jpg', desc:'Иов 2:7 — «И поразил Иов проказою лютою». Серия гравюр Блейка к Книге Иова.'},
                ],
                'Исайя':     [
                    {label:'Великий Свиток Исайи (1QIsa-a) — II в. до н.э.', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/e/e4/Great_Isaiah_Scroll.jpg', desc:'Кумранская рукопись — полный текст Исайи. Старейший известный список пророческой книги. Музей Израиля, Иерусалим.'},
                ],
                'Откровение':[
                    {label:'Четыре всадника — Альбрехт Дюрер (1498)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d3/Durer_Revelation_Four_Riders.jpg', desc:'Откр 6:1–8. Серия гравюр «Апокалипсис» Дюрера — шедевр немецкого Ренессанса.'},
                    {label:'Великий красный дракон — Уильям Блейк (1805)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/3/3e/William_Blake_-_The_Great_Red_Dragon_and_the_Woman_Clothed_with_the_Sun.jpg', desc:'Откр 12:1–4. «И явилось на небе великое знамение: жена, облечённая в солнце».'},
                ],
                'От Иоанна': [
                    {label:'Папирус P52 — старейший фрагмент НЗ (~125 н.э.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/e/e5/P66.jpg', desc:'Папирус Рилэндса (P52) — Иоанн 18:31–33. Библиотека Рилэндса, Манчестер.'},
                ],
                'От Луки':   [
                    {label:'Благовещение — Фра Анджелико (1440)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/4/4b/Fra_Angelico_-_The_Annunciation_%28detail%29_-_WGA00611.jpg', desc:'Лк 1:26–38. «Ангел вошёл к ней и сказал: радуйся, Благодатная!». Музей Сан-Марко, Флоренция.'},
                ],
                'Иезекииль': [
                    {label:'Видение колесницы Иезекииля — Маттеус Мериан (1630)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/9/9b/Ezekiel%27s_vision_by_Matthaeus_Merian.jpg', desc:'Иез 1 — Меркава (Колесница Бога): четыре херувима с ликами льва, быка, человека и орла.'},
                ],
                'Даниил':    [
                    {label:'Даниил во рву со львами — Рубенс (1614)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/8/84/Daniel-in-the-lions-den.jpg', desc:'Дан 6:16–23. «Бог мой послал Ангела Своего и заградил уста львов». Национальная галерея, Вашингтон.'},
                ],
            };
            const SURAH_SOURCES = {
                '1. Аль-Фатиха':  [
                    {label:'Бирмингемский Коран (568–645 н.э.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Birmingham_Quran_manuscript.jpg', desc:'Старейший фрагмент Корана, написан при жизни Пророка. Университет Бирмингема.'},
                ],
                '2. Аль-Бакара':  [
                    {label:'Коран куфическим письмом (VIII–IX вв.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Quran_manuscript.jpg', desc:'Ранняя рукопись на пергаменте. Аят аль-Курси (2:255) — «Аллах — нет божества, кроме Него».'},
                ],
                '12. Йусуф':      [
                    {label:'Юсуф и Зулейха — персидская миниатюра (XVII в.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/a/a3/Yusuf_and_Zulaikha_by_Reza_Abbasi.jpg', desc:'Риза Аббаси (1630). Сура 12 — «Мы расскажем тебе наилучший рассказ».'},
                ],
                '19. Марьям':     [
                    {label:'Бирмингемский Коран — страница с сурой Марьям', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Birmingham_Quran_manuscript.jpg', desc:'Сура 19:16–34 — история Марьям и рождения Исы.'},
                ],
                '36. Йа Син':     [
                    {label:'Рукопись Корана — Ильханат (XIV в.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/0/0a/Quran_manuscript_Ilkhanate.jpg', desc:'Изысканный иллюминированный Коран эпохи монгольского Ильханата. Музей Метрополитен, Нью-Йорк.'},
                ],
                '55. Ар-Рахман':  [
                    {label:'Страница Корана — Северная Африка (IX в.)', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Quran_manuscript.jpg', desc:'«Милостивый» — сура о благодатях Аллаха. Золотая каллиграфия на синем пергаменте.'},
                ],
                '96. Аль-Аляк':   [
                    {label:'Бирмингемский Коран — первое откровение', imgUrl:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Birmingham_Quran_manuscript.jpg', desc:'Аль-Аляк (96:1–5) — первые аяты, открытые Пророку в пещере Хира в 610 г.'},
                ],
            };

            let imgUrl = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=85";
            let imgFallback = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80";
            let imgCap = "Древняя библиотека Эфеса.";
            if (isBible) {
                if(selectedBook === "Бытие" || selectedBook === "Исход") { 
                    imgUrl = "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=900&q=85"; 
                    imgFallback = "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80";
                    imgCap = "Пустынный ландшафт Иудеи"; 
                }
                if(selectedBook === "Псалтирь" || selectedBook === "Притчи") { 
                    imgUrl = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=85"; 
                    imgFallback = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80";
                    imgCap = "Великий Свиток Исайи (Кумранские рукописи, II в. до н.э.)"; 
                }
                if(selectedBook.includes("От") || selectedBook === "Откровение") { 
                    imgUrl = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=85"; 
                    imgFallback = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80";
                    imgCap = "Греческий папирус Нового Завета (III век н.э.)"; 
                }
            } else {
                imgUrl = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=85"; 
                imgFallback = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80";
                imgCap = "Священная Кааба в Мекке";
                if(selectedBook.includes("Аль-Фатиха") || selectedBook.includes("Бакара")) {
                    imgUrl = "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=900&q=85";
                    imgFallback = "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80";
                    imgCap = "Старинный манускрипт Корана с золотой каллиграфией";
                }
            }

            // ФУНКЦИЯ ВЫЗОВА ZVENO AI — открывает глобальную модалку в App
            const handleAiRequest = async (verseId, verseText) => {
                const label = isBible
                    ? `${selectedBook} ${selectedChapter}:${verseId}`
                    : `${selectedBook} · аят ${verseId}`;
                const contextInfo = isBible
                    ? `Библия, книга «${selectedBook}», глава ${selectedChapter}, стих ${verseId}`
                    : `Коран, сура «${selectedBook}», аят ${verseId}`;

                if (!apiKey) {
                    const hint = marked.parse("⚙️ **Укажите API ключ в настройках** (иконка ⚙️ в левом меню).\n\nДля получения ключа: **8-950-827-22-27** (Nikolai Rogozin).");
                    setAiModal({ verseId, verseText, label, isBible, html: hint, loading: false });
                    return;
                }

                // Открываем модалку — loading: true
                setAiModal({ verseId, verseText, label, isBible, html: '', loading: true });

                const aiResult = await fetchZvenoAIAnalysis(verseText, contextInfo, apiKey);
                // Обновляем модалку с результатом
                setAiModal({ verseId, verseText, label, isBible, html: aiResult, loading: false });
            };

            return (
                <>
                {/* Загрузка текстов */}
                {loading && order.length <= 1 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 h-[calc(100vh-6rem)] flex flex-col items-center justify-center gap-4">
                        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"/>
                        <p className="text-stone-500 font-bold text-sm">Загрузка {type === 'bible' ? 'Библии' : 'Корана'}…</p>
                        <p className="text-stone-400 text-xs">Полный текст загружается (~3 МБ)</p>
                    </div>
                )}
                {/* Лайтбокс для иллюстраций */}
                {lightbox && (
                    <div onClick={()=>setLightbox(null)}
                        style={{position:'fixed',inset:0,zIndex:99999,background:'rgba(0,0,0,0.92)',
                                backdropFilter:'blur(8px)',display:'flex',flexDirection:'column',
                                alignItems:'center',justifyContent:'center',padding:16}}>
                        <button onClick={()=>setLightbox(null)}
                            style={{position:'absolute',top:16,right:16,width:40,height:40,
                                    borderRadius:20,background:'rgba(255,255,255,0.15)',border:'none',
                                    color:'#fff',fontSize:20,cursor:'pointer',fontWeight:700}}>✕</button>
                        <img src={lightbox.src} alt={lightbox.label}
                            onClick={e=>e.stopPropagation()}
                            style={{maxWidth:'90vw',maxHeight:'75vh',objectFit:'contain',
                                    borderRadius:12,boxShadow:'0 25px 60px rgba(0,0,0,0.8)'}}/>
                        <div onClick={e=>e.stopPropagation()}
                            style={{marginTop:12,textAlign:'center',maxWidth:600}}>
                            <p style={{color:'#f5f5f4',fontWeight:700,fontSize:14,marginBottom:4}}>{lightbox.label}</p>
                            {lightbox.desc && <p style={{color:'#a8a29e',fontSize:12,lineHeight:1.5}}>{lightbox.desc}</p>}
                        </div>
                        <p style={{color:'#57534e',fontSize:11,marginTop:10}}>Нажмите за пределами для закрытия</p>
                    </div>
                )}
                {(!loading || order.length > 1) && (
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200 h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
                    <div className="bg-white border-b p-4 md:p-6 flex flex-col xl:flex-row gap-4 items-center justify-between border-stone-200 shadow-sm z-10">
                        <div className="flex-1 w-full flex gap-4">
                            <div className="w-full md:w-1/2">
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">{isBible ? 'Книга Библии' : 'Сура Корана'}</label>
                                <select value={selectedBook} onChange={(e) => { setSelectedBook(e.target.value); if (isBible) setSelectedChapter("1"); }} className={`w-full p-3 border border-stone-200 rounded-xl text-sm font-bold bg-stone-50 focus:ring-2 outline-none cursor-pointer transition-all ${isBible ? 'focus:ring-amber-500' : 'focus:ring-emerald-500'}`}>
                                    {order.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            {isBible && (
                                <div className="w-32">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Глава</label>
                                    <select value={selectedChapter} onChange={e=>setSelectedChapter(e.target.value)} className="w-full p-3 border border-stone-200 rounded-xl text-sm font-bold bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer transition-all">
                                        {chapters.map(c => <option key={c} value={c}>Гл {c}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4 items-center w-full xl:w-auto justify-end">
                            <AudioPlayer versesObj={content} theme={isBible ? 'bible' : 'quran'} apiKey={apiKey} />
                        </div>
                    </div>
                    
                    <div className={`flex-1 overflow-y-auto p-8 md:p-16 font-serif leading-loose text-lg ${isBible ? "bg-[#fcfbf9] text-stone-800" : "bg-[#f5fbf8] text-emerald-950"}`}>
                        <div className="max-w-3xl mx-auto">
                            
                            <div className={`mb-12 p-8 rounded-3xl border shadow-sm fade-in-up ${isBible ? 'bg-amber-50/50 border-amber-200' : 'bg-emerald-50/50 border-emerald-200'}`}>
                                <h4 className={`font-sans font-bold text-sm uppercase tracking-widest mb-4 flex items-center ${isBible ? 'text-amber-800' : 'text-emerald-800'}`}>
                                    <Icons.Book c="w-5 h-5 mr-3"/> Академический Контекст
                                </h4>
                                <div className="my-6">
                                    <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden relative shadow-sm border border-stone-200/50 bg-stone-100 flex items-center justify-center">
                                        <img crossOrigin="anonymous" 
                                          src={imgUrl} 
                                          alt="Иллюстрация" 
                                          onError={(e) => { if(e.target.src !== imgFallback) e.target.src = imgFallback; }}
                                          className="object-cover w-full h-full" />
                                    </div>
                                    <p className={`text-[11px] mt-3 text-center uppercase tracking-widest font-bold font-sans ${isBible ? 'text-amber-700' : 'text-emerald-700'}`}>{imgCap}</p>
                                </div>

                                {/* ── Оцифрованные рукописи — ссылки на архивы ────── */}
                                {(() => {
                                    const srcs = isBible
                                        ? (BOOK_SOURCES[selectedBook] || [])
                                        : (SURAH_SOURCES[selectedBook] || []);
                                    if (!srcs.length) return null;
                                    return (
                                        <div className="mt-4">
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isBible?'text-amber-700':'text-emerald-700'}`}>
                                                🖼 Иллюстрации и рукописи
                                            </p>
                                            <div className={`grid gap-2 ${srcs.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                {srcs.map((s,si)=>(
                                                    <div key={si}
                                                        className={`relative rounded-xl overflow-hidden cursor-zoom-in group border ${isBible?'border-amber-100':'border-emerald-100'}`}
                                                        style={{aspectRatio:'4/3',background:'#f5f5f4'}}
                                                        onClick={()=>setLightbox({src:s.imgUrl,label:s.label,desc:s.desc})}>
                                                        <img src={s.imgUrl} alt={s.label}
                                                            onError={e=>e.target.style.display='none'}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                            <span className="opacity-0 group-hover:opacity-100 text-white text-2xl drop-shadow-lg">🔍</span>
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                            <p className="text-white text-[10px] leading-tight font-bold">{s.label}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })()}

                                <div className="mt-6 p-4 bg-white/60 rounded-xl border border-stone-200/50">
                                    <p className="font-sans text-sm md:text-base leading-relaxed text-stone-800">
                                        <strong>Новая функция:</strong> Вы можете запросить глубокий историко-теологический анализ любого стиха у нейросети! Наведите курсор на нужный стих и нажмите кнопку <strong>✨ AI Анализ</strong>.
                                    </p>
                                </div>
                            </div>

                            <h3 className={`font-sans font-bold text-xl uppercase tracking-widest mb-10 pb-6 border-b text-center ${isBible ? 'text-stone-400 border-stone-200' : 'text-emerald-500 border-emerald-200'}`}>
                                {isBible ? `${selectedBook}, Глава ${selectedChapter}` : selectedBook}
                            </h3>
                            
                            {/* СТИХИ */}
                            {Object.entries(content).sort((a,b)=>Number(a[0])-Number(b[0])).map(([v, t]) => (
                                <div key={v} className="mb-3 flex items-start gap-3 group hover:bg-stone-50/80 rounded-xl p-2 transition-all">
                                    <sup className={`text-xs font-sans font-bold mt-2.5 flex-shrink-0 w-5 text-right ${isBible ? 'text-amber-500' : 'text-emerald-500'}`}>{v}</sup>
                                    <span className="flex-1 text-xl leading-relaxed">{t}</span>
                                    <div className="flex-shrink-0 flex gap-1.5 ml-1">
                                        <button
                                            onClick={() => copyToClipboard(t)}
                                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-all"
                                            title="Копировать">
                                            <Icons.Copy c="w-3.5 h-3.5 text-stone-400"/>
                                        </button>
                                        <button
                                            onClick={() => handleAiRequest(v, t)}
                                            className="px-2.5 py-1.5 rounded-lg border font-bold flex items-center gap-1 text-xs transition-all bg-amber-100 hover:bg-amber-400 hover:text-white border-amber-300 text-amber-700"
                                            title="AI Анализ">
                                            <><span>✨</span><span>AI</span></>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </>
            );
        }

        // ─── КАРТА СЛОВОФОРМ (все падежи/формы религиозных имён и понятий) ──────
        // Решает проблему: поиск "Иса" должен находить "Исе", "Ису", "Исой" в Коране
        var WORD_FORMS_MAP = {
            // Имена пророков
            'иса':        ['иса', 'исе', 'ису', 'исы', 'исой', 'исою'],
            'иисус':      ['иисус', 'иисуса', 'иисусу', 'иисусом', 'иисусе'],
            'муса':       ['муса', 'мусе', 'мусу', 'мусы', 'мусой'],
            'моисей':     ['моисей', 'моисея', 'моисею', 'моисеем', 'моисее'],
            'ибрахим':    ['ибрахим', 'ибрахима', 'ибрахиму', 'ибрахимом', 'ибрахиме'],
            'авраам':     ['авраам', 'авраама', 'аврааму', 'авраамом', 'аврааме'],
            'мухаммад':   ['мухаммад', 'мухаммада', 'мухаммаду', 'мухаммадом'],
            'мухаммед':   ['мухаммед', 'мухаммеда', 'мухаммеду', 'мухаммедом', 'мухаммеде'],
            'нух':        ['нух', 'нуха', 'нуху', 'нухом', 'нухе'],
            'ной':        ['ной', 'ноя', 'ною', 'ноем', 'ное'],
            'марьям':     ['марьям', 'марьяме', 'марьяму', 'марьямой'],
            'мария':      ['мария', 'марии', 'марию', 'марией'],
            'давид':      ['давид', 'давида', 'давиду', 'давидом', 'давиде'],
            'дауд':       ['дауд', 'дауда', 'дауду', 'даудом', 'дауде'],
            'соломон':    ['соломон', 'соломона', 'соломону', 'соломоном', 'соломоне'],
            'сулейман':   ['сулейман', 'сулеймана', 'сулейману', 'сулейманом'],
            'адам':       ['адам', 'адама', 'адаму', 'адамом', 'адаме'],
            'иблис':      ['иблис', 'иблиса', 'иблису', 'иблисом', 'иблисе'],
            'сатана':     ['сатана', 'сатаны', 'сатане', 'сатану', 'сатаной'],
            'ангел':      ['ангел', 'ангела', 'ангелу', 'ангелом', 'ангеле', 'ангелы', 'ангелов', 'ангелам'],
            'малак':      ['малак', 'малака', 'малаку', 'малаком'],
            // Имена Бога
            'аллах':      ['аллах', 'аллаха', 'аллаху', 'аллахом', 'аллахе'],
            'господь':    ['господь', 'господа', 'господу', 'господом', 'господе', 'господи'],
            'яхве':       ['яхве'],
            'иегова':     ['иегова', 'иеговы', 'иегове', 'иегову', 'иеговой'],
            'всевышний':  ['всевышний', 'всевышнего', 'всевышнему', 'всевышнем', 'всевышним'],
            'творец':     ['творец', 'творца', 'творцу', 'творцом', 'творце'],
            // Концепции
            'мессия':     ['мессия', 'мессии', 'мессию', 'мессией'],
            'христос':    ['христос', 'христа', 'христу', 'христом', 'христе'],
            'пророк':     ['пророк', 'пророка', 'пророку', 'пророком', 'пророке', 'пророки', 'пророков', 'пророкам'],
            'посланник':  ['посланник', 'посланника', 'посланнику', 'посланником', 'посланники', 'посланников'],
            'душа':       ['душа', 'души', 'душе', 'душу', 'душой', 'душ', 'душам', 'душами'],
            'дух':        ['дух', 'духа', 'духу', 'духом', 'духе', 'духи', 'духов'],
            'вера':       ['вера', 'веры', 'вере', 'веру', 'верой', 'верою'],
            'молитва':    ['молитва', 'молитвы', 'молитве', 'молитву', 'молитвой', 'молитв', 'молитвах'],
            'грех':       ['грех', 'греха', 'греху', 'грехом', 'грехе', 'грехи', 'грехов', 'грехам'],
            'рай':        ['рай', 'рая', 'раю', 'раем'],
            'ад':         ['ад', 'ада', 'аду', 'адом', 'аде'],
            'джанна':     ['джанна', 'джанны', 'джанне', 'джанну', 'джанной'],
            'джаханнам':  ['джаханнам', 'джаханнама', 'джаханнаму', 'джаханнамом'],
            'свет':       ['свет', 'света', 'свету', 'светом', 'свете'],
            'тьма':       ['тьма', 'тьмы', 'тьме', 'тьму', 'тьмой'],
            'любовь':     ['любовь', 'любви', 'любовью'],
            'милосердие': ['милосердие', 'милосердия', 'милосердию', 'милосердием'],
            'мир':        ['мир', 'мира', 'миру', 'миром', 'мире'],
            'истина':     ['истина', 'истины', 'истине', 'истину', 'истиной', 'истин'],
            'путь':       ['путь', 'пути', 'путём', 'путем', 'путях', 'путям'],
            'бог':        ['бог', 'бога', 'богу', 'богом', 'боге', 'боги', 'богов', 'богам'],
            'закон':      ['закон', 'закона', 'закону', 'законом', 'законе', 'законы', 'законов'],
            'слово':      ['слово', 'слова', 'слову', 'словом', 'слове', 'слова', 'словам'],
            'царство':    ['царство', 'царства', 'царству', 'царством', 'царстве'],
            'жизнь':      ['жизнь', 'жизни', 'жизнью'],
            'смерть':     ['смерть', 'смерти', 'смертью'],
            'воскресение':['воскресение', 'воскресения', 'воскресению', 'воскресением'],
            'мудрость':   ['мудрость', 'мудрости', 'мудростью'],
            'карма':      ['карма', 'кармы', 'карме', 'карму', 'кармой'],
            'нирвана':    ['нирвана', 'нирваны', 'нирване', 'нирвану', 'нирваной'],
            'дхарма':     ['дхарма', 'дхармы', 'дхарме', 'дхарму', 'дхармой'],
            'дао':        ['дао'],
        };

        // ─── ТАБЛИЦА СИНОНИМОВ ─────────────────────────────────────────────────
        var SEARCH_SYNONYMS = {
            'иисус':    ['иса', 'исус', 'христос', 'мессия', 'сын божий', 'назарянин'],
            'иса':      ['иисус', 'исус', 'мессия', 'христос'],
            'христос':  ['иисус', 'иса', 'мессия'],
            'мессия':   ['иисус', 'иса', 'христос', 'спаситель'],
            'бог':      ['аллах', 'господь', 'всевышний', 'творец', 'яхве', 'иегова', 'брахман', 'ахура', 'небо'],
            'аллах':    ['бог', 'господь', 'всевышний', 'творец', 'создатель'],
            'господь':  ['бог', 'аллах', 'всевышний', 'отец', 'творец'],
            'молитва':  ['намаз', 'дуа', 'медитация', 'поклонение', 'просьба', 'моление'],
            'намаз':    ['молитва', 'поклонение', 'служение'],
            'рай':      ['джанна', 'небеса', 'нирвана', 'эдем', 'сад'],
            'ад':       ['джаханнам', 'геенна', 'нарака', 'тьма', 'огонь'],
            'нирвана':  ['освобождение', 'покой', 'рай', 'спасение'],
            'душа':     ['дух', 'нафс', 'атман', 'сознание', 'жизнь'],
            'дух':      ['душа', 'святой дух', 'нафс', 'рух', 'дыхание'],
            'свет':     ['нур', 'просветление', 'огонь', 'истина', 'солнце'],
            'тьма':     ['мрак', 'ночь', 'ад', 'незнание', 'грех'],
            'любовь':   ['милосердие', 'сострадание', 'рахма', 'каруна', 'добродетель'],
            'милосердие':['любовь', 'сострадание', 'рахма', 'доброта'],
            'пророк':   ['посланник', 'наби', 'расул', 'мудрец', 'учитель'],
            'посланник':['пророк', 'наби', 'расул', 'апостол'],
            'грех':     ['проступок', 'нечестие', 'беззаконие', 'карма', 'вина'],
            'мир':      ['салям', 'шалом', 'шанти', 'покой', 'тишина'],
            'вера':     ['иман', 'дхарма', 'учение', 'путь', 'истина', 'доверие'],
            'истина':   ['правда', 'хакк', 'дхарма', 'дао', 'закон'],
            'смерть':   ['конец', 'уход', 'нирвана', 'переход', 'вечность'],
            'воскресение':['воскрешение', 'возрождение', 'перерождение', 'вечная жизнь'],
            'ангел':    ['малак', 'посланник', 'дух', 'небесный'],
            'сатана':   ['иблис', 'дьявол', 'враг', 'злой', 'нечистый'],
            'иблис':    ['сатана', 'дьявол', 'враг'],
            'закон':    ['тора', 'шариат', 'дхарма', 'путь', 'заповедь'],
            'заповедь': ['закон', 'путь', 'правило', 'воля'],
            'создатель':['бог', 'творец', 'аллах', 'господь'],
            'мудрость': ['знание', 'истина', 'дхарма', 'дао', 'разум'],
            'путь':     ['дао', 'дхарма', 'закон', 'истина', 'правда'],
            'дао':      ['путь', 'истина', 'закон', 'природа'],
            'карма':    ['судьба', 'деяние', 'воздаяние', 'грех', 'плод'],
            'нищий':    ['бедный', 'смиренный', 'убогий'],
            'царство':  ['небеса', 'рай', 'власть', 'господство'],
            'мухаммед': ['пророк', 'посланник', 'расул'],
            'моисей':   ['муса', 'пророк'],
            'муса':     ['моисей', 'пророк'],
            'авраам':   ['ибрахим', 'праотец', 'пророк'],
            'ибрахим':  ['авраам', 'праотец', 'пророк'],
            'мария':    ['марьям', 'дева'],
            'марьям':   ['мария', 'дева'],
            'давид':    ['дауд', 'царь', 'пророк'],
            'дауд':     ['давид', 'царь', 'пророк'],
            'соломон':  ['сулейман', 'мудрец', 'царь'],
            'сулейман': ['соломон', 'мудрец', 'царь'],
        };

        // Допустимые падежные окончания русских слов (чтобы не ловить "иса" в "Исаак")
        var RU_CASE_ENDINGS = new Set([
            '', 'а', 'е', 'ё', 'и', 'й', 'о', 'у', 'ы', 'ю', 'я',
            'ов', 'ев', 'ей', 'ой', 'ою', 'ам', 'ах', 'ею', 'ью', 'ию',
            'ого', 'ому', 'ому', 'ами', 'ях', 'ием', 'ий', 'ию',
            'ый', 'ые', 'ым', 'ом', 'ую', 'яя', 'не', 'ни', 'ну',
        ]);

        function expandQuery(q) {
            const qL = q.toLowerCase().trim();
            const all = new Set();

            // Шаг 1: Все падежные формы самого запроса
            if (WORD_FORMS_MAP[qL]) {
                WORD_FORMS_MAP[qL].forEach(f => all.add(f));
            } else {
                all.add(qL);
                // Проверяем: может быть пользователь ввёл уже склонённую форму
                // Например, "Исе" → находим базовую форму "иса" и добавляем все её формы
                for (const [base, forms] of Object.entries(WORD_FORMS_MAP)) {
                    if (forms.includes(qL) && base !== qL) {
                        forms.forEach(f => all.add(f));
                        break;
                    }
                }
            }

            // Шаг 2: Синонимы из таблицы + их падежные формы
            if (SEARCH_SYNONYMS[qL]) {
                SEARCH_SYNONYMS[qL].forEach(syn => {
                    if (WORD_FORMS_MAP[syn]) {
                        WORD_FORMS_MAP[syn].forEach(f => all.add(f));
                    } else {
                        all.add(syn);
                    }
                });
            }
            // Если запрос — синоним другого ключа, тоже ищем его формы
            for (const [key, syns] of Object.entries(SEARCH_SYNONYMS)) {
                if (syns.includes(qL)) {
                    if (WORD_FORMS_MAP[key]) {
                        WORD_FORMS_MAP[key].forEach(f => all.add(f));
                    } else {
                        all.add(key);
                    }
                }
            }

            return Array.from(all);
        }

        function matchesAny(text, terms) {
            if (!text || typeof text !== 'string') return { matched: false, term: null };
            const tL = text.toLowerCase();

            for (const term of terms) {
                let pos = 0;
                while (pos <= tL.length - term.length) {
                    const idx = tL.indexOf(term, pos);
                    if (idx === -1) break;

                    // 1. Предыдущий символ не должен быть кириллической буквой
                    //    (термин должен начинать слово)
                    const prevChar = idx > 0 ? tL[idx - 1] : '';
                    if (/[\u0400-\u04FF]/.test(prevChar)) {
                        pos = idx + 1;
                        continue;
                    }

                    // 2. После термина находим всё слово до первого не-кириллического символа
                    const afterStart = idx + term.length;
                    let wordEnd = afterStart;
                    while (wordEnd < tL.length && /[\u0400-\u04FF]/.test(tL[wordEnd])) {
                        wordEnd++;
                    }
                    const suffix = tL.substring(afterStart, wordEnd);

                    // 3. Суффикс должен быть допустимым падежным окончанием
                    if (RU_CASE_ENDINGS.has(suffix)) {
                        return { matched: true, term };
                    }

                    pos = idx + 1;
                }
            }
            return { matched: false, term: null };
        }


        // --- ГЛОБАЛЬНЫЙ ПОИСК ---
        function SearchModule({ db }) {
            const [query, setQuery] = useState('');
            const [results, setResults] = useState({});
            const [searching, setSearching] = useState(false);
            const [hasSearched, setHasSearched] = useState(false);
            const [expandedTerms, setExpandedTerms] = useState([]);
            const [fuzzyMode, setFuzzyMode] = useState(false);


            const PAIRS = [
                ['bible',        'quran'],
                ['buddhism',     'hinduism'],
                ['taoism',       'zoroastrism'],
                ['confucianism', 'sikhism'],
                ['shinto',       null],
            ];

            const REL_META = {
                bible:        { label:'✝️ Библия',        color:'#92400e', bg:'#fffbeb', border:'#fde68a',   badge:'#fef3c7' },
                quran:        { label:'☪️ Коран',           color:'#065f46', bg:'#ecfdf5', border:'#6ee7b7',   badge:'#d1fae5' },
                buddhism:     { label:'☸️ Дхаммапада',     color:'#713f12', bg:'#fefce8', border:'#fde047',   badge:'#fef9c3' },
                hinduism:     { label:'🕉️ Бхагавад-гита',  color:'#7c2d12', bg:'#fff7ed', border:'#fdba74',   badge:'#ffedd5' },
                taoism:       { label:'☯️ Дао Дэ Цзин',    color:'#1c1917', bg:'#f5f5f4', border:'#d6d3d1',   badge:'#e7e5e4' },
                zoroastrism:  { label:'🔥 Авеста',          color:'#7f1d1d', bg:'#fff1f2', border:'#fca5a5',   badge:'#fee2e2' },
                confucianism: { label:'🏮 Лунь Юй',         color:'#881337', bg:'#fff1f3', border:'#fda4af',   badge:'#ffe4e6' },
                sikhism:      { label:'🪯 Гуру Грантх',     color:'#4a044e', bg:'#faf5ff', border:'#d8b4fe',   badge:'#ede9fe' },
                shinto:       { label:'⛩️ Кодзики',         color:'#500724', bg:'#fdf2f8', border:'#f0abfc',   badge:'#fae8ff' },
            };

            const doSearch = () => {
                if (!query || query.trim().length < 2) return;
                // Всегда используем expandQuery для синонимов между религиями
                // fuzzyMode=true также добавляет падежные формы через WORD_FORMS_MAP
                const terms = expandQuery(query);
                setExpandedTerms(terms);
                setSearching(true); setHasSearched(true);
                setTimeout(() => {
                    const res = {};
                    // Библия
                    res.bible = [];
                    (db.order.bible || []).forEach(book => {
                        const chapters = db.texts.bible[book]; if (!chapters) return;
                        Object.keys(chapters).forEach(chap => {
                            const verses = chapters[chap]; if (!verses) return;
                            Object.entries(verses).forEach(([vNum, text]) => {
                                const m = matchesAny(text, terms);
                                if (m.matched) res.bible.push({ book, chap, vNum, text, term: m.term });
                            });
                        });
                    });
                    res.bible = res.bible.slice(0, 150);

                    // Коран
                    res.quran = [];
                    (db.order.quran || []).forEach(surah => {
                        const ayahs = db.texts.quran[surah]?.['1']; if (!ayahs) return;
                        Object.entries(ayahs).forEach(([aNum, text]) => {
                            const m = matchesAny(text, terms);
                            if (m.matched) res.quran.push({ surah, aNum, text, term: m.term });
                        });
                    });
                    res.quran = res.quran.slice(0, 150);

                    // Остальные религии
                    ['buddhism','hinduism','taoism','zoroastrism','confucianism','sikhism','shinto'].forEach(relId => {
                        res[relId] = [];
                        try {
                            const relData = RELIGION_TEXTS[relId];
                            if (relData && relData.sections) {
                                relData.sections.forEach(sec => {
                                    Object.entries(sec.verses || {}).forEach(([vn, vt]) => {
                                        const m = matchesAny(vt, terms);
                                        if (m.matched) res[relId].push({ ref: sec.title + ', ст.' + vn, text: vt, term: m.term });
                                    });
                                });
                            }
                        } catch(e) {}
                        res[relId] = res[relId].slice(0, 100);
                    });

                    setResults(res);
                    setSearching(false);
                }, 30);
            };

            const highlight = (text, terms) => {
                if (!text || !terms || !terms.length) return text;
                try {
                    // Строим паттерн с учётом словесных границ (кириллика)
                    // Каждый термин должен начинаться на границе слова
                    // и заканчиваться паддежным окончанием (0-3 символа) + граница
                    const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
                    // Паттерн: начало слова (не кириллица или начало строки) + термин + необязательное окончание
                    const endings = '(?:[аеёийоуыюяьАЕЁИЙОУЫЮЯЬ][а-яёА-ЯЁ]{0,2})?';
                    const pattern = '(?<![а-яёА-ЯЁ])(' + escaped.join('|') + endings + ')(?![а-яёА-ЯЁ])';
                    const parts = text.split(new RegExp(pattern, 'gi'));
                    const termSet = new Set(terms.map(t => t.toLowerCase()));
                    return parts.map((p, i) => {
                        if (!p) return null;
                        const pL = p.toLowerCase();
                        const isMatch = terms.some(t => pL.startsWith(t.toLowerCase()) && RU_CASE_ENDINGS.has(pL.slice(t.length)));
                        return isMatch
                            ? <mark key={i} style={{background:'#fde68a', color:'#92400e', fontWeight:700, padding:'0 2px', borderRadius:3}}>{p}</mark>
                            : p;
                    }).filter(Boolean);
                } catch { return text; }
            };

            const total = Object.values(results).reduce((s, a) => s + (a?.length||0), 0);
            const foundCount = Object.values(results).filter(a => a?.length > 0).length;

            // Рендер колонки одной религии
            const renderCol = (key) => {
                if (!key) return <div key="empty" style={{flex:1}}/>;
                const arr = results[key] || [];
                const meta = REL_META[key];
                const hasResults = arr.length > 0;
                return (
                    <div key={key} style={{flex:1, display:'flex', flexDirection:'column', minWidth:0,
                                           background:hasResults ? meta.bg : '#fafaf9',
                                           border:'1px solid ' + (hasResults ? meta.border : '#e7e5e4'),
                                           borderRadius:16, overflow:'hidden'}}>
                        {/* Заголовок колонки */}
                        <div style={{padding:'10px 14px', borderBottom:'1px solid ' + (hasResults ? meta.border : '#e7e5e4'),
                                     display:'flex', alignItems:'center', justifyContent:'space-between',
                                     background: hasResults ? meta.badge : '#f5f5f4', flexShrink:0}}>
                            <span style={{fontFamily:'sans-serif', fontWeight:700, fontSize:12,
                                          textTransform:'uppercase', letterSpacing:'0.08em',
                                          color: hasResults ? meta.color : '#a8a29e'}}>
                                {meta.label}
                            </span>
                            {hasSearched && (
                                <span style={{fontFamily:'sans-serif', fontSize:11, fontWeight:700,
                                              color: hasResults ? meta.color : '#a8a29e',
                                              background: hasResults ? meta.bg : '#e7e5e4',
                                              padding:'2px 8px', borderRadius:20,
                                              border:'1px solid ' + (hasResults ? meta.border : '#d6d3d1')}}>
                                    {hasResults ? 'НАЙДЕНО: ' + arr.length : 'НЕТ'}
                                </span>
                            )}
                        </div>
                        {/* Результаты */}
                        <div style={{flex:1, overflowY:'auto', padding: hasResults ? '10px 12px' : '24px 12px',
                                     display:'flex', flexDirection:'column', gap:8}}>
                            {!hasSearched ? null : !hasResults ? (
                                <div style={{textAlign:'center', color:'#a8a29e', fontSize:12, padding:'12px 0'}}>
                                    Совпадений не найдено
                                </div>
                            ) : arr.map((r, i) => (
                                <div key={i} style={{padding:'8px 10px', background:'rgba(255,255,255,0.7)',
                                                     border:'1px solid ' + meta.border, borderRadius:10}}>
                                    <div style={{fontFamily:'sans-serif', fontSize:10, fontWeight:700,
                                                 textTransform:'uppercase', letterSpacing:'0.07em',
                                                 color:'#78716c', marginBottom:5}}>
                                        {key==='bible'
                                            ? r.book + ', Гл ' + r.chap + ' · Ст ' + r.vNum
                                            : key==='quran'
                                                ? r.surah + ' · Аят ' + r.aNum
                                                : r.ref}
                                    </div>
                                    <div style={{fontFamily:'Georgia,serif', fontSize:13, lineHeight:1.65,
                                                 color: meta.color}}>
                                        {highlight(r.text, expandedTerms)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            };

            return (
                <div style={{background:'#fff', borderRadius:24, border:'1px solid #e7e5e4',
                             boxShadow:'0 1px 4px rgba(0,0,0,.06)',
                             height:'calc(100vh - 6rem)', display:'flex', flexDirection:'column', overflow:'hidden'}}>

                    {/* ШАПКА */}
                    <div style={{flexShrink:0, padding:'16px 24px', borderBottom:'1px solid #e7e5e4',
                                 background:'#f9f8f6', display:'flex', flexDirection:'column', gap:12}}>
                        <h2 style={{fontFamily:'Georgia,serif', fontWeight:700, fontSize:22, color:'#1c1917',
                                    margin:0, display:'flex', alignItems:'center', gap:8}}>
                            <span style={{color:'#d97706'}}>🔍</span> Глобальный поиск по текстам
                        </h2>

                        {/* Поисковая строка */}
                        <div style={{display:'flex', gap:8}}>
                            <input
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && doSearch()}
                                placeholder="Слово или имя: Иисус, Аллах, любовь, душа, путь..."
                                style={{flex:1, padding:'12px 16px', border:'1.5px solid #d6d3d1',
                                        borderRadius:14, fontFamily:'sans-serif', fontSize:14,
                                        outline:'none', background:'#fff', color:'#1c1917'}}
                            />
                            <button onClick={doSearch} disabled={searching || query.trim().length < 2}
                                style={{padding:'12px 28px', background: searching ? '#78716c' : '#1c1917',
                                        color:'#fff', border:'none', borderRadius:14,
                                        fontFamily:'sans-serif', fontWeight:700, fontSize:14,
                                        cursor: query.trim().length < 2 ? 'not-allowed' : 'pointer',
                                        opacity: query.trim().length < 2 ? 0.5 : 1, transition:'all .15s'}}>
                                {searching ? '⟳ Поиск...' : 'Найти'}
                            </button>
                        </div>

                        {/* Чекпоинт: Похожие слова */}
                        <label style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer', userSelect:'none'}}>
                            <input type="checkbox" checked={fuzzyMode} onChange={e=>setFuzzyMode(e.target.checked)}
                                style={{width:15, height:15, accentColor:'#d97706', cursor:'pointer'}}/>
                            <span style={{fontFamily:'sans-serif', fontSize:12, color:'#57534e', fontWeight:600}}>
                                Расширенный поиск
                                <span style={{color:'#a8a29e', fontWeight:400, marginLeft:4}}>
                                    (падежные формы: «свет» → «света», «светом», «световой»)
                                </span>
                            </span>
                        </label>

                        {/* Статус */}
                        {hasSearched && !searching && (
                            <div style={{display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'}}>
                                <span style={{fontFamily:'sans-serif', fontSize:12, fontWeight:700,
                                              color: total > 0 ? '#059669' : '#dc2626'}}>
                                    {total > 0
                                        ? '✅ Найдено ' + total + ' совпадений в ' + foundCount + ' из 9 источников'
                                        : '❌ Ничего не найдено'}
                                </span>
                                {expandedTerms.length > 1 && (
                                    <span style={{fontFamily:'sans-serif', fontSize:11, color:'#78716c'}}>
                                        Искали: {expandedTerms.slice(0,8).map((t,i) => (
                                            <span key={i} style={{background:'#fef3c7', color:'#92400e',
                                                padding:'1px 5px', borderRadius:4, margin:'0 2px',
                                                fontWeight:700}}>{t}</span>
                                        ))}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* РЕЗУЛЬТАТЫ — двухколоночная сетка */}
                    <div style={{flex:1, overflowY:'auto', padding:'14px 16px', background:'#f5f4f0'}}>
                        {!hasSearched ? (
                            <div style={{textAlign:'center', padding:'60px 0', color:'#a8a29e'}}>
                                <div style={{fontSize:48, marginBottom:12}}>🌍</div>
                                <div style={{fontFamily:'Georgia,serif', fontSize:20, color:'#78716c', marginBottom:8}}>
                                    Поиск по всем священным текстам
                                </div>
                                <div style={{fontSize:13}}>
                                    Библия · Коран · Дхаммапада · Бхагавад-гита · Дао Дэ Цзин · Авеста · Лунь Юй · Гуру Грантх · Кодзики
                                </div>
                                <div style={{marginTop:16, fontSize:12, color:'#d97706', fontWeight:700}}>
                                    🔗 Умный поиск: «Иисус» найдёт «Иса» в Коране, «Бог» — «Аллах», «Господь», «Брахман» и др.
                                </div>
                            </div>
                        ) : (
                            <div style={{display:'flex', flexDirection:'column', gap:12}}>
                                {PAIRS.map((pair, pi) => (
                                    <div key={pi} style={{display:'flex', gap:12, alignItems:'stretch', minHeight:200}}>
                                        {renderCol(pair[0])}
                                        {renderCol(pair[1])}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Параллельное чтение
        function ParallelReaderModule({ db }) {
            const [bBook, setBBook] = useState(db.order.bible[0] || "");
            const bChaps = bBook ? Object.keys(db.texts.bible[bBook]).sort((a,b)=>Number(a)-Number(b)) : [];
            const [bChap, setBChap] = useState(bChaps[0] || "");
            const [qSurah, setQSurah] = useState(db.order.quran[0] || "");

            useEffect(() => { 
                if(!bBook) setBBook(db.order.bible[0]); 
                if(!qSurah) setQSurah(db.order.quran[0]); 
            }, [db.order, bBook, qSurah]);

            return (
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200 h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
                    <div className="bg-white border-b p-4 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-stone-200 shadow-sm z-10 gap-4 md:gap-0">
                        <div className="md:pr-4 space-y-2 p-2">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Библия</label>
                            <div className="flex gap-2">
                                <select value={bBook} onChange={e=>{setBBook(e.target.value); setBChap("1");}} className="flex-1 p-3 border border-stone-200 rounded-xl text-sm font-bold bg-stone-50 outline-none cursor-pointer focus:ring-2 focus:ring-amber-500 transition-all">
                                    {db.order.bible.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <select value={bChap} onChange={e=>setBChap(e.target.value)} className="w-24 p-3 border border-stone-200 rounded-xl text-sm font-bold bg-stone-50 outline-none cursor-pointer focus:ring-2 focus:ring-amber-500 transition-all">
                                    {bChaps.map(c => <option key={c} value={c}>Гл {c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="md:pl-4 space-y-2 p-2">
                            <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Коран</label>
                            <select value={qSurah} onChange={e=>setQSurah(e.target.value)} className="w-full p-3 border border-emerald-100 rounded-xl text-sm font-bold bg-emerald-50/50 outline-none text-emerald-900 cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all">
                                {db.order.quran.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-stone-200">
                        <div className="flex-1 p-8 md:p-10 font-serif leading-loose text-lg text-stone-800 bg-[#fdfbf7]">
                            <h3 className="text-stone-400 font-sans font-bold text-xs uppercase mb-8 pb-4 border-b border-stone-200">{bBook}, Глава {bChap}</h3>
                            {Object.entries(db.texts.bible[bBook]?.[bChap] || {}).sort((a,b)=>Number(a[0])-Number(b[0])).map(([v, t]) => (
                                <div key={v} className="mb-6 group relative pr-8">
                                    <sup className="text-[10px] font-sans font-bold text-amber-600 mr-3">{v}</sup>{t}
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 p-8 md:p-10 font-serif leading-loose text-lg text-emerald-900 bg-[#f4faf7]">
                            <h3 className="text-emerald-500 font-sans font-bold text-xs uppercase mb-8 pb-4 border-b border-emerald-200">{qSurah}</h3>
                            {Object.entries(db.texts.quran[qSurah]?.["1"] || {}).sort((a,b)=>Number(a[0])-Number(b[0])).map(([v, t]) => (
                                <div key={v} className="mb-6 group relative pr-8">
                                    <sup className="text-[10px] font-sans font-bold text-emerald-600 mr-3">{v}</sup>{t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}
            );
        }
