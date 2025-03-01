import React, { useEffect,useState } from 'react'
import './Player.css';
import back_button from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const id = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof:""
  });
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id.id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setData(res.results[0]))
      .catch(err => console.error(err));
  },[])

  console.log(id);

  return (
    <div className='player'>
      <img src={back_button} onClick={() => navigate(-1)} />
      <iframe width='90%' height="90%" src={`https://www.youtube.com/embed/${data.key}`} title='trailer' allowFullScreen></iframe>
      <div className="player_info">
        <p>{data.name}</p>
        <p>{data.published_at.slice(0,10)}</p>
        <p>{data.type}</p>
      </div>
    </div>
  )

  
}

export default Player
