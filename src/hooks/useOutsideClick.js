import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listingCaputing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
          console.log("click outside");
        }
      }
      document.addEventListener("click", handleClick, listingCaputing);

      return () =>
        document.removeEventListener("click", handleClick, listingCaputing);
    },
    [handler, listingCaputing]
  );

  return ref;
}
