/**
 * Created by fengchaoyi on 2017/4/26.
 */
// Center store object
import $mixin from './mixin';

let Vue

export class Store {
		constructor() {
				assert(Vue, 'Vuez must be installed by Vue.use(Vuez) before usage');
				const store = this;
		}
}

export function install($Vue) {
		if (Vue) {
				console.error(
						'Vuez already installed. Vue.use(Vuez) should be called only once.'
				);
				return;
		}
		Vue = $Vue;
		// Vue.vuez = Object.create();
		$mixin(Vue);
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
		install(window.Vue)
}