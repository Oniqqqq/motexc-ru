;(function () {
    var TopAuth = function (form) {
        this.form = form;
        this.errorContainer = this.form.querySelector('.error-container');
        this.init();
    }
    TopAuth.prototype = {
        init: function () {
            this.submitBtn = this.form.querySelector('input[type="submit"]');
            BX.bind(BX(this.submitBtn), 'click', this.submitBtnClickHandler.bind(this));
        },
        submitBtnClickHandler: function (event) {
            event.preventDefault();
            var formData = {};
            this.form.querySelectorAll('input').forEach(function (item) {
                formData[item.name] = item.value;
            });

            BX.ajax({
                url: authCheckpassTemplateFolder + '/ajax/checkpass.php',
                dataType: 'json',
                method: 'POST',
                data: {
                    'LOGIN': formData.USER_LOGIN,
                    'PASSWORD': formData.USER_PASSWORD,
                },
                onsuccess: this.submitHandler.bind(this),
            });

            return false;
        },
        submitHandler: function (data) {
            if(data.ERROR) {
                BX.adjust(BX(this.errorContainer), {html: '<span class="red_link">'+data.MESSAGE+'</span>'});
                
            } else {
                this.form.submit();

            }
        },
    }
    BX.ready(function () {
        var forms = document.querySelectorAll('.auth-form');
        forms.forEach(function (item) {
            new TopAuth(item);
        });
    });
})();