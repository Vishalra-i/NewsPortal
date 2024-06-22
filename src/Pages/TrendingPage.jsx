import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from '../components/ArticleCard';
import axios from 'axios';
import { addTrendingArticle } from '../store/newsArticleSlice';
import WeatherReport from '../components/WeatherReport';

function TrendingPage() {
  const { trendingArticles } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  // Fetching trending articles
  async function fetchData() {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${year}-0${month}-${day}`;
      console.log(formattedDate);
      const response = await axios.get(
        `https://api.worldnewsapi.com/top-news?source-country=in&language=en&date=${formattedDate}`,
        {
          headers: {
            'X-API-Key': import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log(response);
      response.data.top_news[0].news.forEach((article) => {
        dispatch(addTrendingArticle(article));
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-28 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 py-5 space-y-5 w-full">
        <WeatherReport />
        <div className="flex flex-col justify-center items-center py-5 space-y-5 w-full">
        {trendingArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            summary={article.summary}
            imageUrl={article.image || 'https://www.shutterstock.com/image-photo/close-businessman-hand-using-laptop-260nw-2152788551.jpg'}
            url={article.url}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingPage;
