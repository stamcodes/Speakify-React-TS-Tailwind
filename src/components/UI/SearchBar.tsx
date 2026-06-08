// components/UI/SearchBar.tsx
import { useState } from "react";
import Data from "../../data/Data.json";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof Data.speakers>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    const words = query.toLowerCase().trim().split(" ");
    const matches = Data.speakers.filter((speaker) =>
      words.some(
        (word) =>
          speaker.name.toLowerCase().includes(word) ||
          speaker.category.toLowerCase().includes(word) ||
          speaker.title.toLowerCase().includes(word) ||
          speaker.location.toLowerCase().includes(word),
      ),
    );
    setResults(matches);
    setSearched(true);
  }
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {/* Search Input Row */}
      <div className="flex items-center bg-white rounded-full px-8 py-3 shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="I'm looking for a motivational speaker ..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-gray-900 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 hover:bg-gray-700 transition-colors"
        >
          <img src="/icons/SpeakifyIcon.svg" alt="Icon" />
        </button>
      </div>

      {/* Results Preview */}
      {searched && (
        <div className="text-sm px-2">
          {results.length > 0 ? (
            <>
              <p className="text-grey mb-2">
                {results.length} match{results.length > 1 ? "es" : ""} found:
              </p>
              {results.map((speaker) => (
                <div key={speaker.id} className="mb-2">
                  <p className="text-heading font-semibold">{speaker.name}</p>
                  <p className="text-grey text-xs">{speaker.title}</p>
                  <p className="text-grey text-xs">
                    {speaker.category} · {speaker.location} · £
                    {speaker.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="text-grey">No speakers found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
