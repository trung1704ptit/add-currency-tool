import { uniqueSymbols } from "./constant";
import { useState } from "react";

export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export default function Home() {
  const [base, setBase] = useState("USD");
  const [nextValue, setNextValue] = useState("EUR");

  const handleClick = () => {
    const index = uniqueSymbols.findIndex((item) => item === nextValue);
    if (index < uniqueSymbols.length) {
      const nextItem = uniqueSymbols[index + 1];
      const nextPair = `${base} / ${nextItem}`;
      copyTextToClipboard(nextPair).then(() => {
        console.log("copied:", nextPair);
        setNextValue(nextItem);
      });
    }
  };

  const handleChangeBase = () => {
    const index = uniqueSymbols.findIndex((item) => item === base);
    if (index + 1 < uniqueSymbols.length) {
      const nextBase = uniqueSymbols[index + 1];
      const nextVal = uniqueSymbols[index + 1];
      setBase(nextBase);
      setNextValue(nextVal);
    }
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
    </main>
  );
}
