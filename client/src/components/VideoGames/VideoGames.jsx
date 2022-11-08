import React from "react";
import './VideoGames.css'

export default function VideoGame({image, name, genres, rating}) {
  return (
    <div className="card">
      <h2 className="name">{name}</h2>
      <img className="image" src={image} alt="img not found" />
      <div className="content">
        <div className="rating">
          <h3>Rating:</h3> 
          <p>{rating}</p>
        </div>
        <div className="genres">
          <h3>Genres:</h3>
          {
            genres && genres.map( (genre, index) => { return (
            <div key={index}> <p>{genre.name}</p> </div>)})
          }
        </div>
      </div>


    </div>
  )
};
