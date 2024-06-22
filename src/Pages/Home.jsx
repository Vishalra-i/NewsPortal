import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from '../components/ArticleCard';
import WeatherReport from '../components/WeatherReport';

function Home() {
  const { article } = useSelector((state) => state.article); 
  console.log(article)

  return (
    <div className="mt-28 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 py-5 space-y-5 w-full">
        <WeatherReport />
        <div className="flex flex-col justify-center items-center py-5 space-y-5 w-full">
          {article && article.length > 0 ? (
            article.map((article) => (
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
    </div>
  );
}

export default Home;
