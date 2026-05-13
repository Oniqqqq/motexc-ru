$(function () {
    managerFunction();
    $(document).delegate('[data-toggle="popover"]', 'click', function (e) {
        e.preventDefault();
    });

    /*$(document).delegate('select.item-status,select.order-status', 'change', function () {
        setStatusColor($(this));
    });*/

    /*$('/*.filter_search_order [type="text"],.filter_search_order select.status,.filter_search_order [type="email"]').change(function () {
        var $form = $(this).closest('form');
        var data = $form.serialize();
        managerFilter(data);
    });*/

    $(document).delegate('.cancel_order_btn', 'click', function (e) {
        $(".source-of-modal").removeClass("source-of-modal");
        $(this).addClass("source-of-modal");
    })
    $(document).delegate('#cancel_order', 'shown.bs.modal', function (e) {
        $("#cancel_order form")[0].reset();
        if(typeof $(".source-of-modal").attr("data-phone") != "undefined")
            $("#cancel_order #Phone").val($(".source-of-modal").attr("data-phone"));
        if(typeof $(".source-of-modal").attr("data-email") != "undefined")
            $("#cancel_order #Email").val($(".source-of-modal").attr("data-email"));
        if(typeof $(".source-of-modal").attr("data-fio") != "undefined")
            $("#cancel_order #Fio").val($(".source-of-modal").attr("data-fio"));
        if(typeof $(".source-of-modal").attr("data-order")!= "undefined")
            $("#cancel_order #Order").val($(".source-of-modal").attr("data-order"));
        /*console.log($('#cancel_order #Phone').val());
        console.log($('#cancel_order #Email').val());
        console.log($('#cancel_order #Fio').val());
        console.log($('#cancel_order #Order').val());*/
    })
    $(document).delegate('.my_orders__content .pagination_list .site_link', 'click', function (e) {
        e.preventDefault();
        var $form = $("form.form_fso").find('input, select');
        var data = $form.filter(function(index, element) {
            return $(element).val() != '';
        }).serialize();
        var page_query = $(event.target).closest('a').data('page-query');
        managerFilter(data, page_query);
    })
    $('.filter_search_order select[name="filter_status[]"]').change(function () {
        var $form = $(this).closest('form').find('input, select');
        var data = $form.filter(function(index, element) {
            return $(element).val() != '';
        }).serialize();
        managerFilter(data);
    });
    $('#datetimepicker1,#datetimepicker2').on('dp.change', function () {
        var $form = $(this).closest('form').find('input, select');
        var data = $form.filter(function(index, element) {
            return $(element).val() != '';
        }).serialize();
        managerFilter(data);
    });
    /*$('.filter_search_order .wrap_filter_zak_link .btn_link').on('click', function (e) {
        e.preventDefault();
        var $form = $(this).closest('form');
        var data = $form.serialize();
        managerFilter(data);
    });*/
    /*$('.filter_search_order .wrap_filter_zak_link .link_reset').on('click', function (e) {
        e.preventDefault();
        var $form = $(this).closest('form');
        $form[0].reset();
        var data = $form.serialize();
        managerFilter(data);
        $('.selectpicker').selectpicker('refresh');
    });*/

    $.date = function(dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "." + month + "." + year;

        return date;
    };

    $(document).delegate('.modal_edit_info .wrap_filter_zak_link .btn_link', 'click', function (e) {
        e.preventDefault();
        $('.modal_edit_info').modal('hide');
        var fromArray = $(this).closest('.modal_edit_info').find('form').serializeArray();
        var data = {};
        fromArray.forEach(function (item, i, arr) {
            data[item.name] = item.value;
        });
        execAction(data);
    });

    $(document).delegate('.modal_edit_info .wrap_filter_zak_link [type="button"]', 'click', function (e) {
        e.preventDefault();
        $(this).closest('.modal_edit_info').find('form')[0].reset();
    });

    $(document).delegate('select.item-status,select.order-status', 'change', function () {
        var status = $(this).find('option:selected').val();
        if ($(this).hasClass('item-status')) {
            var basket_id = $(this).data('basket-id');
            execAction({
                basket_id: basket_id,
                action: 'basket_status',
                status: status
            });
        } else {
            var order_id = $(this).data('order-id');
            execAction({
                order_id: order_id,
                action: 'order_status',
                status: status
            });
        }
    });

        $(document).delegate('select.age', 'change', function () {
            var status = $(this).val();
                switch (status) {
                    case "today":
                        $('[name="filter_date_from"]').val( $.date(new Date()));
                        $('[name="filter_date_to"]').val( $.date(new Date()));
                        break;
                    case "week":
                        var d = new Date();
                        d.setDate(d.getDate()-7);
                        $('[name="filter_date_from"]').val( $.date(d));
                        $('[name="filter_date_to"]').val( $.date(new Date()));
                        break;
                    case "month":
                        var d = new Date();
                        d.setDate(d.getDate()-30);
                        $('[name="filter_date_from"]').val( $.date(d));
                        $('[name="filter_date_to"]').val( $.date(new Date()));
                        break;
                    case "half_year":
                        var d = new Date();
                        d.setDate(d.getDate()-183);
                        $('[name="filter_date_from"]').val( $.date(d));
                        $('[name="filter_date_to"]').val( $.date(new Date()));
                        break;
                    case "year":
                        var d = new Date();
                        d.setDate(d.getDate()-365);
                        $('[name="filter_date_from"]').val( $.date(d));
                        $('[name="filter_date_to"]').val( $.date(new Date()));
                        break;
                }
                $('[name="filter_date_from"], [name="filter_date_to"]').addClass("active");
                var $form = $(this).closest('form').find('input, select');
                var data = $form.filter(function(index, element) {
                    return $(element).val() != '';
                }).serialize();
                managerFilter(data);
        });

        $(document).delegate('.select_row', 'click', function (e) {
                e.preventDefault();
                $(this).closest('.zak_table_row').find("a.link_table_col").click();
            });
            $(document).delegate(".panel-collapse", 'shown.bs.collapse', BX.delegate(function (event) {
                $(event.target).closest('.panel').addClass('selected-panel');
            }, this));
            $(document).delegate(".panel-collapse", 'hidden.bs.collapse', BX.delegate(function (event) {
                $(event.target).closest('.panel').removeClass('selected-panel');
            }, this));

        });


        function setStatusColor(select) {
            var elements = [];
            if (typeof select === 'undefined') {
                $('select.item-status,select.order-status').each(function (i, item) {
                    elements.push(item);
                });
            } else {
                elements.push(select);
            }
            elements.forEach(function (item, i, arr) {
                var $option = $(item).find('option:selected');
                var bgcolor = $option.data('color');
                var status_id = $option.val();
                var color = '';
                var color2 = '';
                switch (status_id) {
                    case "F":
                        color = 'select_green';
                        color2 = 'link_green';
                        break;
                    case "C":
                        color = 'select_red';
                        color2 = 'link_red';
                        break;
                }
                if ($(item).hasClass('order-status')) {
                    $(item).closest('.wrap_select_btn').removeClass('select_green');
                    $(item).closest('.wrap_select_btn').removeClass('select_red');
                    if (color != '') {
                        $(item).closest('.wrap_select_btn').addClass(color);
                    }
                    var $b = $(item).closest('.wrap_select_btn').find('button');
                    if (bgcolor != '') {
                        $b.css('background-color', bgcolor);
                    } else {
                        $b.css('background-color', '');
                    }
                }
                if ($(item).hasClass('item-status')) {
                    $(item).closest('.wrap_btn_link_select').removeClass('link_green');
                    $(item).closest('.wrap_btn_link_select').removeClass('link_red');
                    if (color2 != '') {
                        $(item).closest('.wrap_btn_link_select').addClass(color2);
                    }
                    var $b = $(item).closest('.wrap_btn_link_select').find('button');
                    if (bgcolor != '') {
                        $b.css('color', bgcolor);
                    } else {
                        $b.css('color', '');
                    }
                }
            });
        }

        function managerFilter(data, page_query) {
            BXshowWait($('.container_table')[0]);


            $.ajax({
                url: '/local/ajax/manager/filter.php' + (typeof page_query !== 'undefined' ? '?' + page_query : ''),
                method: 'post',
                dataType: 'json',
                data: data,
                success: function (json) {
                    $('.my_orders__content .pagination_block').remove();
                    if (typeof json.table !== 'undefined') {
                        $('.container_table').html(json.table);
                        managerFunction();
                    }
                    BXcloseWait($('.container_table')[0]);
                    if(typeof $.scrollTo == 'function') {
                        $.scrollTo($('.wrapper_content').offset().top - 150, 600);
                    }
                    if($.fn.selectpicker) $('.selectpicker').selectpicker('refresh');
                    if ($.fn.tooltipster) {
                        $('.ico_nonehtml_help').tooltipster({
                            theme: 'tooltipster_help',
                            side: 'bottom',
                            debug: false,
                            trigger: 'hover'
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('.my_orders__content .pagination_block').remove();
                    BXcloseWait($('.container_table')[0]);
                }
            });
        }

        function BXshowWait(cont){
            $(cont).append('<div class="manager-overload">' +
                '<div class="manager-loader-container"><div class="manager-loader-inner"></div></div>' +
                '</div>');
        }

        function BXcloseWait(cont){
            $(cont).find('.manager-loader-container').remove();
        }

        function managerFunction() {
            /*$('#datetimepicker1').datetimepicker({
                locale: 'ru',
                format: 'DD.MM.YYYY'
            });
            $('#datetimepicker2').datetimepicker({
                locale: 'ru',
                format: 'DD.MM.YYYY'
            });
            $('.selectpicker').selectpicker({
                selectAllText: 'Выбрать все',
                deselectAllText: 'Сбросить'
            });
            $('[data-toggle="popover"]').popover();
            setStatusColor();*/
    //$(".phone-mask").mask("+7 (999) 999-9999");
    //$(".phone-mask").attr('placeholder', '+7 (___) ___-____');
    //$(".inn-mask").mask("999999999999");
    //$(".inn-mask").attr('placeholder', '____________');
}

function execAction(data) {
    BXshowWait($('.container_table')[0]);
    var $form = $('.filter_search_order form');
    var fromArray = $form.serializeArray();
    var filter = {};
    fromArray.forEach(function (item, i, arr) {
        if (item.name.indexOf("[]") >= 0){
            var n = item.name.substr(0, item.name.length - 2);
            if (typeof filter[n] === 'undefined'){
                filter[n] = [];
            }
            filter[n].push(item.value);
        } else {
            filter[item.name] = item.value;
        }
    });
    filter['collapsed'] = [];
    $('.wrap_table_zak .panel .panel-collapse.in').each(function (i, item) {
        filter['collapsed'].push($(item).data('order'));
    });
    data['filter'] = filter;
    var page_query = '';

    if ($('.container_table ul.pagination .bx-active').length > 0){
        page_query = parseInt($('.container_table ul.pagination .bx-active span').html());
    }
    $.ajax({
        url: '/local/ajax/manager/action.php' + (page_query !== '' ? '?PAGEN_1=' + page_query : ''),
        method: 'post',
        dataType: 'json',
        data: data,
        success: function (json) {
            BXcloseWait($('.container_table')[0]);
            if (typeof json.table !== 'undefined' && json.table !== false) {
                $('.container_table').html(json.table);
                managerFunction();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            BXcloseWait($('.container_table')[0]);
        }
    });
}

$(document).ready(function() {
    $("select.age").val("month");
    $("select.age").change();
});