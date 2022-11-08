import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { createVideoGame, getGenres, getPlatforms } from "../../redux/actions";
import validateData from './ValidateDataVideogame'
import './CreateVideoGame.css';

export function CreateVideoGame() {

  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector( (state) => state.genres );
  const platforms = useSelector( (state) => state.platforms )
  const initialState = {
    name: '',
    released: '', 
    description: '', 
    rating: 0, 
    genres: [],
    background_image: '',
    platforms: []
  };

  useEffect(()=> { 
    dispatch(getGenres());
    dispatch(getPlatforms()); 
  }, []);

  let [data, setData] = useState(initialState);
  let [errors, setErrors] = useState({});
 

  const handleDataChange = (e) => {
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    let dataErrors = validateData({...data,[e.target.name]: e.target.value})
    setErrors(dataErrors)
  };

  const handleDataGenre = (e) => {
    e.preventDefault()
    let genresList = data.genres.filter( genre => genre.name === e.target.value)
    if (genresList.length === 0) {
      setData(prevState => ({
        ...prevState,
        genres: [...data.genres, {name: e.target.value}]
      }))
    }
  };

  const handleDataPlatform = (e) => {
    e.preventDefault()
    let platformList = data.platforms.filter( platform => platform.name === e.target.value)
    if (platformList.length === 0) {
      setData(prevState => ({
        ...prevState,
        platforms: [...data.platforms, {name: e.target.value}]
      }))
    }
    let dataErrors = validateData({...data,platforms: [...data.platforms, {name: e.target.value}]})
    setErrors(dataErrors)
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    let dataErrors = validateData(data)
    setErrors(validateData(data))
    if (Object.keys(dataErrors).length === 0) {
      dispatch(createVideoGame(data))
      alert('Video Juego Creado')
      setData(initialState)
      history.push('/Home')
    }
  };

  const removeGenre = (name,e) => {
    e.preventDefault()
    setData(prevState => ({
      ...prevState,
      genres: data.genres.filter( genre => genre.name !== name )
    }))
  };

  const removePlatform = (name,e) => {
    e.preventDefault()
    setData(prevState => ({
      ...prevState,
      platforms: data.platforms.filter( platform => platform.name !== name )
    }))
  };

  return (
    <div>
      <Link to='/Home'><button>Ir Atras</button></Link>
      <h1>Creacion del Video Juego</h1>
      <form onSubmit={e=>handleSubmit(e)}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" value={data.name} name='name' onChange={e=>handleDataChange(e)}/>
        </div>
        {errors.name && (<p className="danger">{errors.name}</p>)}
        <div>
          <label htmlFor="released">Fecha de lanzamiento</label>
          <input type="date" value={data.released} name='released' onChange={e=>handleDataChange(e)}/>
        </div>
        <div>
          <label htmlFor="description">Descripcion:</label>
          <input type="text" value={data.description} name='description' onChange={e=>handleDataChange(e)}/>
        </div>
        {errors.description && (<p className="danger">{errors.description}</p>)}
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" value={data.rating} name='rating' onChange={e=>handleDataChange(e)}/>
        </div>
        {errors.rating && (<p className="danger">{errors.rating}</p>)}
        <div>
          <label htmlFor="background_image">Imagen Principal:</label>
          <input type="text" value={data.background_image} name='background_image' onChange={e=>handleDataChange(e)}/>
        </div>
        <div>
          <label htmlFor="">Genres:</label>
          <select onChange={e => handleDataGenre(e)}>
            { genres?.map( (genre, index) => <option key={index}>{genre}</option> ) }
          </select>
          <ul>
            {
              data.genres.map((genre,index)=> (
                <li key={index}>
                  {genre.name} 
                  <button onClick={(e)=>removeGenre(genre.name,e)}>X</button>
                </li>
                ))
            }
          </ul>
        </div>

        <div>
          <label htmlFor="">Platforms:</label>
          <select onChange={e => handleDataPlatform(e)}>
            { platforms?.map( (platform, index) => <option key={index}>{platform}</option> ) }
          </select>
          <ul>
            {
              data.platforms.map((platform,index)=> (
                <li key={index}>
                  {platform.name} 
                  <button onClick={(e)=>removePlatform(platform.name,e)}>X</button>
                </li>
                ))
            }
          </ul>
          {errors.platforms && (<p className="danger">{errors.platforms}</p>)}
        </div>

        <button type="submit" disabled={errors.name || errors.description ||
            errors.rating || errors.platforms ? true: false} >Crear Video Juego</button>
      </form>

    </div>

  )

}