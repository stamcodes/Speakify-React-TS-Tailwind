// components/UI/SearchBar.tsx
import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center bg-white rounded-full px-8 py-3 w-full max-w-md shadow-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="I'm looking for a motivational speaker ..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400"
      />
      <button
        onClick={() => console.log("Search:", query)}
        className="ml-4 bg-gray-900 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 hover:bg-gray-700 transition-colors"
      >
        <img src="/icons/SpeakifyIcon.svg" alt="Icon" />
      </button>
    </div>
  );
}

export default SearchBar;
