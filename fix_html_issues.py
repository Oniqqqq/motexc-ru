import os
import re

base_dir = '/home/dzhalil/Рабочий стол/антигравити/юмал2'
stock_path = os.path.join(base_dir, 'stock', 'index.html')

updated_files = 0

for root, dirs, files in os.walk(base_dir):
    if '.git' in dirs: dirs.remove('.git')
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Task 1: Fix placeholders
            content = re.sub(r'placeholder="Поиск[^"]*"', 'placeholder="Поиск по артикулу, названию, VIN или госномеру"', content)
            
            # Task 2: Fix 'Запчасти в наличии' links
            rel_path = os.path.relpath(stock_path, root)
            rel_path = rel_path.replace('\\', '/') # Ensure forward slashes
            
            def replace_stock_link(match):
                a_tag = match.group(0)
                new_a_tag = re.sub(r'href="[^"]*"', f'href="{rel_path}"', a_tag)
                return new_a_tag
            
            content = re.sub(r'<a\s+[^>]*>Запчасти в наличии</a>', replace_stock_link, content)
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files += 1
                print(f"Updated {filepath}")

print(f"Total files updated: {updated_files}")
