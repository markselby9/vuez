// @flow

export function assert(condition: ?Object, msg: string) {
    if (!condition) throw new Error(`[vuez assert error] ${msg}`);
}

export function isSameDataType(value1: any, value2: any): boolean {
    // considering these data types:
    // Numbers, Strings, Booleans, Objects, Functions, Arrays, RegExp, null, undefined

    // using totype function from post: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    const toType = (obj: any): string => {
        const typeStringArray = Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/);
        if (typeStringArray) {
            const second = typeStringArray[1];
            return second.toLowerCase();
        }
        return 'error!';
    };
    return toType(value1) === toType(value2);
}
