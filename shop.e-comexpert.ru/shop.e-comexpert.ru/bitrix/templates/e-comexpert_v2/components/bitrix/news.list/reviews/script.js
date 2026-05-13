$(document).ready(function() {
    if ($.fn.owlCarousel) {
        $('.slider__main_comments').on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            $('.slider_counter').text(carousel.relative(carousel.current()) + 1 + BX.message("OF_TITLE") + carousel.items().length);
        }).owlCarousel({
            center: true,
            stagePadding: 350,
            loop: true,
            margin: 20,
            dots: false,
            nav: true,
            navText: ["<span class='ico_slider_arrow icon-ion-chevron-left'></span>","<span class='ico_slider_arrow icon-ion-chevron-right'></span>"],
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 0,
                    center: false
                },
                768: {
                    items: 1,
                    stagePadding: 80
                },
                1000: {
                    items: 1,
                    stagePadding: 140
                },
                1360: {
                    items: 1
                }
            }
        });
    }
})