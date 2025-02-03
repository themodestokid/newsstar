import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";

interface NewsArticle {
  title: string;
  content: string;
  image_url: string;
  category: string;
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched News:", data);
        setNews(data);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const handleSearch = (results: any) => {
    console.log(results);
    setSearchQuery(results);
  };

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative z-50 w-[65%] max-w-3xl mt-10">
          <SearchBar onSearch={handleSearch} />
        </div>
        {searchQuery ? (
          <p className="text-lg text-gray-700 mt-4">
            Showing results for: <strong>{searchQuery}</strong>
          </p>
        ) : null}

        <div className="mt-6 w-[65%] max-w-3xl">
          {filteredNews.length > 0 ? (
            filteredNews.map((article, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p className="text-gray-600">{article.content.substring(0, 100)}...</p>
              </div>
            ))
          ) : searchQuery ? (
            <p className="text-gray-500 mt-4">No results found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
