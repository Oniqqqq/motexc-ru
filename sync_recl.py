import re
import os

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def adjust_paths(content, depth):
    prefix = "../" * depth
    new_content = re.sub(r'(href|src)="shop.e-com', r'\1="' + prefix + r'shop.e-com', content)
    new_content = re.sub(r'(href|src)="code.jquery', r'\1="' + prefix + r'code.jquery', new_content)
    new_content = re.sub(r'(href|src)="cdnjs.cloudflare', r'\1="' + prefix + r'cdnjs.cloudflare', new_content)
    new_content = re.sub(r'(href|src)="maxcdn.bootstrapcdn', r'\1="' + prefix + r'maxcdn.bootstrapcdn', new_content)
    new_content = re.sub(r'(href|src)="bitrix.info', r'\1="' + prefix + r'bitrix.info', new_content)
    new_content = re.sub(r'(href|src)="yastatic.net', r'\1="' + prefix + r'yastatic.net', new_content)
    new_content = re.sub(r'(href|src)="static-maps.yandex.ru', r'\1="' + prefix + r'static-maps.yandex.ru', new_content)
    new_content = re.sub(r'(href|src)="api-maps.yandex.ru', r'\1="' + prefix + r'api-maps.yandex.ru', new_content)
    new_content = new_content.replace('href="personal/index.html"', 'href="' + prefix + 'personal/index.html"')
    new_content = new_content.replace('href="personal/history.html"', 'href="' + prefix + 'personal/history.html"')
    new_content = new_content.replace('href="personal/reclamations/index.html"', 'href="' + prefix + 'personal/reclamations/index.html"')
    new_content = new_content.replace('href="catalog/index.html"', 'href="' + prefix + 'catalog/index.html"')
    new_content = new_content.replace('href="index.html"', 'href="' + prefix + 'index.html"')
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

sync_page('personal/reclamations/index.html', 2)
sync_page('personal/reclamations/create.html', 2)
