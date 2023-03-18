import { uniqueSymbols } from "./constant";
import { useState } from "react";

export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export default function Home() {
  const [value, setValue] = useState("USD");

  const onChange = (e) => {
    console.log(e.target.value)
    setValue(e.target.value);
  };

  const handleClick = () => {
    const index = uniqueSymbols.findIndex(item => item === value);
    if (index < uniqueSymbols.length) {
      const nextItem = uniqueSymbols[index+ 1];
      const nextPair = `${value} / ${nextItem}`;
      copyTextToClipboard(nextPair).then(() => {
        console.log('copied');
        setValue(nextItem);
      })
    }
  }
  return (
    <main>
      <select value={value} onChange={onChange}>
        {uniqueSymbols.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button className="button" onClick={handleClick}>Get Next Value</button>
    </main>
  );
}
