import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse, { domToReact } from 'html-react-parser'; 


function ArticlePage() {
  const { url } = useParams();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const decodedUrl = decodeURIComponent(url); 
      const res = await axios.get(`https://api.worldnewsapi.com/extract-news?url=${decodedUrl}`, {
        headers: {
          'X-API-Key': import.meta.env.VITE_API_KEY,
        },
      });
      setArticle(res.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0)
    }
  };

  useEffect(() => {
    if (url) {
      fetchArticle();
    }
  }, [url]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary || article.text.substring(0, 100),
          url: `${import.meta.env.VITE_BASE_URL}article/${encodeURIComponent(url)}`, // Fix URL
        });
        console.log('Article shared successfully');
      } catch (error) {
        console.error('Error sharing article:', error);
      }
    } else {
      console.log('Web Share API not supported in this browser');
    }
  };

  if (loading) {
    return (
      <div className='flex w-full h-screen justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!article) {
    return <div className='flex w-full h-screen justify-center items-center'>No article found</div>;
  }

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <button
          onClick={handleShare}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Share
        </button>
      </div>
      {article.image && <img src={article.image} alt={article.title} className="mb-4 w-full rounded-lg" />}
      <div className="prose max-w-full">
        <p>{parse(article.text, {
            replace: (domNode) => {
              if (domNode.name === 'h1') {
                return <h1 className="font-bold text-3xl">{domToReact(domNode.children)}</h1>;
              } else if (domNode.name === 'h2') {
                return <h2 className="font-bold text-2xl">{domToReact(domNode.children)}</h2>;
              } else if (domNode.name === 'p') {
                return <p className="my-3 font-medium">{domToReact(domNode.children)}</p>;
              } else if (domNode.name === 'pre') {
                return <pre className="my-3 bg-gray-500 rounded-md p-2 w-fit">{domToReact(domNode.children)}</pre>;
              } else if (domNode.name === 'code') {
                return <code className="rounded-md">{domToReact(domNode.children)}</code>;
              } else if (domNode.name === 'hr') {
                return <hr className="my-6" />;
              }
            },
          })}</p>
      </div>
      {article.video && (
        <div className="my-4">
          <video controls src={article.video} className="w-full rounded-lg">
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {article.images && article.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {article.images.map((img, index) => (
            <div key={index}>
              <img src={img.url} loading='lazy' alt={img.title || 'Image'} className="mb-4 w-full rounded-lg" />
              <p className="text-sm text-gray-600">{img.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
