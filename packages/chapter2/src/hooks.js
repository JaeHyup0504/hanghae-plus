export function createHooks(callback) {
  const states = [];
  let statesKey = 0;
  const useState = (initState) => {
    let key = statesKey;
    const state = states[key] ?? initState;

    const setState = (newVal) => {
      if (states[key] === newVal) return;
      states[key] = newVal;
      callback();
    };

    statesKey++;

    return [state, setState];
  };

  const memos = [];
  let memosKey = 0;
  const useMemo = (fn, refs) => {
    const memo = memos[memosKey];

    if (memo && refs.every((ref, i) => ref === memo.refs[i])) {
      return memo.value;
    }

    const value = fn();
    memos[memosKey] = {
      value,
      refs,
    };
    memosKey++;
    return value;
  };

  const resetContext = () => {
    statesKey = 0;
    memosKey = 0;
  };

  return { useState, useMemo, resetContext };
}
