import { useCallback, useEffect, useState } from "react";

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpem] = useState(defaultValue);

  const open = useCallback(() => setIsOpem(true), []);
  const close = useCallback(() => setIsOpem(false), []);

  return { isOpen, open, close };
}

export const useMediQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addEventListener("click", listener);

    return () => queryList.removeEventListener("click", listener);
  }, [query]);

  return matches;
};
