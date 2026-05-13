(function (window) {
    'use strict';

    if (window.W247CatalogsSection)
        return;

    window.W247CatalogsSection = function (arParams) {
        this.obCont = null;

        this.errorCode = 0;
        if (typeof arParams === 'object') {
            this.params = arParams;
        }
        if (this.errorCode === 0) {
            BX.ready(BX.delegate(this.init, this));
        }
    };

    window.W247CatalogsSection.prototype.init = function () {
        this.cookie = new CatalogsCookie(this.params.cookie_template);
        this.obCont = BX('W247CatalogsSectionCont' + this.params.id);
        this.obViewCont = BX('W247CatalogsSectionViewCont' + this.params.id);
        this.obSelectViewCont = BX('W247CatalogsSectionSelectViewCont' + this.params.id);
        this.modalMoreOptionLoadScripts = false;
        this.obModalMoreOption = BX('W247CatalogsSectionModalMoreOption' + this.params.id);
        this.obModalMoreOptionImg = BX('W247CatalogsSectionModalMoreOptionImg' + this.params.id);
        this.obModalMoreOptionOptions = BX('W247CatalogsSectionModalMoreOptionOptions' + this.params.id);
        this.obModalMoreOption4Options = BX('W247CatalogsSectionModalMoreOption4Options' + this.params.id);
        this.obModalMoreOptionOtherOptions = BX('W247CatalogsSectionModalMoreOptionOtherOptions' + this.params.id);
        this.obModalMoreOptionOptionsCollapse = BX('W247CatalogsSectionModalMoreOptionOptionsCollapse' + this.params.id);
        this.obModalMoreOptionPreloader = BX('W247CatalogsSectionModalMorePreloader' + this.params.id);
        this.obModalMoreOptionAppliance = BX('W247CatalogsSectionModalMoreOptionAppliance' + this.params.id);
        this.obPreloader = BX('W247CatalogsSectionPreloader' + this.params.id);
        BX.bindDelegate(this.obSelectViewCont, 'click', {tag: 'li'}, BX.delegate(this.onChangeSelectView, this));
        $(this.obCont).delegate("#W247CatalogsSectionModalMoreOption" + this.params.id, 'show.bs.modal',
            BX.delegate(this.onModalMoreOptionShow, this));
        BX.bindDelegate(this.obCont, 'change', {attribute: {id: 'W247CatalogsSection' + this.params.id + 'PaginationSelector'}},
            BX.delegate(this.onChangePaginationSelector, this));
        window.addEventListener("resize", BX.delegate(this.onWindowResize, this));
        if (this.params.calc_ind_prices) {
            this.updatePrices();
        }
    };

    // on change pagination selector
    window.W247CatalogsSection.prototype.updatePrices = function () {
        this.BXshowWait();
        BX.ajax({
            method: 'POST',
            dataType: 'json',
            data: {
                articles: this.params.articles_prices,
            },
            url: this.params.ajax_price_url,
            onsuccess: BX.proxy(function (result) {
                this.BXcloseWait();
                if (typeof result.prices !== 'undefined') {
                    for (let i in this.params.template_goods) {
                        if (!this.params.template_goods.hasOwnProperty(i))
                            continue;
                        let template_good = this.params.template_goods[i];
                        if (result.prices[template_good.id]) {
                            let result_price = result.prices[template_good.id];
                            template_good.fields.AVAILABLE = result_price.PRICE_MIN === false ? this.getTemplate(
                                this.params.template_html.AVAILABLE, result_price) : '';
                            template_good.fields.IN_STOCK = result_price.PRICE_OWN !== false ? this.getTemplate(
                                this.params.template_html.IN_STOCK, result_price) : '';
                            template_good.fields.DELIVERY = result_price.PRICE_RS !== false ? this.getTemplate(
                                this.params.template_html.DELIVERY, result_price) : '';
                            if(result.prices[template_good.id].ORIGINAL.PRICE_RS && result.prices[template_good.id].ORIGINAL.PRICE_OWN && result.prices[template_good.id].ORIGINAL.PRICE_RS >= result.prices[template_good.id].ORIGINAL.PRICE_OWN)
                                template_good.fields.DELIVERY = '';
                        } else {
                            template_good.fields.AVAILABLE = this.params.template_html.AVAILABLE;
                            template_good.fields.IN_STOCK = '';
                            template_good.fields.DELIVERY = '';
                        }
                    }
                    this.drawList();
                }
            }, this),
            onfailure: BX.proxy(function () {
                this.BXcloseWait();
            }, this)
        });
    };

    window.W247CatalogsSection.prototype.BXshowWait = function () {
        $(this.obCont).hide();
        $(this.obPreloader).show();
    };

    window.W247CatalogsSection.prototype.BXcloseWait = function () {
        $(this.obCont).show();
        $(this.obPreloader).hide();
    };

    // on change pagination selector
    window.W247CatalogsSection.prototype.onChangePaginationSelector = function (event) {
        let $select = $(event.target);
        this.cookie.set('COUNT', $select.val());
        location.reload();
    };

    window.W247CatalogsSection.prototype.onWindowResize = function (event) {
        let w = document.documentElement.clientWidth;
        if (w < 768) {
            this.cookie.set(this.params.cookie_view, 'block');
            this.drawList();
        }
    };

    window.W247CatalogsSection.prototype.onModalMoreOptionShow = function (event) {
        let $modal = $(event.target);
        let $link = $(event.relatedTarget);
        if ($modal.attr('id') === "W247CatalogsSectionModalMoreOption" + this.params.id) {
            let id = $link.data('id');
            let template_good = this.getElementById(id);
            if (template_good !== null) {
                $(this.obModalMoreOptionImg).html(template_good.fields.IMAGE_280_260);
                $(this.obModalMoreOption4Options).html(template_good.fields.OPTIONS.slice(0, 4).join(''));
                $(this.obModalMoreOptionOtherOptions).html(template_good.fields.OPTIONS.slice(4).join(''));
                $(this.obModalMoreOptionOptionsCollapse).hide();
                if (template_good.fields.OPTIONS.slice(4).length > 0) {
                    $(this.obModalMoreOptionOptionsCollapse).show();
                }
            }

            $(this.obModalMoreOptionAppliance).html('');
            $(this.obModalMoreOptionPreloader).show();
            BX.ajax({
                method: 'POST',
                dataType: 'json',
                data: {
                    id: id,
                    params: this.params.component,
                    scripts: !this.modalMoreOptionLoadScripts ? 'Y' : 'N',
                },
                url: this.params.ajax_more_props,
                onsuccess: BX.proxy(async function (result) {
                    $(this.obModalMoreOptionPreloader).hide();
                    let ob = BX.processHTML(result.html);
                    BX.loadCSS(ob['STYLE']);
                    $(this.obModalMoreOptionAppliance).html(ob.HTML);
                    BX.ajax.processScripts(ob.SCRIPT);
                    this.modalMoreOptionLoadScripts = true;
                }, this),
                onfailure: BX.proxy(async function () {
                    $(this.obModalMoreOptionPreloader).hide();
                }, this)
            });
        }
    };

    window.W247CatalogsSection.prototype.getElementById = function (id) {
        for (let i in this.params.template_goods) {
            if (!this.params.template_goods.hasOwnProperty(i))
                continue;
            let template_good = this.params.template_goods[i];
            if (parseInt(template_good.id) === parseInt(id))
                return template_good;
        }
        return null;
    };

    window.W247CatalogsSection.prototype.onChangeSelectView = function (event) {
        BX.PreventDefault(event);
        let $li = $(event.target);
        if (event.target.tagName !== 'LI')
            $li = $li.closest('li');
        let new_view_code = $li.data('view');
        this.cookie.set(this.params.cookie_view, new_view_code);
        this.drawList();
    };

    window.W247CatalogsSection.prototype.drawList = function () {
        let view = this.getView();
        this.setViewUI();
        $(this.obViewCont).html('');
        for (let i in this.params.template_goods) {
            if (!this.params.template_goods.hasOwnProperty(i))
                continue;
            let template_good = this.params.template_goods[i];
            template_good.fields.OPTIONS_4 = template_good.fields.OPTIONS.slice(0, 4).join('');
            $(this.obViewCont).append(this.getTemplate(template_good.views[view], template_good.fields));
        }
    };

    window.W247CatalogsSection.prototype.setViewUI = function () {
        let view_code_selected = this.getView();
        for (let view_code in this.params.views) {
            if (!this.params.views.hasOwnProperty(view_code))
                continue;
            let view = this.params.views[view_code];
            if (view_code === view_code_selected) {
                $(this.obViewCont).addClass(view['view_cont_class']);
                $(this.obSelectViewCont).find('[data-view="' + view_code + '"]').addClass('active');
            } else {
                $(this.obViewCont).removeClass(view['view_cont_class']);
                $(this.obSelectViewCont).find('[data-view="' + view_code + '"]').removeClass('active');
            }
        }
    };

    window.W247CatalogsSection.prototype.getView = function () {
        let cookie_view = this.cookie.get();
        let view_code = cookie_view[this.params.cookie_view];
        if (Object.keys(this.params.views).indexOf(view_code) < 0) {
            for (let v in this.params.views) {
                if (!this.params.views.hasOwnProperty(v))
                    continue;
                let params = this.params.views[v];
                if (params.default === true) {
                    view_code = v;
                    break;
                }
            }
        }
        return view_code;
    };

    window.W247CatalogsSection.prototype.getTemplate = function (template, replace) {
        for (let field in replace) {
            if (!replace.hasOwnProperty(field))
                continue;
            let val = replace[field];
            template = template.replace(new RegExp("#" + field + "#", 'g'), val);
        }
        return template;
    };

})(window);