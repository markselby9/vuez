import toNumber from 'lodash/toNumber';
import indexOf from 'lodash/indexOf';

// Apply a mixin globally, which affects every Vue instance created afterwards.
export default function (Vue) {
		let version = toNumber(Vue.version.split('.')[0]);

		const _lifecycleHooks = Vue.config._lifecycleHooks;
		if (version >= 2) {
				if (_lifecycleHooks) {
						// vue 2.x
						if (indexOf(_lifecycleHooks, 'init') >= 0) {
								// use init hook
								Vue.mixin({
										init: initHook
								});
						} else {
								// use beforeCreate hook
								Vue.mixin({
										beforeCreate: initHook
								});
						}
				}
		}
		else if (version < 2) {
				// vue 1.x
				const vueOldInit = Vue.prototype._init;
				Vue.prototype._init = function (options = {}) {
						if (options.init) {
								options.init = [initHook].concat(options.init);
						} else {
								options.init = initHook;
						}
						vueOldInit.call(this, options);
				}
		}
		else {
				console.error('[vuez] Vue version not recoginized, please commit an issue on Github!');
		}
}

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

