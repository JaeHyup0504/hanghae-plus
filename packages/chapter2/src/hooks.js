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

  const useMemo = (fn, deps) => {
    const isEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    };

    if (!states[statesKey] || !isEqual(deps, states[statesKey][1])) {
      states[statesKey] = [fn(), deps];
    }

    return states[statesKey][0];
  };

  const resetContext = () => {
    statesKey = 0;
  };

  return { useState, useMemo, resetContext };
}
