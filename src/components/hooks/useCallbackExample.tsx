import React, { useState, useCallback } from "react";

export const MyCallbackExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Функція створюється лише один раз

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []); 

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
