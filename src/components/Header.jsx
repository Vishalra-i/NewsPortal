import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu, closeMenu } from '../store/menuSlice';

function Header() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };

  return (
    <nav className="z-10 fixed top-0 w-full h-20 bg-white shadow-md shadow-slate-300">
      <div className="flex justify-between items-center p-4">
        <Logo />
        <div className="hidden md:flex text-md gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'text-green-700' : 'text-black'} px-4 py-2 hover:text-lg font-bold`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `${isActive ? 'text-green-700' : 'text-black'} px-4 py-2 hover:text-lg font-bold`
            }
          >
            Trending🔥
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? 'text-green-700' : 'text-black'} px-4 py-2 hover:text-lg font-bold`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="hidden md:flex gap-5">
          <Link
            to="/auth/login"
            className="px-4 py-2 text-sm font-semibold text-center text-white rounded-md hover:text-blue-300 bg-blue-400 border-none"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="px-4 py-2 text-sm font-semibold text-center text-white rounded-md hover:text-green-300 bg-green-400 border-none"
          >
            Register
          </Link>
        </div>
        <button
          className="md:hidden block focus:outline-none"
          onClick={handleToggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md shadow-slate-300`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? 'text-green-700' : 'text-black'} block px-4 py-2 hover:text-lg font-bold`
          }
          onClick={handleCloseMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/trending"
          className={({ isActive }) =>
            `${isActive ? 'text-green-700' : 'text-black'} block px-4 py-2 hover:text-lg font-bold`
          }
          onClick={handleCloseMenu}
        >
          Trending🔥
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${isActive ? 'text-green-700' : 'text-black'} block px-4 py-2 hover:text-lg font-bold`
          }
          onClick={handleCloseMenu}
        >
          Contact
        </NavLink>
        <Link
          to="/auth/login"
          className="block px-4 py-2 mt-2 text-sm font-semibold text-center text-white rounded-md hover:text-blue-300 bg-blue-400 border-none"
          onClick={handleCloseMenu}
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="block px-4 py-2 mt-2 text-sm font-semibold text-center text-white rounded-md hover:text-green-300 bg-green-400 border-none"
          onClick={handleCloseMenu}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Header;
