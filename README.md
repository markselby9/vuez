# Vuez [![Build Status](https://travis-ci.org/markselby9/vuez.svg?branch=develop)](https://travis-ci.org/markselby9/vuez)

> A Simple but Powerful State Management for Vue.js projects.

Vuez is a very simple but powerful state management library for Vue.js projects.

Vuez is currently under development, and the document would be updated regularly as the project is improved.
 For any advice or requirements, please kindly give issues, PR, or directly contact me by [email](mailto:markselbyfcy@gmail.com). Thanks a lot:)

中文文档请点击[这里](https://github.com/markselby9/vuez/wiki/Document_zh)。

## Installation

As always, vuez can be installed through npm or yarn.

``` bash
npm install vuez --save
```

or

``` bash
yarn add vuez
```

When used with a module system, you must explicitly install Vuez by calling `Vue.use()`:

``` js
import Vue from 'vue'
import Vuez from 'vuez'

Vue.use(Vuez)
```

And then please follow the 'Basic usage' part to use Vuez.

## Basic usage

In short, Vuez is a centralized monitoring 'store' which is accessible for all your Vue components after installing Vuez.
From each component, you can access the store through `this.$store`.

The store concept in Vuez is very simple, imagine an excel table with three columns: 'name', 'object', 'actions'. Whenever you are interested in monitoring an object or an event, start a new column in the table with a new name, with an object you plan to monitor.
 Then put everything you want to do when the object changed, as functions in the 'actions' column. Everytime you want to care about the 'name', you use `store.observe(this_name)` to observe it, if the `object` column's value has changed, all `actions` related to the `name` would be triggered.

It has only two set of APIs:

1. observe/unobserve
    + `store.observe(name, observing_object)`, takes two parameters: name is a string for the observer, and observing_object is an object to observe.

    If a name is firstly created as an observer's name (firstly used in observe function), the object would be recorded.

    Then **everytime whenever** the observe function is called with the name, all actions with the name would be triggered if and only if the `observing_object` is changed.

    + `store.unobserve(name)` would cancel every action and observers related to the name.

2. action
    + `store.action(name, action_function)`, takes two parameters: name is a string for the observer, and action_function is the function to act when the object is changed during an 'observe'.

    The `action_function` here can have a parameter representing the current object value of the observing object.

With these simple APIs, Vuez can deal with many troublesome event handling such as data communication, monitoring data change, etc.

## Simple example

After [installing](installation.md) Vuez, let's make a simple observed object here.

``` js
// Make sure to call Vue.use(Vuez) first before usage

const store = new Vuez.Store();
let changingObject = {
    number: 1
};
store.observe('changing', changingObject);
store.action('changing', (obj) => {
    console.log(obj.number);
});
observeObject.number = 2;
store.observe('changing', changingObject);  // trigger the action and console would show '2'
```

## Document

Please check the document through [wiki](https://github.com/markselby9/vuez/wiki/Document).

## Examples

Please check the Vue.js todolist app project using vuez, by running `npm run dev`.

- [Todo List](https://github.com/markselby9/vuez/tree/develop/examples/todolist)


## License

[MIT](http://opensource.org/licenses/MIT)
