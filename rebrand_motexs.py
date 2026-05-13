#!/usr/bin/env python3
"""Ребрендинг мотехс РУ: синяя/красная → зелёная палитра + новый логотип"""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))

# ── Логотип в HTML ──────────────────────────────────────────────────────────
LOGO_RE = re.compile(
    r'src="(?:\.\./)*shop\.e-comexpert\.ru/shop\.e-comexpert\.ru/'
    r'bitrix/templates/e-comexpert_v2/img/logo-yumal\.png"'
)
HTML_FILES = [
    ("index.html",                          "newlogo.png"),
    ("catalog/index.html",                  "../newlogo.png"),
    ("product/index.html",                  "../newlogo.png"),
    ("personal/index.html",                 "../newlogo.png"),
    ("personal/history.html",               "../newlogo.png"),
    ("personal/reclamations/index.html",    "../../newlogo.png"),
    ("personal/reclamations/view.html",     "../../newlogo.png"),
    ("personal/reclamations/create.html",   "../../newlogo.png"),
]
for rel, src in HTML_FILES:
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p): print(f"SKIP: {rel}"); continue
    txt = open(p, encoding="utf-8").read()
    new = LOGO_RE.sub(f'src="{src}"', txt)
    if new != txt: open(p,"w",encoding="utf-8").write(new); print(f"✓ logo: {rel}")
    else: print(f"~ logo already ok: {rel}")

# ── CSS: цветовые замены ────────────────────────────────────────────────────
CSS_PATH = os.path.join(ROOT, "yumal-brand.css")
css = open(CSS_PATH, encoding="utf-8").read()

# Порядок важен: сначала специфичные, потом общие
replacements = [
    # ── Шапка комментария ──
    ("#0B3A8D  /  hover #072C6B", "#2E7D4F  /  hover #23643F"),
    ("Accent (CTA):  #D71920  /  hover #B51219", "Accent (CTA):  #2E7D4F  /  hover #23643F"),
    ("Background:    #FFFFFF, #F5F7FA",           "Background:    #FFFFFF, #F6F7F5"),
    ("Text:          #1F2937, #6B7280",           "Text:          #202624, #66706A"),
    ("Border:        #E5E7EB",                    "Border:        #DDE3DE"),

    # ── Тёмные синие (футер-градиент, hero) → тёмно-нейтральные ──
    ("linear-gradient(135deg, #091A4E 0%, #0B3A8D 55%, #1254BE 100%)",
     "linear-gradient(135deg, #111816 0%, #1C2522 55%, #253328 100%)"),
    ("linear-gradient(135deg, #091A4E 0%, #0B2C78 55%, #0D3894 100%)",
     "#111816"),
    ("linear-gradient(135deg, #0B2D78 0%, #0B3A8D 50%, #1254BE 100%)",
     "linear-gradient(135deg, #111816 0%, #1C2522 50%, #253328 100%)"),
    ("linear-gradient(135deg, #091A4E 0%, #0B3A8D 60%, #1254BE 100%)",
     "linear-gradient(135deg, #111816 0%, #1C2522 60%, #253328 100%)"),

    # ── Тени синие → зелёные ──
    ("rgba(11,58,141,0.22)", "rgba(46,125,79,0.22)"),
    ("rgba(11,58,141,0.15)", "rgba(46,125,79,0.15)"),
    ("rgba(11,58,141,0.12)", "rgba(46,125,79,0.12)"),
    ("rgba(11,58,141,0.10)", "rgba(46,125,79,0.10)"),

    # ── Красные акценты → amber (скидки/распродажи) ──
    ("#D71920 !important;\n    color: #FFFFFF !important;\n}\n.label_product_tag__item.label_new",
     "#D9902F !important;\n    color: #FFFFFF !important;\n}\n.label_product_tag__item.label_new"),

    # ── Замены badge/badge-bg ──
    ("rgba(215,25,32,0.92)", "rgba(217,144,47,0.92)"),

    # ── Главный синий → зелёный ──
    ("#0B3A8D", "#2E7D4F"),
    ("#072C6B", "#23643F"),
    ("#1254BE", "#3A9D63"),
    ("#091A4E", "#111816"),
    ("#0B2C78", "#1C2522"),
    ("#0D3894", "#253328"),
    ("#0B2D78", "#1C2522"),

    # ── Красный CTA → зелёный ──
    ("#D71920", "#2E7D4F"),
    ("#B51219", "#23643F"),

    # ── Светло-синий (hover border) → светло-зелёный ──
    ("#BFDBFE", "#E6F2EA"),
    ("#BDD0F8", "#A7C4B0"),
    ("#8FA9E0", "#8FB8A0"),

    # ── Серые синеватые → нейтральные ──
    ("#E8EFFD", "#E6F2EA"),

    # ── Фоны ──
    ("#F5F7FA", "#F6F7F5"),
    ("#F5F7FA !important", "#F6F7F5 !important"),

    # ── Текст ──
    ("#1F2937", "#202624"),
    ("#374151", "#3D4A42"),
    ("#6B7280", "#66706A"),
    ("#9CA3AF", "#8FA898"),

    # ── Бордеры ──
    ("#E5E7EB", "#DDE3DE"),
    ("#F3F4F6", "#EEF1ED"),
    ("#F9FAFB", "#F6F7F5"),

    # ── Футер тёмный ──
    ("#1F2937 !important", "#111816 !important"),
    ("#374151 !important", "#1C2522 !important"),

    # ── Шапка-бар верхний: синий → тёмно-зелёный ──
    # (уже поймано через #0B3A8D → #2E7D4F выше)

    # ── Тень шапки ──
    ("box-shadow: 0 2px 8px rgba(11,58,141,0.12)", "box-shadow: 0 2px 8px rgba(46,125,79,0.12)"),

    # ── Табы active hover → зелёный ──
    ("e0e7f5", "e6f2ea"),
]

