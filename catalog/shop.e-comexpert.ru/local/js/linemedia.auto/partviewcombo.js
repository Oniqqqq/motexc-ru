;(function () {
    /* РљРѕРјР±РёРЅРёСЂРѕРІР°РЅРЅС‹Р№ РІРёРґ */
    var PartViewCombo = function (data) {
        this.params = {item: {}, parent: this, groupsCount: 20, offersCount: 2};
        this.extend(this.params, data.params);

        //if (this.params.isManager) {
            window.templates.combo = {
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
                    (!!this.params.isWssync ?
                        '                       <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                        '                           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                        '                           title="#TITLE#"\n' +
                        '                           data-toggle="modal" ' +
                        '                           data-hide-edit-panel="Y"></a>\n' : '') +
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
                    '    <td class="left-td_search_3view" colspan="7">\n' +
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
                    '    <td colspan="9">\n' +
                    '        <div class="wrap_mob_link_name"><a class="link_popover_table" href="#PART_INFO_URL#">#TITLE#\n' +
                    '            <span>#BRAND_TITLE#</span> / <span>#ARTICLE#</span>\n' +
                    '        </a></div>\n' +
                    '    </td>\n' +
                    '</tr>\n',
                subItem: '<tr class="stock_#OWN_STORE#" style="#SUPPLIER_STYLE#">\n' +
                    // '    <td class="t_supplier"><span data-toggle="tooltip-hover" title="" data-original-title="#SUPPLIER_NAME#">#SUPPLIER_TYPE#</span></td>\n' +
                    '    <td class="t_stock_num">#QUANTITY#  ' + BX.message("CATALOG_LIST_QUANTITY_MEASURE") + '</td>\n' +
                    '    <td class="t_time">' +
                    (this.params.show_suppliers_name > 0 ?
                    '<span class="ico_nonehtml_help" title="#SUPPLIER_NAME#">#SUPPLIER_NAME# <!--#SUPPLIER_TYPE#--></span><br /> ' : '' ) +
                    '#DELIVERY_TIME#</td>\n' +
                    // '    <td class="t_number">\n' +
                    // '        <input class="inp_number int maxvalue" type="text" value="1" rel="quantity" min="1" max="#QUANTITY#"\n' +
                    // '               data-part-hash="#HASH#" name="number" onkeyup="verifyCount($(this));">\n' +
                    // '    </td>\n' +
                    '    <td class="t_price">#PRICE#\n' +
                    (this.params.show_manager_profit === true ? '<br /><span class="mob_t_profit">#PROFIT#</span>' : '' ) +
                    '    </td>\n' +
                    (this.params.show_manager_profit === true ?
                    '    <td class="t_profit">#PROFIT#</td>\n' : '' ) +
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
                    (this.params.show_manager_profit === true ? 
                        '    <table class="site_table view_table-search_img table_search_manager">\n'
                        : 
                        '    <table class="site_table view_table-search_img">\n'
                        ) +
                    '        <thead>\n' +
                    '        <tr class="head_tr_th">\n' +
                    '            <th class="t_title header" data-by="name" data-sort="asc">' + BX.message("CATALOG_LIST_NAME") + '</th>\n' +
                    //'            <th class="t_info"></th>\n' +
                    /*(this.params.show_suppliers_name > 0 ?
                    '            <th class="t_supplier"></th>\n' : '' ) +*/
                    '            <th class="t_stock_num header" data-by="quantity" data-sort="asc"><span>' + BX.message("CATALOG_LIST_AVAILABLE_TITLE") + '</span></th>\n' +
                    '            <th class="t_time header" data-by="delivery" data-sort="asc"><span>' + BX.message("CATALOG_LIST_DELIVERY_TITLE") + '</span></th>\n' +
                    // '            <th class="t_number">РљРѕР»-РІРѕ</th>\n' +
                    '            <th class="t_price_basket header" data-by="price" data-sort="asc"><span>' + BX.message("CATALOG_LIST_PRICE_TITLE") + '</span></th>\n' +
                    (this.params.show_manager_profit === true ?
                    '            <th class="t_profit_basket header" data-by="profit" data-sort="asc"><span>' + BX.message("CATALOG_LIST_PROFIT") + '</span></th>\n' : '' )+
                    '        </tr>\n' +
                    '        </thead>\n' +
                    '        <tbody>\n' +
                    '        </tbody>\n' +
                    '    </table>\n' +
                    '</div>\n' +
                    '</div>',
                group: '' +
                    '<tr class="tr_vtsi" id="#ID#"><td colspan="8">\n' +
                    '    <p class="title_sec"><span>#TITLE#</span></p>\n' +
                    '</td></tr>',
                groupAll: '' +
                    '<tr id="groupShowAll" data-group="#GROUP#">\n' +
                    '    <td colspan="8">\n' +
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
            }
        //}

        this.el = null;
        this.data = data;
        this.itemTemplate = templates.combo.item;
        this.itemMobileTemplate = templates.combo.itemMobile;
        this.subItemTemplate = templates.combo.subItem;
        this.containerTemplate = templates.combo.container;
        this.groupTemplate = templates.combo.group;
        this.groupAllTemplate = templates.combo.groupAll;

        this.container = BX(this.params.VIEW_ID_LIST.CONTAINER);
        this.container_nodata = BX(this.params.VIEW_ID_LIST.NODATA);
        this.sort_block = document.body.querySelector('.wrap_sort .sort_block');
        this.sort_select = document.body.querySelector('.wrap_sort .sort_block select');
        // СЃРѕР·РґР°РµРј СЌР»РµРјРµРЅС‚С‹ РґР»СЏ СЂР°Р·РґРµР»РѕРІ Рё РѕР±СЊРµРєС‚С‹ РїСЂРµРґР»РѕР¶РµРЅРёР№

        this.ViewItem = this.params['viewitem'] ? this.params['viewitem'] : PartViewListItem;
        this.ViewSubItem = this.params['viewsubitem'] ? this.params['viewsubitem'] : PartViewListSubItem;

        this.createSections();
    };
    PartViewCombo.prototype = Object.create(PartViewList.prototype);
    PartViewCombo.prototype.constructor = PartViewList;

    PartViewCombo.prototype.exec = PartViewList.prototype.exec;
    PartViewCombo.prototype.execSort = PartViewList.prototype.execSort;
    PartViewCombo.prototype.execFilter = PartViewList.prototype.execFilter;
    PartViewCombo.prototype.show = PartViewList.prototype.show;
    PartViewCombo.prototype.createSections = PartViewList.prototype.createSections;
    PartViewCombo.prototype.sort = PartViewList.prototype.sort;
    PartViewCombo.prototype.sortGroup = PartViewList.prototype.sortGroup;
    PartViewCombo.prototype.filter = PartViewList.prototype.filter;
    PartViewCombo.prototype.getFilterDefault = PartViewList.prototype.getFilterDefault;
    PartViewCombo.prototype.getFilterVals = PartViewList.prototype.getFilterVals;
    PartViewCombo.prototype.filterExclude = PartViewList.prototype.filterExclude;
    PartViewCombo.prototype.group = function () {
        this._groupParts = {};
        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i],
                gr = 0,
                oldkey = null,
                oldkeyfull = null;
            for (let j in this.data.parts[group.id]) {
                if (!this.data.parts[group.id].hasOwnProperty(j)) continue;
                let part = this.data.parts[group.id][j],
                    key = part.brand_title + '|' + part.article,
                    current_key = key;
                if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                if (typeof this._groupParts[key] == 'undefined') {
                    this._groupParts[key] = {
                        view_id: 'item_' + part.brand_title.toLowerCase() + '_' + part.article.toLowerCase(),
                        article: part.article,
                        group_id: part.group_id,
                        brand_title: part.brand_title,
                        title: part.title,
                        part_info_url: part.part_info_url,
                        picture: part.picture,
                        min: [],
                        max: [],
                        offers: [],
                        shown: 0
                    };
                }
                this._groupParts[key].offers.push(part);
                if (!part.obOffer.el.classList.contains('filter-hidden')) {
                    this._groupParts[key].shown++;
                }
                oldkey = current_key;
                oldkeyfull = key;
            }
        }

        this.partList = [];
        for (let i in this._groupParts) {
            if (!this._groupParts.hasOwnProperty(i)) continue;
            let part = this._groupParts[i];
            let partViewListObj = new this.ViewItem(part, this.params);
            // СЃРєСЂС‹РІР°РµРј РіСЂСѓРїРїСѓ, РµСЃР»Рё РІСЃРµ РїСЂРµРґР»РѕР¶РµРЅРёСЏ РіСЂСѓРїРїС‹ СЃРєСЂС‹С‚С‹
            if (part.shown === 0) {
                partViewListObj.el.classList.add('filter-hidden');
            } else {
                this.partList.push(partViewListObj);
            }
        }
    };
    PartViewCombo.prototype.showPartList = PartViewList.prototype.showPartList;
    PartViewCombo.prototype.bindEvents = PartViewList.prototype.bindEvents;
    PartViewCombo.prototype.resort = PartViewList.prototype.resort;
    PartViewCombo.prototype.setFilter = PartViewList.prototype.setFilter;
    PartViewCombo.prototype.getGlobalParams = PartViewList.prototype.getGlobalParams;
    PartViewCombo.prototype.setGlobalParams = PartViewList.prototype.setGlobalParams;

    /* Р­Р»РµРјРµРЅС‚ РєРѕРјР±Рѕ РІРёРґР° */
    var PartViewComboItem = PartViewListItem;
    /* Р­Р»РµРјРµРЅС‚ С‚Р°Р±Р»РёС†С‹ СЂРµРґР»РѕР¶РµРЅРёР№ */
    var PartViewComboSubItem = PartViewListSubItem;

    window.PartViewCombo = PartViewCombo;
    window.PartViewComboItem = PartViewComboItem;
    window.PartViewComboSubItem = PartViewComboSubItem;
})();