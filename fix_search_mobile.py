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

# Disable modal popup for mobile search button
modal_link_pattern = re.compile(r'<a class="mob_viz btn_site link_modal_mob_header_search" href="#modal_mob_search" data-toggle="modal">')
modal_link_replacement = r'<a class="mob_viz btn_site link_modal_mob_header_search" href="javascript:void(0);" onclick="event.preventDefault();">'

# Disable form redirection globally for sag_search_form
form_pattern = re.compile(r'<form class="form_main_search sag_search_form" action="[^"]*">')
form_replacement = r'<form class="form_main_search sag_search_form" action="javascript:void(0);" onsubmit="event.preventDefault(); return false;">'

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = modal_link_pattern.sub(modal_link_replacement, content)
    new_content = form_pattern.sub(form_replacement, new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched HTML in {file}")

