;(function () {
    /* РЎРїРёСЃРѕС‡РЅС‹Р№ РІРёРґ */
    var PartViewList = function (data) {
        this.params = {item: {}, parent: this, groupsCount: 20, offersCount: 2};
        this.extend(this.params, data.params);

        //if (this.params.isManager) {
            window.templates.list = {
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
                    (!!this.params.isWssync ?
                        '                       <a class="info_ico" href="#link_info_part" data-uid="" data-article="#ARTICLE#"\n' +
                        '                           data-article-modal="#ARTICLE#" data-brand="#BRAND_TITLE#"\n' +
                        '                           title="#TITLE#"\n' +
                        '                           data-toggle="modal"' +
                        '                           data-hide-edit-panel="Y"></a>\n' : '') +
                    '                    </span>' +
                    '                    <span class="t_title_name__article">' + BX.message("CATALOG_LIST_ARTICLE_TITLE") + ': <a class="site_link site_link_with_borderb" href="#PART_INFO_URL#">#ARTICLE#</a></span>\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '            </tbody>\n' +
                    '        </table>\n' +
                    '    </td>\n' +
                    // '    <td class="t_info">\n' +
                    // '        <a class="info_ico" href="#link_info_part" data-uid="#UID#" data-article="#ARTICLE#"\n' +
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
                    '                    <span class="lca_number">(0)</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>' +
                    '    </td>\n' +
                    '</tr>',
                itemMobile: '<tr class="mob_tr_vtsi_name #GROUP_ID#">\n' +
                    '    <td colspan="9">\n' +
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
                    (this.params.show_suppliers_name > 0 ?
                        //'    <td class="t_supplier"><span data-toggle="tooltip-hover" title="" data-original-title="#SUPPLIER_NAME#">#SUPPLIER_TYPE#</span></td>\n'
                        '' : '' ) +
                    '    <td class="t_stock_num">#QUANTITY#  ' + BX.message("CATALOG_LIST_QUANTITY_MEASURE") + '</td>\n' +
                    '    <td class="t_time">' +
                    (this.params.show_suppliers_name > 0 ? '<span class="ico_nonehtml_help" title="#SUPPLIER_NAME#">#SUPPLIER_NAME# <!--#SUPPLIER_TYPE#--></span> <br /> ' : '')+
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
                        '    <table class="site_table view_table-search_img table_search1view table_search_manager">\n'
                        : 
                        '    <table class="site_table view_table-search_img table_search1view">\n'
                        ) +
                    '        <thead>\n' +
                    '        <tr class="head_tr_th">\n' +
                    '            <th class="t_title header" data-by="name" data-sort="asc">' + BX.message("CATALOG_LIST_NAME") + '</th>\n' +
                    //'            <th class="t_info"></th>\n' +
                    (this.params.show_suppliers_name > 0 ?
                     '' : '' ) + //'            <th class="t_supplier"></th>\n' : '' ) +
                    '            <th class="t_stock_num header" data-by="quantity" data-sort="asc"><span>' + BX.message("CATALOG_LIST_AVAILABLE_TITLE") + '</span></th>\n' +
                    '            <th class="t_time header" data-by="delivery" data-sort="asc"><span>' + BX.message("CATALOG_LIST_DELIVERY_TITLE") + '</span></th>\n' +
                    // '            <th class="t_number">РљРѕР»-РІРѕ</th>\n' +
                    '            <th class="t_price_basket header" data-by="price" data-sort="asc"><span>' + BX.message("CATALOG_LIST_PRICE_TITLE") + '</span></th>\n' +
                    (this.params.show_manager_profit === true ?
                    '            <th class="t_profit_basket header" data-by="profit" data-sort="asc"><span>' + BX.message("CATALOG_LIST_PROFIT") + '</span></th>\n' : '' ) +
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
        this.itemTemplate = templates.list.item;
        this.itemMobileTemplate = templates.list.itemMobile;
        this.subItemTemplate = templates.list.subItem;
        this.containerTemplate = templates.list.container;
        this.groupTemplate = templates.list.group;
        this.groupAllTemplate = templates.list.groupAll;

        this.container = BX(this.params.VIEW_ID_LIST.CONTAINER);
        this.container_nodata = BX(this.params.VIEW_ID_LIST.NODATA);
        this.sort_block = document.body.querySelector('.wrap_sort .sort_block');
        this.sort_select = document.body.querySelector('.wrap_sort .sort_block select');
        // СЃРѕР·РґР°РµРј СЌР»РµРјРµРЅС‚С‹ РґР»СЏ СЂР°Р·РґРµР»РѕРІ Рё РѕР±СЊРµРєС‚С‹ РїСЂРµРґР»РѕР¶РµРЅРёР№

        this.ViewItem = this.params['viewitem'] ? this.params['viewitem'] : PartViewListItem;
        this.ViewSubItem = this.params['viewsubitem'] ? this.params['viewsubitem'] : PartViewListSubItem;

        this.createSections();
    };
    PartViewList.prototype = Object.create(PartView.prototype);
    PartViewList.prototype.constructor = PartView;

    PartViewList.prototype.exec = function () {
        // СЃРєСЂС‹РІР°РµРј Р±Р»РѕРє СЃРѕСЂС‚РёСЂРѕРІРєРё
        if(this.sort_block != null) {
            this.sort_block.classList.add('hidden');
        }
        // РѕС‡РёС‰Р°РµРј РєРѕРЅС‚РµР№РЅРµСЂ, РѕС‚РѕР±СЂР°Р¶Р°РµРј РїСЂРµР»РѕР°РґРµСЂ
        this.empty(this.container);
        this.container_nodata.classList.add('hidden');
        //this.container.innerHTML = templates.preloader;
        // СЃРѕР·РґР°РµРј el Рё РѕС‚РѕР±СЂР°Р¶Р°РµРј header С‚Р°Р±Р»РёС†С‹
        this.el = document.createElement('div');
        let header = this.createElementFromTemplate(this.containerTemplate, {id: "PartViewList"});
        this.el.appendChild(header);

        // С„РёР»СЊС‚СЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ
        this.filter(arguments[0]);
        // СЃРѕСЂС‚РёСЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ
        this.sort(arguments[1], arguments[2]);
        // РіСЂСѓРїРїРёСЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ
        this.group();
        // СЂР°СЃСЃС‚Р°РІР»СЏРµРј РїРѕ РїСЂРёРѕСЂРёС‚РµС‚Сѓ РІРЅСѓС‚СЂРё РіСЂСѓРїРїС‹
        for (let i in this.partList) {
            if (!this.partList.hasOwnProperty(i)) continue;
            this.partList[i].exec();
        }
        // РѕС‚РѕР±СЂР°Р¶Р°РµРј partList
        this.showPartList();
        this.bindEvents();

        // СѓР±РёСЂР°РµРј РїСЂРµР»РѕР°РґРµСЂ Рё РѕС‚РѕР±СЂР°Р¶Р°РµРј РІС‹РґР°С‡Сѓ
        this.empty(this.container);
        this.container.appendChild(this.el);

        if($.fn.tooltip) {
        $('[data-toggle="popover"]').popover();
        }
        if($.fn.tooltip) {
        $('[data-toggle="tooltip-hover"]').tooltip();
        }
    };
    PartViewList.prototype.execSort = function () {
        this.exec(null, arguments[0], arguments[1]);
    };
    PartViewList.prototype.execFilter = function () {
        this.exec(arguments[0]);
    };
    PartViewList.prototype.show = function () {
        this.exec();
    };
    // СЃРѕР·РґР°РµРј СЌР»РµРјРµРЅС‚С‹ РґР»СЏ СЂР°Р·РґРµР»РѕРІ
    PartViewList.prototype.createSections = function () {
        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i];
            group.el = this.createElementFromTemplate(this.groupTemplate, group);
            for (let j in this.data.parts[group.id]) {
                if (!this.data.parts[group.id].hasOwnProperty(j)) continue;
                let part = this.data.parts[group.id][j];
                if (typeof part.obOffer === 'undefined') {
                    part.obOffer = new this.ViewSubItem(part, this.params);
                }
            }
        }
    };
    // СЃРѕСЂС‚РёСЂРѕРІРєР° РїСЂРµРґР»РѕР¶РµРЅРёР№
    PartViewList.prototype.sort = function (by, order) {
        let globalParams = this.getGlobalParams();
        by = typeof by == 'undefined' || by === null ?
            (typeof globalParams.sort != 'undefined' ? globalParams.sort.by : 'price') : by;
        order = typeof order == 'undefined' || order === null ?
            (typeof globalParams.sort != 'undefined' ? globalParams.sort.order : -1) : (order === 'asc' ? -1 : 1);
        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i];
            this.data.parts[group.id].sort(PartViewListItem.prototype.offersSort.bind(null, by, order));
        }
        if (globalParams.resort) {
            let sortButton = BX.findChild(BX(this.el), {
                "tag": "th",
                "class": "header",
                attribute: {'data-by': by}
            }, true);
            sortButton.setAttribute('data-sort', order === 1 ? 'asc' : 'desc');
            sortButton.classList.add("headerSort" + (order === 1 ? 'Up' : 'Down'));
            globalParams.sort = {
                by: by,
                order: order
            };
        }
    };
    // С„РёР»СЊС‚СЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ, СЃРєСЂС‹РІР°РµРј РіСЂСѓРїРїС‹/СЂР°Р·РґРµР»С‹, РµСЃР»Рё РЅРµС‚ РїСЂРµРґР»РѕР¶РµРЅРёР№
    PartViewList.prototype.filter = function (vals) {
        let globalParams = this.getGlobalParams();
        vals = typeof vals == 'undefined' || vals === null ?
            (typeof globalParams.filter != 'undefined' ? globalParams.filter.vals : {}) : vals;
        let filter = this.getFilterDefault();
        // СѓРґР°Р»СЏРµРј РєР»Р°СЃСЃ filter-hidden СЃ СЂР°Р·РґРµР»РѕРІ Рё РїСЂРµРґР»РѕР¶РµРЅРёР№
        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i];
            group.el.classList.remove('filter-hidden');
            for (let j in this.data.parts[group.id]) {
                if (!this.data.parts[group.id].hasOwnProperty(j)) continue;
                let part = this.data.parts[group.id][j];
                part.obOffer.el.classList.remove('filter-hidden');
            }
        }
        // С„РёР»СЊС‚СЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ
        for (let i in vals) {
            if (!vals.hasOwnProperty(i)) continue;
            switch (filter[i].type) {
                case 'range':
                    for (let j in this.data.groups) {
                        if (!this.data.groups.hasOwnProperty(j)) continue;
                        let group = this.data.groups[j];
                        for (let k in this.data.parts[group.id]) {
                            if (!this.data.parts[group.id].hasOwnProperty(k)) continue;
                            let part = this.data.parts[group.id][k];
                            if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                            let partValue = Math.round(parseFloat(part[i]));
                            if (i === 'delivery') {
                                partValue = Math.ceil(partValue / 24);
                            }
                            if (partValue < vals[i].min || partValue > vals[i].max) {
                                part.obOffer.el.classList.add('filter-hidden');
                            }
                        }
                    }
                    break;
                case 'checkboxopen':
                case 'checkbox':
                    if (vals[i].length <= 0) {
                        continue;
                    }
                    for (let j in this.data.groups) {
                        if (!this.data.groups.hasOwnProperty(j)) continue;
                        let group = this.data.groups[j];
                        for (let k in this.data.parts[group.id]) {
                            if (!this.data.parts[group.id].hasOwnProperty(k)) continue;
                            let part = this.data.parts[group.id][k];
                            if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                            if (vals[i].indexOf(part[i]) === -1) {
                                part.obOffer.el.classList.add('filter-hidden');
                            }
                        }
                    }
                    break;
                case 'hidden':
                    for (let j in this.data.groups) {
                        if (!this.data.groups.hasOwnProperty(j)) continue;
                        let group = this.data.groups[j];
                        for (let k in this.data.parts[group.id]) {
                            if (!this.data.parts[group.id].hasOwnProperty(k)) continue;
                            let part = this.data.parts[group.id][k];
                            if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                            let set = false;
                            for (let l in vals[i]) {
                                let h = vals[i][l];
                                switch (l) {
                                    case "own_store":
                                        if (h.value === 'Y' && part.own_store === false) {
                                            set = true;
                                        }
                                        break;
                                }
                                if (set) break;
                            }
                            if (set) {
                                part.obOffer.el.classList.add('filter-hidden');
                            }
                        }
                    }
                    break;
            }
        }
        this.setGlobalParams('filter', {
            vals: vals
        });
    };
    // РїРѕР»СѓС‡РµРЅРёРµ Р·РЅР°С‡РµРЅРёСЏ С„РёР»СЊС‚СЂР°
    PartViewList.prototype.getFilterDefault = function () {
        if (typeof this.params.defaultfilter !== 'undefined') {
            return this.params.defaultfilter;
        }
        let filter = {
            own_store: {
                title: 'own_store',
                type: 'checkboxopen',
                values: [
                    {
                        id: 'own_store',
                        title: BX.message('CATALOG_LIST_STOCK_ONLY'),
                        value: '0',
                    }
                ]
            },
            price_src: {
                title: BX.message('CATALOG_LIST_COST'),
                type: 'range',
                values: []
            },
            delivery: {
                title: BX.message('CATALOG_LIST_DELIVERIES'),
                type: 'range',
                values: []
            },
            brand_title: {
                title: BX.message('CATALOG_LIST_BRANDS'),
                type: 'checkbox',
                values: []
            },
            group_id: {
                title: BX.message('CATALOG_LIST_TYPES'),
                type: 'checkbox',
                values: []
            },
        };

        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i];
            for (let j in this.data.parts[group.id]) {
                if (!this.data.parts[group.id].hasOwnProperty(j)) continue;
                let offer = this.data.parts[group.id][j];
                filter.delivery.values.push(Math.ceil(offer.delivery / 24));
                filter.delivery.values.push(Math.ceil(offer.delivery / 24));
                filter.price_src.values.push(Math.round(offer.price_src));
                filter.price_src.values.push(Math.round(offer.price_src));
                filter.brand_title.values.push(offer.brand_title);
                filter.group_id.values.push(this.extend({}, this.data.groups[offer.group_id], {value: this.data.groups[offer.group_id].id}));
            }
        }

        filter.brand_title.values = this.uniqueArray(filter.brand_title.values);
        filter.brand_title.values.sort();
        //filter.brand_title.values = this.uniqueArray(filter.brand_title.values);
        filter.group_id.values = this.uniqueValueArray(filter.group_id.values);
        filter.group_id.values.sort(function (a, b) {
            return a.title === b.title ? 0 : b.title.localeCompare(a.title);
        });
        filter.delivery.values = this.uniqueArray(filter.delivery.values);
        this.filterExclude(filter);
        this.params.defaultfilter = filter;
        return filter;
    };
    PartViewList.prototype.getFilterVals = function () {
        let globalParams = this.getGlobalParams();
        return typeof globalParams.filter !== 'undefined' ? globalParams.filter.vals : {};
    };
    // РёСЃРєР»СЋС‡Р°РµРј СЃРІРѕР№СЃС‚РІР° С„РёР»СЊС‚СЂР°
    PartViewList.prototype.filterExclude = function (filter) {
        if (typeof this.params.filterExclude == 'object') {
            for (let i in this.params.filterExclude) {
                if (!this.params.filterExclude.hasOwnProperty(i)) continue;
                if (typeof filter[this.params.filterExclude[i]] != "undefined") {
                    delete filter[this.params.filterExclude[i]];
                }
            }
        }
    };
    // РіСЂСѓРїРїРёСЂРѕРІРєР° РїРѕ Р±СЂРµРЅРґ/Р°СЂС‚РёРєСѓР»Сѓ, С„РѕСЂРјРёСЂСѓРµРј РѕР±СЊРµРєС‚С‹ РґР»СЏ РєР°Р¶РґРѕР№ РіСЂСѓРїРїС‹ РІ partList
    PartViewList.prototype.group = function () {
        let globalParams = this.getGlobalParams();
        let groupParts = {};
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
                // РїСЂРё РїРµСЂРµСЃРѕСЂС‚РёСЂРѕРІРєРµ РіСЂСѓРїРїРёСЂСѓРµРј С‚РѕР»СЊРєРѕ СЃРѕСЃРµРґРЅРёРµ СЌР»РµРјРµРЅС‚С‹
                if (globalParams.resort === true) {
                    if (oldkey && oldkey !== key && typeof groupParts[key] !== 'undefined') {
                        gr++;
                        key = key + '|' + gr;
                    } else if (oldkey && oldkey === key) {
                        key = oldkeyfull;
                    }
                }
                if (typeof groupParts[key] == 'undefined') {
                    groupParts[key] = {
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
                groupParts[key].offers.push(part);
                if (!part.obOffer.el.classList.contains('filter-hidden')) {
                    groupParts[key].shown++;
                }
                oldkey = current_key;
                oldkeyfull = key;
            }
        }

        this.partList = [];
        for (let i in groupParts) {
            if (!groupParts.hasOwnProperty(i)) continue;
            let part = groupParts[i];
            // СЃРєСЂС‹РІР°РµРј РіСЂСѓРїРїСѓ, РµСЃР»Рё РІСЃРµ РїСЂРµРґР»РѕР¶РµРЅРёСЏ РіСЂСѓРїРїС‹ СЃРєСЂС‹С‚С‹
            if (part.shown > 0) {
                this.partList.push(new this.ViewItem(part, this.params));
            }
        }
    };
    // СЃРѕР·РґР°РµРј СЂР°Р·РґРµР»С‹ Рё РіСЂСѓРїРїС‹
    PartViewList.prototype.showPartList = function () {
        let tbody = BX.findChild(BX(this.el), {'tag': 'tbody'}, true);
        // СЃРѕР·РґР°РµРј СЂР°Р·РґРµР»С‹, РѕС‚РѕР±СЂР°Р¶Р°РµРј РіСЂСѓРїРїС‹ СЃ РѕРіСЂР°РЅРёС‡РµРЅРёРµРј РїРѕ groupsCount
        let showGroupsCount = 0;
        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i];
            tbody.appendChild(group.el);

            let cnti = 0;
            for (let j in this.partList) {
                if (!this.partList.hasOwnProperty(j)) continue;
                let part = this.partList[j];
                if (part.data.group_id === group.id) {
                    if (!part.el.classList.contains('filter-hidden')) {
                        cnti++;
                    }
                    if (cnti > this.params.groupsCount) {
                        part.el.classList.add('hidden');
                        //part.el.classList.add('showall');
                        part.el.classList.add('groupall' + group.id);
                        part.elMobile.classList.add('hidden');
                        //part.elMobile.classList.add('showall');
                        part.elMobile.classList.add('groupall' + group.id);
                    }
                    tbody.appendChild(part.elMobile);
                    tbody.appendChild(part.el);
                }
            }
            if (cnti > this.params.groupsCount) {
                let groupAll = this.createElementFromTemplate(this.groupAllTemplate, {"group": group.id});
                tbody.appendChild(groupAll);
            }
            // СЃРєСЂС‹РІР°РµРј СЂР°Р·РґРµР», РµСЃР»Рё РІСЃРµ РіСЂСѓРїРїС‹ РІ РЅРµРј СЃРєСЂС‹С‚С‹
            if (cnti === 0 || this.params.hideSections === true) {
                group.el.classList.add('filter-hidden');
            }
            if (cnti > 0) {
                showGroupsCount++;
            }
        }
        if (showGroupsCount === 0) {
            this.container_nodata.classList.remove('hidden');
        }
    };
    // РїРѕРґРїРёСЃРєР° СЃРѕР±С‹С‚РёР№
    PartViewList.prototype.bindEvents = function () {
        let sortButtons = BX.findChild(BX(this.el), {"tag": "th", "class": "header"}, true, true);
        let self = this;
        sortButtons.forEach(function (element) {
            BX.bind(BX(element), 'click', self.resort.bind(self, element.getAttribute('data-by'), element.getAttribute('data-sort')));
        });
        let showMore = BX.findChild(this.el, {attribute: {id: 'groupShowAll'}}, true);
        BX.bind(showMore, 'click', function () {
            let expanded = this.getAttribute('expanded') === "true";
            let group = this.getAttribute('data-group');
            let offersTable = BX.findChild(BX(self.el), {"tag": "tr", "class": "groupall" + group}, true, true);
            offersTable.forEach(function (element) {
                if (expanded) {
                    element.classList.add('hidden');
                } else {
                    element.classList.remove('hidden');
                }
            });
            this.setAttribute('expanded', !expanded);
            let table_next_full_link = BX.findChild(showMore, {tag: 'button', className: 'table_next_full_link'}, true);
            if (expanded) {
                table_next_full_link.classList.remove('active');
            } else {
                table_next_full_link.classList.add('active');
            }
        });
    };
    // РїРµСЂРµСЃРѕСЂС‚РёСЂРѕРІРєР°
    PartViewList.prototype.resort = function () {
        this.setGlobalParams('resort', true);
        this.execSort(arguments[0], arguments[1]);
    };
    // РїСЂРёРјРµРЅРµРЅРёРµ С„РёР»СЊС‚СЂР°
    PartViewList.prototype.setFilter = function (vals) {
        this.execFilter(vals);
    };
    PartViewList.prototype.params = {};
    PartViewList.prototype.getGlobalParams = function () {
        if (typeof window.PartViewList.prototype.params[this.params.id] === 'undefined') {
            window.PartViewList.prototype.params[this.params.id] = {};
        }
        return window.PartViewList.prototype.params[this.params.id];
    };
    PartViewList.prototype.setGlobalParams = function (key, val) {
        if (typeof window.PartViewList.prototype.params[this.params.id] === 'undefined') {
            window.PartViewList.prototype.params[this.params.id] = {};
        }
        window.PartViewList.prototype.params[this.params.id][key] = val;
    };

    /* Р­Р»РµРјРµРЅС‚ СЃРїРёСЃРѕС‡РЅРѕРіРѕ РІРёРґР° */
    var PartViewListItem = function (data, options) {
        this.params = {};
        this.data = data;
        this.data.mainPicture = this.data.picture[0];
        this.params = this.extend(this.params, options);
        this.init();
    };
    PartViewListItem.prototype = Object.create(PartView.prototype);
    PartViewListItem.prototype.constructor = PartView;
    // РїСЂРёРѕСЂРёС‚РµС‚ С‚РѕРІР°СЂРѕРІ РІ РіСЂСѓРїРїРµ
    PartViewListItem.prototype.init = function () {
        let elHTML = this.params.parent.itemTemplate.trim();
        this.el = this.createElementFromTemplate(elHTML, this.data);
        this.elMobile = this.createElementFromTemplate(this.params.parent.itemMobileTemplate.trim(), this.data);

        // С„РѕСЂРјРёСЂСѓРµРј offersList
        if (typeof this.offersList === 'undefined') {
            this.offersList = [];
            for (let i in this.data.offers) {
                if (!this.data.offers.hasOwnProperty(i)) continue;
                let offer = this.data.offers[i];
                this.offersList.push(offer.obOffer);
            }
        }
    };
    PartViewListItem.prototype.exec = function () {
        let offersTable = this.el.querySelector('.left-td_search_3view table tbody');
        // РіСЂСѓРїРїРёСЂСѓРµРј РїРѕ РїСЂРёРѕСЂРёС‚РµС‚Сѓ
        //this.sort(arguments[0], arguments[1]);
        this.checkPriority();
        this.groupOffers();
        // РѕС‚РѕР±СЂР°Р¶Р°РµРј РІ С‚Р°Р±Р»РёС†Рµ
        for (let i in this.offersList) {
            if (!this.offersList.hasOwnProperty(i)) continue;
            offersTable.appendChild(this.offersList[i].el);
        }
        this.bindOffersExpand();
        this.bindEvents();
    };
    PartViewListItem.prototype.offersSort = function (by, order, a, b) {
        let backOrder = -1 * order;
        let aData = typeof a.data !== 'undefined' ? a.data : a,
            bData = typeof b.data !== 'undefined' ? b.data : b;
        switch (by) {
            case 'article':
                return backOrder * (("" + aData.article).localeCompare("" + bData.article));
            case 'name':
                return backOrder * (aData.title.localeCompare(bData.title));
            case 'price':
                return parseFloat(aData.price_src) < parseFloat(bData.price_src) ? order : backOrder;
            case 'profit':
                return parseFloat(aData.profit_src) < parseFloat(bData.profit_src) ? order : backOrder;
            case 'quantity':
                return parseFloat(aData.quantity) < parseFloat(bData.quantity) ? order : backOrder;
            case 'delivery':
                return parseFloat(aData.delivery) < parseFloat(bData.delivery) ? order : backOrder;
        }
        return 0;
    };
    PartViewListItem.prototype.checkPriority = function () {
        let partListNew = [];
        let partListNewHash = [];
        let minStore = -1, minPrice = -1, minDelivery = -1, minStoreIndex = null,
            minDeliveryIndex = null, minPriceIndex = null;
        let countOffers = this.params.offersCount;

        let globalParams = this.getGlobalParams();
        if (globalParams.resort === true) {
            let c = countOffers;
            for (let i in this.offersList) {
                if (!this.offersList.hasOwnProperty(i)) continue;
                let part = this.offersList[i];
                if (part.el.classList.contains('filter-hidden')) continue;
                part.best = 1;
                partListNew.push(part);
                partListNewHash.push(part.data.hash);
                c--;
                if (c === 0)
                    break;
            }
        } else {
            // РёС‰РµРј СЃРѕР±СЃС‚РІРµРЅРЅРѕРµ РЅР°Р»РёС‡РёРµ
            for (let i in this.offersList) {
                if (!this.offersList.hasOwnProperty(i)) continue;
                let part = this.offersList[i];
                if (part.el.classList.contains('filter-hidden')) continue;
                let price = parseFloat(part.data.price_src),
                    store = parseFloat(part.data.own_store),
                    delivery = parseFloat(part.data.delivery);
                if ((minStore === -1 || store < minStore) && store === 0) {
                    minStore = store;
                    minStoreIndex = part;
                    minStoreIndex.best = 1;
                }
            }
            let ownStorePrice = minStoreIndex ? parseFloat(minStoreIndex.data.price_src) : -1,
                ownStoreStore = minStoreIndex ? parseFloat(minStoreIndex.data.own_store) : -1,
                ownStoreDelivery = minStoreIndex ? parseFloat(minStoreIndex.data.delivery) : -1;
            // РёС‰РµРј РЈРџ РїРѕ РЅР°РёРјРµРЅСЊС€РµР№ С†РµРЅРµ
            for (let i in this.offersList) {
                if (!this.offersList.hasOwnProperty(i)) continue;
                let part = this.offersList[i];
                if (part.el.classList.contains('filter-hidden')) continue;
                let price = parseFloat(part.data.price_src),
                    store = parseFloat(part.data.own_store),
                    delivery = parseFloat(part.data.delivery);
                if ((minPrice === -1 || price < minPrice) &&
                    (ownStorePrice === -1 || price < ownStorePrice) && store === 1) {
                    minPrice = price;
                    minPriceIndex = part;
                    minPriceIndex.best = 1;
                }
            }
            let partPricePrice = minPriceIndex ? parseFloat(minPriceIndex.data.price_src) : -1,
                partPriceStore = minPriceIndex ? parseFloat(minPriceIndex.data.own_store) : -1,
                partPriceDelivery = minPriceIndex ? parseFloat(minPriceIndex.data.delivery) : -1;
            // РёС‰РµРј РЈРџ РїРѕ РЅР°РёРјРµРЅСЊС€РµРјСѓ СЃСЂРѕРєСѓ РґРѕСЃС‚Р°РІРєРё
            for (let i in this.offersList) {
                if (!this.offersList.hasOwnProperty(i)) continue;
                let part = this.offersList[i];
                if (part.el.classList.contains('filter-hidden')) continue;
                let price = parseFloat(part.data.price_src),
                    store = parseFloat(part.data.own_store),
                    delivery = parseFloat(part.data.delivery);
                if ((minDelivery === -1 || delivery < minDelivery) &&
                    (ownStorePrice === -1 || price < ownStorePrice) &&
                    (partPriceDelivery === -1 || delivery < partPriceDelivery) &&
                    store === 1) {
                    minDelivery = delivery;
                    minDeliveryIndex = part;
                    minDeliveryIndex.best = 1;
                }
            }
            let partDeliveryPrice = minDeliveryIndex ? parseFloat(minDeliveryIndex.data.price_src) : -1,
                partDeliveryStore = minDeliveryIndex ? parseFloat(minDeliveryIndex.data.own_store) : -1,
                partDeliveryDelivery = minDeliveryIndex ? parseFloat(minDeliveryIndex.data.delivery) : -1;

            /*
             * РµСЃР»Рё Р·Р°РїС‡Р°СЃС‚СЊ РїРѕ РЅР°РёРјРµРЅСЊС€РµР№ С†РµРЅРµ Рё Р·Р°РїС‡Р°СЃС‚СЊ СЃ СЃР°РјРѕР№ Р±С‹СЃС‚СЂРѕР№ РґРѕСЃС‚Р°РІРєРѕР№ РѕРґРёРЅР°РєРѕРІС‹ РїРѕ С†РµРЅРµ
             * С‚Рѕ РѕСЃС‚Р°РІР»СЏРµРј С‚РѕР»СЊРєРѕ СЃ РЅР°РёРјРµРЅСЊС€РёРј СЃСЂРѕРєРѕРј РґРѕСЃС‚Р°РІРєРё
             */
            if (minPriceIndex && minDeliveryIndex && partPricePrice === partDeliveryPrice) {
                minPriceIndex = null;
            }

            if (minStoreIndex) {
                partListNew.push(minStoreIndex);
                partListNewHash.push(minStoreIndex.data.hash);
            }
            if (minPriceIndex &&
                (minStoreIndex === null || (minStoreIndex && minPriceIndex !== minStoreIndex))
            ) {
                partListNew.push(minPriceIndex);
                partListNewHash.push(minPriceIndex.data.hash);
            }
            if (minDeliveryIndex &&
                (minStoreIndex === null || (minStoreIndex && minDeliveryIndex !== minStoreIndex)) &&
                (minPriceIndex === null || (minPriceIndex && minDeliveryIndex !== minPriceIndex))
            ) {
                partListNew.push(minDeliveryIndex);
                partListNewHash.push(minDeliveryIndex.data.hash);
            }
        }

        if (this.offersList.length > 0) {
            let c = countOffers;
            for (let i in this.offersList) {
                if (!this.offersList.hasOwnProperty(i)) continue;
                if (partListNewHash.indexOf(this.offersList[i].data.hash) > -1) {
                    continue;
                }
                this.offersList[i].best = 0;
                partListNew.push(this.offersList[i]);
            }
        }
        this.offersList = partListNew;
    };
    PartViewListItem.prototype.groupOffers = function () {
        let showMore = BX.findChild(this.el, {class: 'tr_group_link_table'}, true),
            expanded = showMore.getAttribute('expanded');
        expanded = !(expanded == null || expanded === 'false');
        let cntVisible = 0;
        let cntAll = 0;
        for (let i in this.offersList) {
            if (!this.offersList.hasOwnProperty(i)) continue;
            let offer = this.offersList[i];
            offer.el.classList.remove('hidden');
            offer.el.classList.remove('offers-hidden');
        }
        for (let i in this.offersList) {
            if (!this.offersList.hasOwnProperty(i)) continue;
            let offer = this.offersList[i];
            if (offer.el.classList.contains('filter-hidden')) continue;
            if (offer.best === 0/* && !expanded*/) {
                offer.el.classList.add('hidden');
                offer.el.classList.add('offers-hidden');
            } else {
                cntVisible++;
            }
            cntAll++;
        }
        if (cntAll > cntVisible) {
            showMore.classList.remove('hidden');
            BX.findChild(BX(showMore), {class: 'lca_number'}, true).innerHTML = '(' + (cntAll - cntVisible) + ')';
        } else {
            showMore.classList.add('hidden');
        }
    };
    PartViewListItem.prototype.bindEvents = function () {
        BX.bindDelegate(document.body, 'click', {class: 'info_ico'}, BX.proxy(this.showInfo, this));
    };
    PartViewListItem.prototype.bindOffersExpand = function () {
        let showMore = BX.findChild(this.el, {class: 'tr_group_link_table'}, true);
        BX.bind(showMore, 'click', BX.proxy(PartViewListItem.prototype.showMoreClick, this));
    };
    PartViewListItem.prototype.showMoreClick = function (event) {
        let offersTable = this.el.querySelector('.left-td_search_3view table tbody');
        let expanded = event.currentTarget.getAttribute('expanded');
        expanded = !(expanded == null || expanded === 'false');
        let rows = BX.findChildren(offersTable, {tag: 'tr', className: 'offers-hidden'}, true);
        for (let i in rows) {
            if (!rows.hasOwnProperty(i)) continue;
            if (expanded) {
                rows[i].classList.add('hidden');
            } else {
                rows[i].classList.remove('hidden');
            }
        }
        event.currentTarget.setAttribute('expanded', !expanded);
        let table_next_full_link = BX.findChild(event.currentTarget, {
            tag: 'button',
            className: 'table_next_full_link'
        }, true);
        if (expanded) {
            table_next_full_link.classList.remove('active');
        } else {
            table_next_full_link.classList.add('active');
        }
    };
    PartViewListItem.prototype.showInfo = function (event) {
        event.preventDefault();
        let infoButton = BX.findChild(this.el, {class: 'info_ico'}, true);
        let element = event.target || event.srcElement || event.targetElement;
        if (!infoButton.isEqualNode(element)) {
            return;
        }
        element = $(element);
        let uid = element.data('uid');
        let article = element.data('article');
        let brand_title = element.data('brand');
        let car_uid = window.car_uid;
        let entity_code = window.entity_code;
        let title = element.attr('title');
        let modalId = element.attr('href');
        let hide_edit_panel = element.data('hideEditPanel');
        let modal_div = $(modalId);

        let ajax_info_url = "/bitrix/templates/e-comexpert_v2/components/w247.wssync/ws.search.results/.default/ajax/info.php";
        modal_div.find(".info_modal_title").html(element.data('article-modal'));
        modal_div.find(".modal-title").html(title);
        modal_div.find(".modal-body").html('<div class="w247-catalog-loader"><div class="w247-loader-inner"></div></div>');

        $.get(
            ajax_info_url, {
                entity_code: entity_code,
                uid: uid,
                article: article,
                brand_title: brand_title,
                car_uid: car_uid,
                HIDE_EDIT_PANEL: hide_edit_panel,
                sessid: BX.bitrix_sessid()
            },
            function (data) {
                modal_div.find(".modal-body").html(data);
                modal_div.find(".wssync-part-edit-panel input[name=sessid]").val(BX.bitrix_sessid());
            }
        );
    };
    PartViewListItem.prototype.getGlobalParams = PartViewList.prototype.getGlobalParams;
    PartViewListItem.prototype.setGlobalParams = PartViewList.prototype.setGlobalParams;

    /* Р­Р»РµРјРµРЅС‚ С‚Р°Р±Р»РёС†С‹ РїСЂРµРґР»РѕР¶РµРЅРёР№ cРїРёСЃРѕС‡РЅРѕРіРѕ РІРёРґР° */
    var PartViewListSubItem = function (data, options) {
        this.params = {};
        this.data = data;
        this.extend(this.params, options);
        this.init();
    };
    PartViewListSubItem.prototype = Object.create(PartView.prototype);
    PartViewListSubItem.prototype.constructor = PartView;
    PartViewListSubItem.prototype.init = function () {
        this.createElement();
        this.bindEvents();
    };
    PartViewListSubItem.prototype.createElement = function () {
        let elHTML = this.params.parent.subItemTemplate.trim();
        if(this.data.delivery == 0){
            this.data.delivery_time = '<div class="label_in_stock"><span class="label_in_stock__ico icon-ion-checkmark-circle"></span><span class="label_in_stock__text">' + BX.message("CATALOG_LIST_ON_STOCK") + '</span></div>';
        }
        this.el = this.createElementFromTemplate(elHTML, this.data);
    };
    PartViewListSubItem.prototype.bindEvents = function () {
        var add2cartButton = BX.findChild(BX(this.el), {attribute: {id: 'part_request'}}, true);
        BX.bind(add2cartButton, 'click', this.add2cart.bind(this));
    };
    PartViewListSubItem.prototype.add2cart = function (event) {
        event.preventDefault();
        add2cartAjax(this.data.hash, this.data.buy_params, this.data.quantity, this.data.article_for_request);
        return false;
    };


    window.PartViewList = PartViewList;
    window.PartViewListItem = PartViewListItem;
    window.PartViewListSubItem = PartViewListSubItem;
})();