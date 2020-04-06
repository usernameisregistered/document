var Model = Backbone.Model = function (attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.preinitialize.apply(this, arguments);
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
};

_.extend(Model.prototype, Events, {

    changed: null,

    validationError: null,

    idAttribute: 'id',

    cidPrefix: 'c',

    preinitialize: function () {},

    initialize: function () {},

    toJSON: function () {
        return _.clone(this.attributes);
    },

    sync: function () {
        return Backbone.sync.apply(this, arguments);
    },

    get: function (attr) {
        return this.attributes[attr];
    },

    escape: function (attr) {
        return _.escape(this.get(attr));
    },

    has: function (attr) {
        return this.get(attr) != null;
    },

    matches: function (attrs) {
        return !!_.iteratee(attrs, this)(this.attributes);
    },

    set: function (key, val, options) {
        if (key == null) return this;

        var attrs;
        if (typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        options || (options = {});

        if (!this._validate(attrs, options)) return false;

        var unset = options.unset;
        var silent = options.silent;
        var changes = [];
        var changing = this._changing;
        this._changing = true;

        if (!changing) {
            this._previousAttributes = _.clone(this.attributes);
            this.changed = {};
        }

        var current = this.attributes;
        var changed = this.changed;
        var prev = this._previousAttributes;

        for (var attr in attrs) {
            val = attrs[attr];
            if (!_.isEqual(current[attr], val)) changes.push(attr);
            if (!_.isEqual(prev[attr], val)) {
                changed[attr] = val;
            } else {
                delete changed[attr];
            }
            unset ? delete current[attr] : current[attr] = val;
        }

        if (this.idAttribute in attrs) this[this.idAttribute] = this.get(this.idAttribute);

        // Trigger all relevant attribute changes.
        if (!silent) {
            if (changes.length) this._pending = options;
            for (var i = 0; i < changes.length; i++) {
                this.trigger('change:' + changes[i], this, current[changes[i]], options);
            }
        }

        if (changing) return this;
        if (!silent) {
            while (this._pending) {
                options = this._pending;
                this._pending = false;
                this.trigger('change', this, options);
            }
        }
        this._pending = false;
        this._changing = false;
        return this;
    },

    unset: function (attr, options) {
        return this.set(attr, void 0, _.extend({}, options, {
            unset: true
        }));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function (options) {
        var attrs = {};
        for (var key in this.attributes) attrs[key] = void 0;
        return this.set(attrs, _.extend({}, options, {
            unset: true
        }));
    },

    hasChanged: function (attr) {
        if (attr == null) return !_.isEmpty(this.changed);
        return _.has(this.changed, attr);
    },

    changedAttributes: function (diff) {
        if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
        var old = this._changing ? this._previousAttributes : this.attributes;
        var changed = {};
        var hasChanged;
        for (var attr in diff) {
            var val = diff[attr];
            if (_.isEqual(old[attr], val)) continue;
            changed[attr] = val;
            hasChanged = true;
        }
        return hasChanged ? changed : false;
    },

    previous: function (attr) {
        if (attr == null || !this._previousAttributes) return null;
        return this._previousAttributes[attr];
    },

    previousAttributes: function () {
        return _.clone(this._previousAttributes);
    },


    fetch: function (options) {
        options = _.extend({
            parse: true
        }, options);
        var model = this;
        var success = options.success;
        options.success = function (resp) {
            var serverAttrs = options.parse ? model.parse(resp, options) : resp;
            if (!model.set(serverAttrs, options)) return false;
            if (success) success.call(options.context, model, resp, options);
            model.trigger('sync', model, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    },


    save: function (key, val, options) {
        // Handle both `"key", value` and `{key: value}` -style arguments.
        var attrs;
        if (key == null || typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        options = _.extend({
            validate: true,
            parse: true
        }, options);
        var wait = options.wait;

        if (attrs && !wait) {
            if (!this.set(attrs, options)) return false;
        } else if (!this._validate(attrs, options)) {
            return false;
        }

        var model = this;
        var success = options.success;
        var attributes = this.attributes;
        options.success = function (resp) {
            model.attributes = attributes;
            var serverAttrs = options.parse ? model.parse(resp, options) : resp;
            if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
            if (serverAttrs && !model.set(serverAttrs, options)) return false;
            if (success) success.call(options.context, model, resp, options);
            model.trigger('sync', model, resp, options);
        };
        wrapError(this, options);

        if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

        var method = this.isNew() ? 'create' : options.patch ? 'patch' : 'update';
        if (method === 'patch' && !options.attrs) options.attrs = attrs;
        var xhr = this.sync(method, this, options);

        this.attributes = attributes;

        return xhr;
    },

    destroy: function (options) {
        options = options ? _.clone(options) : {};
        var model = this;
        var success = options.success;
        var wait = options.wait;

        var destroy = function () {
            model.stopListening();
            model.trigger('destroy', model, model.collection, options);
        };

        options.success = function (resp) {
            if (wait) destroy();
            if (success) success.call(options.context, model, resp, options);
            if (!model.isNew()) model.trigger('sync', model, resp, options);
        };

        var xhr = false;
        if (this.isNew()) {
            _.defer(options.success);
        } else {
            wrapError(this, options);
            xhr = this.sync('delete', this, options);
        }
        if (!wait) destroy();
        return xhr;
    },

    url: function () {
        var base =
            _.result(this, 'urlRoot') ||
            _.result(this.collection, 'url') ||
            urlError();
        if (this.isNew()) return base;
        var id = this.get(this.idAttribute);
        return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    parse: function (resp, options) {
        return resp;
    },

    clone: function () {
        return new this.constructor(this.attributes);
    },

    isNew: function () {
        return !this.has(this.idAttribute);
    },

    isValid: function (options) {
        return this._validate({}, _.extend({}, options, {
            validate: true
        }));
    },

    _validate: function (attrs, options) {
        if (!options.validate || !this.validate) return true;
        attrs = _.extend({}, this.attributes, attrs);
        var error = this.validationError = this.validate(attrs, options) || null;
        if (!error) return true;
        this.trigger('invalid', this, error, _.extend(options, {
            validationError: error
        }));
        return false;
    }

});