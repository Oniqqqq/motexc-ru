(function (window) {
    'use strict';

    if (window.W247SelectPageParent)
        return;

    window.W247SelectPageParent = function (identifier) {
        this.params = {};
        this.soughtObj = null;

        if (typeof identifier === 'object') {
            this.params.identifier = identifier;
        }
        BX.ready(BX.delegate(this.init, this));
    };

    window.W247SelectPageParent.prototype = {

        init: function () {
            this.searchObject();
            window.onbeforeunload = BX.delegate(this.onBeforeUnload, this);
            $(document).ajaxSend(BX.delegate(this.onBeforeUnload, this));
        },

        searchObject: function () {
            if (typeof this.params.identifier !== 'undefined') {
                if (typeof this.params.identifier.object !== 'undefined') {
                    if (this.params.identifier.object.length === 1) {
                        if (typeof window[this.params.identifier.object[0]] !== 'undefined') {
                            this.soughtObj = window[this.params.identifier.object[0]];
                            if (this.soughtObj.checkIdentifierData(this.params.identifier.data)) {
                                return true;
                            }
                        }
                    } else if (this.params.identifier.object.length === 2) {
                        if (typeof window[this.params.identifier.object[0]] !== 'undefined' &&
                            typeof window[this.params.identifier.object[0]][this.params.identifier.object[1]] !== 'undefined') {
                            this.soughtObj = window[this.params.identifier.object[0]][this.params.identifier.object[1]];
                            if (this.soughtObj.checkIdentifierData(this.params.identifier.data)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        },

        initObject: function (objW247SelectPageChild) {
            if (!this.soughtObj) throw new Error("Object not found");
            if (typeof this.soughtObj.initObject !== 'undefined') {
                this.soughtObj.initObject(objW247SelectPageChild, this.params.identifier.data);
            }
        },

        getChiselHtml: function () {
            if (!this.soughtObj) throw new Error("Object not found");
            return $('<div class="header_info"></div>').append(this.soughtObj.getChiselHtml(this.params.identifier.data));
        },

        bindChiselEvents: function (objW247SelectPageChild, $chisel) {
            if (!this.soughtObj) throw new Error("Object not found");
            this.soughtObj.bindChiselEvents(objW247SelectPageChild, $chisel);
        },

        onBeforeUnloadChildWindow: function () {
            if (!this.soughtObj) throw new Error("Object not found");
            let objSelectPageHelper = this.soughtObj.getW247SelectPageHelperObject();
            objSelectPageHelper.setCookie();
        },

        getMapEvents: function () {
            if (!this.soughtObj) throw new Error("Object not found");
            return this.soughtObj.getMapEvents();
        },

        onBeforeUnload: function () {
            if (!this.soughtObj) throw new Error("Object not found");
            let objSelectPageHelper = this.soughtObj.getW247SelectPageHelperObject();
            objSelectPageHelper.deleteCookie();
        },
    };
})(window);