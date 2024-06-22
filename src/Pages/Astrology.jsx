import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import axios from 'axios';
import WeatherReport from '../components/WeatherReport';

function Astrology() {
  const [astrologyArticle , setAstrologyArticle] = useState([])


  async function fetchData() {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${year}-0${month}-${day}`;
      console.log(formattedDate);
      const response = await axios.get(`https://api.worldnewsapi.com/search-news?text=horoscope&language=en`, {
        headers: {
          'X-API-Key': import.meta.env.VITE_API_KEY,
        },
      });
      console.log(response);
      setAstrologyArticle(response.data.news)
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
        {astrologyArticle.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            summary={article.text}
            imageUrl={article.image || 'https://www.shutterstock.com/image-photo/close-businessman-hand-using-laptop-260nw-2152788551.jpg'}
            url={article.url}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Astrology;
