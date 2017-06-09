/* eslint-disable no-underscore-dangle,no-undef,no-param-reassign */
/**
 * Created by fengchaoyi on 2017/4/26.
 */
// import lodash functions
import isString from 'lodash/isString';
import toString from 'lodash/toString';
import isUndefined from 'lodash/isUndefined';
import has from 'lodash/has';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';
import isFunction from 'lodash/isFunction';
import unset from 'lodash/unset';
import isNull from 'lodash/isNull';
import forEach from 'lodash/forEach';
// Center store object
import $mixin from './mixin';
import { assert, isSameDataType } from './util';

let Vue;

function getObserved(store, _name) {
    return store._observed[_name];
}

function setObserved(store, _name, _value) {
    const oldVal = store._observed[_name];
    if (!isUndefined(oldVal) && !isSameDataType(oldVal, _value)) {
        console.warn(`[vuez] please use the same data type for observer [${_name}]'s value.`);
    }
    store._observed[_name] = clone(_value);
    Vue.set(store.state, _name, store._observed[_name]);
}

// check undefined
function typeCheck(val) {
    if (isUndefined(val) || isNull(val)) {
        return false;
    }
    return val;
}

// init store VM
function initVM(store, state) {
    // use a Vue instance to store the state tree
    // const silent = Vue.config.silent;
    //
    const computed = {};  // save things later
    Vue.config.silent = true;
    store._vm = new Vue({
        data: {
            $$state: state,
        },
        computed,
    });
}

export class Store {
    constructor() {
        assert(Vue, 'Vuez must be installed by Vue.use(Vuez) before usage');

        const state = {}; // state object

        // internal state
        this._observed = Object.create(null);   // observed object, name and current object value
        this._unwatchFn = Object.create(null);  // keep unwatch functions for each name

        this._watcherVM = new Vue();

        initVM(this, state);
    }

    get state() {
        return this._vm._data.$$state;
    }

    // set state(v) {
    //     assert(false, 'Use store.replaceState() to explicit replace store state.');
    // }

    replaceState(state) {
        this._vm._data.$$state = state;
    }

    observe(_inName, _value) {
        let _name = _inName || 'noname';
        if (!typeCheck(_name)) {
            return undefined;
        }
        if (!isString(_name)) {
            try {
                _name = toString(_name);
            } catch (e) {
                return undefined;
            }
        }

        if (arguments.length === 1) {
            // only _name is passed, something like store.observe('name');
            // use clone to manually update the value and trigger action
            Vue.set(this.state, _name, clone(this._observed[_name]));
        } else if (!isUndefined(_value)) {
            if (has(this._observed, _name)) {
                const oldVal = this._observed[_name];
                // has old value and the old value is the same as new value?
                if (isEqual(oldVal, _value)) {
                    // do nothing
                    return getObserved(this, _name);
                }
            }
            // set new value
            setObserved(this, _name, _value);
        } else {
            // _value is undefined, treat it as a kind of value
            setObserved(this, _name, _value);
        }
        return _value;
    }

    action(_name, _actionFn) {
        if (!typeCheck(_name)) {
            return;
        }
        if (!isFunction(_actionFn)) {
            return;
        }

        const store = this;

        // set a watch object over $data.state object
        const unwatchFn = this._watcherVM.$watch(
            () => store.state[_name],
            () => {
                // do something
                _actionFn(store._observed[_name]);
            });
        if (has(this._unwatchFn, _name)) {
            // add into the unwatch function array of this name
            this._unwatchFn[_name].push(unwatchFn);
        } else {
            this._unwatchFn[_name] = [unwatchFn];
        }
    }

    unobserve(_name) {
        if (!has(this._observed, _name)) {
            console.warn(`[vuez] observer ${_name} not found, please check the name.`);
            return;
        }
        const unwatchFnArray = this._unwatchFn[_name];
        forEach(unwatchFnArray, (fn) => {
            // execute the unwatch functions
            fn();
        });
        unset(this._observed, _name);
    }
}

export function install($Vue) {
    if (Vue) {
        console.error(
            'Vuez already installed. Vue.use(Vuez) should be called only once.',
        );
        return;
    }
    // plugin.install.apply(plugin, args);
    Vue = $Vue;

    // add custom hooks
    $mixin(Vue);
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
