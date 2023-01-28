export function property(target, propertyKey) {
  let value;
  Object.defineProperty(target, propertyKey, {
    set(newValue) {
      value = newValue;
      this._render();
    },
    get() {
      return value;
    }
  });
  return target;
}