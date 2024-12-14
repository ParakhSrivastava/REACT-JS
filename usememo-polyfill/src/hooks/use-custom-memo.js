import { useEffect, useRef } from "react";

const areEqual = (prevDeps, nextDeps) => {
  // prevDeps null means no dependencies were earlier there. No matter new dependencies are provided or not, our memoizedRef should get recalculated anyways
  if (prevDeps === null) return false;

  // if lenght is changed for arrays then also re-calculation happens
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) return false;
  }

  return true;
};

const UseCustomMemo = (cb, deps) => {
  // cached value
  const memoizedRef = useRef(null);

  // changes in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: cb(),
      deps,
    };
  }

  // cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);
  // returns memoized value
  return memoizedRef.current.value;
};

export default UseCustomMemo;
