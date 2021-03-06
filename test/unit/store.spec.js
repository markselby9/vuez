/* eslint-disable no-undef */
/**
 * Created by fengchaoyi on 2017/4/23.
 */
import Vue from 'vue/dist/vue.common';
import Vuez from '../../src/index';
import setup from './setup.spec';

describe('store', () => {
    beforeAll(() => {
        setup();
    });

    it('should observe data', () => {
        // return the value object in observe function
        const store = new Vuez.Store();
        const temp = store.observe('foo', 'bar');
        expect(temp).toBe('bar');
    });

    it('should trigger action correctly', (done) => {
        // should trigger action function after observed object has changed,
        // and after calling store.observe()
        const spy = jasmine.createSpy();
        const store = new Vuez.Store();
        const changingObject = {
            number: 1,
        };
        store.action('changingObject', spy);
        store.observe('changingObject', changingObject);
        Vue.nextTick(() => {
            expect(spy).toHaveBeenCalled();
            done();
        });
    });

    it('support object style', (done) => {
        // should support different data type
        const spy = jasmine.createSpy();
        const store = new Vuez.Store();

        const status = {
            user: {
                name: 'foo',
                pwd: 'bar',
            },
        };
        store.observe('status', status);
        store.action('status', spy);

        Vue.set(status, 'user', [
            {
                name: 'foo',
                pwd: 'bar',
            },
            {
                name: 'foo2',
                pwd: 'bar2',
            },
        ]);  // it's different?
        const status2 = store.observe('status', status);
        Vue.nextTick(() => {
            expect(status2.user.length).toBe(2);
            expect(spy).toHaveBeenCalled();
            done();
        });
    });

    it('should trigger action with parameter', (done) => {
        // should trigger action function with current value
        const triggerSpy = jasmine.createSpy();
        const store = new Vuez.Store();

        const observed = {
            name: 'alice',
        };
        const observed1 = store.observe('observed', observed);
        store.action('observed', triggerSpy);
        observed1.name = 'bob';
        store.observe('observed', observed1);
        Vue.nextTick(() => {
            expect(triggerSpy).toHaveBeenCalledWith({
                name: 'bob',
            });
            done();
        });
    });

    it('should allow multiple action for one name', (done) => {
        const store = new Vuez.Store();
        const spy1 = jasmine.createSpy();
        const spy2 = jasmine.createSpy();

        const object1 = {
            foo: 'bar',
        };
        store.observe('object', object1);
        store.action('object', spy1);
        store.action('object', spy2);
        // trigger action
        object1.mew = 'miao';
        store.observe('object');
        Vue.nextTick(() => {
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            done();
        });
    });

    it('should suggest the same object data type for an observer', (done) => {
        // if values of two different data type are set for one observer, console would show warning
        const store = new Vuez.Store();
        spyOn(console, 'warn');
        const spy1 = jasmine.createSpy();

        let object1 = {
            foo: 'bar',
        };
        store.observe('object', object1);
        store.action('object', spy1);
        // trigger action
        object1 = 'miao';
        store.observe('object', object1);
        Vue.nextTick(() => {
            expect(spy1).toHaveBeenCalled();
            done();
        });

        const warnText = `[vuez] please use the same data type for observer [${'object'}]'s value.`;
        Vue.nextTick(() => {
            expect(console.warn).toHaveBeenCalledWith(
                warnText,
            );
            done();
        });
    });

    it('should be able to cancel observers and actions on an object', (done) => {
        const spy = jasmine.createSpy();
        const store = new Vuez.Store();
        const changingObject = {
            number: 1,
        };
        const observeObject = store.observe('changingObject', changingObject);
        store.action('changingObject', spy);
        Vue.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(0);
            observeObject.number = 2;
            store.observe('changingObject', observeObject);

            Vue.nextTick(() => {
                expect(spy).toHaveBeenCalledTimes(1);

                // unobserve
                store.unobserve('changingObject');
                expect(store.observe('changingObject')).toBeUndefined(); // should be undefined
                observeObject.number = 3;
                store.observe('changingObject', observeObject);
                expect(spy).toHaveBeenCalledTimes(1);   // should not fire spy again
                done();
            });
        });
    });

    it('should not trigger action if the new value is not changed', (done) => {
        const spy = jasmine.createSpy();
        const store = new Vuez.Store();
        const changingObject = {
            number: 1,
        };
        store.observe('changingObject', changingObject);
        store.action('changingObject', spy);
        changingObject.number = 2;
        store.observe('changingObject', changingObject);
        Vue.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            const newButSameObject = {
                number: 2,
            };
            store.observe('changingObject', newButSameObject); // should not trigger

            Vue.nextTick(() => {
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    // TODO: keep the force trigger function?
    // it('should be able to force trigger an action even if the value is not changed', () => {
    //     const spy = jasmine.createSpy();
    //     const store = new Vuez.Store();
    //     const changingObject = {
    //         number: 1,
    //     };
    //     store.observe('changingObject', changingObject);
    //     store.action('changingObject', spy);
    //     changingObject.number = 2;
    //     store.observe('changingObject', changingObject);
    //     expect(spy).toHaveBeenCalledTimes(1);
    //
    //     store.observe('changingObject', changingObject); // force trigger
    //     expect(spy).toHaveBeenCalledTimes(2);
    // });
});
