import json
import os

print("Запуск сборщика данных Академии Религиоведения...")

# 1. Создаем директорию для баз данных
os.makedirs("data", exist_ok=True)

# 2. Генерируем массивную структуру Библии
print("Формирование структуры Библии...")
bible_data = {
    "books": ["Бытие", "Исход", "Левит", "Числа", "Второзаконие"],
    "content": {
        "Бытие": {}
    }
}

for chapter in range(1, 51):
    bible_data["content"]["Бытие"][str(chapter)] = {
        "1": f"Текст Библии: Бытие, глава {chapter}, стих 1",
        "2": f"Текст Библии: Бытие, глава {chapter}, стих 2",
        "3": f"Текст Библии: Бытие, глава {chapter}, стих 3"
    }

# 3. Генерируем структуру Корана
print("Формирование структуры Корана...")
quran_data = {
    "surahs": ["1. Аль-Фатиха", "37. Ас-Саффат"],
    "content": {}
}

for surah in quran_data["surahs"]:
    quran_data["content"][surah] = {}
    for ayah in range(1, 105): 
        quran_data["content"][surah][str(ayah)] = f"Текст Корана: {surah}, аят {ayah}"

# 4. Сохраняем в JSON файлы
print("Сохранение в JSON...")
with open("data/bible.json", "w", encoding="utf-8") as f:
    json.dump(bible_data, f, ensure_ascii=False, separators=(',', ':'))

with open("data/quran.json", "w", encoding="utf-8") as f:
    json.dump(quran_data, f, ensure_ascii=False, separators=(',', ':'))

print("Успешно! Папка /data/ готова.")
