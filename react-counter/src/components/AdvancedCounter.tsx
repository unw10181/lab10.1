import { useEffect, useState } from "react";
import "../styles/AdvancedCount.css";

const AdvancedCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [step, setStep] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  /* -----------------------------
     Update history when count changes
  ------------------------------ */
  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, count]);
  }, [count]);

  /* -----------------------------
     Auto-save count to localStorage
     (Simulated async save + cleanup)
  ------------------------------ */
  useEffect(() => {
    setStatus("Saving...");

    const saveTimeout = setTimeout(() => {
      localStorage.setItem("count", JSON.stringify(count));
      setStatus("Changes saved.");
    }, 500);

    // Cleanup if count changes before save completes
    return () => {
      clearTimeout(saveTimeout);
    };
  }, [count]);

  /* -----------------------------
     Keyboard event listeners
  ------------------------------ */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setCount((prev) => prev + step);
      }
      if (event.key === "ArrowDown") {
        setCount((prev) => prev - step);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  /* -----------------------------
     Handlers
  ------------------------------ */
  const increment = () => {
    setCount((prev) => prev + step);
  };

  const decrement = () => {
    setCount((prev) => prev - step);
  };

    const reset = () => {
    setCount(0);
    setHistory([0]);
    localStorage.removeItem("count");
  };

return ();

};




export default AdvancedCounter;
