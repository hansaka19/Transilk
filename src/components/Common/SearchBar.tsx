import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  // Query text currently entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  // Whether the YouTube-style search bar is expanded
  const [isOpen, setIsOpen] = useState(false);

  // Toggle open/closed state for the search UI
  const handleSearchToggle = () => setIsOpen(!isOpen);

  // Close the bar and clear any typed text
  const handleClose = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  // Handle submit of the search form
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Plug your search logic here (API call, filter, etc.)
    console.log("Searching for:", searchTerm);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {isOpen ? (
        // Expanded search bar with clear and submit actions
        <form
          onSubmit={handleSearch}
          className="relative flex w-full max-w-md items-center"
        >
          <div className="flex w-full items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Query input */}
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 flex-1 bg-transparent px-4 text-sm outline-none"
            />
            {/* Clear button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close search"
              title="Close search"
              className="h-10 px-3 text-gray-500 hover:text-[#124559] focus:outline-none"
            >
              <HiMiniXMark className="h-5 w-5" />
            </button>
            {/* Submit button */}
            <button
              type="submit"
              className="h-10 px-4 border-l border-gray-200 bg-[#f8f8f8] hover:bg-[#e8e8e8] flex items-center justify-center focus:outline-none"
              aria-label="Submit search"
              title="Submit search"
            >
              <HiMagnifyingGlass className="h-5 w-5 text-[#124559]" />
            </button>
          </div>
        </form>
      ) : (
        // Collapsed icon that opens the search bar
        <button
          type="button"
          onClick={handleSearchToggle}
          aria-label="Open search"
          title="Open search"
        >
          <HiMagnifyingGlass className="h-6 w-6 text-[#124559] hover:text-[#aec3b0]" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
