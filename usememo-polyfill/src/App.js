import { useMemo, useState } from "react";
import "./styles.css";
import UseCustomMemo from "./hooks/use-custom-memo";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(100);

  const squaredValue = () => {
    console.log("Expensive calculation!");
    return counter * counter;
  };

  // preserved value
  const memoizedSquaredValue = UseCustomMemo(squaredValue, [counter]);

  return (
    <div className="App">
      <h2>Counter: {counter}</h2>
      <h2>Squared counter: {memoizedSquaredValue}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>

      <h2>Second counter: {counter2}</h2>
      <button onClick={() => setCounter2(counter2 - 1)}>Decrement</button>
    </div>
  );
}
