import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from '../components/ArticleCard';
import WeatherReport from '../components/WeatherReport';

const ITEMS_PER_PAGE = 6; // Adjust the number of items per page as needed

function Home() {
  const { article } = useSelector((state) => state.article); 
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(article.length / ITEMS_PER_PAGE);

  // Get the articles for the current page
  const currentArticles = article.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="mt-28 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 py-5 space-y-5 w-full">
        <WeatherReport />
        <div className="flex flex-col justify-center items-center py-5 space-y-5 w-full">
          {currentArticles && currentArticles.length > 0 ? (
            currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.text}
                imageUrl={article.image || 'https://www.shutterstock.com/image-photo/close-businessman-hand-using-laptop-260nw-2152788551.jpg'}
                url={article.url}
              />
            ))
          ) : (
            <div>No Post Available</div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
