
        // --- МОДУЛЬ ЧТЕНИЯ С ИНТЕГРАЦИЕЙ ZVENO AI ---
        function SingleReaderModule({ type, db, apiKey, setAiModal }) {
            const isBible = type === 'bible';
            const order = isBible ? db.order.bible : db.order.quran;
            
            const [selectedBook, setSelectedBook] = useState(order[0] || "");
            const chaptersObj = isBible && selectedBook ? db.texts.bible[selectedBook] : {};
            const chapters = Object.keys(chaptersObj).sort((a,b)=>Number(a)-Number(b));
            const [selectedChapter, setSelectedChapter] = useState(chapters[0] || "");
            
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
                'Бытие':     [{label:'Синайский кодекс (Бытие) — codexsinaiticus.org', url:'https://codexsinaiticus.org/en/manuscript.aspx'},
                              {label:'Свитки Мёртвого моря — deadseascrolls.org.il', url:'https://www.deadseascrolls.org.il/'}],
                'Исход':     [{label:'Свитки Мёртвого моря — Исход', url:'https://www.deadseascrolls.org.il/'},
                              {label:'Синайский кодекс — полный текст', url:'https://codexsinaiticus.org/en/manuscript.aspx'}],
                'Псалтирь':  [{label:'Великий Свиток Исайи (DSS) — deadseascrolls.org.il', url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/1QIsa-a-1'},
                              {label:'Псалтирь — British Library Add MS 42130', url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Add_MS_42130'}],
                'Иов':       [{label:'Книга Иова (4Q99) — Dead Sea Scrolls Digital Library', url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/4Q99-1'},
                              {label:'Иов — Ватиканский кодекс digi.vatlib.it', url:'https://digi.vatlib.it/mss/Vat.gr.1209'}],
                'Исайя':     [{label:'Великий Свиток Исайи (1QIsa-a) — DSS Digital Library', url:'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/1QIsa-a-1'},
                              {label:'Исайя — Синайский кодекс', url:'https://codexsinaiticus.org/en/manuscript.aspx?book=45'}],
                'Откровение':[{label:'Апокалипсис — Ватиканский кодекс Vat.gr.1209', url:'https://digi.vatlib.it/mss/Vat.gr.1209'},
                              {label:'Линдисфарнское Евангелие — British Library', url:'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Cotton_MS_Nero_D_IV'}],
                'От Иоанна': [{label:'Папирус P66 (200 н.э.) — csntm.org', url:'https://www.csntm.org/manuscript/view/ga_p66'},
                              {label:'Папирус P52 (125 н.э.) — старейший фрагмент НЗ', url:'https://www.csntm.org/manuscript/view/ga_p52'}],
                'От Луки':   [{label:'Синайский кодекс — Лука codexsinaiticus.org', url:'https://codexsinaiticus.org/en/manuscript.aspx?book=51'}],
                'Иезекииль': [{label:'Иезекиль (4Q73) — Dead Sea Scrolls Digital Library', url:'https://www.deadseascrolls.org.il/explore-the-archive/search#q=ezekiel'}],
                'Даниил':    [{label:'Даниил (4Q112) — Dead Sea Scrolls Digital Library', url:'https://www.deadseascrolls.org.il/explore-the-archive/search#q=daniel'}],
            };
            const SURAH_SOURCES = {
                '1. Аль-Фатиха':  [{label:'Бирмингемский Коран (568–645 н.э.) — University of Birmingham', url:'https://www.birmingham.ac.uk/facilities/cadbury/collections/birmingham-quran-manuscript'},
                                   {label:'Рукопись Топкапы — topkapisarayi.gov.tr', url:'https://topkapisarayi.gov.tr/en/content/topkapi-palace-museum-library'}],
                '2. Аль-Бакара':  [{label:'Аят аль-Курси — Islamic Manuscript Association', url:'https://www.islamicmanuscript.org/'},
                                   {label:'Ранний куфический Коран — Khalili Collection', url:'https://khalilicollections.org/collections/the-arts-of-the-islamic-world/'}],
                '12. Йусуф':      [{label:'Иллюминированный Коран XIV в. — Chester Beatty Library', url:'https://viewer.cbl.ie/viewer/object/Is_1431/1/'},
                                   {label:'Коран Ильханата (XIV в.) — Metropolitan Museum', url:'https://www.metmuseum.org/art/the-collection/search?q=quran+manuscript'}],
                '19. Марьям':     [{label:'Бирмингемский Коран (Марьям) — University of Birmingham', url:'https://www.birmingham.ac.uk/facilities/cadbury/collections/birmingham-quran-manuscript'}],
                '36. Йа Син':     [{label:'Сура Йа Син — Chester Beatty Library', url:'https://viewer.cbl.ie/viewer/object/Is_1431/1/'}],
                '55. Ар-Рахман':  [{label:'Ар-Рахман — Corpus Coranicum corpuscoranicum.de', url:'https://corpuscoranicum.de/'}],
                '96. Аль-Аляк':   [{label:'Первое откровение — Корпус Коранических рукописей', url:'https://corpuscoranicum.de/'}],
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
                {/* Модальное окно для источников рукописей */}
                {srcModal && (
                    <div onClick={()=>setSrcModal(null)}
                        style={{position:'fixed',inset:0,zIndex:99999,background:'rgba(0,0,0,0.75)',
                                backdropFilter:'blur(6px)',display:'flex',alignItems:'center',
                                justifyContent:'center',padding:16}}>
                        <div onClick={e=>e.stopPropagation()}
                            style={{background:'#fff',borderRadius:20,padding:28,maxWidth:480,
                                    width:'100%',boxShadow:'0 25px 60px rgba(0,0,0,0.5)'}}>
                            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
                                <div style={{display:'flex',alignItems:'center',gap:10}}>
                                    <span style={{fontSize:24}}>📜</span>
                                    <p style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:16,
                                               color:'#1c1917',margin:0,lineHeight:1.3}}>{srcModal.label}</p>
                                </div>
                                <button onClick={()=>setSrcModal(null)}
                                    style={{width:32,height:32,borderRadius:16,border:'1px solid #e7e5e4',
                                            background:'#f5f5f4',cursor:'pointer',fontSize:16,fontWeight:700,
                                            display:'flex',alignItems:'center',justifyContent:'center',
                                            flexShrink:0,marginLeft:8}}>✕</button>
                            </div>
                            <p style={{fontSize:12,color:'#78716c',marginBottom:20,lineHeight:1.5}}>
                                Это оцифрованная рукопись в официальном хранилище. Открывается в новой вкладке.
                            </p>
                            <a href={srcModal.url} target="_blank" rel="noopener noreferrer"
                                onClick={()=>setSrcModal(null)}
                                style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                                        padding:'12px 24px',background:'#1c1b1d',color:'#fff',
                                        borderRadius:12,textDecoration:'none',fontWeight:700,
                                        fontSize:13,fontFamily:'sans-serif'}}>
                                Открыть в архиве →
                            </a>
                            <button onClick={()=>setSrcModal(null)}
                                style={{width:'100%',marginTop:10,padding:'10px',background:'transparent',
                                        border:'1px solid #e7e5e4',borderRadius:12,cursor:'pointer',
                                        fontSize:12,color:'#78716c',fontFamily:'sans-serif'}}>
                                Закрыть
                            </button>
                        </div>
                    </div>
                )}
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
                                                📜 Оцифрованные рукописи
                                            </p>
                                            <div className="flex flex-col gap-1.5">
                                                {srcs.map((s,si)=>(
                                                    <button key={si} onClick={()=>setSrcModal({label:s.label,url:s.url})}
                                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition-all hover:shadow-sm text-left ${isBible?'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100':'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'}`}>
                                                        <span>📜</span>
                                                        <span className="flex-1 leading-snug">{s.label}</span>
                                                        <span className="opacity-40">🔍</span>
                                                    </button>
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
            const [srcModal, setSrcModal] = useState(null); // {label, url, desc}

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
            );
        }
