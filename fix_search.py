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

replacement = r"""<div class="header_search serach_selected_head yumal-header-search-patch">
                        <div class="main_search search_selected_head">
      <div class="wrap_selectpicker_site select_header_search">
                               </div>
    
    <div class="wrap_form_header_search hs_val_vin no_catalogs">
        <form class="form_main_search sag_search_form" action="/">
             <div class="site_field">
                <input type="text" class="sag_search" placeholder="Поиск по VIN, артикулу">
            </div>
            <button type="submit" class="btn btn_site btn_search yumal-btn-search">
                <span class="btn_search__ico icon-ion-search"></span> <span class="hidden-sm hiden-xs yumal-search-text">Поиск</span>
            </button>
        </form>
    </div>
    
    
    <a class="mob_viz btn_site link_modal_mob_header_search" href="#modal_mob_search" data-toggle="modal"><span class="btn_search__ico icon-ion-search"></span></a>
</div>

<script type="text/javascript">
    $(document).ready(function(){
        $('.sag_search_form').submit(function(e){
            e.preventDefault();
            var sag_search = $(this).find('.sag_search').val().trim();
            if (/[A-Za-z]{1}[\s\S]{12}\d{4}/im.test(sag_search) && sag_search.length == 17) {
                window.location = '/w247_laximo_oem/vehicles.php?ft=findByVIN&c=&vin=$vin$&ssd='.replace('\$vin\$', sag_search);            } else {
                if (sag_search!="")
                    window.location = '/auto/search/?q=' + sag_search + '';
                else
                    window.location = '/auto/search/';
            }
            return false;
        });
        $('.sag_search_form_name').submit(function(){
            var sag_search = $(this).find('.sag_search').val().trim();
            if ( sag_search.length > 3 ) {
                window.location = '/search?q=' + sag_search + '';
            } else {

            }
            return false;
        });
    });
</script>                    </div>"""

pattern = re.compile(r'<div class="header_search serach_selected_head yumal-header-search-patch">.*?</script>\s*</div>\s*<a class="mob_viz.*?</div>\s*<script type="text/javascript">.*?</script>\s*</div>', re.DOTALL)

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = pattern.subn(lambda m: replacement, content)
    if count > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed in {file}")
    else:
        print(f"Not found in {file}")

