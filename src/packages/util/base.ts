function getType(type: string) {
  return function(v: any) {
    return Object.prototype.toString.call(v).slice(8, -1) === type;
  };
}
export function isUndef(v: any) {
  return v === void 0;
}
export const isArray = getType("Array");
export const isObject = getType("Object");
export const isString = getType("String");
export const isNumber = getType("Number");
export const isSymbol = getType("Symbol");
export const isNull = getType("Null");
export const isDate = getType("Date");
export const isFunction = getType("Function");