import React, { useEffect, useState } from "react";
import "./Details.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar/Navbar";
import Youtube from "../../../assets/youtube_icon.png";
const Details = () => {
  const id = useParams();
  const [img, setimg] = useState([]);
  const [desc, setdesc] = useState([]);
  const [genres, setgene] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id.id}/images`, options)
      .then((res) => res.json())
      .then((res) => setimg(res.posters[0]))
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${id.id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        setdesc(res);
        setgene(res.genres || []);
      })
      .catch((err) => console.error(err));
    // setgene(desc.genres);
  }, [id]);
  //   console.log(desc);

  return (
      <div className="details">
          <Navbar />
      <div className="detail">
        <img
          src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
          className="img"
        ></img>
        <div className="desc_info">
          <h1 className="title cen">{desc.original_title}</h1>
          <p className="desc">
            <span className="bold">Description</span> : {desc.overview}
          </p>
          <p className="desc">
            <span className="bold">Run-Time</span> : {desc.runtime} minutes
          </p>
          <p className="desc">
            <span className="bold">Release Date </span> : {desc.release_date}
          </p>
          <p className="desc">
            <span className="bold">genres</span> :
          </p>
          <div>
            {genres &&
              genres.length > 0 &&
              genres.map((genre) => (
                <button key={genre.id} className="genre">
                  {genre.name}
                </button>
              ))}
          </div>
          <Link className="youtube" to={`/player/${id.id}`}>
            <div className="redirect">
              <img src={Youtube}></img>
              <p>Youtube</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
