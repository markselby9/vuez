import Vue from 'vue';
import App from './src/App.vue';
import Vuez from 'vuez';

Vue.use(Vuez);
const store = new Vuez.Store();

new Vue({
		store: store,
		el: '#app',
		render: h => h(App)
});