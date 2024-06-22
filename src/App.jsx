import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import axios from "axios";
import { addArticle } from "./store/newsArticleSlice";

function App() {
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      const response = await axios.get(`https://api.worldnewsapi.com/search-news?text=india&language=en`, {
        headers: {
          'X-API-Key': import.meta.env.VITE_API_KEY,
        },
      });
      console.log(response);
      response.data.news.forEach((article) => {
        dispatch(addArticle(article));
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
