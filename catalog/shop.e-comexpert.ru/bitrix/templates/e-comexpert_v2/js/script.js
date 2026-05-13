$(document).ready(function() {

    /******************Не заинтегрирован блок, после интеграции забрать в шаблон************************/
    if ($.fn.owlCarousel) {
        $('.slider__catalog').owlCarousel({
            loop: false,
            margin: 20,
            dots: false,
            nav: true,
            navText: ["<span class='ico_slider_arrow icon-ion-arrow-left'></span>", "<span class='ico_slider_arrow icon-ion-arrow-right'></span>"],
            responsive: {
                0: {
                    items: 3
                },
                768: {
                    items: 5
                },
                1000: {
                    items: 6
                },
                1360: {
                    items: 8
                }
            }
        });
    }
    /*second_main_page_selected_auto*/
    if ($.fn.owlCarousel) {
        $('.slider_second_selected_auto').owlCarousel({
            margin: 0,
            loop: false,
            autoWidth: true,
            dots: false,
            nav: false
        });
    }
    // Открываем первую из выведенных вкладок
    $(".slider_second_selected_auto .item:first a").trigger("click");
    $(".slider_second_selected_auto .item:first").addClass("active");

    /*owl-carousel по клику листаем к слайду на который кликнули*/
    $('.slider_second_selected_auto').on('click', '.owl-item', function () {
        var click = $(this).index();
        $('.slider_second_selected_auto').trigger('to.owl.carousel', [click])
    });

    /* переключение табов по вкладке */
    $(document).on("click", ".second_selected_auto__cont_slider .slider_second_selected_auto div.item a", function () {
        $(".second_selected_auto__cont_slider .slider_second_selected_auto div.item").removeClass('active');
        $(this).closest("div.item").addClass('active');
    });
    

    $('.second_link_all_auto').click(function() {
        $(this).toggleClass('active');
        $('.second_main_page_selected_auto__item_col').toggleClass('active');
    });

    /*END second_main_page_selected_auto*/

    /*collapse my_order*/
    $(document).delegate('.tr_collapse, .close__tr_collapse__content', 'click', function (e) {
         e.preventDefault();
         $(this).closest('.panel').find('.panel-collapse').collapse('toggle');
    });

     $(document).delegate(".panel-collapse", 'show.bs.collapse', function (event) {
         $(event.target).closest('.panel').addClass('selected-panel');
     });
     $(document).delegate(".panel-collapse", 'hide.bs.collapse', function (event) {
         $(event.target).closest('.panel').removeClass('selected-panel');
     });

     /*modal*/
     $('.modal_cancel_order .selectpicker').change(function(){
         $('.textarea_other').hide();
         $('#' + $(this).find('option:selected').attr('data-value')).show();
     });

    /*video modal  Не заинтегрирован блок, после интеграции забрать в шаблон***/
    // autoPlayYouTubeModal();
    
    //     function autoPlayYouTubeModal() {
    //       var trigger = $("body").find('[data-toggle="modal"]');
    //       trigger.click(function () {
    //           var theModal = $(this).data("target"),
    //               videoSRC = $(this).attr("data-theVideo"),
    //               videoSRCauto = videoSRC + "?autoplay=1";
    //           $(theModal + ' iframe').attr('src', videoSRCauto);
    //           $(theModal + ' button.close').click(function () {
    //               $(theModal + ' iframe').attr('src', videoSRC);
    //           });
    //           $('.modal').click(function () {
    //               $(theModal + ' iframe').attr('src', videoSRC);
    //           });
    //       });
    //     }

    /*select_header_search FOR DEMO*/
    $('.select_header_search .selectpicker').change(function(){
        var $cont = $(this).closest('.serach_selected_head');
        $cont.find('.wrap_form_header_search').hide();
        BX.setCookie('W247_USER_SEARCH',  $(this).val(), {expires: 86400, path: '/' } );
        $cont.find('.' + $(this).find('option:selected').attr('data-value')).show();
    });

    if(BX.getCookie('W247_USER_SEARCH') != undefined && BX.getCookie('W247_USER_SEARCH') != "null"){
        $('.select_header_search .selectpicker').val(BX.getCookie('W247_USER_SEARCH'));
        $('.select_header_search .selectpicker').change();
    }else{
        $('.select_header_search .selectpicker').val("hs_val_vin");
        $('.select_header_search .selectpicker').change();
    }

    /*select_header_search*/
    /*$('.select_header_search .selectpicker').change(function(){
        var $cont = $(this).closest('.search_selected_head');
        $cont.find('.wrap_form_header_search').hide();
        $cont.find('.' + $(this).find('option:selected').attr('data-value')).show();
    });*/

    /*scroll up*/
    $(window).on('load scroll', function() {
        var window_scroll = $(window).scrollTop();

        if(window_scroll > 180) {
            $('.scroll_up_site').show();
        } else {
            $('.scroll_up_site').hide();
        }
    });
    $("a[href='#top']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});
function removeHoverState(){
    $("body").removeClass("no-touch");
}