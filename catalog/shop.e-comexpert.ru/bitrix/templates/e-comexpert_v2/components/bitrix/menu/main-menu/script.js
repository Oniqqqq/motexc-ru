$(document).ready(function() {
    $('.main_menu .dropdown').on('show.bs.dropdown', function () {
        $('.mob_fon_main_menu').addClass('active');
        $('.close_menu').addClass('active');
        $('body').addClass('mob_body_overflow');
    });

    $('.main_menu .dropdown').on('hide.bs.dropdown', function () {
        $('.mob_fon_main_menu').removeClass('active');
        $('.close_menu').removeClass('active');
        $('body').removeClass('mob_body_overflow');
    });
})