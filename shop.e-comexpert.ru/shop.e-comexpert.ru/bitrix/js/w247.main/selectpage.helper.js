(function (window) {
    'use strict';

    if (window.W247SelectPageHelper)
        return;

    window.W247SelectPageHelper = function (storage_templates, identifier, additional) {
        this.params = {};
        if (typeof storage_templates === 'object') {
            this.params.storage_templates = storage_templates;
        }
        if (typeof identifier === 'object') {
            this.params.identifier = identifier;
        }
        if (typeof additional !== 'undefined') {
            this.additional = additional;
        } else {
            this.additional = {};
        }
        this.init();
    };

    window.W247SelectPageHelper.prototype = {

        init: function () {
            this.userId = null;
            this.bxUserId = null;
            this.car = null;
            this.branchesIds = null;
        },

        setUserId: function (userId) {
            this.userId = userId;
        },

        setBxUserId: function (bxUserId) {
            this.bxUserId = bxUserId;
        },

        setCar: function (car) {
            this.car = car;
        },

        setBranchesIds: function (branchesIds) {
            this.branchesIds = branchesIds;
        },

        setCookie: function () {
            if (typeof this.params.storage_templates['USER_ID'] !== 'undefined') {
                if (this.userId !== null) {
                    BX.setCookie(this.params.storage_templates['USER_ID'], this.userId, {path: '/'});
                } else {
                    BX.setCookie(this.params.storage_templates['USER_ID'], null, {path: '/', expires: -1});
                }
            }
            if (typeof this.params.storage_templates['BX_USER_ID'] !== 'undefined') {
                if (this.bxUserId !== null) {
                    BX.setCookie(this.params.storage_templates['BX_USER_ID'], this.bxUserId, {path: '/'});
                } else {
                    BX.setCookie(this.params.storage_templates['BX_USER_ID'], null, {path: '/', expires: -1});
                }
            }
            if (typeof this.params.storage_templates['BRANCHES_IDS'] !== 'undefined') {
                if (this.branchesIds !== null) {
                    BX.setCookie(this.params.storage_templates['BRANCHES_IDS'], this.branchesIds, {path: '/'});
                } else {
                    BX.setCookie(this.params.storage_templates['BRANCHES_IDS'], null, {path: '/', expires: -1});
                }
            }
        },

        deleteCookie: function () {
            BX.setCookie(this.params.storage_templates['USER_ID'], null, {path: '/', expires: -1});
            BX.setCookie(this.params.storage_templates['BX_USER_ID'], null, {path: '/', expires: -1});
            BX.setCookie(this.params.storage_templates['BRANCHES_IDS'], null, {path: '/', expires: -1});
        },

        open: function (url, data) {
            this.setCookie();
            if (typeof this.params.storage_templates['CAR'] !== 'undefined') {
                if (this.car === null) {
                    BX.setCookie(this.params.storage_templates['CAR'], '///', {path: '/'});
                } else if (this.car instanceof Object) {
                    BX.setCookie(this.params.storage_templates['CAR'],
                        this.car.CAR_UID + '/' + this.car.YEAR + '/' +
                        this.car.ID + '/' + this.car.VIN, {path: '/'});
                }
            }
            delete this.params.identifier.data;
            if (typeof data !== "undefined") {
                this.params.identifier.data = data;
            }
            return window.open(url, btoa(JSON.stringify(this.params.identifier)));
        }
    };

    window.W247SelectPageHelper.prototype._init = window.W247SelectPageHelper.prototype.init;
    window.W247SelectPageHelper.prototype._open = window.W247SelectPageHelper.prototype.open;
    window.W247SelectPageHelper.prototype._setCookie = window.W247SelectPageHelper.prototype.setCookie;
    window.W247SelectPageHelper.prototype._deleteCookie = window.W247SelectPageHelper.prototype.deleteCookie;

})(window);