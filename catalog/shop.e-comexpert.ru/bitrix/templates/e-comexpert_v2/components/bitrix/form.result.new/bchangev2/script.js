$(document).ready(function() {

    if ($.fn.validate) {
		$('form[name="branch_change"]').validate({
			errorElement: "span",
			

			errorPlacement: function(error, element) {
				element.parent(".site_field").siblings(".site_field_error_text").remove();
				error = error.attr("class", "site_field_error_text");
				error.insertAfter( element.parent(".site_field "));
				element.parent(".site_field").addClass("site_field_error");
			},

			success: function(label) {
				label.siblings(".site_field_error").removeClass("site_field_error");
				label.remove();
			},

            /*submitHandler: function(form) {
                $('<div class="w247-catalog-loader"><div class="w247-loader-inner"></div></div>').insertBefore($(form));
                $(form)[0].submit();
            }*/
		});

    }

});