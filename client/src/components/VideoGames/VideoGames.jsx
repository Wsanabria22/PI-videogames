import React from "react";
import { Link } from "react-router-dom";
import s from './VideoGames.module.css'

export default function VideoGame({image, name, genres, rating, id}) {
  return (
    <div className={s.card}>
      <img className={s.image} src={image} alt="img not found" />
      <h2 className={s.name}>{name}</h2>
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
      <div className={s.footCard}>
        <Link to={'/updatevideogame/'+ id}>
          <button className={s.btns}>Editar</button>
        </Link>
        <Link to={'/deletevideogame/'+ id}>
          <button className={s.btns}>Borrar</button>
        </Link>
      </div>

    </div>
  )
};
