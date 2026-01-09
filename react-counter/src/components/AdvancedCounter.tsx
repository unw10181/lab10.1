import { useEffect, useState } from "react";
import "../styles/AdvancedCount.css";

const AdvancedCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [step, setStep] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  /* -----------------------------
     Handlers
  ------------------------------ */
  const increment = () => {
    setCount((prev) => prev + step);
  };

  const decrement = () => {
    setCount((prev) => prev - step);
  };
};

export default AdvancedCounter;
