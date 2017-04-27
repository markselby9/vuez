/**
 * Created by fengchaoyi on 2017/4/23.
 */
import Vue from 'vue/dist/vue.common';
import Vuez from '../../src/index';
import setup from './setup.spec';

describe('store', () => {
		beforeAll(function () {
				setup();
		});

		it('should observe data', () => {
				// return the value object in observe function
				const store = new Vuez.Store();
				let temp = store.observe('foo', 'bar');
				expect(temp).toBe('bar');
		});

		it('should trigger action correctly', () => {
				// should trigger action function after observed object has changed,
				// and after calling store.observe()
				const spy = jasmine.createSpy();
				const store = new Vuez.Store();
				let changingObject = {
						number: 1
				};
				let observeObject = store.observe('changingObject', changingObject);
				store.action('changingObject', spy);
				observeObject.number = 2;
				expect(spy).toHaveBeenCalled();
		});

		it('support object style', () => {
				// should support different data type
				const spy = jasmine.createSpy();
				const store = new Vuez.Store();

				const status = {
						'user': {
								'name': 'foo',
								'pwd': 'bar'
						}
				};
				let status1 = store.observe('status', status);
				store.action('status', spy);

				status1.user = [
						{
								'name': 'foo',
								'pwd': 'bar'
						},
						{
								'name': 'foo2',
								'pwd': 'bar2'
						}
				];
				let status2 = store.observe('status', status1);
				expect(spy).toHaveBeenCalled();
				expect(status2.user.length).toBe(2);
		});

		it('should trigger action with parameter', () => {
				// should trigger action function with current value
				const triggerSpy = jasmine.createSpy();
				const store = new Vuez.Store();

				const observed = {
						'name': 'alice'
				};
				let observed1 = store.observe('observed', observed);
				store.action('observed', triggerSpy);
				observed1.name = 'bob';
				store.observe('observed', observed1);
				expect(triggerSpy).toHaveBeenCalledWith({
						'name': 'bob'
				})
		});

		it('should allow multiple action for one name', () => {
				const store = new Vuez.Store();
				const spy1 = jasmine.createSpy();
				const spy2 = jasmine.createSpy();

				const object1 = {
						foo: 'bar'
				};
				store.observe('object', object1);
				store.action('object', spy1);
				store.action('object', spy2);
				// trigger action
				object1.mew = 'miao';
				store.observe('object');
				expect(spy1).toHaveBeenCalled();
				expect(spy2).toHaveBeenCalled();
		});

		it('should suggest the same object data type for an observer', () => {
				// if values of two different data type are set for one observer, console would show warning
				const store = new Vuez.Store();
				spyOn(console, 'warn');
				const spy1 = jasmine.createSpy();

				let object1 = {
						foo: 'bar'
				};
				store.observe('object', object1);
				store.action('object', spy1);
				// trigger action
				object1 = 'miao';
				store.observe('object', object1);
				expect(spy1).toHaveBeenCalled();

				const warnText = `[vuez] please use the same data type for observer [${'object'}]'s value.`;
				expect(console.warn).toHaveBeenCalledWith(
						warnText
				)
		});

		it('should be able to cancel observers and actions on an object', () => {
				const spy = jasmine.createSpy();
				const store = new Vuez.Store();
				let changingObject = {
						number: 1
				};
				let observeObject = store.observe('changingObject', changingObject);
				store.action('changingObject', spy);
				expect(spy).toHaveBeenCalledTimes(0);

				observeObject.number = 2;
				expect(spy).toHaveBeenCalledTimes(1);

				// unobserve
				store.unobserve('changingObject');
				expect(store.observe('changingObject')).toBeUndefined(); // should be undefined
				observeObject.number = 3;
				store.observe('changingObject', observeObject);
				expect(store.observe('changingObject').number).toBe(3);
				expect(spy).toHaveBeenCalledTimes(1);   // should not fire spy again
		});

		it('should not trigger action if the new value is not changed', () => {
				const spy = jasmine.createSpy();
				const store = new Vuez.Store();
				let changingObject = {
						number: 1
				};
				let observeObject = store.observe('changingObject', changingObject);
				store.action('changingObject', spy);
				observeObject.number = 2;
				expect(spy).toHaveBeenCalledTimes(1);
				let newButSameObject = {
						number: 2
				};
				store.observe('changingObject', newButSameObject); // should not trigger
				expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be able to force trigger an action even if the value is not changed', () => {
				const spy = jasmine.createSpy();
				const store = new Vuez.Store();
				let changingObject = {
						number: 1
				};
				let observeObject = store.observe('changingObject', changingObject);
				store.action('changingObject', spy);
				observeObject.number = 2;
				expect(spy).toHaveBeenCalledTimes(1);

				store.observe('changingObject'); // force trigger
				expect(spy).toHaveBeenCalledTimes(2);
		});
});