for old, new in replacements:
    css = css.replace(old, new)

# ── Дополнительные точечные правки ──────────────────────────────────────────

# Заголовок CSS-файла
css = css.replace(
    "Юмал Авто — Brand Color Overrides\n   Primary:       #0B3A8D  /  hover #072C6B\n   Accent (CTA):  #2E7D4F  /  hover #23643F",
    "Юмал Авто — Brand Color Overrides (Motexs RU)\n   Primary:       #2E7D4F  /  hover #23643F\n   Accent (sale): #D9902F (amber)"
)

# Секция-заголовок "HEADER: top utility bar — brand blue background"
css = css.replace("brand blue background", "brand dark green background")

# recl-tabs hover: старый e0e7f5 → зелёный (на случай hex в другом регистре)
css = css.replace("background: #e0e7f5; color: #2E7D4F", "background: #E6F2EA; color: #2E7D4F")

# Sale badge (label_stock) оставить amber
css = css.replace(
    ".label_product_tag__item.label_stock {\n    background: #2E7D4F !important;",
    ".label_product_tag__item.label_stock {\n    background: #D9902F !important;"
)

# Partner banner eyebrow: amber
css = css.replace(
    "background: rgba(217,144,47,0.92);",
    "background: rgba(217,144,47,0.92);"  # уже amber, ок
)

# Бейдж акции/sale yumal-badge--sale: amber
css = css.replace(
    ".yumal-badge--sale {\n    background: #2E7D4F;",
    ".yumal-badge--sale {\n    background: #D9902F;"
)

# Partner banner CTA: зелёный
css = css.replace(
    ".yumal-partner-banner__cta {\n    display: inline-block;\n    background: #2E7D4F;",
    ".yumal-partner-banner__cta {\n    display: inline-block;\n    background: #2E7D4F;"
)

# yumal-finance-stat--danger: оставить красным/amber для "опасности"
css = css.replace(
    ".yumal-finance-stat--danger { border-left-color: #2E7D4F; }",
    ".yumal-finance-stat--danger { border-left-color: #D9902F; }"
)
css = css.replace(
    ".yumal-finance-stat--danger .yumal-finance-stat__value { color: #2E7D4F !important; }",
    ".yumal-finance-stat--danger .yumal-finance-stat__value { color: #D9902F !important; }"
)

# Row overdue: оставить красноватый фон (визуально понятный)
css = css.replace(
    ".yumal-payment-table tbody tr.yumal-row--overdue { background: #FFF8F8; }",
    ".yumal-payment-table tbody tr.yumal-row--overdue { background: #FFF8F0; }"
)
css = css.replace(
    ".yumal-payment-table tbody tr.yumal-row--overdue:hover { background: #FEE2E2; }",
    ".yumal-payment-table tbody tr.yumal-row--overdue:hover { background: #FFF2DA; }"
)

# Status overdue chip
css = css.replace(
    ".yumal-status--overdue { background: #FEE2E2; color: #991B1B; }",
    ".yumal-status--overdue { background: #FFF2DA; color: #7A4A00; }"
)

