import React, { useEffect, useState } from "react";
import "./Details.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar/Navbar";
import Youtube from "../../../assets/youtube_icon.png";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo",
    },
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="details"><Navbar /><div className="loading">Loading...</div></div>;
  if (!movie) return <div className="details"><Navbar /><div className="loading">Movie not found</div></div>;

  return (
    <div className="details">
      <Navbar />
      <div className="details-backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="details-overlay"></div>
      </div>
      <div className="details-content">
        <div className="details-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="details-info">
          <h1 className="details-title">{movie.title}</h1>
          <div className="details-meta">
            <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>{movie.runtime} min</span>
          </div>
          <div className="details-genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          <p className="details-overview">{movie.overview}</p>
          <Link to={`/player/${id}`} className="watch-button">
            <img src={Youtube} alt="Play" />
            <span>Watch Trailer</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
