if (!window.W247) {
    window.W247 = {};
}
if (!window.W247.Garage) {
    var Garage = function () {
    };
    Garage.add = function (car_uid, year, ajax, onsuccess) {
        $.ajax({
            type: 'POST',
            url: '/bitrix/components/w247.garage/ws.garage/templates/.default/ajax.php',
            data: {action: "add_car", car_uid: car_uid, year: year, AJAX_PAGE: ajax, sessid: BX.bitrix_sessid()},
            async: false,
            success: function (data) {
                if (typeof onsuccess == 'function') {
                    onsuccess.call(null, car_uid, year, data);
                }
                BX.onCustomEvent('w247.garage.add', [car_uid, year, data]);
            }
        });
    }
    Garage.change = function (car_uid, year, vin, ajax, onsuccess, id) {
        $.ajax({
            type: 'POST',
            url: '/bitrix/components/w247.garage/ws.garage/templates/.default/ajax.php',
            data: {action: "change_car",
                car_uid: car_uid,
                year: year,
                vin: vin,
                AJAX_PAGE: ajax,
                sessid: BX.bitrix_sessid(),
                id: id
            },
            success: function (data) {
                if (typeof onsuccess == 'function') {
                    onsuccess.call(null, car_uid, year, vin, data);
                }
                BX.onCustomEvent('w247.garage.change', [car_uid, year, vin, data]);
            }
        });
    }
    window.W247.Garage = Garage;
}

function setLaximoParameters($input, $parameter_c, $parameter_vid, $parameter_ssd){
    $input.parents('.settings-form').eq(0).find('input[name="settings[LAXIMO_C]"]').eq(0).val($parameter_c);
    $input.parents('.settings-form').eq(0).find('input[name="settings[LAXIMO_VID]"]').eq(0).val($parameter_vid);
    $input.parents('.settings-form').eq(0).find('input[name="settings[LAXIMO_SSD]"]').eq(0).val($parameter_ssd);
}

function resetLaximoParameters($input){
    $input.parents('.settings-form').eq(0).find('input[name="settings[LAXIMO_C]"]').eq(0).val("");
    $input.parents('.settings-form').eq(0).find('input[name="settings[LAXIMO_VID]"]').eq(0).val("");
    $input.parents('.settings-form').eq(0).find('input[name="settings[LAXIMO_SSD]"]').eq(0).val("");
}

