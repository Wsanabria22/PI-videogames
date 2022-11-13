import React from "react";
import s from './VideoGames.module.css'

export default function VideoGame({image, name, genres, rating}) {
  return (
    <div className={s.card}>
      <h2 className={s.name}>{name}</h2>
      <img className={s.image} src={image} alt="img not found" />
      <div className={s.content}>
        <div className={s.rating}>
          <h3>Rating:</h3> 
          <p>{rating}</p>
        </div>
        <div className={s.genres}>
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
