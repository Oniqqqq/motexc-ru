$(document).ready(function() {
    if ($.fn.owlCarousel) {
        $('.profile_tabs_slider').owlCarousel({
            loop: false,
            margin: 5,
            dots: true,
            nav: false,
            autoWidth: true,
            responsive: {
                0: {
                    items: 6
                }
            }
        });
    }
})
