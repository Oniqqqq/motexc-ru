$(document).ready(function() {

    if ($.fn.validate) {
		$('form[name="callback"]').validate({
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

			submitHandler: function(form) {
				if($(form).find('.main-user-consent-request input[type="checkbox"]').length > 0) {
					if ($(form).find('.main-user-consent-request input[type="checkbox"]:checked').length > 0) {
						$('<div class="w247-catalog-loader"><div class="w247-loader-inner"></div></div>').insertBefore($(form));
						$(form).find('[type="submit"]').attr('disabled','disabled');
						$(form)[0].submit();
					} else {
						$('.consent_error').remove();
						$($(form).find('.main-user-consent-request')).append( '<span class="site_field_error_text consent_error">Требуется согласие на обработку персональных данных</span>');
					}
				} else{
					$(form).find('[type="submit"]').attr('disabled','disabled');
					$(form)[0].submit();
				}
			}
		});


        $('form[name="help"]').validate({
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

			submitHandler: function(form) {
				if($(form).find('.main-user-consent-request input[type="checkbox"]').length > 0) {
					if ($(form).find('.main-user-consent-request input[type="checkbox"]:checked').length > 0) {
						$('<div class="w247-catalog-loader"><div class="w247-loader-inner"></div></div>').insertBefore($(form));
						$(form).find('[type="submit"]').attr('disabled','disabled');
						$(form)[0].submit();
					} else {
						$('.consent_error').remove();
						$($(form).find('.main-user-consent-request')).append( '<span class="site_field_error_text consent_error">Требуется согласие на обработку персональных данных</span>');
					}
				} else{
					$(form).find('[type="submit"]').attr('disabled','disabled');
					$(form)[0].submit();
				}
			}
		});
    }

});