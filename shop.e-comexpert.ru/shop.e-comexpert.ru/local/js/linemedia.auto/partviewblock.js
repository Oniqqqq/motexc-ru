;(function () {
    /* Р‘Р»РѕС‡РЅС‹Р№ РІРёРґ */
    var PartViewBlock = function (data) {
        this.params = {item: {}, parent: this, groupsCount: 20};
        this.extend(this.params, data.params);

        this.el = null;
        this.data = data;
        this.itemTemplate = templates.block.item;
        this.containerTemplate = templates.block.container;
        this.groupAllTemplate = templates.block.groupAll;

        this.container = BX(this.params.VIEW_ID_LIST.CONTAINER);
        this.container_nodata = BX(this.params.VIEW_ID_LIST.NODATA);
        this.sort_block = document.body.querySelector('.wrap_sort .sort_block');
        this.sort_select = document.body.querySelector('.wrap_sort .sort_block select');
        BX.bind(this.sort_select, 'change', BX.delegate(this.sortSelectChange, this));

        this.ViewItem = this.params['viewitem'] ? this.params['viewitem'] : PartViewBlockItem;
    };
    PartViewBlock.prototype = Object.create(PartView.prototype);
    PartViewBlock.prototype.constructor = PartView;

    PartViewBlock.prototype.exec = function () {
        // РѕС‚РѕР±СЂР°Р¶Р°РµРј Р±Р»РѕРє СЃРѕСЂС‚РёСЂРѕРІРєРё
        this.sort_block.classList.remove('hidden');
        // РѕС‡РёС‰Р°РµРј РєРѕРЅС‚РµР№РЅРµСЂ, РѕС‚РѕР±СЂР°Р¶Р°РµРј РїСЂРµР»РѕР°РґРµСЂ
        this.empty(this.container);
        this.container_nodata.classList.add('hidden');
        //this.container.innerHTML = templates.preloader;
        // СЃРѕР·РґР°РµРј el Рё РѕС‚РѕР±СЂР°Р¶Р°РµРј header С‚Р°Р±Р»РёС†С‹
        this.el = document.createElement('div');
        let header = this.createElementFromTemplate(this.containerTemplate, {});
        this.el.appendChild(header);

        // С„РёР»СЊС‚СЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ
        this.filter(arguments[0]);
        // РіСЂСѓРїРїРёСЂСѓРµРј РїСЂРµРґР»РѕР¶РµРЅРёСЏ
        this.group();
        // СЂР°СЃСЃС‚Р°РІР»СЏРµРј РїРѕ РїСЂРёРѕСЂРёС‚РµС‚Сѓ РІРЅСѓС‚СЂРё РіСЂСѓРїРїС‹
        for (let i in this.partList) {
            if (!this.partList.hasOwnProperty(i)) continue;
            this.partList[i].exec();
        }
        // СЃРѕСЂС‚РёСЂСѓРµРј РіСЂСѓРїРїС‹
        this.sortGroup(arguments[1], arguments[2]);
        // РѕС‚РѕР±СЂР°Р¶Р°РµРј partList
        this.showPartList();
        this.bindEvents();

        // СѓР±РёСЂР°РµРј РїСЂРµР»РѕР°РґРµСЂ Рё РѕС‚РѕР±СЂР°Р¶Р°РµРј РІС‹РґР°С‡Сѓ
        this.empty(this.container);
        this.container.appendChild(this.el);

        if ($.fn.popover) {
            $('[data-toggle="popover"]').popover();
        }
        if ($.fn.tooltip) {
            $('[data-toggle="tooltip-hover"]').tooltip();
        }
    };
    PartViewBlock.prototype.execSort = PartViewList.prototype.execSort;
    PartViewBlock.prototype.execFilter = PartViewList.prototype.execFilter;
    PartViewBlock.prototype.show = function () {
        if (this.sort_select.value === '') {
            this.exec();
        } else {
            BX.fireEvent(this.sort_select, 'change');
        }
    };
    PartViewBlock.prototype.sortGroup = function (by, order) {
        let globalParams = this.getGlobalParams();
        let reset = by === '';
        if (reset) {
            delete globalParams.resort;
            delete globalParams.sort;
        }

        let by_default = 'price';
        let order_default = -1;
        by = typeof by == 'undefined' || by === null ?
            (typeof globalParams.sort != 'undefined' ? globalParams.sort.by : by_default) :
            (by !== '' ? by : by_default);
        order = typeof order == 'undefined' || order === null ?
            (typeof globalParams.sort != 'undefined' ? globalParams.sort.order : order_default) : (order === 'asc' ? -1 : 1);

        if (reset) {
            this.sort_select.value = '';
        } else if (globalParams.resort) {
            // РїСЂРѕРІРµСЂСЏРµРј РµСЃС‚СЊ Р»Рё С‚Р°РєРѕР№ РїСѓРЅРєС‚ СЃРѕСЂС‚РёСЂРѕРІРєРё РІ СЃРµР»РµРєС‚Рµ
            let option_value = by + '_' + (order === -1 ? 'asc' : 'desc');
            let option = this.sort_select.querySelector('option[value="' + option_value + '"]');
            if (option !== null) {
                this.sort_select.value = option_value;
            } else {
                // РµСЃР»Рё С‚Р°РєРѕРіРѕ РїСѓРЅРєС‚Р° РЅРµС‚Сѓ, С‚Рѕ СЃР±СЂР°СЃС‹РІР°РµРј РЅР°СЃС‚СЂРѕР№РєРё СЃРѕСЂС‚РёСЂРѕРІРєРё
                this.sort_select.value = '';
                delete globalParams.resort;
                delete globalParams.sort;
                by = by_default;
                order = order_default;
            }
        }
        if ($.fn.selectpicker) {
            $(this.sort_select).selectpicker('render');
        }

        let backOrder = -1 * order;
        this.partList.sort(function (a, b) {
            let aData = a.bestOffer,
                bData = b.bestOffer;
            let res = 0;
            switch (by) {
                case 'article':
                    res = backOrder * (("" + aData.article).localeCompare("" + bData.article));
                    break;
                case 'name':
                    res = backOrder * (aData.title.localeCompare(bData.title));
                    break;
                case 'price':
                    res = parseFloat(aData.price_src) < parseFloat(bData.price_src) ? order : backOrder;
                    break;
                case 'profit':
                    res = parseFloat(aData.profit_src) < parseFloat(bData.profit_src) ? order : backOrder;
                    break;
                case 'quantity':
                    res = aData.quantity < bData.quantity ? order : backOrder;
                    break;
                case 'delivery':
                    res = aData.delivery < bData.delivery ? order : backOrder;
                    break;
            }
            if (globalParams.resort) {
                return res;
            } else {
                if (aData.group_id === bData.group_id) {
                    return res;
                } else {
                    return bData.group_id.localeCompare(aData.group_id);
                }
            }
        });

        if (globalParams.resort) {
            globalParams.sort = {
                by: by,
                order: order
            };
        }
    };
    PartViewBlock.prototype.filter = function (vals) {
        let globalParams = this.getGlobalParams();
        vals = typeof vals == 'undefined' || vals === null ?
            (typeof globalParams.filter != 'undefined' ? globalParams.filter.vals : {}) : vals;
        let filter = this.getFilterDefault();
        // СѓРґР°Р»СЏРµРј РєР»Р°СЃСЃ filter-hidden СЃ СЂР°Р·РґРµР»РѕРІ Рё РїСЂРµРґР»РѕР¶РµРЅРёР№
        for (let i in this.data.groups) {
            if (!this.data.groups.hasOwnProperty(i)) continue;
            let group = this.data.groups[i];
            for (let j in this.data.parts[group.id]) {
                if (!this.data.parts[group.id].hasOwnProperty(j)) continue;
                let part = this.data.parts[group.id][j];
                part.filter_hidden = false;
                //part.obOffer.el.classList.remove('filter-hidden');
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
                            if (part.filter_hidden) continue;
                            // if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                            let partValue = Math.round(parseFloat(part[i]));
                            if (i === 'delivery') {
                                partValue = Math.ceil(partValue / 24);
                            }
                            if (partValue < vals[i].min || partValue > vals[i].max) {
                                part.filter_hidden = true;
                                // part.obOffer.el.classList.add('filter-hidden');
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
                            if (part.filter_hidden) continue;
                            // if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                            if (vals[i].indexOf(part[i]) === -1) {
                                part.filter_hidden = true;
                                // part.obOffer.el.classList.add('filter-hidden');
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
                            if (part.filter_hidden) continue;
                            // if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                            let set = false;
                            for (let l in vals[i]) {
                                if (!vals[i].hasOwnProperty(l)) continue;
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
                                part.filter_hidden = true;
                                // part.obOffer.el.classList.add('filter-hidden');
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
    PartViewBlock.prototype.getFilterDefault = PartViewList.prototype.getFilterDefault;
    PartViewBlock.prototype.getFilterVals = PartViewList.prototype.getFilterVals;
    PartViewBlock.prototype.filterExclude = PartViewList.prototype.filterExclude;
    PartViewBlock.prototype.group = function () {
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
                if (part.filter_hidden) continue;
                // if (part.obOffer.el.classList.contains('filter-hidden')) continue;
                if (typeof groupParts[key] == 'undefined') {
                    groupParts[key] = this.extend(part, {
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
                        shown: 0,
                    });
                }
                groupParts[key].offers.push(part);
                if (!part.filter_hidden) {
                    // if (!part.obOffer.el.classList.contains('filter-hidden')) {
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
    PartViewBlock.prototype.showPartList = function () {
        let row = BX.findChild(BX(this.el), {'class': 'site_view_result__item'}, true);
        // РѕС‚РѕР±СЂР°Р¶Р°РµРј РіСЂСѓРїРїС‹ СЃ РѕРіСЂР°РЅРёС‡РµРЅРёРµРј РїРѕ groupsCount
        let cnti = 0;
        for (let j in this.partList) {
            if (!this.partList.hasOwnProperty(j)) continue;
            let part = this.partList[j];
            cnti++;
            if (cnti > this.params.groupsCount) {
                part.el.classList.add('hidden');
                part.el.classList.add('groupall');
            }
            row.appendChild(part.el);
        }
        if (cnti > this.params.groupsCount) {
            let groupAll = this.createElementFromTemplate(this.groupAllTemplate, {"group": "groupall"});
            row.appendChild(groupAll);
        }
        if (cnti === 0) {
            this.container_nodata.classList.remove('hidden');
        }
    };
    PartViewBlock.prototype.sortSelectChange = function (event) {
        BX.PreventDefault(event);
        let select = event.currentTarget;
        let arSort = select.value.split("_"),
            sort = arSort[0],
            order = arSort[1];
        this.resort(sort, order);
    };
    PartViewBlock.prototype.bindEvents = function () {
        let showMore = BX.findChild(this.el, {attribute: {id: 'groupShowAll'}}, true);
        BX.bind(showMore, 'click', BX.delegate(function (event) {
            let current = event.currentTarget;
            let expanded = current.getAttribute('expanded') === "true";
            let offersTable = BX.findChild(BX(this.el), {"tag": "div", "class": "groupall"}, true, true);
            offersTable.forEach(function (element) {
                if (expanded) {
                    element.classList.add('hidden');
                } else {
                    element.classList.remove('hidden');
                }
            });
            current.setAttribute('expanded', !expanded);
            let table_next_full_link = BX.findChild(showMore, {tag: 'button', className: 'table_next_full_link'}, true);
            if (expanded) {
                table_next_full_link.classList.remove('active');
            } else {
                table_next_full_link.classList.add('active');
            }
        }, this));
    };
    PartViewBlock.prototype.resort = PartViewList.prototype.resort;
    PartViewBlock.prototype.setFilter = PartViewList.prototype.setFilter;
    PartViewBlock.prototype.params = {};
    PartViewBlock.prototype.getGlobalParams = PartViewList.prototype.getGlobalParams;
    PartViewBlock.prototype.setGlobalParams = PartViewList.prototype.setGlobalParams;


    /* Р­Р»РµРјРµРЅС‚ Р±Р»РѕС‡РЅРѕРіРѕ РІРёРґР° */
    var PartViewBlockItem = function (data, options) {
        this.params = {};
        this.data = data;
        this.params = this.extend(this.params, options);
        this.init();
    };
    PartViewBlockItem.prototype = Object.create(PartView.prototype);
    PartViewBlockItem.prototype.constructor = PartView;
    PartViewBlockItem.prototype.init = function () {
    };
    PartViewBlockItem.prototype.exec = function () {
        // РёС‰РµРј Р»СѓС‡С€РµРµ РїСЂРµРґР»РѕР¶РµРЅРёРµ РІ РіСЂСѓРїРїРµ
        this.findBestOffer();
        this.el = this.createElementFromTemplate(this.params.parent.itemTemplate.trim(), this.bestOffer);
         if (this.bestOffer.group_id === "group_N" && (typeof this.params.hideLabelStock === 'undefined' || !this.params.hideLabelStock)) {
             this.el.querySelector('.stock_block').classList.remove('hidden');
         }
        this.bindEvents();
    };
    PartViewBlockItem.prototype.findBestOffer = function () {
        this.bestOffer = null;
        let minStore = -1, minPrice = -1, minDelivery = -1,
            minStoreIndex = null, minDeliveryIndex = null, minPriceIndex = null;
        for (let k in this.data.offers) {
            if (!this.data.offers.hasOwnProperty(k)) continue;
            let offer = this.data.offers[k];
            let price = parseFloat(offer.price_src),
                store = parseFloat(offer.own_store),
                delivery = parseFloat(offer.delivery);
            if (minStore === -1 || minStore > store) {
                minStore = store;
                minStoreIndex = offer;
            }
            if (minPrice === -1 || minPrice > price) {
                minPrice = price;
                minPriceIndex = offer;
            }
            if (minDelivery === -1 || minDelivery > delivery) {
                minDelivery = delivery;
                minDeliveryIndex = offer;
            }
        }
        this.bestOffer = minPriceIndex;
        this.bestOffer.mainPicture = this.bestOffer.picture[0];
    };
    PartViewBlockItem.prototype.bindEvents = function () {
        var add2cartButton = BX.findChild(BX(this.el), {attribute: {'data-target': "#partRequestModal"}}, true);
        BX.bind(BX(add2cartButton), 'click', this.add2cart.bind(this));
    };
    PartViewBlockItem.prototype.add2cart = function (event) {
        event.preventDefault();
        add2cartAjax(this.bestOffer.hash, this.bestOffer.buy_params, this.bestOffer.quantity, this.bestOffer.article_for_request);
        return false;
    };
    PartViewBlockItem.prototype.getGlobalParams = PartViewBlock.prototype.getGlobalParams;
    PartViewBlockItem.prototype.setGlobalParams = PartViewBlock.prototype.setGlobalParams;

    window.PartViewBlock = PartViewBlock;
    window.PartViewBlockItem = PartViewBlockItem;
})();