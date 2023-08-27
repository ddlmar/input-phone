import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [phoneValue, setPhoneValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, "");

    const formattedValue = formatPhoneNumber(inputValue);
    setPhoneValue(formattedValue);

    if (inputValue.length > 7 && inputRef.current) {
      const currentPosition = event.target.selectionStart || 0;
      setTimeout(() => {
        inputRef.current!.selectionStart = currentPosition;
        inputRef.current!.selectionEnd = currentPosition;
      }, 0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();

      const currentCursorPosition = inputRef.current!.selectionStart || 0;
      const newValue =
        phoneValue.slice(0, currentCursorPosition - 1) +
        phoneValue.slice(currentCursorPosition);

      setPhoneValue(newValue);

      setTimeout(() => {
        const newCursorPosition = Math.max(currentCursorPosition - 1, 0);
        inputRef.current!.selectionStart = newCursorPosition;
        inputRef.current!.selectionEnd = newCursorPosition;
      }, 0);
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
  };

  return (
    <>
      <input
        type="text"
        maxLength={15}
        value={phoneValue}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        ref={inputRef}
      />
    </>
  );
}

export default App;
