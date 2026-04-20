import json
import urllib.request
import os

def build_databases():
    print("Запуск сборщика данных Академии...")
    os.makedirs("data", exist_ok=True)

    # 1. Скачиваем Библию (Синодальный перевод)
    print("Скачивание Библии...")
    bible_url = "https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/ru_synodal.json"
    req = urllib.request.Request(bible_url, headers={'User-Agent': 'Mozilla/5.0'})
    
    with urllib.request.urlopen(req) as response:
        bible_raw = json.loads(response.read().decode())
    
    bible_map = {}
    for book in bible_raw:
        book_name = book['name']
        bible_map[book_name] = {}
        for c_idx, chapter in enumerate(book['chapters']):
            bible_map[book_name][str(c_idx + 1)] = {}
            for v_idx, verse in enumerate(chapter):
                bible_map[book_name][str(c_idx + 1)][str(v_idx + 1)] = verse

    with open("data/bible.json", "w", encoding="utf-8") as f:
        json.dump(bible_map, f, ensure_ascii=False, separators=(',', ':'))
    print("Библия сохранена (data/bible.json).")

    # 2. Скачиваем Коран (Перевод Кулиева)
    print("Скачивание Корана...")
    quran_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/quran-api@1/editions/rus-elmir-kuliev.json"
    req = urllib.request.Request(quran_url, headers={'User-Agent': 'Mozilla/5.0'})
    
    with urllib.request.urlopen(req) as response:
        quran_raw = json.loads(response.read().decode())
    
    quran_map = {}
    for item in quran_raw['quran']:
        surah_num = str(item['chapter'])
        if surah_num not in quran_map:
            quran_map[surah_num] = {"1": {}} # "1" - фиктивная глава для унификации структуры с Библией
        
        quran_map[surah_num]["1"][str(item['verse'])] = item['text']

    with open("data/quran.json", "w", encoding="utf-8") as f:
        json.dump(quran_map, f, ensure_ascii=False, separators=(',', ':'))
    print("Коран сохранен (data/quran.json).")
    print("Сборка успешно завершена!")

if __name__ == "__main__":
    build_databases()
