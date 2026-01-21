import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../../assets/logo.png";
import search from "../../../assets/search_icon.svg";
import bell from "../../../assets/bell_icon.svg";
import profile from "../../../assets/profile_img.png";
import caret from "../../../assets/caret_icon.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo'
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  const handleSearch = async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
        const data = await response.json();
        setSearchResults(data.results.slice(0, 5)); // Show top 5 results
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/details/${movieId}`);
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li onClick={() => handleNavClick('home')}>Home</li>
          <li onClick={() => handleNavClick('tv-shows')}>TV Shows</li>
          <li onClick={() => handleNavClick('movies')}>Movies</li>
          <li onClick={() => handleNavClick('new-popular')}>New & Popular</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <img 
            src={search} 
            alt="" 
            className="icons" 
            onClick={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <div className="search-box">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleInputChange}
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((movie) => (
                    <div 
                      key={movie.id} 
                      className="search-result-item"
                      onClick={() => handleMovieClick(movie.id)}
                    >
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                        alt={movie.title}
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                      <div>
                        <p>{movie.title}</p>
                        <span>{movie.release_date?.slice(0, 4)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
