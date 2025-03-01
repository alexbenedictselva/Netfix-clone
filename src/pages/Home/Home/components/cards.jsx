import React from "react";
import "../Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cards = ({ db }) => {
  return (
    <div>
      <div className="cards">
        {/* {console.log(db)} */}
        {db.map((c, index) => (
          <Link to={`details/${c.id}`} key={index} className="boxes1">
            <img src={"https://image.tmdb.org/t/p/w500/" + c.backdrop_path} alt="" className="box1" />
            <div className="description">
              <p>{c.original_title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default cards;
