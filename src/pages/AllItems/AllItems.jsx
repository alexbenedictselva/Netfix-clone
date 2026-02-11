import React, { useState, useEffect } from 'react';
import './AllItems.css';
import Navbar from '../../components/Navbar/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const AllItems = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo'
    }
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [popular, topRated, upcoming] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options).then(res => res.json()),
          fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options).then(res => res.json()),
          fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options).then(res => res.json())
        ]);

        const allMovies = [
          ...popular.results.map(movie => ({ ...movie, category: 'popular' })),
          ...topRated.results.map(movie => ({ ...movie, category: 'top-rated' })),
          ...upcoming.results.map(movie => ({ ...movie, category: 'upcoming' }))
        ];

        setMovies(allMovies);
        setFilteredMovies(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    if (filterType === 'all') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.category === filterType));
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  if (loading) {
    return (
      <div className="all-items">
        <Navbar />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="all-items">
      <Navbar />
      <div className="all-items-content">
        <h1>All Movies</h1>
        
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={filter === 'popular' ? 'active' : ''} 
            onClick={() => handleFilterChange('popular')}
          >
            Popular
          </button>
          <button 
            className={filter === 'top-rated' ? 'active' : ''} 
            onClick={() => handleFilterChange('top-rated')}
          >
            Top Rated
          </button>
          <button 
            className={filter === 'upcoming' ? 'active' : ''} 
            onClick={() => handleFilterChange('upcoming')}
          >
            Upcoming
          </button>
        </div>

        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                alt={movie.title}
                onError={(e) => {e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.slice(0, 4)}</p>
                <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllItems;