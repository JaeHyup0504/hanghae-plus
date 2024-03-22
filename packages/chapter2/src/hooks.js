export function createHooks(callback) {
  const states = [];
  let statesKey = 0;
  const useState = (initState) => {
    let key = statesKey;
    const state = states[key] !== undefined ? states[key] : initState;

    const setState = (newVal) => {
      if (states[key] === newVal) return;
      states[key] = newVal;
      callback();
    };

    statesKey++;

    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    statesKey = 0;
  };

  return { useState, useMemo, resetContext };
}
