;(function () {
    /*
    * РќСѓР¶РЅРѕ РЅРµ СЃСЂР°Р·Сѓ СЌР»РµРјРµРЅС‚С‹ РґРѕР±Р°РІР»СЏС‚СЊ РІ РєРѕРЅС‚РµР№РЅРµСЂ, Р° РІ Р»РѕРєР°Р»СЊРЅС‹Р№ Рё РїРѕС‚РѕРј РІСЃРµ СЌС‚Рѕ РґРѕР±Р°РІР»СЏС‚СЊ РІ РіР»РѕР±Р°Р»СЊРЅС‹Р№ РєРѕРЅС‚РµР№РЅРµСЂ, С‡С‚РѕР±С‹ РєР°Р¶РґС‹Р№ СЂР°Р· РЅРµ РїРµСЂРµСЃРѕР·РґР°РІР°С‚СЊ РІСЊСЋС…Рё.
    * РџСЂРѕРїСѓСЃРєР°С‚СЊ СЃРѕР·РґР°РЅРёРµ РѕР±СЉРµРєС‚РѕРІ Рё РїСЂРѕСЃС‚Рѕ РёР· СЃСѓС‰РµСЃС‚РІСѓСЋС‰РµРіРѕ РІСЃС‚Р°РІР»СЏС‚СЊ РІ РіР»РѕР±Р°Р»СЊРЅС‹Р№ РєРѕРЅС‚РµР№РЅРµСЂ
    * */

    window.templates = {
        list: {
            item: '<tr class="tr_vtsi #GROUP_ID#">\n' +
                '    <td class="t_title">\n' +
                '        <table>\n' +
                '            <tbody>\n' +
                '            <tr>\n' +
                '                <td class="t_title_name">\n' +
                '                    <span class="wrap_table__title_info">' +
                '                       <a class="site_link" href="#PART_INFO_URL#">\n' +
                '                           #BRAND_TITLE# #TITLE#\n' +
                '                       </a>\n' +
                //'                       <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                //'                           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                //'                           title="#TITLE#"\n' +
                //'                           data-toggle="modal"></a>\n' +
                '                    </span>' +
                '                    <span class="t_title_name__article">' + BX.message("CATALOG_LIST_ARTICLE_TITLE") + ': <a class="site_link site_link_with_borderb" href="#PART_INFO_URL#">#ARTICLE#</a></span>\n' +
                '                </td>\n' +
                '            </tr>\n' +
                '            </tbody>\n' +
                '        </table>\n' +
                '    </td>\n' +
                // '    <td class="t_info">\n' +
                // '        <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                // '           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                // '           title="#TITLE#"\n' +
                // '           data-toggle="modal"></a>\n' +
                // '    </td>\n' +
                '    <td class="left-td_search_3view" colspan="5">\n' +
                '        <table>\n' +
                '            <tbody>\n' +
                '            </tbody>\n' +
                '        </table>\n' +
                '        <div class="tr_group_link_table">\n' +
                '            <div class="wrap_table_next_full_link">\n' +
                '                <button class="table_next_full_link" data-group-show="test">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                    <span class="lca_number">(51)</span>\n' +
                '                </button>\n' +
                '            </div>\n' +
                '        </div>' +
                '    </td>\n' +
                '</tr>',
            itemMobile: '<tr class="mob_tr_vtsi_name #GROUP_ID#">\n' +
                '    <td colspan="7">\n' +
                '        <div class="wrap_mob_link_name"><a class="site_link" href="#PART_INFO_URL#">#BRAND_TITLE# #TITLE#</a>\n' +
                '            <span class="t_title_name__article">' + BX.message("CATALOG_LIST_ARTICLE_TITLE") + ': <a class="site_link site_link_with_borderb" href="#PART_INFO_URL#">#ARTICLE#</a></span>\n' +
                '        </div>\n' +
                // '        <div class="wrap_mob_link_name_info"><a class="link_popover_table" href="#PART_INFO_URL#">#TITLE#\n' +
                // '            <span>#BRAND_TITLE#</span> / <span>#ARTICLE#</span>\n' +
                // '        </a>\n' +
                // '        <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                // '           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                // '           title="#TITLE#"\n' +
                // '           data-toggle="modal"></a></div>\n' +
                '    </td>\n' +
                '</tr>\n',
            subItem: '<tr class="stock_#OWN_STORE#" style="#SUPPLIER_STYLE#">\n' +
                '    <td class="t_stock_num">#QUANTITY#  ' + BX.message('CATALOG_LIST_QUANTITY_MEASURE') + '</td>\n' +
                '    <td class="t_time"><span class="ico_nonehtml_help" title="#SUPPLIER_NAME#">#SUPPLIER_NAME# <!--#SUPPLIER_TYPE#--></span> <br /> #DELIVERY_TIME#</td>\n' +
                // '    <td class="t_number">\n' +
                // '        <input class="inp_number int maxvalue" type="text" value="1" rel="quantity" min="1" max="#QUANTITY#"\n' +
                // '               data-part-hash="#HASH#" name="number" onkeyup="verifyCount($(this));">\n' +
                // '    </td>\n' +
                '    <td class="t_price">#PRICE#</td>\n' +
                '    <td class="t_basket">\n' +
                '        <a href="#modal_card" class="ico_cart" id="part_request" data-toggle="modal"\n' +
                '           data-target="#partRequestModal" data-detailnum="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                '           data-name="#TITLE#"\n' +
                '           data-count="1" data-supplier="#SUPPLIER_TITLE#" data-hash="#HASH#"\n' +
                '           rel="nofollow"><span class="t_basket__ico icon-ion-cart"></span></a>\n' +
                '    </td>\n' +
                '</tr>\n',
            container: '' +
                '<div id="#ID#">' +
                '<div class="wrap_view_table-search_img">\n' +
                '    <table class="site_table view_table-search_img table_search1view">\n' +
                '        <thead>\n' +
                '        <tr class="head_tr_th">\n' +
                '            <th class="t_title header" data-by="name" data-sort="asc">' + BX.message('CATALOG_LIST_PART_TITLE') + '</th>\n' +
                //'            <th class="t_info"></th>\n' +
                '            <th class="t_stock_num header" data-by="quantity" data-sort="asc"><span>' + BX.message('CATALOG_LIST_AVAILABLE_TITLE') + '</span></th>\n' +
                '            <th class="t_time header" data-by="delivery" data-sort="asc"><span>' + BX.message('CATALOG_LIST_DELIVERY_TITLE') + '</span></th>\n' +
                // '            <th class="t_number">' + BX.message('CATALOG_LIST_QUANTITY_TITLE') + '</th>\n' +
                '            <th class="t_price_basket header" data-by="price" data-sort="asc"><span>' + BX.message('CATALOG_LIST_PRICE_TITLE') + '</span></th>\n' +
                '        </tr>\n' +
                '        </thead>\n' +
                '        <tbody>\n' +
                '        </tbody>\n' +
                '    </table>\n' +
                '</div>\n' +
                '</div>',
            group: '' +
                '<tr class="tr_vtsi" id="#ID#"><td colspan="6">\n' +
                '    <p class="title_sec"><span>#TITLE#</span></p>\n' +
                '</td></tr>',
            groupAll: '' +
                '<tr id="groupShowAll" data-group="#GROUP#">\n' +
                '    <td colspan="6">\n' +
                '        <div class="tr_group_link_all_table">\n' +
                '            <div class="wrap_table_next_full_link">\n' +
                '                <button class="table_next_full_link" data-group-show="test">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                </button>\n' +
                '            </div>\n' +
                '        </div>' +
                '    </td>\n' +
                '</tr>',
        },
        block: {
            item: '<div class="site_view_result__item__col">\n' +
                '    <div class="tile_item"\n' +
                '         data-brand="trw"\n' +
                /*'         data-sort-price="#SORT_PRICE#"\n' +
                '         data-min-price="#MIN_PRICE#"\n' +
                '         data-max-price="#MAX_PRICE#"\n' +
                '         data-min-delivery="#MIN_DELIVERY#"\n' +
                '         data-max-delivery="#MAX_DELIVERY#"\n' +*/
                '         data-min-qunatity="#QUANTITY#"\n' +
                '         data-type="#GROUP_ID#"\n' +
                '         data-max-qunatity="#QUANTITY#">\n' +
                '         <a href="#PART_INFO_URL#" class="tile_item_wrap_link">\n' +
                '            <p class="stock_block hidden"><span class="label_stock">' + BX.message('CATALOG_LIST_SEARCH_ARTICLE_TITLE') + '</span></p>' +
                '            <div class="site_view_result__item__img">\n' +
                '               <span>\n' +
                '                   <img src="#MAINPICTURE#" alt="#TITLE#" title="#TITLE#">\n' +
                '               </span>\n' +
                '            </div>\n' +
                '            <div class="site_view_result__item__name"><span class="site_link">#BRAND_TITLE# #TITLE#</span></div>\n' +
                '        </a>\n' +
                '        <div class="tile_item_wrap_bottom">\n' +
                '            <div class="site_view_result__item__art">' + BX.message("CATALOG_LIST_ART") + ': #ARTICLE#</div>\n' +
                // '            <div class="site_view_result__item__options"><span class="site_view_result__item__options_item">#BRAND_TITLE#</span></div>\n' +
                '            <div class="site_view_result__item__price_btn">\n' +
                '                <div class="site_view_result__item__price title_h4">#PRICE#</div>\n' +
                '                <a\n' +
                '                    data-toggle="modal"\n' +
                '                    data-target="#partRequestModal"\n' +
                '                    data-detailnum="#ARTICLE#"\n' +
                '                    data-brand="#BRAND_TITLE#"\n' +
                '                    data-name="#TITLE#"\n' +
                '                    data-count="#QUANTITY#"\n' +
                '                    data-supplier="#SUPPLIER_TITLE#"\n' +
                '                    data-hash="#HASH#"\n' +
                '                    rel="nofollow"\n' +
                // '                    class="btn btn_site btn_site_two site_view_result__item__btn">' + BX.message('CATALOG_LIST_ADD_TO_BASKET') + '</a>\n' +
                '                    class="btn btn_site btn_site_two site_view_result__item__btn"><span class="site_view_result__item__btn__ico icon-ion-cart"></span></a>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>',
            container: '<div class="site_view_result__item tile__view"></div>',
            groupAll: '' +
                '<div class="col-sm-12 groupshowall" id="groupShowAll" data-group="#GROUP#">\n' +
                '        <div class="tr_group_link_all_table">\n' +
                '            <div class="wrap_table_next_full_link">\n' +
                '                <button class="table_next_full_link" data-group-show="test">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                </button>\n' +
                '            </div>\n' +
                '        </div>' +
                '</div>',
        },
        combo: {
            item: '<tr class="tr_vtsi #GROUP_ID#">\n' +
                '    <td class="t_title">\n' +
                '        <table>\n' +
                '            <tbody>\n' +
                '            <tr>\n' +
                '                <td class="t_title_img">\n' +
                '                    <a href="#MAINPICTURE#" data-lightbox="light_search_#VIEW_ID#"><img src="#MAINPICTURE#"\n' +
                '                         alt="#TITLE#"></a>\n' +
                '                </td>\n' +
                '                <td class="t_title_name">\n' +
                '                    <span class="wrap_table__title_info">' +
                '                       <a class="site_link" href="#PART_INFO_URL#">\n' +
                '                           #BRAND_TITLE# #TITLE#\n' +
                '                       </a>\n' +
                //'                       <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                //'                           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                //'                           title="#TITLE#"\n' +
                //'                           data-toggle="modal"></a>\n' +
                '                    </span>' +
                '                    <span class="t_title_name__article">' + BX.message("CATALOG_LIST_ARTICLE_TITLE") + ': <a class="site_link site_link_with_borderb" href="#PART_INFO_URL#">#ARTICLE#</a></span>\n' +
                '                </td>\n' +
                '            </tr>\n' +
                '            </tbody>\n' +
                '        </table>\n' +
                '    </td>\n' +
                // '    <td class="t_info">\n' +
                // '        <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                // '           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                // '           title="#TITLE#"\n' +
                // '           data-toggle="modal"></a>\n' +
                // '    </td>\n' +
                '    <td class="left-td_search_3view" colspan="5">\n' +
                '        <table>\n' +
                '            <tbody>\n' +
                '            </tbody>\n' +
                '        </table>\n' +
                '        <div class="tr_group_link_table">\n' +
                '            <div class="wrap_table_next_full_link">\n' +
                '                <button class="table_next_full_link" data-group-show="test">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                    <span class="lca_number">(0)</span>\n' +
                '                </button>\n' +
                '            </div>\n' +
                '        </div>' +
                '    </td>\n' +
                '</tr>',
            itemMobile: '<tr class="mob_tr_vtsi_name #GROUP_ID#">\n' +
                '    <td colspan="7">\n' +
                '        <div class="wrap_mob_link_name"><a class="site_link" href="#PART_INFO_URL#">#BRAND_TITLE# #TITLE#</a>\n' +
                '            <span class="t_title_name__article">' + BX.message("CATALOG_LIST_ARTICLE_TITLE") + ': <a class="site_link site_link_with_borderb" href="#PART_INFO_URL#">#ARTICLE#</a></span>\n' +
                '        </div>\n' +
                '    </td>\n' +
                '</tr>\n',
            subItem: '<tr class="stock_#OWN_STORE#" style="#SUPPLIER_STYLE#">\n' +
                '    <td class="t_stock_num">#QUANTITY#  ' + BX.message('CATALOG_LIST_QUANTITY_MEASURE') + '</td>\n' +
                '    <td class="t_time"><span class="ico_nonehtml_help" title="#SUPPLIER_NAME#">#SUPPLIER_NAME# <!--#SUPPLIER_TYPE#--></span> <br /> #DELIVERY_TIME#</td>\n' +
                // '    <td class="t_number">\n' +
                // '        <input class="inp_number int maxvalue" type="text" value="1" rel="quantity" min="1" max="#QUANTITY#"\n' +
                // '               data-part-hash="#HASH#" name="number" onkeyup="verifyCount($(this));">\n' +
                // '    </td>\n' +
                '    <td class="t_price">#PRICE#</td>\n' +
                '    <td class="t_basket">\n' +
                '        <a href="#modal_card" class="ico_cart" id="part_request" data-toggle="modal"\n' +
                '           data-target="#partRequestModal" data-detailnum="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                '           data-name="#TITLE#"\n' +
                '           data-count="1" data-supplier="#SUPPLIER_TITLE#" data-hash="#HASH#"\n' +
                '           rel="nofollow"><span class="t_basket__ico icon-ion-cart"></span></a>\n' +
                '    </td>\n' +
                '</tr>\n',
            container: '' +
                '<div id="#ID#">' +
                '<div class="wrap_view_table-search_img">\n' +
                '    <table class="site_table view_table-search_img">\n' +
                '        <thead>\n' +
                '        <tr class="head_tr_th">\n' +
                '            <th class="t_title header" data-by="name" data-sort="asc">' + BX.message('CATALOG_LIST_PART_TITLE') + '</th>\n' +
                //'            <th class="t_info"></th>\n' +
                '            <th class="t_stock_num header" data-by="quantity" data-sort="asc"><span>' + BX.message('CATALOG_LIST_AVAILABLE_TITLE') + '</span></th>\n' +
                '            <th class="t_time header" data-by="delivery" data-sort="asc"><span>' + BX.message('CATALOG_LIST_DELIVERY_TITLE') + '</span></th>\n' +
                // '            <th class="t_number">' + BX.message('CATALOG_LIST_QUANTITY_TITLE') + '</th>\n' +
                '            <th class="t_price_basket header" data-by="price" data-sort="asc"><span>' + BX.message('CATALOG_LIST_PRICE_TITLE') + '</span></th>\n' +
                '        </tr>\n' +
                '        </thead>\n' +
                '        <tbody>\n' +
                '        </tbody>\n' +
                '    </table>\n' +
                '</div>\n' +
                '</div>',
            group: '' +
                '<tr class="tr_vtsi" id="#ID#"><td colspan="6">\n' +
                '    <p class="title_sec"><span>#TITLE#</span></p>\n' +
                '</td></tr>',
            groupAll: '' +
                '<tr id="groupShowAll" data-group="#GROUP#">\n' +
                '    <td colspan="6">\n' +
                '        <div class="tr_group_link_all_table">\n' +
                '            <div class="wrap_table_next_full_link">\n' +
                '                <button class="table_next_full_link" data-group-show="test">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                </button>\n' +
                '            </div>\n' +
                '        </div>' +
                '    </td>\n' +
                '</tr>',
        },
        preloader: '<div class="w247-catalog-tab-loader"><div class="w247-loader-inner"></div></div>',
        filter: {
            itemRange: '<div class="filter_forma_block">\n' +
                '     <div class="filter_title"><h3><a href="#filter_#ID#" class="link_filter_collapse" data-toggle="collapse">#TITLE#:</a>\n' +
                '     </h3></div>\n' +
                '     <div id="filter_#ID#" class="panel-collapse collapse in">\n' +
                '         <div class="range filter_collapse_block" data-name="#NAME#">\n' +
                '             <div class="wrap_inp_num site_field">\n' +
                '                 <input type="number" id="minPrice" min="#MIN#" max="#MAX#" value="#MIN#" class="number_input min_num" name="#NAME#">\n' +
                '                 <input type="number" id="maxPrice" min="#MIN#" max="#MAX#" value="#MAX#" class="number_input max_num" name="#NAME#">\n' +
                '             </div>\n' +
                '             <div id="slider-range-price" class="filter-range" name="rangeInput"></div>\n' +
                '         </div>\n' +
                '     </div>\n' +
                '</div>',
            itemCheckbox: '<div class="filter_forma_block brand">\n' +
                '    <div class="filter_title"><h3><a href="#filter_#ID#" class="link_filter_collapse" data-toggle="collapse">#TITLE#:</a>\n' +
                '    </h3></div>\n' +
                '    <div id="filter_#ID#" class="panel-collapse collapse in wrap_filter_check">\n' +
                '        <div class="checkbox filter_collapse_block" data-name="#NAME#">\n' +
                /*'            <div class="wrap_link_coll_arow">\n' +
                '                <a href="#allfilter#ID#" class="collapsed link_coll_arow link_allrecommended"\n' +
                '                   data-toggle="collapse" aria-expanded="false">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                    <span class="lca_number">(0)</span>\n' +
                '                </a>\n' +
                '            </div>\n' +*/
                '        </div>\n' +
                '    </div>\n' +
                '</div>',
            itemOpenCheckbox: '<div class="filter_forma_block brand">\n' +
                '    <div id="filter_#ID#">\n' +
                '        <div class="checkbox filter_collapse_block" data-name="#NAME#">\n' +
                '            <div class="wrap_link_coll_arow">\n' +
                '                <a href="#allfilter#ID#" class="collapsed link_coll_arow link_allrecommended"\n' +
                '                   data-toggle="collapse" aria-expanded="false">\n' +
                '                    <span class="viz">' + BX.message('CATALOG_LIST_SHOW_MORE') + '</span>\n' +
                '                    <span class="inviz">' + BX.message('CATALOG_LIST_HIDE') + '</span>\n' +
                '                    <span class="lca_number">(0)</span>\n' +
                '                </a>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>',
            itemCheckboxHidden: '<div id="allfilter#ID#" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;"></div>\n',
            itemHiddenContainer: '<div class="hidden_block hidden" data-name="#NAME#"></div>',
            itemHidden: '<input type="hidden" value="#VALUE#" data-name="#NAME#" data-default="#VALUE#" />',
            subItemCheckbox: '<div class="checkbox_filterb">\n' +
                '    <input id="check_#ID#" type="checkbox" value="#VALUE#">\n' +
                '    <label class="check_label" for="check_#ID#">#TITLE#</label>\n' +
                '</div>',
            container: '<div class="wrap_filter_forma" id="filter_cont_default_RZ0qREpYmF" data-id="default_RZ0qREpYmF"> \n' +
                '    <form method="" action="">\n' +
                '        <div class="filter_forma_block type bottom_filter_reset filter_reset">\n' +
                '            <div class="filter_but filter_reset">\n' +
                '                <a href="#" class="site_link"><span>' + BX.message('CATALOG_LIST_RESET') + '</span></a>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>\n' +
                '</div>',
            itemResetMob: '<div class="filter_forma_block type mob_filter_reset">\n' +
                '    <div class="filter_but filter_reset">\n' +
                '        <a href="#" class="site_link"><span>' + BX.message('CATALOG_LIST_RESET') + '</span></a>\n' +
                '    </div>\n' +
                '    <span class="btn_site gradient_top mob_filter_apply">' + BX.message('CATALOG_LIST_APPLY') + '</span>\n'+
                '</div>\n',
        },
    };

    /* РњРµРЅРµРґР¶РµСЂ РїСЂРµРґСЃС‚Р°РІР»РµРЅРёР№ */
    var PartViewManager = function () {
    }
    PartViewManager.getView = function (view, data, params) {
        if (typeof PartViewManager.viewList[view] != 'undefined') {
            return new PartViewManager.viewList[view](data, params);
        }
    }
    PartViewManager.viewList = [];
    window.PartViewManager = PartViewManager;

    /* РћР±СЉРµРєС‚ РїСЂРµРґСЃС‚Р°РІР»РµРЅРёСЏ СЃ Р±Р°Р·РѕРІС‹РјС‹ РјРµС‚РѕРґР°РјРё */
    var PartView = function (data) {
    }
    PartView.prototype = {
        /* РђРЅР°Р»РѕРі jQuery.empty */
        empty: function (node) {
            if (typeof node != 'undefined'){
                if (node.firstChild) {
                    while (node.firstChild) {
                        node.removeChild(node.firstChild);
                    }
                }
            }
        },
        /* РђРЅР°Р»РѕРі jQuery.extends */
        extend: function () {
            if (arguments.length == 1) {
                return arguments.length;
            }
            var args = [].slice.call(arguments);
            var general = args.splice(0, 1)[0];
            for (var i in args) {
                for (var j in args[i]) {
                    general[j] = args[i][j];
                }
            }
            return general;
        },
        /* РђРЅР°Р»РѕРі php preg_replace */
        replaceArray: function (str, findArray, replaceArray) {
            var i, regex = [], map = {};
            for (i = 0; i < findArray.length; i++) {
                regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'));
                map[findArray[i]] = replaceArray[i];
            }
            regex = regex.join('|');
            str = str.replace(new RegExp(regex, 'g'), function (matched) {
                return map[matched];
            });
            return str;
        },
        /* РЎРѕР·РґР°РЅРёРµ РµР»РµРјРµРЅС‚Р° РёР· С€Р°Р±Р»РѕРЅР° Рё РЅР°Р±РѕСЂР° РґР°РЅРЅС‹С… */
        createElementFromTemplate: function (template, data) {
            var arDataReplace = {keys: [], values: []};
            for (var i in data) {
                arDataReplace.keys.push("#" + i.toUpperCase() + "#");
                arDataReplace.values.push(/*BX.util.htmlspecialchars(*/data[i]/*)*/);
            }
            if (arDataReplace.keys.length > 0) {
                template = this.replaceArray(template, arDataReplace.keys, arDataReplace.values);
            }
            var obTemplate = document.createElement('template');
            obTemplate.innerHTML = template;
            return obTemplate.content.firstChild;
        },
        clone: function (src) {
            return Object.assign({}, src);
            //return JSON.parse(JSON.stringify(src));
        },
        uniqueArray: function (arrArg) {
            return arrArg.filter(function (elem, pos, arr) {
                return arr.indexOf(elem) == pos;
            });
        },
        uniqueValueArray: function (arrArg) {
            let flags = [], output = [], l = arrArg.length, i;
            for (i = 0; i < l; i++) {
                if (flags[arrArg[i].value]) continue;
                flags[arrArg[i].value] = true;
                output.push(arrArg[i]);
            }
            return output;
        },
    }
    window.PartView = PartView;
})();