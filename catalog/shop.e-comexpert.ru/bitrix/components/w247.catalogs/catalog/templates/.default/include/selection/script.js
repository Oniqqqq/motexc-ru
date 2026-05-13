(function (window) {
    'use strict';

    if (window.W247CatalogsSelection)
        return;

    window.W247CatalogsSelection = function (arParams) {
        this.errorCode = 0;
        if (typeof arParams === 'object') {
            this.params = arParams;
        }
        if (this.errorCode === 0) {
            BX.ready(BX.delegate(this.init, this));
        }
    };

    window.W247CatalogsSelection.prototype = {
        init: function () {
            this.obCont = BX('W247CatalogsSelection' + this.params.id);
            this.obForm = BX('W247CatalogsSelectionForm' + this.params.id);
            BX.bindDelegate(this.obForm, 'change', {attribute: {type: 'checkbox'}}, BX.delegate(function (event) {
                this.obForm.submit();
            }, this));
        },
    };
})(window);