# login_site .red → amber
css = css.replace(
    ".login_site .red,\n.registration .red {\n    color: #2E7D4F !important;\n}",
    ".login_site .red,\n.registration .red {\n    color: #D9902F !important;\n}"
)
css = css.replace(
    ".login_site .red:hover,\n.registration .red:hover {\n    color: #23643F !important;\n}",
    ".login_site .red:hover,\n.registration .red:hover {\n    color: #B57020 !important;\n}"
)

# personalarea_exit: amber вместо зелёного
css = css.replace(
    ".header_login_user .dropdown-menu .site_personalarea .personalarea_exit a {\n    color: #2E7D4F !important;\n    background: #FFF5F5 !important;\n}",
    ".header_login_user .dropdown-menu .site_personalarea .personalarea_exit a {\n    color: #D9902F !important;\n    background: #FFF2DA !important;\n}"
)
css = css.replace(
    ".header_login_user .dropdown-menu .site_personalarea .personalarea_exit a:hover {\n    background: #2E7D4F !important;\n    color: #FFFFFF !important;\n}",
    ".header_login_user .dropdown-menu .site_personalarea .personalarea_exit a:hover {\n    background: #D9902F !important;\n    color: #FFFFFF !important;\n}"
)

# my_orders_table__info__title: amber (статус заказа)
css = css.replace(
    ".my_orders_table__info__title span {\n    color: #2E7D4F !important;\n}",
    ".my_orders_table__info__title span {\n    color: #D9902F !important;\n}"
)

# detail_discounts_sale: amber
css = css.replace(
    ".detail_discounts_sale__title .validity_time {\n    color: #2E7D4F !important;\n}",
    ".detail_discounts_sale__title .validity_time {\n    color: #D9902F !important;\n}"
)

# recommended_block title (was red): amber
css = css.replace(
    ".recommended_block .recommended_block__title,\n.recommended_block .recommended_block__title .recommended_block__title__ico:before {\n    color: #2E7D4F !important;\n}",
    ".recommended_block .recommended_block__title,\n.recommended_block .recommended_block__title .recommended_block__title__ico:before {\n    color: #D9902F !important;\n}"
)

# advantage_main_item__descr__item: white card — green text (was blue)
css = css.replace(
    ".advantage_main_item .advantage_main_item__descr .advantage_main_item__descr__item {\n    background: #FFFFFF !important;\n    color: #2E7D4F !important;",
    ".advantage_main_item .advantage_main_item__descr .advantage_main_item__descr__item {\n    background: #FFFFFF !important;\n    color: #2E7D4F !important;"
)

# section headings: зелёная полоска вместо красной
css = css.replace(
    "border-left: 4px solid #2E7D4F !important;",
    "border-left: 4px solid #2E7D4F !important;"
)

# date/time accents in news: amber
css = css.replace(
    ".main_news__item__time .time_day {\n    color: #2E7D4F !important;\n}",
    ".main_news__item__time .time_day {\n    color: #D9902F !important;\n}"
)
css = css.replace(
    ".news_detail__time .news_detail__time_day {\n    color: #2E7D4F !important;\n}",
    ".news_detail__time .news_detail__time_day {\n    color: #D9902F !important;\n}"
)

# mobile search button: зелёный
# (уже поймано заменой #D71920 → #2E7D4F выше)

# search button hover: тёмно-зелёный (уже поймано)

# catalog btn (was red default): зелёный (уже поймано)

# Mobile btn_site_two: зелёный (уже поймано)

# advantage_main_item stripe (after): зелёный (уже поймано через border-left)
# Правим after-stripe явно
css = css.replace(
    ".advantage_main_item .advantage_main_item__descr .advantage_main_item__descr__item:after {\n    background: #2E7D4F !important;\n}",
    ".advantage_main_item .advantage_main_item__descr .advantage_main_item__descr__item:after {\n    background: #2E7D4F !important;\n}"
)

# Сохраняем ──────────────────────────────────────────────────────────────────
open(CSS_PATH, "w", encoding="utf-8").write(css)
print("✓ yumal-brand.css rewritten with green palette")

# ── Также добавляем logo filter для футера (зелёный → белый) ──────────────
# В CSS уже есть filter: brightness(0) invert(1) для footer_logo
# Это сделает белый логотип в футере (подходит для тёмного фона)

print("\n✅ Rebrand complete!")
print("  - Logos replaced in all HTML files")
print("  - CSS rewritten: blue/red → green/amber neutral B2B palette")
