import React, { useState } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import WeatherReport from '../components/WeatherReport';

function SearchPage() {
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (search.trim() === '') {
      setError('Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.worldnewsapi.com/search-news?text=${search}&language=en`,
        {
          headers: {
            'X-API-Key': import.meta.env.VITE_API_KEY,
          }
        }
      );
      setArticles(response.data.news);
      setError('');
    } catch (err) {
      setError('Failed to fetch articles');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mt-28 container mx-auto px-4 lg:px-8">
      <div className="mb-5 flex items-center">
        <input
          type="text"
          placeholder="Search for news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow p-2 border rounded-l-md outline-none"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 rounded-r-md">
          <span className="text-white">Search</span>
        </button>
      </div>
      {error && <h1 className="text-red-500 text-center mb-4">{error}</h1>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 py-5 space-y-5 w-full">
        <WeatherReport />
        <div className="flex flex-col justify-center items-center py-5 space-y-5 w-full">
        {
           loading ? (
            <div className='flex w-full h-screen justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
            </div>
           ) :
            articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  summary={article.text}
                  imageUrl={article.image || 'https://www.shutterstock.com/image-photo/close-businessman-hand-using-laptop-260nw-2152788551.jpg'}
                  url={article.url}
                />
              ))
            ) : (
            <div>No Articles Found</div>
          ) }
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
