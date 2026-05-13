$(document).ready(function() {
    if ($.fn.owlCarousel) {
        $('.slider__stock').owlCarousel({
            loop: false,
            margin: 20,
            dots: true,
            nav: true,
            navText: ["<span class='ico_slider_arrow icon-ion-chevron-left'></span>","<span class='ico_slider_arrow icon-ion-chevron-right'></span>"],
            responsive: {
                0: {
                    items: 1,
                    slideBy: 1
                }
            }
        });
    }
})