var getUrlParameter = function getUrlParameter(link, name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(link);
    if (results==null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
};


$(document).ready(function () {

    $.fn.w247_garage = function (options) {

        var settings = $.extend({
            // These are the defaults.
            ajax_garage: './ajax.php'
        }, options);

        var form = $(this);

        var AJAX_PAGE = form.find("#" + settings.appliance_block + " input[name=AJAX_PAGE]").val();

        form.on('click', '#appl_mod', function (event) {
            $("#" + settings.modal_add_auto_block).modal('hide');
            var car_uid = form.find("#" + settings.appliance_block + " input[name=CAR_UID]").val();
            var year = form.find("#" + settings.appliance_block + " input[name=YEAR]").val();
            if(car_uid !== '') {
                var f = form.find("#" + settings.appliance_block);
                f.find("input[name=AJAX_ACTION]").val('add_car');
                if(typeof window.loadCatalogFilter == 'function') {
                    window.loadCatalogFilter(f, null, null);
                }
            }
        });

        form.on('click', '.delete_all', function (event) {
            event.preventDefault();
            form.find('.delete_car_garage').click();
        });

        form.on('click', '.appliance_garage_apply', function (event) {
            event.preventDefault();

            $("#" + settings.modal_add_auto_block).modal('hide');

            var car_uid = form.find("#" + settings.appliance_block + " input[name=CAR_UID]").val();
            var year = form.find("#" + settings.appliance_block + " input[name=YEAR]").val();

            $.ajax({
                type: 'POST',
                url: settings.ajax_garage,
                data: {
                    action: "add_car",
                    car_uid: car_uid,
                    year: year,
                    AJAX_PAGE: AJAX_PAGE,
                    sessid: BX.bitrix_sessid()
                },
                success: function (data) {
                    // window.location.reload();
                    form.find("#" + settings.w247_garage_box_block).html(data);
                }
            });

        });

        form.on('click', '.garage_add_car', function (event) {
            var applianceForm = $("#w247_wssync_appliance");

            var brand_select = applianceForm.find(".appl_brand");
            var year_select = applianceForm.find(".appl_year");
            var model_select = applianceForm.find(".appl_model");
            var mod_select = applianceForm.find(".appl_mod");

        });

        form.on('change', '.change_auto_garage', function (event) {
            var car_uid = $(this).val();
            var year = $(this).data("year");
            var vin = $(this).data("vin");
            var id = $(this).data("id");
            var $wrap_garage = $(this).closest('.wrap_garage_li');
            var $li = $(this).closest('.garage_li_block');

            if (AJAX_PAGE == "Y") {

                $.ajax({
                    type: 'POST',
                    url: settings.ajax_garage,
                    data: {
                        action: "change_car",
                        car_uid: car_uid,
                        year: year,
                        vin: vin,
                        AJAX_PAGE: AJAX_PAGE,
                        sessid: BX.bitrix_sessid()
                    },
                    success: function (data) {
                        // window.location.reload();
                        var w247_garage_box = form.find("#" + settings.w247_garage_box_block);
                        w247_garage_box.html(data);
                        var dropdown = w247_garage_box.children('.dropdown').first();
                        if(!dropdown.hasClass('open')) {
                            dropdown.addClass('open');
                        }
                    }
                });

            } else {
                $wrap_garage.find('.garage_block_auto_img .preloader').hide();
                $li.find('.garage_block_auto_img .preloader').show();
                if($("#w247_wssync_appliance").length > 0) {
		            window.W247.Garage.change(car_uid, year, vin, this.ajax_page, function () {
                        var form = $("#w247_wssync_appliance");
                        $("#w247_wssync_appliance input[name=YEAR]").val(year);
                        $("#w247_wssync_appliance input[name=CAR_UID]").val(car_uid);
                        var location_url = form.find("input[name=CAR_PAGE_URL]").val().toString();
                        location_url = location_url.replace('#CAR_UID#', car_uid).replace('#YEAR#', year);
                        window.location.href = location_url;
                    }, id);
                } else {
                    W247.Garage.change(car_uid, year, vin, 'Y', function () {
                        var form = $('.w247_wssync_appliance form');
                        var AJAX_PAGE = form.find("input[name=AJAX_PAGE]").val();
                        var location_url = form.find("input[name=CAR_PAGE_URL]").val().toString();
                        location_url = location_url.replace('#CAR_UID#', car_uid).replace('#YEAR#', year);
                        window.location.href = location_url;
                    });
                }
            }

        });

        form.on('click', '.delete_car_garage', function (event) {
            event.preventDefault();

            var id = $(this).attr("data-id");

            $.ajax({
                type: 'POST',
                url: settings.ajax_garage,
                data: {BLOCK_ID: settings.BLOCK_ID, action: "delete_car", id: id, AJAX_PAGE: AJAX_PAGE, sessid: BX.bitrix_sessid()},
                success: function (data) {
                    // window.location.reload();
                    var w247_garage_box = form.find("#" + settings.w247_garage_box_block);
                    w247_garage_box.html(data);
                    var dropdown = w247_garage_box.children('.dropdown').first();
                    if(!dropdown.hasClass('open')) {
                        dropdown.addClass('open');
                    }
                    if ($.fn.tooltipster) {
                        $('.ico_nonehtml_help').tooltipster({
                            theme: 'tooltipster_help',
                            side: 'bottom',
                            debug: false,
                            trigger: 'hover'
                        });
                    }   
                }
            });

        });

        form.on('click', '.garage_edit_car', function (event) {
            event.preventDefault();
            $(this).closest('.level-0').find(".settings-form .box-edit-car").show();
            $(this).parents('.garage_block_auto').eq(0).find('input[name="vin"]').eq(0).keyup();
        });

        form.on('click', '.garage_save_car', function (event) {
            event.preventDefault();
            if($(this).closest('form').find('.wrap_laximo').length > 0){
                if($(this).closest('form').find('.wrap_laximo .cur-row').length == 0 && ($(this).closest('form').find('[name="settings[LAXIMO_C]"]').val() === "")){
                    $(this).closest('form').find('.not-vin').remove();
                    $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_CHANGE_CAR_MODIFICATION") +'</span>').insertAfter($(this).closest('form').find('input[name="vin"]').eq(0));
                    return false;
                }
            }

            if(($(this).closest('form').find('[name="vin"]').eq(0).val().length > 0) && ($(this).closest('form').find('[name="vin"]').eq(0).val().length < 17)) {
                $(this).closest('form').find('.not-vin').remove();
                $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_CHARS_SHORTAGE") +'</span>').insertAfter($(this).closest('form').find('input[name="vin"]').eq(0));
                return false;
            }

            if(($(this).closest('form').find('[name="vin"]').eq(0).val().length > 0) && ($(this).closest('form').find('[name="vin"]').eq(0).val().length > 17)) {
                $(this).closest('form').find('.not-vin').remove();
                $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_CHARS_LIMIT") +'</span>').insertAfter($(this).closest('form').find('input[name="vin"]').eq(0));
                return false;
            }

            var action = $(this).closest('form').serialize() + "&action=save_settings&AJAX_PAGE=" + AJAX_PAGE + "&sessid=" + BX.bitrix_sessid();

            $.ajax({
                type: 'POST',
                url: settings.ajax_garage,
                data: action,
                success: function (data) {
                    // window.location.reload();
                    var w247_garage_box = form.find("#" + settings.w247_garage_box_block);
                    w247_garage_box.html(data);
                    var dropdown = w247_garage_box.children('.dropdown').first();
                    if(!dropdown.hasClass('open')) {
                        dropdown.addClass('open');
                    }
                }
            });

        });

        form.on('click', '.garage_cancel_car', function (event) {
            event.preventDefault();
            $(this).closest('form')[0].reset();
            $(this).closest('.garage_block_auto').find(".box-view-car").show();
            $(this).closest('form').find('.box-edit-car').hide();
        });

        form.on('click', '.garage_block_auto .linked', function (event) {
            event.preventDefault();
            $(this).parents('.garage_block_auto').find('input.change_auto_garage').prop('checked', true).trigger('change');
        });

        form.on('click','.in-garage.wrap_laximo a',function(e) {
            e.preventDefault();
            $(this).parents('table').eq(0).find('tr').removeClass('cur-row');
            $(this).parents('tr').eq(0).addClass('cur-row');
            noOneCar = [];
            noOneCar[0] = getUrlParameter($(this).attr('href'), 'c');
            noOneCar[1] = getUrlParameter($(this).attr('href'), 'vid');
            noOneCar[2] = getUrlParameter($(this).attr('href'), 'ssd');
            if(noOneCar.length == 3){
                $inputVin = $(this).parents('.wrap_laximo').eq(0).siblings('input[name="vin"]').eq(0);
                setLaximoParameters($inputVin, noOneCar[0], noOneCar[1], noOneCar[2]);
                $inputVin.siblings('.not-vin').remove();
                $(this).closest('form').find('.garage_save_car').click();
            }
        });

        form.on('click','.in-garage.wrap_laximo tr.with-popover',function(e) {
            e.preventDefault();
            $(this).parents('table').eq(0).find('tr').removeClass('cur-row');
            $(this).addClass('cur-row');
            noOneCar = [];
            noOneCar[0] = getUrlParameter($(this).find('a').eq(0).attr('href'), 'c');
            noOneCar[1] = getUrlParameter($(this).find('a').eq(0).attr('href'), 'vid');
            noOneCar[2] = getUrlParameter($(this).find('a').eq(0).attr('href'), 'ssd');
            if(noOneCar.length == 3){
                $inputVin = $(this).parents('.wrap_laximo').eq(0).siblings('input[name="vin"]').eq(0);
                setLaximoParameters($inputVin, noOneCar[0], noOneCar[1], noOneCar[2]);
                $inputVin.siblings('.not-vin').remove();
                $(this).closest('form').find('.garage_save_car').click();

            }
        });

        form.on('keyup','input[name="vin"]',function() {
            var $inputVin = $(this);
            if($(this).val().length==17){
                $.ajax({
                    type: 'POST',
                    url: '/bitrix/components/w247.garage/ws.garage/templates/.default/ajaxlaximo.php',
                    data: {vin: $(this).val()},
                    success: function (data) {
                        if((data != "not VIN") && (data != "not found VIN")){
                            $inputVin.siblings('.not-vin').remove()
                            var oneCar = data.split('~^');
                            if(oneCar.length ==3){
                                $inputVin.siblings('.wrap_laximo').remove();
                                setLaximoParameters($inputVin, oneCar[0], oneCar[1], oneCar[2]);
                            }else{
                                $inputVin.siblings('.wrap_laximo').remove();
                                $(data).insertAfter($inputVin);
                            }
                        }else{
                            $inputVin.siblings('.wrap_laximo').remove()
                            $inputVin.siblings('.not-vin').remove();
                            $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_WRONG_VIN") + '</span>').insertAfter($inputVin);
                        }
                    }
                });
            }else if($(this).val().length < 17){
                $inputVin.siblings('.not-vin').remove();
                $inputVin.siblings('.wrap_laximo').remove();
                resetLaximoParameters($inputVin);
            }else if($(this).val().length > 17){
                $inputVin.siblings('.not-vin').remove();
                $inputVin.siblings('.wrap_laximo').remove();
                resetLaximoParameters($inputVin);
                $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_CHARS_LIMIT") +'</span>').insertAfter($inputVin);
            }
        });

        form.on('paste','input[name="vin"]',function() {
            var $inputVin = $(this);
            setTimeout(function () {
                if($inputVin.val().length==17){
                    $.ajax({
                        type: 'POST',
                        url: '/bitrix/components/w247.garage/ws.garage/templates/.default/ajaxlaximo.php',
                        data: {vin: $inputVin.val()},
                        success: function (data) {
                            if((data != "not VIN") && (data != "not found VIN")){
                                $inputVin.siblings('.not-vin').remove();
                                var oneCar = data.split('~^');
                                if(oneCar.length ==3){
                                    $inputVin.siblings('.wrap_laximo').remove();
                                    setLaximoParameters($inputVin, oneCar[0], oneCar[1], oneCar[2]);
                                }else{
                                    $inputVin.siblings('.wrap_laximo').remove();
                                    $(data).insertAfter($inputVin);
                                }
                            }else{
                                $inputVin.siblings('.wrap_laximo').remove()
                                $inputVin.siblings('.not-vin').remove();
                                $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_WRONG_VIN") +'</span>').insertAfter($inputVin);
                            }
                        }
                    });
                }else if($inputVin.val().length < 17){
                    $inputVin.siblings('.not-vin').remove();
                    $inputVin.siblings('.wrap_laximo').remove();
                    resetLaximoParameters($inputVin);
                }else if($inputVin.val().length > 17){
                    $inputVin.siblings('.not-vin').remove();
                    $inputVin.siblings('.wrap_laximo').remove();
                    resetLaximoParameters($inputVin);
                    $('<span class="not-vin" style="color: red;">'+ BX.message("W247_GARAGE_CHARS_LIMIT") +'</span>').insertAfter($inputVin);
                }
            }, 50);
        });
    }

    /*mob garage*/
    $('.wrap_garage .dropdown').on('show.bs.dropdown', function() {
        $('.mob_fon_main_garage').addClass('active');
        $('.close_garage').addClass('active');
        $('body').addClass('mob_body_overflow');
    });

    $('.wrap_garage .dropdown').on('hide.bs.dropdown', function() {
        $('.mob_fon_main_garage').removeClass('active');
        $('.close_garage').removeClass('active');
        $('body').removeClass('mob_body_overflow');
    });

    $(document).on("click", ".garage_main__item .garage_main__item__title_auto", function(event) {
        event.preventDefault();
        $(this).parents('.garage_main__item').find('.radio input').prop('checked', true).trigger('change');
    });
});