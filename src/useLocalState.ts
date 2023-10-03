import { useEffect, useState, type RefObject } from 'react';

export default function <T>(
  key: string,
  withSync: RefObject<boolean>,
  initialValue: T
): [T, (v: T) => void] {
  const [value, setTransientValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue) as T;
      return parsedValue;
    } else {
      return initialValue;
    }
  });

  const setValue = (vvv: T) => {
    setTransientValue(vvv);
    localStorage.setItem(key, JSON.stringify(vvv));
  };

  useEffect(() => {
    const myfn = (e: StorageEvent) => {
      if (!withSync.current) return
      if (e.key === key && e.newValue) {
        const newValue = JSON.parse(e.newValue) as T;
        setValue(newValue);
      }
    };
    addEventListener('storage', myfn);

    return () => removeEventListener('storage', myfn);
  }, []);

  return [value, setValue];
}
