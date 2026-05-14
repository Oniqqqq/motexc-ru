import re

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def adjust_paths(content, depth):
    prefix = "../" * depth
    # don't replace http/https links
    new_content = re.sub(r'(href|src)="shop.e-com', r'\1="' + prefix + r'shop.e-com', content)
    new_content = re.sub(r'(href|src)="code.jquery', r'\1="' + prefix + r'code.jquery', new_content)
    new_content = re.sub(r'(href|src)="cdnjs.cloudflare', r'\1="' + prefix + r'cdnjs.cloudflare', new_content)
    new_content = re.sub(r'(href|src)="maxcdn.bootstrapcdn', r'\1="' + prefix + r'maxcdn.bootstrapcdn', new_content)
    new_content = re.sub(r'(href|src)="bitrix.info', r'\1="' + prefix + r'bitrix.info', new_content)
    new_content = re.sub(r'(href|src)="yastatic.net', r'\1="' + prefix + r'yastatic.net', new_content)
    new_content = re.sub(r'(href|src)="static-maps.yandex.ru', r'\1="' + prefix + r'static-maps.yandex.ru', new_content)
    new_content = re.sub(r'(href|src)="api-maps.yandex.ru', r'\1="' + prefix + r'api-maps.yandex.ru', new_content)
    
    # We want to replace local paths, but skip if they already start with http, //, or /
    # So we'll specifically replace the known ones:
    new_content = new_content.replace('href="personal/index.html"', 'href="' + prefix + 'personal/index.html"')
    new_content = new_content.replace('href="personal/history.html"', 'href="' + prefix + 'personal/history.html"')
    new_content = new_content.replace('href="personal/reclamations/index.html"', 'href="' + prefix + 'personal/reclamations/index.html"')
    new_content = new_content.replace('href="personal/documents/index.html"', 'href="' + prefix + 'personal/documents/index.html"')
    new_content = new_content.replace('href="personal/bonus-program/index.html"', 'href="' + prefix + 'personal/bonus-program/index.html"')
    new_content = new_content.replace('href="catalog/index.html"', 'href="' + prefix + 'catalog/index.html"')
    new_content = new_content.replace('href="chinese/index.html"', 'href="' + prefix + 'chinese/index.html"')
    new_content = new_content.replace('href="index.html"', 'href="' + prefix + 'index.html"')
    new_content = new_content.replace('href="stock/index.html"', 'href="' + prefix + 'stock/index.html"')
    new_content = new_content.replace('href="logos/', 'href="' + prefix + 'logos/')
    new_content = new_content.replace('src="logos/', 'src="' + prefix + 'logos/')
    new_content = new_content.replace('href="logo.png"', 'href="' + prefix + 'logo.png"')
    new_content = new_content.replace('src="logo.png"', 'src="' + prefix + 'logo.png"')
    new_content = new_content.replace('href="newlogo.png"', 'href="' + prefix + 'newlogo.png"')
    new_content = new_content.replace('src="newlogo.png"', 'src="' + prefix + 'newlogo.png"')
    new_content = new_content.replace('href="yumal-brand.css"', 'href="' + prefix + 'yumal-brand.css"')
    return new_content

def sync_page(target_path, depth):
    content = read_file(target_path)
    main_content = read_file('index.html')
    
    header_block = main_content[main_content.find('<header class="site_header">') : main_content.find('</header>') + 9]
    header_adj = adjust_paths(header_block, depth)
    
    footer_block = main_content[main_content.find('<footer class="wrap_main_footer">') : main_content.find('</footer>') + 9]
    footer_adj = adjust_paths(footer_block, depth)
    
    if '<header' in content:
        start_h = content.find('<header')
        end_h = content.find('</header>') + 9
        content = content[:start_h] + header_adj + content[end_h:]
    
    if '<footer' in content:
        start_f = content.find('<footer')
        end_f = content.find('</footer>') + 9
        content = content[:start_f] + footer_adj + content[end_f:]
        
    write_file(target_path, content)
    print("Synced", target_path)

files = [
    ('catalog/index.html', 1),
    ('product/index.html', 1),
    ('chinese/index.html', 1),
    ('personal/bonus-program/index.html', 2),
    ('personal/documents/index.html', 2),
    ('personal/reclamations/index.html', 2),
    ('personal/reclamations/view.html', 2),
    ('personal/reclamations/create.html', 2),
    ('personal/history.html', 1),
    ('personal/index.html', 1),
    ('stock/index.html', 1)
]

for f, d in files:
    try:
        sync_page(f, d)
    except Exception as e:
        print(f"Error syncing {f}: {e}")

