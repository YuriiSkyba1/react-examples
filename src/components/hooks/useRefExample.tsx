import React, { useRef } from "react";

export const MyRefExample: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Type something..." />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
};