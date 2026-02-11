import React from "react";
import "./Fotter.css";
import face from "../../assets/facebook_icon.png";
import insta from "../../assets/instagram_icon.png";
import twitter from "../../assets/twitter_icon.png";
import youtube from "../../assets/youtube_icon.png";
const Fotter = () => {
  return (
    <div className="fotter">
      <div className="socials">
        <img src={face} />
        <img src={insta} />
        <img src={twitter} />
        <img src={youtube} />
      </div>
      <div className="descriptions">
        <div className="description">
          <p>Audio Description</p>
          <p>Investor Relations</p>
          <p>Legal Notices</p>
        </div>
        <div className="description">
          <p>Help Center</p>
          <p>Jobs</p>
          <p>Cookie Preferences</p>
        </div>
        <div className="description">
          <p>Gift Cards</p>
          <p>Terms of Use</p>
          <p>Corporate Information</p>
        </div>
        <div className="description">
          <p>Media Center</p>
          <p>Privacy</p>
          <p>Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
