import React from "react";

export default function VideoGame({image, name, genres, rating}) {
  return (
    <div>
      <img src={image} alt="img not found" width="200px" height='250px' />
      <h2>{name}</h2>
      <h3>Rating:</h3> 
      <p>{rating}</p>
      <h3>Genres:</h3>
      {
        genres && genres.map( (genre, index) => { return (
        <div key={index}> <p>{genre.name}</p> </div>)})
      }

    </div>
  )
};
