/**
 * Created by fengchaoyi on 2017/4/23.
 */
import Vue from 'vue/dist/vue.common';
import Vuez from '../../src/index';


describe('index', () => {
		beforeAll(function() {
				Vue.use(Vuez);
		});

		it('should run test', () => {
				expect(1).toBe(1);
		})

		it('should install vuez', ()=>{
				expect(Vue).not.toBe(undefined);
				expect(Vue.vuez).not.toBe(undefined);
		})
})