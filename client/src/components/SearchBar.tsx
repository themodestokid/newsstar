import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchProps {
  onSearch: (query: string) => void; 
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      onSearch(""); 
    }
  };

  const handleSearch = async () => {
    console.log("token", localStorage.getItem("loginToken"));
    if (!query.trim()) {
      onSearch("");
      return;
    }
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bear " + (localStorage.getItem("loginToken") || ""),
        },
        body: JSON.stringify({ q: query.trim() }),
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      onSearch(data);
    } catch (error) {}
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 p-4 w-full">
      <Input
        type="text"
        placeholder="Search for news..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} 
        className="flex-grow px-6 py-8 text-xl border-2 border-gray-300 rounded-lg shadow-md 
                   bg-transparent text-white transition-all 
                   hover:bg-white hover:text-black 
                   focus:bg-white focus:text-black focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
                   outline-none"
      />
      <Button
        onClick={handleSearch}
        className="px-6 py-8 text-xl bg-gray-900 text-white rounded-lg hover:bg-gray-400 hover:text-gray-900"
      >
        Search
      </Button>
    </div>
  );
}
