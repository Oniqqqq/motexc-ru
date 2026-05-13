if (typeof cleanSelectUlForCheckAuto != 'function') {

    window.cleanSelectUlForCheckAuto = function (form, select) {
        select.selectpicker('destroy');
        select.find("option").remove();
        //select.append($('<ul></ul>'));
        form.find(".btn-" + select.attr("id")).prop('disabled', true);
        titleSelectUlForCheckAuto(form, select, "");
        select.prop('disabled', true);
        select.selectpicker({
            noneResultsText: BX.message("JS_W247_NOT_RESULTS_SELECTPICKER"),
        });
        select.selectpicker('refresh');
    };
}
if (typeof titleSelectUlForCheckAuto != 'function') {

    window.titleSelectUlForCheckAuto = function (form, select, title) {

        if (title.length > 0) {
            placeholder = title;
        } else {
            var placeholder = select.attr('title');
            if (placeholder == undefined) {
                placeholder = '';
            }
        }
        form.find(".btn-" + select.attr("id") + " span").text(placeholder);
    };
}
if (typeof createOptionsJsonUlForCheckAuto != 'function') {

    let requestCache = {};

    window.createOptionsJsonUlForCheckAuto = function (ajax, form, select, open) {

        let hash = JSON.stringify(select.toArray());
        if (hash in requestCache && requestCache[hash] === true) {
            throw 'is running';
        }
        requestCache[hash] = true;

        var params = form.serializeArray();
        params.push({'name': 'sessid', 'value': BX.bitrix_sessid()});

        var loader = form.find(".loader");
        loader.show();

        //cleanSelectUlForCheckAuto(form, select);

        if (open && window.optionsJsonUIXhr && window.optionsJsonUIXhr.readyState != 4) {
            window.optionsJsonUIXhr.abort();
        }

        var optionsJsonUIXhrRet = $.getJSON(ajax, params).done(function (data) {
            if (data != null) {
                select.selectpicker('destroy');
                select.find('.bs-title-option').remove();
                var cnt = 0;

                $.each(data, function (key, val) {
                    var option = $('<option>' + val.title + '</option>');
                    option.attr("value", val.uid);
                    cnt++;
                    select.append(option);
                });

                select.prop('disabled', false);
                select.selectpicker({
                    noneResultsText: BX.message("JS_W247_NOT_RESULTS_SELECTPICKER"),
                });
                select.selectpicker('refresh');
                if (open) {
                    form.find('.dropdown').removeClass('open');
                    select.parents('.dropdown').first().addClass('open');
                }
                form.find(".btn-" + select.attr("id")).prop('disabled', false);
                loader.hide();
            } else {
                console.log('data = ' + data);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        });
        if (open) {
            window.optionsJsonUIXhr = optionsJsonUIXhrRet;
        }
        return optionsJsonUIXhrRet.always(function () {
            requestCache[hash] = false;
        });
    };
}

if (typeof loadCatalogFilterCheckAuto != 'function') {

    window.loadCatalogFilterCheckAuto = function (form, filter_script, filter_div) {

        var car_uid = form.find("input[name=CAR_UID]").val();
        var year = form.find("input[name=YEAR]").val();

        var AJAX_PAGE = form.find("input[name=AJAX_PAGE]").val();

        /*var location_url = form.find("input[name=CAR_PAGE_URL]").val();
        location_url = location_url.replace('#CAR_UID#', car_uid).replace('#YEAR#', year);*/

        location_url = window.link;

        var eventParams = {
            car_uid: car_uid,
            year: year,
            AJAX_PAGE: AJAX_PAGE,
            url: location_url
        };
        BX.onCustomEvent('GarageAddCar', [eventParams]);

        if (typeof eventParams['noRedirect'] === 'undefined') {
            //$(form).attr('action', eventParams.url);
            $(form).submit();
        }
    };
}

$(document).ready(function () {
    /********ajax check for need class .check_auto ********/
    $.ajax({
        url: "/local/ajax/check.php",
    }).success(function (data) {
        if (data.status !== "FALSE") {
            $('.check_auto').removeClass('check_auto');
        }
    });

    $.fn.w247_appliance_garage_check_auto = function (options) {

        let $modal_appliance = $('#' + options.modal_add_auto_block);

        let LinkChecker = new Confirm(
            $modal_appliance,
            null
        );

        $(document).on('click', '.check_auto', async function (e) {
            e.preventDefault();
            window.link = $(this).attr("href");
            if (await LinkChecker.confirm()) {
                console.log('1');
                //window.location = this;
            } else {
                console.log('0');
            }
        });

        var settings = $.extend({
            auto_apply: false,
            ajax_script: 'ajax.php',
            filter_div: 'w247_autoiblock_catalog_filter',
            filter_script: './filter.php',
            apply: loadCatalogFilterCheckAuto,
            reset: false

        }, options);

        var form = $(this);

        var brand_id, year, model_id, typ_id;

        var brand_select = form.find(".appl_brand");
        var year_select = form.find(".appl_year");
        var model_select = form.find(".appl_model");
        var mod_select = form.find(".appl_mod");

        var btn_apply = form.find(".appliance_garage_apply");
        var btn_reset = form.find(".appliance_reset");

        var action = form.find("input[name=AJAX_ACTION]");

        function init() {

            cleanSelectUlForCheckAuto(form, brand_select);
            form.find(".btn-" + brand_select.attr("id")).prop('disabled', false);
            cleanSelectUlForCheckAuto(form, year_select);
            cleanSelectUlForCheckAuto(form, model_select);
            cleanSelectUlForCheckAuto(form, mod_select);

            brand_id = String(form.find("input[name=BRAND_UID]").val());
            year = String(form.find("input[name=YEAR]").val());
            model_id = String(form.find("input[name=MODEL_UID]").val());
            typ_id = String(form.find("input[name=CAR_UID]").val());

            action.val('brands');
            createOptionsJsonUlForCheckAuto(settings.ajax_script, form, brand_select, false).then(function () {
                if (brand_id != '') {
                    ActiveLi = brand_select.find("li[data-val=" + brand_id + "]");
                    ActiveLi.addClass("active");
                    titleSelectUlForCheckAuto(form, brand_select, ActiveLi.text());

                    if (ActiveLi.length > 0) {
                        action.val('years');
                        createOptionsJsonUlForCheckAuto(settings.ajax_script, form, year_select, false).then(function () {
                            if (year != '' || model_id != '') {
                                ActiveLi = year_select.find("li[data-val=" + year + "]");
                                ActiveLi.addClass("active");
                                titleSelectUlForCheckAuto(form, year_select, ActiveLi.text());

                                if (ActiveLi.length > 0) {
                                    action.val('models');
                                    createOptionsJsonUlForCheckAuto(settings.ajax_script, form, model_select, false).then(function () {
                                            if (model_id != '') {
                                                ActiveLi = model_select.find("li[data-val=" + model_id + "]");
                                                ActiveLi.addClass("active");
                                                titleSelectUlForCheckAuto(form, model_select, ActiveLi.text());

                                                if (ActiveLi.length > 0) {
                                                    action.val('modifications');
                                                    createOptionsJsonUlForCheckAuto(settings.ajax_script, form, mod_select, false).then(function () {
                                                        if (typ_id != '') {
                                                            ActiveLi = mod_select.find("li[data-val=" + typ_id + "]");
                                                            ActiveLi.addClass("active");
                                                            titleSelectUlForCheckAuto(form, mod_select, ActiveLi.text());

                                                            btn_apply.removeAttr('disabled');
                                                            btn_reset.removeAttr('disabled');
                                                        } else {
                                                            mod_select.parents('.appl_mod').addClass('open');
                                                        }
                                                    });
                                                }
                                            } else {
                                                model_select.parents('.appl_model').addClass('open');
                                            }
                                        }
                                    );
                                }

                            } else {
                                year_select.parents('.appl_year').addClass('open');
                            }
                        });
                    }
                }
            });
        }

        try {
            init();
        } catch (e) {
            console.error(e);
        }

        form.on('click', ".appl_brand li", function () {
            cleanSelectUlForCheckAuto(form, year_select);
            cleanSelectUlForCheckAuto(form, model_select);
            cleanSelectUlForCheckAuto(form, mod_select);

            btn_apply.attr('disabled', 'disabled');
            btn_reset.attr('disabled', 'disabled');

            brand_id = form.find('select.appl_brand').val()
            titleSelectUlForCheckAuto(form, brand_select, $(this).text());

            if (brand_id != '') {
                form.find("input[name=BRAND_UID]").val(brand_id);
                action.val('years');
                createOptionsJsonUlForCheckAuto(settings.ajax_script, form, year_select, true);
            }
        });

        form.on('click', ".appl_year li", function () {
            cleanSelectUlForCheckAuto(form, model_select);
            cleanSelectUlForCheckAuto(form, mod_select);

            btn_apply.attr('disabled', 'disabled');
            btn_reset.attr('disabled', 'disabled');

            year = parseInt(form.find('select.appl_year').val());
            titleSelectUlForCheckAuto(form, year_select, $(this).text());

            if (year > 0) {
                form.find("input[name=YEAR]").val(year);
                action.val('models');
                createOptionsJsonUlForCheckAuto(settings.ajax_script, form, model_select, true);
            }
        });

        form.on('click', ".appl_model li", function () {
            cleanSelectUlForCheckAuto(form, mod_select);

            btn_apply.attr('disabled', 'disabled');
            btn_reset.attr('disabled', 'disabled');

            model_id = form.find('select.appl_model').val();
            titleSelectUlForCheckAuto(form, model_select, $(this).text());

            if (model_id != '') {
                form.find("input[name=MODEL_UID]").val(model_id);
                action.val('modifications');
                createOptionsJsonUlForCheckAuto(settings.ajax_script, form, mod_select, true);
            }
        });

        form.on('click', ".appl_mod li", function () {
            var car_uid = form.find('select.appl_mod').val();
            titleSelectUlForCheckAuto(form, mod_select, $(this).text());

            if (car_uid != '') {
                form.find("input[name=CAR_UID]").val(car_uid);
                if (settings.auto_apply) {
                    if (typeof settings.apply == 'function') {
                        $(".loader").show();
                        action.val('complete');
                        settings.apply(form, settings.filter_script, settings.filter_div);
                    }
                } else {
                    btn_apply.removeAttr('disabled');
                    btn_reset.removeAttr('disabled');
                }
            }
        });

        form.on('click', ".appliance_garage_apply", function (e) {
            $(".loader").show();
            action.val('complete');
            var car_uid = form.find("input[name=CAR_UID]").val();
            if (car_uid != '') {
                if (typeof settings.apply == 'function') {
                    settings.apply(form, settings.filter_script, settings.filter_div);
                }
            }
            return false;
        });

        return this;
    };
});


class Confirm {
    constructor($modal, $button_ok) {
        this.modal = $($modal);
        this.button_ok = $($button_ok);
        this.modal_id = this.modal.attr('id');
        this.status = -1;
        this.timer = null;
        this.modal.on('hidden.bs.modal', BX.delegate(this.onHiddenModal, this));
        this.modal.on('show.bs.modal', BX.delegate(this.onShowModal, this));
        BX.bind(this.button_ok[0], 'click', BX.delegate(this.onClickButtonSave, this));
    }

    onHiddenModal(event) {
        let $modal = $(event.target);
        if ($modal.attr('id') === this.modal_id && this.status === -1) {
            this.status = 0;
        }
    }

    onShowModal(event) {
        let $modal = $(event.target);
        if ($modal.attr('id') === this.modal_id) {
            this.status = -1;
        }
    }

    onClickButtonSave(event) {
        BX.PreventDefault(event);
        this.status = 1;
        if ($.fn.modal) {
            this.modal.modal('hide');
        }
    }

    async confirm() {
        this.status = -1;
        if (this.modal.length > 0 && $.fn.modal) {
            this.modal.modal('show');
        } else {
            return Promise.resolve(1);
        }
        return await new Promise(resolve => {
            this.timer = setInterval(BX.proxy(function () {
                if (this.status !== -1) {
                    clearInterval(this.timer);
                    resolve(this.status);
                    this.status = -1;
                }
            }, this), 100);
        });
    };
}
