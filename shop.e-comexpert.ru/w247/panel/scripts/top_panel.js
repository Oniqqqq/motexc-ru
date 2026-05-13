;(function () {
    if (typeof window.W247 == 'undefined') {
        window.W247 = new function () {
        };
    }
    if (typeof window.W247.Util == 'undefined') {
        window.W247.Util = new function () {
        }
    }
    if(!window.W247.Util.Url) {
        window.W247.Util.Url = {
            parseUrl: function (url) {
                var regex = /(https?:\/\/)?((?:www\.)?[^\.\/]+(?:\.[^\.\/]{2,})+)?(\/[^\?#]+)((?:\?)[^#]+)?((?:#)[.]+)?/gi;
                var matches = regex.exec(url);
                if (typeof matches[4] != 'undefined') {
                    var query = {};
                    if (matches[4].substr(0, 1) === '?') {
                        matches[4] = matches[4].substr(1);
                    }
                    matches[4] = matches[4].split('&');
                    for (var i in matches[4]) {
                        matches[4][i] = matches[4][i].split('=');
                        query[matches[4][i][0]] = matches[4][i][1];
                    }
                    matches[4] = query;
                } else {
                    matches[4] = {};
                }
                var retVal = {
                    'proto': matches[1],
                    'host': matches[2],
                    'url': matches[3],
                    'query': !!matches[4] ? matches[4] : {},
                    'param': !!matches[5] ? matches[5] : "",
                };
                return retVal;
            },
            buildUrl: function (arUrl) {
                var strQuery = [];
                for (var i in arUrl.query) {
                    strQuery.push(i + "=" + arUrl.query[i]);
                }
                return arUrl.proto + arUrl.host + arUrl.url + (strQuery.length > 0 ? "?" + strQuery.join("&") : "") + arUrl.param;
            }
        }
    }


    if (typeof window.W247.Panel == 'undefined') {
        window.W247.Panel = new function () {
        }
    }
    var SimpleRegister = function () {
        this.formID = "#w247_panel_register_form";
        this.Init();
    }
    SimpleRegister.getInstance = function () {
        if (typeof SimpleRegister.instance == 'undefined') {
            SimpleRegister.instance = new SimpleRegister();
        }
        return SimpleRegister.instance;
    }
    SimpleRegister.prototype.Init = function () {
        BX.ajax.load({
            url: '/bitrix/tools/w247_panel_register.php',
            type: 'json',
            callback: function (options) {
                this.options = options;
                this.InitPopup();
                this.InitEvents();
            }.bind(this),
        });
    }
    SimpleRegister.inArray = function (needle, haystack) {
        for (var i in haystack) {
            if (haystack[i] == needle) {
                return true;
            }
        }
        return false;
    }
    SimpleRegister.prototype.InitPopup = function () {
        var htmlData = '<form id="w247_panel_register_form" action="/bitrix/tools/w247_panel_register.php" method="post">' +
            '<div id="error_container" style="display: none"></div>';
        for (var i in this.options.SETTINGS.FIELDS) {
            var fieldCode = this.options.SETTINGS.FIELDS[i],
                required = SimpleRegister.inArray(fieldCode, this.options.SETTINGS.REQUIERED_FIELDS),
                inputclass = 'class="' + (fieldCode.indexOf("PHONE") > 0 ? 'mask-phone' : '') + '"';
            htmlData += '<div class="row ' + (required ? 'required' : '') + '">';
            htmlData += '<div class="col-lg-6 col-sm-6 col-xs-6">' + this.options.FIELDS[fieldCode] + (required ? ' *' : '') + ':</div>';
            htmlData += '<div class="col-lg-6 col-sm-6 col-xs-6"><input type="text" data-name="' + fieldCode + '" name="W247_REGISTER[' + fieldCode + ']" ' + inputclass + '></div>';
            htmlData += '</div>';
        }
        for (var i in this.options.SETTINGS.USER_FIELDS) {
            var fieldCode = this.options.SETTINGS.USER_FIELDS[i],
                required = SimpleRegister.inArray(fieldCode, this.options.SETTINGS.REQUIERED_USER_FIELDS);
            htmlData += '<div class="row ' + (required ? 'required' : '') + '">';
            htmlData += '<div class="col-lg-6 col-sm-6 col-xs-6">' + this.options.USER_FIELDS[fieldCode] + (required ? ' *' : '') + ':</div>';
            htmlData += '<div class="col-lg-6 col-sm-6 col-xs-6"><input type="text" data-name="' + fieldCode + '" name="W247_REGISTER[' + fieldCode + ']"></div>';
            htmlData += '</div>';
        }
        htmlData += '</form><style>' +
            '#w247_panel_register_form .row{margin-bottom: 5px}' +
            '#w247_panel_register_form input{border: 1px solid #7a7a7a; padding: 5px; box-sizing: border-box; width: 100%}' +
            '#w247_panel_register_form input.error{ color: #cc0033;display: inline-block;background-color: #fce4e4;border: 1px solid #cc0033;outline: none;}' +
            '#w247_panel_register_form #error_container{ color: red;display: inline-block;font-size: 12px;line-height: 15px;margin: 5px 0 15px;font-weight: bold;}' +
            '#w247_panel_register_popup .access-title-bar{ line-height: 40px}' +
            '</style>';
        this.registerPopup = BX.PopupWindowManager.create("w247_panel_register_popup", null, {
            content: htmlData,//BX('ajax-add-answer'),
            closeIcon: {right: "20px", top: "10px"},
            titleBar: {
                content: BX.create("span", {
                    html: '<b>'+BX.message('W247_PANEL_MODAL_TITLE')+'</b>',
                    'props': {'className': 'access-title-bar'}
                })
            },
            zIndex: 0,
            offsetLeft: 0,
            offsetTop: 0,
            overlay: true,
            dragged: false,
            draggable: false,
            //darkMode: true,
            //autoHide: true,
            buttons: [
                new BX.PopupWindowButton({
                    text: BX.message('W247_PANEL_MODAL_ACCEPT_BTN'),
                    className: "popup-window-button-accept",
                    events: {
                        click: function () {
                            var noError = this.checkFormData();
                            if (noError) {
                                var form = this.registerPopup.popupContainer.querySelector(this.formID),
                                    obForm = new FormData(form),
                                    errorContainer = this.registerPopup.popupContainer.querySelector("#error_container");
                                BX.ajax.submit(BX(form), function (data) {
                                    var jsonData = window.JSON.parse(data);
                                    if (jsonData.ID <= 0 && jsonData.ERROR.length > 0) {
                                        BX.adjust(BX(errorContainer), {'html': jsonData.ERROR, 'style': {'display': 'block'}});
                                    } else {
                                        BX.adjust(BX(errorContainer), {'html': '', 'style': {'display': 'none'}});
                                        var arUrl = W247.Util.Url.parseUrl(window.location.href);
                                        if(typeof arUrl.query.back_url != 'undefined') {
                                            window.location.href = decodeURIComponent(arUrl.query.back_url);
                                        } else {
                                            window.location.reload();
                                        }
                                    }
                                })
                            }
                        }.bind(this)
                    }
                }),
                new BX.PopupWindowButton({
                    text: BX.message('W247_PANEL_MODAL_CANCEL_BTN'),
                    className: "webform-button-link-cancel",
                    events: {
                        click: function () {
                            this.popupWindow.close(); // close modal window
                        }
                    }
                })
            ]
        });
        var form = this.registerPopup.popupContainer.querySelector(this.formID),
            inputs = form.querySelectorAll('input,textarea'),
            settings = this.options.SETTINGS;
        inputs.forEach(function (element, index) {
            var eventName = 'keyup';
            if (element.tagName == 'INPUT') {
                if (element.type == 'checkbox') {
                    eventName = 'change';
                }
            }
            BX.bind(BX(element), eventName, this.checkFormElementHandler.bind(this));
        }.bind(this));

        if (typeof window.W247.Panel.quickRegister !== 'undefined'){
            var qr = window.W247.Panel.quickRegister;
            window.W247.Panel.SimpleRegister.getInstance().registerPopup.show();
            var $phone = $(window.W247.Panel.SimpleRegister.getInstance().registerPopup.contentContainer).find('[name="W247_REGISTER[PERSONAL_PHONE]"]');
            $phone.val('+' + qr.phone);
        }
        this.mask();
    }
    SimpleRegister.prototype.mask = function () {
        if (!$.fn.mask) {
            return false;
        }
        if (typeof this.options.SETTINGS.MASK_PHONE !== 'undefined' &&
            this.options.SETTINGS.MASK_PHONE != '' &&
            this.options.SETTINGS.MASK_PHONE != null) {
            $(this.registerPopup.popupContainer).find(".mask-phone").mask(this.options.SETTINGS.MASK_PHONE);
            $(this.registerPopup.popupContainer).find(".mask-phone").attr('placeholder',
                this.options.SETTINGS.MASK_PHONE.replace(new RegExp("9", 'g'), "_")
            );
        }
    }
    SimpleRegister.prototype.checkFormData = function () {
        var form = this.registerPopup.popupContainer.querySelector(this.formID),
            inputs = form.querySelectorAll('input,textarea'),
            error = true;
        inputs.forEach(function (element, index) {
            var eventName = 'keydown';
            if (element.tagName == 'INPUT') {
                if (element.type == 'checkbox') {
                    eventName = 'change';
                }
            }
            var elementError = this.checkFormElement(element);
            error = error && elementError;
        }.bind(this));
        return error;
    }
    SimpleRegister.prototype.checkFormElementHandler = function (event) {
        var element = event.srcElement || event.target;
        this.checkFormElement(element);
    }
    SimpleRegister.prototype.checkFormElement = function (element) {
        var name = element.getAttribute('data-name'),
            required = SimpleRegister.inArray(name, this.options.SETTINGS.REQUIERED_FIELDS) || SimpleRegister.inArray(name, this.options.SETTINGS.REQUIERED_USER_FIELDS),
            value = element.value,
            error = true;
        if (required && !value) {
            element.classList.add('error');
            error = false;
        } else {
            element.classList.remove('error');
        }
        return error;
    }
    SimpleRegister.prototype.InitEvents = function () {
        BX.bind(BX('w247_panel_register_link'), 'click', this.Show.bind(this));
    }
    SimpleRegister.prototype.Show = function (event) {
        event.preventDefault();
        this.registerPopup.show(); // modal window show
        return false;
    }
    window.W247.Panel.SimpleRegister = SimpleRegister;
})();
$( document ).ready(function() {
    $.ajax({
        url: '/w247/panel/scripts/top_panel.php',
        type: 'GET',
        dataType: '',
        data: {sessid: BX.bitrix_sessid()},
        success: function (data) {
            $( "body" ).append(data);
            $("input#panel_back_url").val(location.href);
            window.W247.Panel.SimpleRegister.getInstance();
        }
    });
});