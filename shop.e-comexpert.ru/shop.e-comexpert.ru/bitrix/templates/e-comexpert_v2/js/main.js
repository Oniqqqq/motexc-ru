var filterModeUrl = {};

BX.addCustomEvent('onAjaxSuccess', function () {


    if($.fn.tooltip) {
        $('[data-toggle="tooltip-click"]').tooltip({
            trigger: 'focus'
        });
    }
    if($.fn.mask && !!phoneMask) {
        $(".card_tires_discs__feedback__form__input").mask(phoneMask);
    }
});

$(document).ready(function () {
    $.validator.addMethod("inn", function (value, element) {
        var multipliers = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
            inn = value.split(''), i, j, ch = [0, 0, 0];
        for (i = 0; i < 12; i++)
            for (j = 0; j < 3; j++)
                if (multipliers[i + j])
                    ch[j] = ch[j] + inn[i] * multipliers[i + j];
        if (inn.length == 10)
            return inn[9] == ch[2] % 11 % 10;
        else if (inn.length == 12)
            return inn[10] == ch[1] % 11 % 10 && inn[11] == ch[0] % 11 % 10;
        else
            return !value;
    });

    $(document).on('click', '#modal_addtocart .site_link ', function(event) {
        event.preventDefault();
        if($('.source-of-modal').parents(".tile_item").length >0)
            window.location.replace($('.source-of-modal').parents(".tile_item").find('.site_view_result__item__name > a').attr('href')+"#cs_tab4");
        if($('.source-of-modal').parents(".recommended_block__item").length >0)
            window.location.replace($('.source-of-modal').parents(".recommended_block__item").find('.recommended_block__article .site_link').attr('href')+"#cs_tab4");
    });
    $(document).on('click', '[data-target="#partRequestModal"]', function(event) {
        $('.source-of-modal').removeClass('source-of-modal');
        $(this).addClass('source-of-modal');
    });

    let $modal_addtocart = $('#modal_addtocart');
    $modal_addtocart.delegate('.add2cart', 'click', function (e) {
        e.preventDefault();
        let params = $(e.delegateTarget).data('add2cart');
        if (typeof params !== "undefined" && params != '') {
            params = JSON.parse(params);
            params.push(true);
            if (typeof (add2cartAjax) === "function") {
                add2cartAjax.apply(null, params);
            }
        }
    });

    $(document).on('keyup', '.int', function (e) {
        var val = $(this).val();
        $(this).val(val.replace(/\D/g, ''));
    });
    $(document).on('blur', '.int', function () {
        var val = parseInt($(this).val());
        var mf = parseInt($(this).attr('step'));
        if (isNaN(mf) || mf <= 0) mf = 1;

        if (isNaN(val) || val <= 0) {
            $(this).val(mf);
        } else {
            var mod = val % mf;
            if (mod != 0) {
                val = parseInt(Math.ceil(val / mf) * mf);
            }
            $(this).val(val);
        }
    });
    $(document).on('keyup', '.maxvalue', function () {
        var max = Math.max(1, parseInt($(this).attr('max')));
        var val = parseInt($(this).val());
        if (val > max) {
            $(this).val(max);
        }
    });
    if($.fn.mask && !!phoneMask)
        $(".phone").mask(phoneMask);
    $(document).on('click', '.footer_parts_request', function(event) {
        event.preventDefault();
        BX.setCookie('REQUEST_FOR_SELECTION_REDIRECT', $(location).attr('href'), {expires: 7200, path: "/"});
        window.location.replace($(this).attr('href'));
    });
    $(document).on('click', '.filter_right_block .filter_selection_by .nav-tabs li', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var $li = $(this),
            newMode = $li.data('mode'),
            currentUrl = window.location.href;

        let expires = new Date();
        expires.setTime(expires.getTime() + 365 * 86400);
        /*
        BX.setCookie('filter_url_' + searchAjaxParams['FILTER_MODE'] + '_' + searchAjaxParams['ENTITY_CODE'], encodeURI(currentUrl), {expires: expires, path: '/'});
        let newUrl = BX.getCookie('filter_url_' + newMode + '_' + searchAjaxParams['ENTITY_CODE']);
        newUrl = newUrl ? decodeURI(newUrl) : BX.util.htmlspecialcharsback(searchAjaxParams['FORM_ACTION']);
        */

        let newUrl = BX.util.htmlspecialcharsback(searchAjaxParams['FORM_ACTION']);
        history.pushState({mode: newMode, url: newUrl}, document.title, newUrl);

        /*$('#tab_' + firstTabId).html('');
        $('#pagination').html('');*/

        BX.setCookie('filter_mode', newMode, {path: '/', expire: 'expires'});

        BX.onCustomEvent('EcomexpertReloadFilter', [null, null, true]);
    });

    /*registration*/
    $(".reg_mask").inputmask("+7 (999) 999-99-99");
});

