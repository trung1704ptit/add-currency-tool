import { uniqueSymbols } from "./constant";
import { useState } from "react";

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
      try {
        navigator.clipboard.writeText(nextPair);
        setValue(nextItem)
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
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
