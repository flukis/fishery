import { useState } from "react";

export default function InputSearch({
  callback,
  placeholder = "Cari disini ...",
  label = "Pencarian",
}: {
  callback: (val: string | number) => void;
  placeholder?: string;
  label?: string;
}) {
  const [s, setS] = useState("");
  return (
    <div>
      <label htmlFor={(label || "").trim()}>{label}</label>
      <div className="input-search">
        <input
          id={(label || "").trim()}
          onKeyDown={(e) => {
            if (e.key === "Enter") callback(s);
          }}
          onBlur={() => {
            callback(s);
          }}
          type="text"
          onChange={(e) => setS(e.target.value)}
          className="search-term"
          placeholder={placeholder}
        />
        <button type="button" onClick={() => callback(s)}>
          Cari
        </button>
      </div>
    </div>
  );
}