function updateBasketBlocks(data) {
    $.each($('.basket-count-update'), function (index, el) {
        $(el).removeClass("hide");
        $(el).html(data.COUNT);
        if(data.COUNT == 0) $(el).addClass("hide");
    });
    $.each($('.basket-count-show'), function (index, el) {
        $(el).show();
    });
    $.each($('.basket-formated-update'), function (index, el) {
        $(el).html(data.FORMATED);
    });
}

function add2cartAjax(quantity_hash, buy_url, max_available_quantity, q, flag = false) {
    if(flag == false){
        add2cartPopup(quantity_hash, buy_url, max_available_quantity, q);
        return false;
    }
    var $qi = $('input[rel="quantity"][data-part-hash="' + quantity_hash + '"]');
    var quantity = 1;
    if ($qi.length > 0) {
        quantity = $qi.val();
    }
    buy_url = buy_url + '&action=add&quantity=' + quantity + '&max_available_quantity=' + parseInt(max_available_quantity) + '&q=' + q;
    if (parseInt($qi.data('step')) > 0) {
        buy_url = buy_url + '&step=' + parseInt($qi.data('step'));
    }
    buy_url += '&SITE_ID=' + BX.message('SITE_ID');

    let params = {
        stop: false
    };
    BX.onCustomEvent('onAdd2Cart', ['/auto/search/?' + buy_url, params]);

    /*if (!params.stop) {
        buy_url = buy_url.replace(new RegExp("/auto/search/\\?", 'g'), "");
        $.ajax({
            url: "/local/ajax/cart.php",
            data: buy_url
        }).success(function (data) {
            updateBasketBlocks(data);
            if (typeof url !== 'undefined') {
                window.location = url;
            } else {
                var $modal_addtocart = $('#modal_addtocart');
                if (data.STATUS === "ERROR") {
                    $modal_addtocart.find('.modal-body-success').hide();
                    $modal_addtocart.find('.modal-body-error').show();
                } else {
                    $modal_addtocart.find('.modal-body-success').show();
                    $modal_addtocart.find('.modal-body-error').hide();
                }
                $modal_addtocart.modal('hide');
            }
        });
    }*/

    if (!params.stop) {
        let $modal_addtocart = $('#modal_addtocart:visible');
        if ($modal_addtocart.length > 0) {
            $modal_addtocart.modal('hide');
            quantity = $modal_addtocart.find('[name=quantity]').val();
        }
        buy_url = buy_url.replace(new RegExp("/auto/search/\\?", 'g'), "") + '&quantity=' + quantity;
        $.ajax({
            url: "/local/ajax/cart.php",
            data: buy_url
        }).success(function (data) {
            updateBasketBlocks(data);
            if (typeof url !== 'undefined') {
                window.location = url;
            } else {
                var $modal_addtocart = $('#modal_addtocart');
                $modal_addtocart.modal('hide');
            }
        });
    }
}

