export function toArray<T>(value?: T | T[] | null): T[] {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function internalSetValues<T>(store: T, values: T): T {
  const newStore: T = (Array.isArray(store) ? [...store] : { ...store }) as T;

  if (!values) {
    return newStore;
  }

  Object.keys(values).forEach((key) => {
    const prevValue = newStore[key];
    const value = values[key];

    // If both are object (but target is not array), we use recursion to set deep value
    const recursive = isObject(prevValue) && isObject(value);
    newStore[key] = recursive ? internalSetValues(prevValue, value || {}) : value;
  });

  return newStore;
}

export function setValues<T>(store: T, ...restValues: T[]): T {
  return restValues.reduce((current: T, newStore: T): T => internalSetValues<T>(current, newStore), store);
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
