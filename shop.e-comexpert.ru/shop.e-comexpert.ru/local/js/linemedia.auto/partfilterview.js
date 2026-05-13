;(function () {
    /* Р¤РёР»СЊС‚СЂ РїРѕР»Р·СѓРЅРѕРє */
    var PartFilterRangeItemView = function (data) {
        this.params = {item: {}, skipCreate: false, parent: this};
        this.extend(this.params, data.params);

        this.data = data;
    }
    PartFilterRangeItemView.prototype = Object.create(PartView.prototype);
    PartFilterRangeItemView.constructor = PartView;


    /* Р¤РёР»СЊС‚СЂ */
    var PartFilterView = function (data, dataView) {

        this.params = {item: {}, skipCreate: false, parent: this};
        this.extend(this.params, data.params);

        this.viewUpdateDisable = false;
        this.el = null;
        this.dataView = dataView;
        this.data = data;
        this.itemRangeTemplate = templates.filter.itemRange;
        this.itemCheckboxTemplate = templates.filter.itemCheckbox;
        this.itemOpenCheckboxTemplate = templates.filter.itemOpenCheckbox;
        this.itemCheckboxHiddenTemplate = templates.filter.itemCheckboxHidden;
        this.itemHiddenContainerTemplate = templates.filter.itemHiddenContainer;
        this.itemHiddenTemplate = templates.filter.itemHidden;
        this.itemResetMob = templates.filter.itemResetMob;
        this.subItemCheckboxTemplate = templates.filter.subItemCheckbox;
        this.containerTemplate = templates.filter.container;

        this.container = BX(this.params.VIEW_ID_LIST.CONTAINER);
        if (!PartFilterView.hasOwnProperty('index')) {
            PartFilterView.index = 0;
        }
        this.index = PartFilterView.index++;
    }
    PartFilterView.prototype = Object.create(PartView.prototype);
    PartFilterView.constructor = PartView;
    PartFilterView.prototype.show = function () {

        if (!this.container) {
            return;
        }

        this.empty(this.container);
        if (this.el == null) {
            this.el = document.createElement('div');
            this.container.appendChild(this.el);
            this.create();
        } else {
            this.container.appendChild(this.el);
        }
    }
    PartFilterView.prototype.create = function () {

        if (!this.container) {
            return;
        }

        if (typeof this.dataView.getFilterDefault != 'function') {
            this.el.innerHTML = '';
            return;
        }
        this.data.filter = this.dataView.getFilterDefault();

        this.empty(this.el);
        window.showLog = true;
        var filterElement = this.createElementFromTemplate(this.containerTemplate, {});
        var form = filterElement.querySelector('form'),
            formHTML = form.innerHTML;
        this.empty(form);
        for (var i in this.data.filter) {
            var item = this.data.filter[i];
            var itemElement = null;
            switch (item.type) {
                case 'range':
                    var data = {
                        'id': this.index + "_" + i,
                        'name': i,
                        'title': item.title,
                        'min': Math.min.apply(null, item.values),
                        'max': Math.max.apply(null, item.values),
                    };
                    itemElement = this.createElementFromTemplate(this.itemRangeTemplate, data);
                    form.appendChild(itemElement);
                    break;
                case 'checkboxopen':
                case 'checkbox':
                    var data = {'id': this.index + "_" + i, 'name': i, 'title': item.title};
                    itemElement = this.createElementFromTemplate(this.itemCheckboxTemplate, data);
                    if (item.type === 'checkboxopen') {
                        itemElement = this.createElementFromTemplate(this.itemOpenCheckboxTemplate, data);
                    }
                    form.appendChild(itemElement);
                    var subItemElementContainer = itemElement.querySelector('.checkbox.filter_collapse_block'),
                        checkboxHTML = '';
                    var subItemElementHiddenContainer = this.createElementFromTemplate(this.itemCheckboxHiddenTemplate, data);
                    for (var j in item.values) {
                        var data = {};
                        if (typeof item.values[j] == 'object') {
                            data = item.values[j];
                            if(data.hasOwnProperty('id')) {
                                data['id'] = this.index + "_" + data['id'];
                            }
                        } else {
                            data = {
                                id: this.index + "_" + i + '_' + j,
                                'name': i,
                                title: item.values[j],
                                value: item.values[j]
                            };
                        }
                        var subItemElement = this.createElementFromTemplate(this.subItemCheckboxTemplate, data);
                        // if (j < 5) {
                            checkboxHTML += subItemElement.outerHTML;
                        // } else {
                        //     subItemElementHiddenContainer.innerHTML += subItemElement.outerHTML;
                        // }
                    }
                    subItemElementContainer.innerHTML = checkboxHTML /*+ subItemElementHiddenContainer.outerHTML*/ + subItemElementContainer.innerHTML;
                    // if (item.values.length > 5) {
                    //     subItemElementContainer.querySelector('.lca_number').innerHTML = '(' + (item.values.length - 5) + ')';
                    // } else {
                    //     subItemElementContainer.querySelector('.wrap_link_coll_arow').classList.add('hidden');
                    // }
                    break;
                case 'hidden':
                    let itemElementContainer = this.createElementFromTemplate(this.itemHiddenContainerTemplate, {
                        'id': this.index + "_" + i,
                        'name': i,
                    });
                    for (var j in item.values) {
                        var data = {
                            'id': this.index + "_" + j,
                            'name': j,
                            'value': item.values[j].value
                        };
                        itemElement = this.createElementFromTemplate(this.itemHiddenTemplate, data);
                        itemElementContainer.appendChild(itemElement);
                    }
                    form.appendChild(itemElementContainer);
                    break;
            }
        }
        form.innerHTML = this.itemResetMob + form.innerHTML;
        form.innerHTML += formHTML;
        this.el.appendChild(filterElement);
        this.bindEvents();
    }
    PartFilterView.prototype.getFilterVals = function () {
        var vals = {};

        if (!this.container) {
            return vals;
        }

        var ranges = [].slice.apply(this.el.querySelectorAll('.range'));
        for (var i in ranges) {
            var range = ranges[i],
                min = range.querySelector('input.min_num'),
                max = range.querySelector('input.max_num'),
                name = range.getAttribute('data-name');
            vals[name] = {min: parseInt(min.value), max: parseInt(max.value)};
        }
        var checkbox = [].slice.apply(this.el.querySelectorAll('.checkbox'));
        for (var i in checkbox) {
            var cb = checkbox[i],
                name = cb.getAttribute('data-name');
            vals[name] = [];
            var cbVals = [].slice.apply(cb.querySelectorAll('input[type="checkbox"]:checked'));
            for (var j in cbVals) {
                vals[name].push(cbVals[j].value);
            }
        }
        var hidden = [].slice.apply(this.el.querySelectorAll('.hidden_block'));
        for (var i in hidden) {
            var cb = hidden[i],
                name = cb.getAttribute('data-name');
            vals[name] = [];
            var cbVals = [].slice.apply(cb.querySelectorAll('input[type="hidden"]'));
            for (var j in cbVals) {
                let hidden_name = cbVals[j].getAttribute('data-name');
                vals[name][hidden_name] = {
                    value: cbVals[j].value
                };
            }
        }
        return vals;
    }
    PartFilterView.prototype.setFilterVals = function (vals) {

        this.params.reset = true;
        if (typeof vals == "undefined") {
            vals = {};
        }

        if (!this.container) {
            return vals;
        }

        this.viewUpdateDisable = true;
        var ranges = [].slice.apply(this.el.querySelectorAll('.range'));
        for (var i in ranges) {
            var range = ranges[i],
                min = range.querySelector('input.min_num'),
                max = range.querySelector('input.max_num'),
                name = range.getAttribute('data-name'),
                rangeElement = range.querySelector('.filter-range');
            if (typeof vals[name] == "undefined") {
                continue;
            }
            var minVal = Math.max(parseInt(min.value), parseInt(vals[name].min));
            var minVal = Math.min(minVal, parseInt(max.value));
            var maxVal = Math.min(parseInt(max.value), parseInt(vals[name].max));
            var maxVal = Math.max(maxVal, parseInt(min.value));
            $(rangeElement).slider("option", "values", [minVal, maxVal]);
        }
        var checkbox = [].slice.apply(this.container.querySelectorAll('.checkbox'));
        for (var i in checkbox) {
            var cb = checkbox[i],
                name = cb.getAttribute('data-name');
            if (typeof vals[name] == "undefined") {
                continue;
            }
            var cbVals = [].slice.apply(cb.querySelectorAll('input[type="checkbox"]'));
            for (var j in cbVals) {
                if (vals[name].indexOf(cbVals[j].value) != -1) {
                    cbVals[j].checked = true;
                }
            }
        }
        var hidden = [].slice.apply(this.container.querySelectorAll('.hidden_block'));
        for (var i in hidden) {
            var cb = hidden[i],
                name = cb.getAttribute('data-name');
            if (typeof vals[name] == "undefined") {
                continue;
            }
            var cbVals = [].slice.apply(cb.querySelectorAll('input[type="hidden"]'));
            for (var j in cbVals) {
                let hidden_name = cbVals[j].getAttribute('data-name');
                if (typeof vals[name][hidden_name] !== "undefined") {
                    cbVals[j].value = vals[name][hidden_name].value;
                }
            }
        }
        this.viewUpdateDisable = false;
        //this.updateDataView();
        this.params.reset = false;
        return vals;
    }
    PartFilterView.prototype.reset = function () {
        var vals = {};
        var ranges = [].slice.apply(this.el.querySelectorAll('.range'));
        for (var i in ranges) {
            var range = ranges[i],
                min = range.querySelector('input.min_num'),
                max = range.querySelector('input.max_num'),
                name = range.getAttribute('data-name'),
                rangeElement = range.querySelector('.filter-range');
            min.value = parseInt(min.getAttribute('min'));
            max.value = parseInt(max.getAttribute('max'));
            vals[name] = {min: parseInt(min.value), max: parseInt(max.value)};
            $(rangeElement).slider("option", "values", [parseInt(min.value), parseInt(max.value)]);
        }
        var checkbox = [].slice.apply(this.el.querySelectorAll('.checkbox'));
        for (var i in checkbox) {
            var cb = checkbox[i],
                name = cb.getAttribute('data-name');
            vals[name] = [];
            var cbVals = [].slice.apply(cb.querySelectorAll('input[type="checkbox"]:checked'));
            for (var j in cbVals) {
                cbVals[j].checked = false;
            }
        }
        var hidden = [].slice.apply(this.el.querySelectorAll('.hidden_block'));
        for (var i in hidden) {
            var cb = hidden[i],
                name = cb.getAttribute('data-name');
            vals[name] = [];
            var cbVals = [].slice.apply(cb.querySelectorAll('input[type="hidden"]'));
            for (var j in cbVals) {
                let hidden_name = cbVals[j].getAttribute('data-name');
                let hidden_default = cbVals[j].getAttribute('data-default');
                cbVals[j].value = hidden_default;
                vals[name][hidden_name] = {
                    value: cbVals[j].value
                };
            }
        }
        return vals;
    }
    PartFilterView.prototype.updateDataView = function () {
        if (this.viewUpdateDisable) {
            return;
        }
        this.dataView.setFilter(this.getFilterVals());
    }
    PartFilterView.prototype.validRangeInput = function (event, input) {
        var value = input.value;
        var eventValue = event.key;
        var rep = /[-\.;":'a-zA-Z\u0430-\u044f\u0451\u0410-\u042f]/;
        if (rep.test(value)) {
            value = value.replace(rep, '');
            input.value = value;
        }
        if (eventValue != value) {
            input.value = value;
        }
    }
    PartFilterView.prototype.bindEvents = function () {
        var ranges = [].slice.apply(this.el.querySelectorAll('.range'));
        for (var i in ranges) {
            var range = ranges[i],
                min = range.querySelector('input.min_num'),
                max = range.querySelector('input.max_num'),
                range = range.querySelector('.filter-range');
            (function (min, max, range, obFilter) {
                var min_price_range = parseInt(min.value),
                    minDefault = parseInt(min.getAttribute('min'));
                var max_price_range = parseInt(max.value),
                    maxDefault = parseInt(max.getAttribute('max'));
                BX.bind(min, 'keyup', function (event) {
                    obFilter.validRangeInput(event, min)
                }.bind(obFilter));
                BX.bind(max, 'keyup', function (event) {
                    obFilter.validRangeInput(event, max)
                }.bind(obFilter));
                BX.bind(min, 'change', function () {
                    var min_price_range = parseInt(min.value);
                    if (isNaN(min_price_range) || min_price_range <= 0) {
                        min_price_range = min.value = minDefault;
                    }
                    var max_price_range = parseInt(max.value);
                    if (isNaN(max_price_range) || max_price_range <= 0) {
                        max_price_range = max.value = maxDefault;
                    }
                    $(range).slider('values', 0, min_price_range);
                    $(range).change();
                });
                BX.bind(max, 'change', function () {
                    var min_price_range = parseInt(min.value);
                    var max_price_range = parseInt(max.value);
                    if (isNaN(min_price_range) || min_price_range <= 0) {
                        min_price_range = min.value = minDefault;
                    }
                    var max_price_range = parseInt(max.value);
                    if (isNaN(max_price_range) || max_price_range <= 0) {
                        max_price_range = max.value = maxDefault;
                    }
                    $(range).slider('values', 1, max_price_range);
                    $(range).change();
                });
                BX.ready(function () {
                    $(range).slider({
                        range: true,
                        orientation: "horizontal",
                        min: parseInt(min_price_range),
                        max: parseInt(max_price_range),
                        values: [parseInt(min_price_range), parseInt(max_price_range)],
                        step: 1,
                        change: function (event, ui) {
                            if (ui.values[0] > ui.values[1]) {
                                min.value = ui.values[1];
                                max.value = ui.values[1];
                            } else {
                                min.value = ui.values[0];
                                max.value = ui.values[1];
                            }
                            if (!obFilter.params.reset) {
                                obFilter.updateDataView();
                            }
                        },
                        slide: function (event, ui) {
                            min.value = ui.values[0];
                            max.value = ui.values[1];
                        }
                    });
                    min.value = $(range).slider("values", 0);
                    max.value = $(range).slider("values", 1);
                });
            })(min, max, range, this);
        }

        var checkbox = this.el.querySelectorAll('.checkbox input[type="checkbox"]');
        for (var i in checkbox) {
            var cb = checkbox[i];
            BX.bind(cb, 'change', function () {
                this.updateDataView();
            }.bind(this));
        }

        var hidden = this.el.querySelectorAll('.hidden_block input[type="hidden"]');
        for (var i in hidden) {
            var cb = hidden[i];
            BX.bind(cb, 'change', function () {
                this.updateDataView();
            }.bind(this));
        }

        var reset = this.el.querySelectorAll('.filter_reset');
        for(let i in reset) {
            BX.bind(reset[i], 'click', function (event) {
                event.preventDefault();
                this.params.reset = true;
                this.reset();
                this.updateDataView();
                this.params.reset = false;
            }.bind(this))
        }

    };
    window.PartFilterView = PartFilterView;
})();