function add2cartPopup(quantity_hash, buy_url, max_available_quantity, q) {
    var $qi = $('input[rel="quantity"][data-part-hash="' + quantity_hash + '"]');
    var quantity = 1;
    if ($qi.length > 0) {
        quantity = $qi.val();
    }
    buy_url = buy_url + '&action=add&quantity=' + quantity + '&max_available_quantity=' + parseInt(max_available_quantity) + '&q=' + q;
    if (parseInt($qi.data('step')) > 0) {
        buy_url = buy_url + '&step=' + parseInt($qi.data('step'));
    }


    //BX.onCustomEvent('onAdd2Cart', ['/auto/search/?' + buy_url, function (buy_url) {
    let $modal_addtocart = $('#modal_addtocart');

    $modal_addtocart.data('add2cart', JSON.stringify([quantity_hash, buy_url, max_available_quantity, q]));
    $modal_addtocart.find('[name=quantity]').removeAttr('max');
    $modal_addtocart.find('[name=quantity]').attr('max', max_available_quantity);
    let partViewSubItem = getPartViewSubItem(quantity_hash);
    if (partViewSubItem !== false) {
        if ($(partViewSubItem.el).find('[rel=quantity]').length > 0) {
            let q = $(partViewSubItem.el).find('[rel=quantity]').val();
            $modal_addtocart.find('[name=quantity]').val(q);
        } else {
            $modal_addtocart.find('[name=quantity]').val(1);
        }
        if (partViewSubItem.data.supplier_own_store === true && partViewSubItem.params.geoip.isMoscow === true) {
            $modal_addtocart.find('.buy1click').show();
        }
    } else {
        let [found, quantity, params] = getWSSearchResultsItem(quantity_hash);
        if (found !== false) {
            if (parseFloat(quantity) > 0) {
                $modal_addtocart.find('[name=quantity]').val(quantity);
            } else {
                if($('*').is('.number_card [type="number"]')) {
                    $modal_addtocart.find('[name=quantity]').val($('.number_card [type="number"]').val());
                    $modal_addtocart.find('[href="javascript:void(0)"]').hide();
                }else
                    $modal_addtocart.find('[name=quantity]').val(1);
            }
            if (typeof params.supplier_own_store !== 'undefined' && typeof params.geoip !== 'undefined' &&
                params.supplier_own_store === true && params.geoip.isMoscow === true) {
                $modal_addtocart.find('.buy1click').show();
            }
        }
    }
    $modal_addtocart.modal('show');
    //}]);
}

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ajaxComplete(function () {
    if ($('[data-toggle="tooltip-hover"]').length > 0 && $.fn.mask) {
        $('[data-toggle="tooltip-hover"]').tooltip();
        setTimeout(function () {
            $('[data-toggle="tooltip-hover"]').tooltip();
        }, 50);
        setTimeout(function () {
            $('[data-toggle="tooltip-hover"]').tooltip();
        }, 500);
    }
});

$(document).on('click', '#modal_addtocart .site_link ', function(event) {
    event.preventDefault();
    if($('.source-of-modal').parents(".tile_item").length >0)
        window.location.replace($('.source-of-modal').parents(".tile_item").find('.site_view_result__item__name > a').attr('href')+"#cs_tab4");
    if($('.source-of-modal').parents("td.t_basket").length >0)
        window.location.replace($('.source-of-modal').parents("tr").find('.t_title_name__article > a').attr('href')+"#cs_tab4");
    if($('.source-of-modal').parents(".recommended_block__item").length >0)
        window.location.replace($('.source-of-modal').parents(".recommended_block__item").find('.recommended_block__article .site_link').attr('href')+"#cs_tab4");
});

BX.addCustomEvent('EcomexpertReloadContent', function (obFilter, params) {
    if (!window.searchAjaxParams) {
        window.searchAjaxParams = {};
    }

    $('#tab_' + firstTabId).html('');
    $('#pagination').html('');

    if (!!params) {
        window.searchAjaxParams.FILTER_NAME = params['FILTER_NAME'];
        window.searchAjaxParams.FILTER_NAME_EX = params['FILTER_NAME_EX'];
        window.searchAjaxParams.FILTER_NAME_VAL = params['FILTER_VAL'];
        window.searchAjaxParams.FILTER_NAME_EX_VAL = params['FILTER_EX_VAL'];
        //window.history.pushState({}, document.title, params['FILTER_URL']);
        if (params['CAR_MODIFICATION']) {
            car_uid = params['CAR_MODIFICATION'];
        }
    }

    loadSearchResult(
        '#tab_' + firstTabId,
        filter_code,
        nom_uid,
        entity_code,
        window.searchAjaxParams,
        template
    );
});

// ��� ��������� ������� ����, �������� ��� ����, ����� �������� �
// ����������� ������� �������� ������ ����
$(window).resize(function() {
    let windowWidth = parseInt($(window).width());

    if(windowWidth < 1200 && self.view != 'block' && typeof sortViewList !== 'undefined' &&
        BX.util.in_array('block', sortViewList)) {
        let viewBlock = $('.view_select');
        viewBlock.find('li').removeClass('active');

        self.view = 'block';
        viewBlock.find('[data-type="block"]').addClass('active');
        BX.setCookie('view', 'block', {path: '/', expire: 86400});
        BX.onCustomEvent('EcomexpertReloadContent', [null, null]);
    }
});


function getPartViewSubItem(hash) {
    if (typeof window.obView !== 'undefined') {
        if (typeof window.obView.partList !== 'undefined') {
            for (let partViewItemKey in window.obView.partList) {
                let partViewItem = window.obView.partList[partViewItemKey];
                if (!window.obView.partList.hasOwnProperty(partViewItemKey)) continue;
                if (typeof partViewItem.offersList !== 'undefined') {
                    for (let partViewSubItemKey in partViewItem.offersList) {
                        if (!partViewItem.offersList.hasOwnProperty(partViewSubItemKey)) continue;
                        let partViewSubItem = partViewItem.offersList[partViewSubItemKey];
                        if (partViewSubItem.data.hash === hash) {
                            return partViewSubItem;
                        }
                    }
                } else {
                    if (partViewItem.data.hash === hash) {
                        return partViewItem;
                    }
                }
            }
        }
    }
    return false;
}

