/**
 * Created by fengchaoyi on 2017/4/23.
 */
import Vue from 'vue/dist/vue.common';
import Vuez from '../../src/index';
import setup from './setup.spec';

describe('index', () => {
		beforeAll(function () {
				setup();
		});

		it('should detect vue', () => {
				expect(Vue).not.toBe(undefined);
		});
});