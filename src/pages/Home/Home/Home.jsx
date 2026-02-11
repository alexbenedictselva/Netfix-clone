import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../../components/Navbar/Navbar/Navbar";
import hero from "../../../assets/hero_banner.jpg";
import hero_tit from "../../../assets/hero_title.png";
import play from "../../../assets/play_icon.png";
import info from "../../../assets/info_icon.png";
import card1 from "../../../assets/cards/card1.jpg";
import cardsData from "../../../Db/cards.json";
import cardsData1 from "../../../Db/cards_shuff.json";
import cardsData2 from "../../../Db/cards.desc.json";
import Card from "./components/cards";
import Hero from "./components/Hero";
const Home = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    console.log("HI",data);
  }, [data]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo",
    },
  };

  useEffect(() => {
    const fetchWithRetry = async (url, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return await response.json();
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };

    const fetching = async () => {
      try {
        const [nowPlaying, upcoming, topRated] = await Promise.all([
          fetchWithRetry("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"),
          fetchWithRetry("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"),
          fetchWithRetry("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
        ]);
        setData(nowPlaying.results || []);
        setData1(upcoming.results || []);
        setData2(topRated.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    fetching();
  }, []);
  console.log(data);

  return (
    <div className="home">
      <Navbar />
      <div id="home">
        <Hero hero={hero} hero_tit={hero_tit} play={play} info={info} />
      </div>
      <h1 className="sub" id="new-popular">New & Popular</h1>
      <Card db={data} />
      <h1 className="sub" id="movies">Movies</h1>
      <Card db={data1} />
      <h1 className="sub" id="tv-shows">TV Shows</h1>
      <Card db={data2} />
      <div className="copyright">
        <p>© 2024 Alex. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
