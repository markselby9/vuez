import isEqual from 'lodash/isEqual';

export function assert(condition, msg) {
    if (!condition) throw new Error(`[vuez assert error] ${msg}`);
}

export function isSameDataType(value1, value2) {
    // considering these data types:
    // Numbers, Strings, Booleans, Objects, Functions, Arrays, RegExp, null, undefined

    // using totype function from post: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    const toType = function (obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };
    return isEqual(toType(value1), toType(value2));
}

