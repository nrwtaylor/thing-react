import { useEffect, useLayoutEffect, useRef } from "react"; // Import useEffect and useLayoutEffect from 'react'
/*
function deepCompare(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) return false;

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!deepCompare(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
*/
/*
function deepCompare(obj1, obj2, seen = new WeakMap()) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  )
    return false;

  if (seen.has(obj1) || seen.has(obj2)) return true;

  seen.set(obj1, true);
  seen.set(obj2, true);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    // Skip always changing keys
    //if ((['createdAt']).includes(key)) return false;
    // Skip at fields
    if (key.endsWith("At")) {
      console.log("useHybridEffect deepCompare endsWith At", key);
// dev 19 October 2023
// Ignore
continue;
//      return false;
    }

    if (!keys2.includes(key)) return false;

    if (!deepCompare(obj1[key], obj2[key], seen)) return false;
  }

  return true;
}
*/

function deepCompare(obj1, obj2, seen = new WeakMap()) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  )
    return false;

  if (seen.has(obj1) || seen.has(obj2)) return true;

  seen.set(obj1, true);
  seen.set(obj2, true);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (key.endsWith("At")) {
      // Ignore keys ending in "At"
      continue;
    }

    if (!keys2.includes(key)) return false;

    if (!deepCompare(obj1[key], obj2[key], seen)) return false;
  }

  return true;
}
/*
function useHybridEffect(callback, dependencies) {
  const previousDependenciesRef = useRef(dependencies);

  const shouldUseDeepCompare = dependencies.some((dependency, index) => {
    const hasChanged =
      typeof dependency === "object" &&
      !deepCompare(dependency, previousDependenciesRef.current[index]);

    console.log(
      "useHybridEffect hasChanged dependencies previousDependenciesRef.current[index]",
      hasChanged,
      dependency,
      previousDependenciesRef.current[index]
    );

    return hasChanged;
//    
//    return (
//      typeof dependency === "object" &&
//      !deepCompare(dependency, previousDependenciesRef.current[index])
//    );
//
  });
  //console.log("useHybridEffect shouldUseDeepCompare", shouldUseDeepCompare);
  //  const usedEffect = shouldUseDeepCompare ? useEffect : useLayoutEffect; // Use useLayoutEffect for regular shallow comparisons

  //dev
  // test always using deepcompare

  const usedEffect = useLayoutEffect;
  //console.log("useHybridEffect usedEffect", usedEffect);


  usedEffect(() => {
    previousDependenciesRef.current = dependencies;
    callback();
  }, dependencies);
}
*/


export function useHybridEffect(callback, dependencies) {

  const previousDependenciesRef = useRef(null);

  useEffect(() => {
    if (!previousDependenciesRef.current || !deepCompare(dependencies, previousDependenciesRef.current)) {
      callback();
    }
    previousDependenciesRef.current = dependencies;
  }, dependencies);


}
export default useHybridEffect;
