import os
import re

html_files = [
    './nizhparts.ru/index.html',
    './product/index.html',
    './shop.e-comexpert.ru/index.html',
    './personal/history.html',
    './personal/reclamations/view.html',
    './personal/reclamations/create.html',
    './personal/reclamations/index.html',
    './personal/index.html',
    './catalog/index.html',
    './stock/index.html',
    './index.html'
]

pattern = re.compile(r"window\.location = '[^']+';?")
pattern2 = re.compile(r"window\.location = '/w247_laximo_oem/vehicles\.php\?ft=findByVIN&c=&vin=\$vin\$&ssd='\.replace\('\\\$vin\\\$', sag_search\);")

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace window.location assignments with nothing (or console.log)
    new_content = pattern.sub("/* window.location removed for prototype */", content)
    new_content = pattern2.sub("/* window.location removed for prototype */", new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed redirects in {file}")

