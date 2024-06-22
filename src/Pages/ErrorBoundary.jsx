import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Unexpected Application Error!</h1>
        <p className="mt-4">{error.statusText || error.message}</p>
        <button className='bg-slate-600 text-white p-2 rounded-md mt-4' onClick={handleClick}>Back To Home</button>
     
      </div>
    </div>
  );
}

export default ErrorBoundary;
