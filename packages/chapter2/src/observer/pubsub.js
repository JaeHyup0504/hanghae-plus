let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    let sub = new Set();

    Object.defineProperty(obj, key, {
      get() {
        currentCallback && sub.add(currentCallback);
        return value;
      },
      set(newValue) {
        value = newValue;
        sub.forEach((fn) => fn());
      },
    });
  });

  return obj;
};
