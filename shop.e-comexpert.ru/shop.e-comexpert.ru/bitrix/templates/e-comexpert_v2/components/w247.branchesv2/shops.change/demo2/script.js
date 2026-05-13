(function (window) {
    'use strict';

    if (window.W247BranchChange)
        return;

    window.W247BranchChange = function (arParams) {
        this.errorCode = 0;
        if (typeof arParams === 'object') {
            this.params = arParams;
        }
        if (this.errorCode === 0) {
            BX.ready(
                BX.delegate(this.init, this),
                jQuery('[name="url"]').val(window.location.href.toString())
            );
        }
    };

    window.W247BranchChange.prototype = {
        init: function () {
            this.obCont = BX('W247BranchChangeCont' + this.params.id);

            BX.bindDelegate(this.obCont, 'change', {class: 'radio_b-change'}, BX.delegate(this.onRadioChange, this));
            BX.bindDelegate(this.obCont, 'click', {class: 'adress_link_other'}, BX.delegate(this.onAddressLinkClick, this));
            BX.bindDelegate(this.obCont, 'click', {class: 'adress_popup_first__close'}, BX.delegate(this.onAddressPopupClose, this));
            BX.bindDelegate(this.obCont, 'click', {class: 'first__btn_yes'}, BX.delegate(this.onClickBtnYes, this));
            BX.bindDelegate(this.obCont, 'click', {class: 'btn_adress_popup'}, BX.delegate(this.onAddressPopupClick, this));
            BX.bindDelegate(this.obCont, 'click', {class: 'user_logout_link_list'}, BX.delegate(this.onUserLogout, this));


            BX.bind(window, 'touchstart', BX.delegate(this.touchStart, this));
            BX.bind(window, 'mouseup', BX.delegate(this.touchStart, this));

        },

        onRadioChange: function (event) {
            $(event.target).closest('form').submit();
        },

        onAddressLinkClick: function () {
            $(this.obCont).find(".adress_popup_first .other_adress").show();
            $(this.obCont).find(".adress_popup_first__block").hide();
        },

        onAddressPopupClose: function () {
            $(this.obCont).find('.wrap_adress_popup_first').hide();
            $('body').removeClass('mob_fon_popup_map');
        },

        onClickBtnYes: function (event) {
            $(event.target).closest('form').submit();
        },

        onAddressPopupClick: function () {
            $(this.obCont).find(".header_adress_popup").toggle();
        },

        onUserLogout: function () {
            $(this.obCont).find(".adress_popup_main .other_adress").show();
            $(this.obCont).find(".adress_popup_main__item").hide();
        },


    };

    window.W247BranchChange.prototype.touchStart = function(e){
        if (!$('.adress_popup_first').is(e.target) && $('.adress_popup_first').has(e.target).length === 0) {
            $('.wrap_adress_popup_first').hide();
            $('body').removeClass('mob_fon_popup_map');
        }

        if (!$(e.target).closest(".site_header__adress_popup").length) {
            $('.header_adress_popup').hide();
        }
        e.stopPropagation();
    };
})(window);