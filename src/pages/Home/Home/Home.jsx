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
import Fotter from "../../../components/Fotter/Fotter";
const Home = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo",
    },
  };

  useEffect(() => {
    const fetching = () => {
      fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      )
        .then((res) => res.json())
        .then((res) => setData(res.results))
        .catch((err) => console.error(err));

      fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      )
        .then((res) => res.json())
        .then((res) => setData1(res.results))
        .catch((err) => console.error(err));
    
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      )
        .then((res) => res.json())
        .then((res) => setData2(res.results))
        .catch((err) => console.error(err));
    }
    fetching();
  }, []);
  console.log(data);

  return (
    <div className="home">
      <Navbar />
      <Hero hero={hero} hero_tit={hero_tit} play={play} info={info} />
      <h1 className="sub">TOP PICKS FOR YOU</h1>
      <Card db={data} />
      <h1 className="sub">UPCOMING</h1>
      <Card db={data1} />
      <h1 className="sub">ONLY ON NETFLIX</h1>
      <Card db={data2} />
      <Fotter />
    </div>
  );
};

export default Home;
