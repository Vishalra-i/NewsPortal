import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import axios from "axios";
import { addArticle } from "./store/newsArticleSlice";

function App() {
  const dispatch = useDispatch();

  async function fetchData() {
    console.log(`start`)
    console.log(import.meta.env.VITE_API_KEY)
    try {
      const response = await axios.get(
        `https://api.worldnewsapi.com/top-news?source-country=in&language=en`,
        {
          headers: {
            'X-API-Key': import.meta.env.VITE_API_KEY,
          },
        }
      );
      
      response.data.top_news.forEach(newsGroup => {
        newsGroup.news.forEach(article => {
          dispatch(addArticle(article));
        });
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="mt-24 px-4 min-h-screen lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
