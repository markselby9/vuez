/* eslint-disable no-underscore-dangle */
import toNumber from 'lodash/toNumber';
import indexOf from 'lodash/indexOf';

function initHook() {
    const options = this.$options;
    // store injection
    if (options.store) {
        this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
        // use parent Vue component's $store
        this.$store = options.parent.$store;
    }
}

// Apply a mixin globally, which affects every Vue instance created afterwards.
export default function (Vue) {
    const version = toNumber(Vue.version.split('.')[0]);
    const lifecycleHooks = Vue.config._lifecycleHooks;

    if (version >= 2) {
        if (lifecycleHooks) {
            // vue 2.x
            if (indexOf(lifecycleHooks, 'init') < 0) {
                // use beforeCreate hook
                Vue.mixin({
                    beforeCreate: initHook,
                });
            } else {
                // use init hook
                Vue.mixin({
                    init: initHook,
                });
            }
        }
    } else if (version < 2) {
        // vue 1.x
        const vueOldInit = Vue.prototype._init;
// eslint-disable-next-line no-param-reassign
        Vue.prototype._init = function (options) {
            const newOptions = options || {};
            if (newOptions.init) {
                newOptions.init = [initHook].concat(newOptions.init);
            } else {
                newOptions.init = initHook;
            }
            vueOldInit.call(this, newOptions);
        };
    } else {
        console.error('[vuez] Vue version not recoginized, please commit an issue on Github!');
    }
}
