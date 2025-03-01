import React from 'react'

const Hero = ({hero,hero_tit,play,info}) => {
  return (
    <div>
      <div className="hero">
        <img src={hero} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_tit}className="caption-img" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
        <div className="hero-btn">
          <button className="btn"><img src={play}  />Play</button>
          <button  className="btn dark-btn"><img src={info} />More Info</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
