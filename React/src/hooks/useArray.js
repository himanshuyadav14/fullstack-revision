import { useRef, useState } from "react";

export function useArray(initialValue) {
  const [arr, setArr] = useState([...initialValue]);
  const initialRef = useRef([...initialValue]);

  function push(item) {
    setArr((prev) => [...prev, item]);
  }

  function remove(index) {
    setArr((prev) => prev.filter((_, i) => i !== index));
  }

  function clear() {
    setArr([]);
  }

  function reset() {
    setArr([...initialRef.current]);
  }

  return { arr, push, remove, clear, reset };
}
