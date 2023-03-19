import { uniqueSymbols } from "./constant";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Home() {
  const [base, setBase] = useState("USD");
  const [nextValue, setNextValue] = useState("USD");

  const handleClick = () => {
    const index = uniqueSymbols.findIndex((item) => item === nextValue);
    if (index < uniqueSymbols.length) {
      let nextItem = uniqueSymbols[index + 1];
      if (nextItem === base) {
        nextItem = uniqueSymbols[index + 2];
      }
      setNextValue(nextItem);
    }
  };

  const handleChangeBase = (e) => {
    setBase(e.target.value)
  };

  const onChangeNextValue = (e) => {
    setNextValue(e.target.value);
  };

  return (
    <main>
      <select value={base} onChange={handleChangeBase}>
        {uniqueSymbols.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      <select value={nextValue} onChange={onChangeNextValue}>
        {uniqueSymbols.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button className="button" onClick={handleClick}>
        Get Next Value
      </button>
      <input value={`${base} / ${nextValue}`} className="input" />
      <CopyToClipboard text={`${base} / ${nextValue}`}>
        <button className="copy-button">Copy to clipboard with button</button>
      </CopyToClipboard>
    </main>
  );
}
