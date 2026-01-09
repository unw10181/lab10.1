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

  return (
    <div
      className="counter-container"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Advanced Counter</h2>

      <div className="counter-buttons">
        <h3>Current Count: {count}</h3>
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="step-input" style={{ marginTop: "1rem" }}>
        <label>
          Step Value:
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value) || 1)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>

      <div className="status">
        <p>{status}</p>
      </div>

      <div className="history">
        <h4>Count History:</h4>
        <ul>
          {history.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div className="tip">
        <p>
          <strong>Tip:</strong> Use ArrowUp to increment and ArrowDown to
          decrement.
        </p>
      </div>
    </div>
  );
};

export default AdvancedCounter;
