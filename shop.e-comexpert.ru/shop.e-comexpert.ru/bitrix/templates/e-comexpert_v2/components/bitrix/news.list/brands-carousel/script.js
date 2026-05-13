$(document).ready(function() {
    if ($.fn.owlCarousel) {
        $('.slider__main_brand').owlCarousel({
            loop: false,
            margin: 20,
            dots: false,
            nav: true,
            navText: ["<span class='ico_slider_arrow icon-ion-chevron-left'></span>","<span class='ico_slider_arrow icon-ion-chevron-right'></span>"],
            responsive: {
                0: {
                    items: 3,
                    margin: 10,
                    slideBy: 3
                },
                999: {
                    items: 4,
                    slideBy: 4,
                },
                1360: {
                    items: 6,
                    slideBy: 6
                }
            }
        });
    }
})