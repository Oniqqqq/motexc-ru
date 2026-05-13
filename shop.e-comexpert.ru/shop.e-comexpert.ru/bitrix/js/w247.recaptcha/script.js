"use strict";

BX.addCustomEvent('onAjaxSuccess', function () {
    $('body input[name="recaptcha_response"]').each(function() {
        var $responsesInput = $(this);
        /*grecaptcha.execute($(this).attr("data-sitekey"), {action: "homepage"}).then(function (token) {
            $responsesInput.val(token);
        });*/
    });

});