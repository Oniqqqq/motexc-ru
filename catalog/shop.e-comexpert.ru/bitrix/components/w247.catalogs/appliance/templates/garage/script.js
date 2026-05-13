if (typeof cleanSelectUl != 'function') {

    window.cleanSelectUl = function (form, select) {
        select.selectpicker('destroy');
        select.find("option").remove();
        //select.append($('<ul></ul>'));
        form.find(".btn-" + select.attr("id")).prop('disabled', true);
        titleSelectUl(form, select, "");
        select.prop('disabled', true);
        select.selectpicker({
            noneResultsText: BX.message("JS_W247_NOT_RESULTS_SELECTPICKER"),
        });
        select.selectpicker('refresh');
    };
}
if (typeof titleSelectUl != 'function') {

    window.titleSelectUl = function (form, select, title) {

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
if (typeof createOptionsJsonUl != 'function') {

    let requestCache = {};

    window.createOptionsJsonUl = function (ajax, form, select, open) {

        let hash = JSON.stringify(select.toArray());
        if (hash in requestCache && requestCache[hash] === true) {
            throw 'is running';
        }
        requestCache[hash] = true;

        var params = form.serializeArray();
        params.push({'name': 'sessid', 'value': BX.bitrix_sessid()});

        var loader = form.find(".loader");
        loader.show();

        //cleanSelectUl(form, select);

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

if (typeof loadCatalogFilter != 'function') {

    window.loadCatalogFilter = function (form, filter_script, filter_div) {

        var car_uid = form.find("input[name=CAR_UID]").val();
        var year = form.find("input[name=YEAR]").val();

        var AJAX_PAGE = form.find("input[name=AJAX_PAGE]").val();

        //W247.Garage.add(car_uid, year, 'Y');
        //$('.appliance_garage_apply').trigger('click');

        var location_url = form.find("input[name=CAR_PAGE_URL]").val();
        location_url = location_url.replace('#CAR_UID#', car_uid).replace('#YEAR#', year);

        var eventParams = {
            car_uid: car_uid,
            year: year,
            AJAX_PAGE: AJAX_PAGE,
            url: location_url
        };
        BX.onCustomEvent('GarageAddCar', [eventParams]);

        if (typeof eventParams['noRedirect'] === 'undefined') {
            $(form).attr('action', eventParams.url);
            $(form).submit();
            // window.location = eventParams.url;
        }
    };
}

$(document).ready(function () {

    $.fn.w247_appliance_to = function (options) {

        var settings = $.extend({
            auto_apply: false,
            ajax_script: 'ajax.php',
            filter_div: 'w247_autoiblock_catalog_filter',
            filter_script: './filter.php',
            apply: loadCatalogFilter,
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

            cleanSelectUl(form, brand_select);
            form.find(".btn-" + brand_select.attr("id")).prop('disabled', false);
            cleanSelectUl(form, year_select);
            cleanSelectUl(form, model_select);
            cleanSelectUl(form, mod_select);

            brand_id = String(form.find("input[name=BRAND_UID]").val());
            year = String(form.find("input[name=YEAR]").val());
            model_id = String(form.find("input[name=MODEL_UID]").val());
            typ_id = String(form.find("input[name=CAR_UID]").val());

            action.val('brands');
            createOptionsJsonUl(settings.ajax_script, form, brand_select, false).then(function () {
                if (brand_id != '') {
                    ActiveLi = brand_select.find("[value=" + brand_id + "]");
                    brand_select.val(brand_id).selectpicker('refresh');
                    titleSelectUl(form, brand_select, ActiveLi.text());

                    action.val('years');
                    createOptionsJsonUl(settings.ajax_script, form, year_select, false).then(function () {
                        if (year != '' || model_id != '') {
                            ActiveLi = year_select.find("[value=" + year + "]");
                            year_select.val(year).selectpicker('refresh');
                            titleSelectUl(form, year_select, ActiveLi.text());

                            action.val('models');
                            createOptionsJsonUl(settings.ajax_script, form, model_select, false).then(function () {
                                if (model_id != '') {
                                    ActiveLi = model_select.find("[value=" + model_id + "]");
                                    model_select.val(model_id).selectpicker('refresh');
                                    titleSelectUl(form, model_select, ActiveLi.text());

                                    action.val('modifications');
                                    createOptionsJsonUl(settings.ajax_script, form, mod_select, false).then(function () {
                                        if (typ_id != '') {
                                            ActiveLi = mod_select.find("[value=" + typ_id + "]");
                                            mod_select.val(typ_id).selectpicker('refresh');
                                            titleSelectUl(form, mod_select, ActiveLi.text());

                                            btn_apply.removeAttr('disabled');
                                            btn_reset.removeAttr('disabled');
                                        } else {
                                            mod_select.parents('.appl_mod').addClass('open');
                                        }
                                    });
                                } else {
                                    model_select.parents('.appl_model').addClass('open');
                                }
                            });
                        } else {
                            year_select.parents('.appl_year').addClass('open');
                        }
                    });
                }
            });
        }

        try {
            init();
        } catch (e) {
            console.error(e);
        }

        form.on('click', ".appl_brand li", function () {
            cleanSelectUl(form, year_select);
            cleanSelectUl(form, model_select);
            cleanSelectUl(form, mod_select);

            btn_apply.attr('disabled', 'disabled');
            btn_reset.attr('disabled', 'disabled');

            brand_id = form.find('select.appl_brand').val()
            titleSelectUl(form, brand_select, $(this).text());
            if (brand_id != '') {
                form.find("input[name=BRAND_UID]").val(brand_id);
                action.val('years');
                createOptionsJsonUl(settings.ajax_script, form, year_select, true);
            }
        });

        form.on('click', ".appl_year li", function () {
            cleanSelectUl(form, model_select);
            cleanSelectUl(form, mod_select);

            btn_apply.attr('disabled', 'disabled');
            btn_reset.attr('disabled', 'disabled');

            year = parseInt(form.find('select.appl_year').val());
            titleSelectUl(form, year_select, $(this).text());

            if (year > 0) {
                form.find("input[name=YEAR]").val(year);
                action.val('models');
                createOptionsJsonUl(settings.ajax_script, form, model_select, true);
            }
        });

        form.on('click', ".appl_model li", function () {
            cleanSelectUl(form, mod_select);

            btn_apply.attr('disabled', 'disabled');
            btn_reset.attr('disabled', 'disabled');

            model_id = form.find('select.appl_model').val();
            titleSelectUl(form, model_select, $(this).text());

            if (model_id != '') {
                form.find("input[name=MODEL_UID]").val(model_id);
                action.val('modifications');
                createOptionsJsonUl(settings.ajax_script, form, mod_select, true);
            }
        });

        form.on('click', ".appl_mod li", function () {
            var car_uid = form.find('select.appl_mod').val();
            titleSelectUl(form, mod_select, $(this).text());

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

        form.data('appliance', {
            refresh: function () {
                try {
                    init();
                } catch (e) {
                    console.error(e);
                }
            }
        });

        return this;
    };
});