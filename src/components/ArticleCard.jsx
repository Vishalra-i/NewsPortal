import React from 'react';
import parse, { domToReact } from 'html-react-parser'; 
import { useNavigate } from 'react-router-dom';

function truncateSummary(summary, wordLimit) {
  
  const words = summary.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return summary;
}

function ArticleCard({ title, summary, imageUrl, url }) {
  const navigate = useNavigate();
  const truncatedSummary = truncateSummary(summary, 50);
  
  const handleClick = () => {
    navigate(`/article/${encodeURIComponent(url)}`); 
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {parse(truncatedSummary, {
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
          })}
        </p>
        <button className="text-blue-500 hover:underline" onClick={handleClick}>Read More</button>
      </div>
    </div>
  );
}

export default ArticleCard;
