class Module {}

export const classToObject = <
  I extends Record<keyof T, any>,
  T extends Module = Module
>(
  original: T
) => {
  const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(original));

  return keys.reduce((obj, key) => {
    if (key !== "constructor") {
      obj[key as keyof T] = original[key as keyof T] as any;
    }
    return obj;
  }, {} as I);
};
