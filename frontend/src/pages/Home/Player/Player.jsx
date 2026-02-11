import React, { useEffect, useState } from 'react';
import './Player.css';
import back_button from '../../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzM5YjE2YzhkOGI4Y2I1MTY4MGUwY2ZiMGU3NjJhNyIsIm5iZiI6MTczMzI4NzExNi4xNTUsInN1YiI6IjY3NGZkY2NjNTIwMWY4YzE1ZjE3Nzg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyHn-Diqr1cgmdH9AjXE_px16khB_VoQWECV2KfFiNo'
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
        const data = await response.json();
        setVideo(data.results?.[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  return (
    <div className='player'>
      <div className='player-header'>
        <button className='back-button' onClick={() => navigate(-1)}>
          <img src={back_button} alt='Back' />
          <span>Back</span>
        </button>
      </div>
      
      <div className='player-container'>
        {loading ? (
          <div className='player-loading'>Loading...</div>
        ) : video ? (
          <>
            <div className='video-wrapper'>
              <iframe
                src={`https://www.youtube.com/embed/${video.key}?autoplay=0&rel=0&modestbranding=1`}
                title={video.name}
                allowFullScreen
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              ></iframe>
            </div>
            <div className='player-info'>
              <h2>{video.name}</h2>
              <div className='player-meta'>
                <span className='meta-item'>{video.type}</span>
                <span className='meta-divider'>•</span>
                <span className='meta-item'>{new Date(video.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </>
        ) : (
          <div className='player-error'>No trailer available</div>
        )}
      </div>
    </div>
  );
};

export default Player;
