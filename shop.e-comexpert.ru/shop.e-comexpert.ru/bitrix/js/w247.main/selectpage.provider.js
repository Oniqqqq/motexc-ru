(function (window) {
    'use strict';

    if (window.W247SelectPageProvider)
        return;

    window.W247SelectPageProvider = function () {
    };

    window.W247SelectPageProvider.prototype = {

        getChiselHtml: function (data) {
            return '';
        },

        bindChiselEvents: function (objW247SelectPageChild, $chisel) {
            return false;
        },

        getW247SelectPageHelperObject: function () {
            return null;
        },

        getMapEvents: function () {
            return [];
        },

        checkIdentifierData: function () {
            return true;
        }
    };

})(window);