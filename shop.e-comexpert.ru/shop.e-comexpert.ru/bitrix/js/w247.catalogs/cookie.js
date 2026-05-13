class CatalogsCookie {
    constructor(template, base = 'CATALOGS') {
        this.template = template;
        this.base = base;
    }

    get() {
        let c = this._parse();
        return typeof c[this.template] !== 'undefined' ? c[this.template] : {};
    }

    set(key, value) {
        let c = this._parse();
        if (typeof c[this.template] === 'undefined' ||
            typeof c[this.template] !== 'object' ||
            (c[this.template] instanceof Array && c[this.template].length === 0)) {
            c[this.template] = {};
        }
        c[this.template][key] = value;
        BX.setCookie(this.base, JSON.stringify(c), {
            expires: 31536000,
            path: '/',
            domain: !!window.W247CatalogsCookieParams ? window.W247CatalogsCookieParams.domain : ''
        });
    }

    delete(key) {
        let c = this._parse();
        if (typeof c[this.template] === 'undefined' ||
            typeof c[this.template] !== 'object' ||
            (c[this.template] instanceof Array && c[this.template].length === 0)) {
            c[this.template] = {};
        }
        delete c[this.template][key];
        BX.setCookie(this.base, JSON.stringify(c), {
            expires: 31536000,
            path: '/',
            domain: !!window.W247CatalogsCookieParams ? window.W247CatalogsCookieParams.domain : ''
        });
    }

    /**
     * @private
     * @return {object} the key-value map from cookie storage
     */
    _parse() {
        let c = BX.getCookie(this.base);
        if (typeof c !== 'undefined') {
            try {
                c = JSON.parse(c);
                if (typeof c !== 'object' || c instanceof Array)
                    c = {};
            } catch (e) {
                c = {};
            }
        } else {
            c = {};
        }
        return c;
    }
}