function getWSSearchResultsItem(hash) {
    if (typeof window.WSSearchResultsObjects !== 'undefined') {
        for (let k in window.WSSearchResultsObjects) {
            let WSSearchResultsObject = window.WSSearchResultsObjects[k];
            if (!window.WSSearchResultsObjects.hasOwnProperty(k)) continue;
            let $add2basket = $(WSSearchResultsObject.table_cont).find('[data-hash="' + hash + '"]');
            if ($add2basket.length > 0) {
                let $item = $add2basket.closest('.all_visible_table');
                let quantity = 0;
                let params = {
                    supplier_own_store: $add2basket.data('supplier-own-store') === 1,
                    geoip: {
                        isMoscow: typeof WSSearchResultsObject.params.geoip !== 'undefined' ?
                            WSSearchResultsObject.params.geoip.isMoscow : false
                    }
                };
                let $quantity = $item.find('[rel=quantity]');
                if ($quantity.length > 0) {
                    quantity = parseFloat($quantity.val());
                    if (quantity === null || typeof quantity === 'undefined' || isNaN(quantity)) {
                        quantity = 0;
                    }
                }
                return [true, quantity, params];
            }
        }
    }
    return [false, false, false];
}

//*****************************����� ��� ����� ����� ������***************************************/

$(document).ready(function() {
    BX.addCustomEvent('onAjaxSuccess', function () {
        /*tooltip_help*/
        if ($.fn.tooltipster) {
            $('.ico_nonehtml_help').tooltipster({
                theme: 'tooltipster_help',
                side: 'bottom',
                debug: false,
                trigger: 'hover'
            });
        }
    });

    /*******������ ��� ����� ������*******/
    $('table tr th').closest('tr').addClass('head_tr_th');

    /*******������ ��� dropdown, ����� �� �� ���������� ��� ����� ������ ����  *******/
    $(document).on("click.bs.dropdown.data-api", ".noclose", function (e) {
        e.stopPropagation()
    });

    /*******��� ����� ����� �� ����� �������*******/
    $(function() {
        var wrapcontent = $('.site_wrap_content');
        var indwrapcontent = wrapcontent.offset().top;

        $(window).on('load scroll', function(){
            var windowpos = $(window).scrollTop();
            var sWidth = $(window).width();

            if(windowpos > indwrapcontent && sWidth > 767 ) {
                $('.site_header__down').addClass("header_fixed");
                $('.site_wrap_content').addClass("header_fixed__content");
                $('.wrap_main_menu').prependTo(".site_header__down__item_up");
                $(".header_link_help").prependTo(".header_search");
                $(".for_fixed_header_login_basket").appendTo(".for_fixed__garage_help");
            } else {
                $(".site_header__down").removeClass("header_fixed");
                $('.site_wrap_content').removeClass("header_fixed__content");
                $('.wrap_main_menu').appendTo(".for_fixed__main_menu");
                $(".header_link_help").appendTo(".for_fixed_header_help");
                $(".for_fixed_header_login_basket").appendTo(".wrap_for_fixed_header_login_basket");
            }

        });
    });

    /*viz/inviz password*/
    $(".input_password").each(function () {
        var inputPassword = this,
            linkInputPassword = $(inputPassword).children(".link_input_password"),
            passwordInp = $(inputPassword).children(".password_inp");
        linkInputPassword.click(function () {
            var type = passwordInp.attr('type') == "text" ? "password" : 'text';
            passwordInp.prop('type', type);
            linkInputPassword.toggleClass('viz_pass');
        });
    });
    /*******************������������� ����� �� VIN/ ����� �� ������ ������***********************/
    $(".mci__origin_c input[name$='origin_c_searchradio']").change(function() {
        var $cont = $(this).closest(".mci__origin_c__search");
        var opt = $(".mci__origin_c input[name$='origin_c_searchradio']:checked").data("cont");

        $cont.find(".site_field").hide();
        $cont.find(".search__" + opt).show();
    });
    //$(".mci__origin_c input[name$='origin_c_searchradio'][data-cont='vin']").click();

    /*fon class for input*/
    $(".site_field input, .site_field textarea").focusout(function(){
        if ($(this).val() !== '')
            $(this).addClass('active');
        else
            $(this).removeClass('active');
    });

    /*vin_help*/
    if ($.fn.tooltipster) {
        $('.ico_link_help').tooltipster({
            theme: 'tooltipster-vin_help',
            side: 'bottom',
            contentCloning: true,
            trigger: 'click'
        });
    }

    /*tooltip_help*/
    if ($.fn.tooltipster) {
        $('.ico_nonehtml_help').tooltipster({
            theme: 'tooltipster_help',
            side: 'bottom',
            trigger: 'hover'
        });
    }

    /*stepper*/
    if ($.fn.stepper) {
        $(".wrap_site_stepper input[type='number']").stepper();
    }

    /*datetimepicker*/
    if ($.fn.datetimepicker) {
        $('.datetimepicker_site').datetimepicker({
            locale: 'ru',
            format: 'DD.MM.YYYY',
        });
    }

    /*lightbox*/
    if(window.lightbox) {
        lightbox.option({
            'disableScrolling': true,
            'fitImagesInViewport': true,
            'showImageNumberLabel': false
        });
    }

    /*fancybox3*/
    if ($.fn.fancybox) {
        $("[data-fancybox]:not(.fancybox_custom)").fancybox({
            buttons: [
                //"zoom",
                //"share",
                //"slideShow",
                //"fullScreen",
                //"download",
                //"thumbs",
                "close"
            ]
        });
    }

    /*light_catalog*/
    /*hover light_content__collapse*/
    $(function() {
        $(".light_content__col").each(function () {
            let light_content_col = this;
            let light_content_collapse = $(light_content_col).find('.light_content__collapse');
            light_content_collapse.on({
                mouseenter: function () {
                    $(light_content_col).addClass("hov");
                },
                mouseleave: function () {
                    $(light_content_col).removeClass("hov");
                }
            });
        });
    });

    $(function() {
        $(".light_content__col__title.text_title").each(function () {
            let light_content_col = this;
            let light_content_collapse = $(light_content_col).find('.text_title__item');
            light_content_collapse.on({
                mouseenter: function () {
                    $(light_content_col).addClass("hov");
                },
                mouseleave: function () {
                    $(light_content_col).removeClass("hov");
                }
            });
        });
    });

    /*light_zoom_img*/
    $('.light_content__collapse .light_collapse__item').mouseenter(function() {
        let $pos_light_item = $(this).offset().left;
        let $pos_cont = $(window).width() - 175;

        if ($pos_light_item > $pos_cont) {
            $(".wrap_light_zoom_img").addClass("zoom_img__right");
        }
    });
    $(".light_content__collapse .light_collapse__item").mouseleave(function() {
        $(".wrap_light_zoom_img").removeClass("zoom_img__right");
    });
    /*END light_catalog*/

    /*catalog_to_v2*/
    $(document).delegate('.collapse_tr', 'click', function (e) {
        e.preventDefault();
        $(this).closest('.catalog_to__option_header').find("a.catalog_to__link_collapse").click();
    });
    $(document).delegate(".catalog_to__option_body", 'show.bs.collapse', function (event) {
        $(event.target).closest('.catalog_to__content_item').addClass('selected_item');
    });
    $(document).delegate(".catalog_to__option_body", 'hide.bs.collapse', function (event) {
        $(event.target).closest('.catalog_to__content_item').removeClass('selected_item');
    });
    /*END catalog_to_v2*/

    /*selectpiker close ico*/
    $(document).on('click','.reset_select', function() {
        $(this).closest('.wrap_selectpicker_site').find('select').val('');
        $(this).closest('.wrap_selectpicker_site').find('select').selectpicker('val', '');
        $(this).closest('.wrap_selectpicker_site').find('select').trigger('change');
        $(this).closest('.wrap_selectpicker_site').removeClass("set_val");
    });

    $(document).on('change', 'select', function() {
        if($(this).val() != ''){
            $(this).closest('.wrap_selectpicker_site').addClass("set_val");
        }
    });

});

/*mob_filter ����������� ������� ����� �� ���. ����� "���������"*/
$(document).on('click', ".site_sort_view__link_filter, .site_filter .close_filter, .mob_filter_apply, .mob_fon_opacity", function (){
    $(".site_filter__site_view_result .for_mob_sidebar_search").animate({
        width: 'toggle'
    });
    $(".mob_fon_opacity").toggleClass("active");
    $(".site_filter .close_filter").toggleClass("active");
    $('body').toggleClass('filter_mob_body_overflow');
});

$(window).on('load',function (){
    $(".mci__origin_c input[name$='origin_c_searchradio']").change();
});