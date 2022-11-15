import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { createVideoGame, getGenres, getPlatforms, setPopupStatus } from "../../redux/actions";
import validateData from './ValidateDataVideogame'
import s from './CreateVideoGame.module.css';

export function CreateVideoGame() {

  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const statusCode = useSelector((state) => state.statusCode);
  const statusText = useSelector((state) => state.statusText);

  const initialState = {
    name: '',
    released: '',
    description: '',
    rating: 0,
    genres: [],
    background_image: '',
    platforms: [],
    showPopup: false,
    message1: '',
    message2: '',
  };

  let [errors, setErrors] = useState({});
  let [data, setData] = useState(initialState);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    setupPopup();
  }, [statusCode]);


  const handleDataChange = (e) => {
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    let dataErrors = validateData({ ...data, [e.target.name]: e.target.value })
    setErrors(dataErrors)
  };

  const handleDataGenre = (e) => {
    e.preventDefault()
    let genresList = data.genres.filter(genre => genre.name === e.target.value)
    if (genresList.length === 0) {
      setData(prevState => ({
        ...prevState,
        genres: [...data.genres, { name: e.target.value }]
      }))
    }
  };

  const handleDataPlatform = (e) => {
    e.preventDefault()
    let platformList = data.platforms.filter(platform => platform.name === e.target.value)
    if (platformList.length === 0) {
      setData(prevState => ({
        ...prevState,
        platforms: [...data.platforms, { name: e.target.value }]
      }))
    }
    let dataErrors = validateData({ ...data, platforms: [...data.platforms, { name: e.target.value }] })
    setErrors(dataErrors)
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    let dataErrors = validateData(data)
    setErrors(validateData(data))
    if (Object.keys(dataErrors).length === 0) {
      dispatch(createVideoGame(data))
      if ( statusCode < 300 ) {
        setData(initialState)
      }
      setupPopup();
      // history.push('/Home')
    }
  };


  const removeGenre = (name, e) => {
    e.preventDefault()
    setData(prevState => ({
      ...prevState,
      genres: data.genres.filter(genre => genre.name !== name)
    }))
  };

  const removePlatform = (name, e) => {
    e.preventDefault()
    setData(prevState => ({
      ...prevState,
      platforms: data.platforms.filter(platform => platform.name !== name)
    }))
  };

  const setupPopup = () => {
    console.log(statusCode);
    let showMsg, msg1, msg2;
    switch (statusCode) {
      case 200:
        showMsg = true;
        msg1 = 'Video Juego Creado Satisfactoriamente';
        msg2 = 'Status Code: ' + statusCode + ': ' + statusText
        break;
      case 500:
        showMsg = true;
        msg1 = 'Video Juego No Creado';
        msg2 = 'Status Code: ' + statusCode + ': ' + statusText
        break;
      default:
        showMsg = false;
        msg1 = '';
        msg2 = '';
        break;
    }
    setData(prevState => ({
      ...prevState,
      showPopup: showMsg, 
      message1: msg1, 
      message2: msg2
    }))
    console.log(data.showPopup, data.message1, data.message2)
  }

  const closePopup = (e) => {
    e.preventDefault();
    dispatch(setPopupStatus({status: 0, statusText:''}));
    setupPopup();
  }

  return (
    <div className={s.container}>
      {
        (statusCode > 0) && (
          <div className={s.popup}>
            <h2>{data.message1}</h2>
            <h3>{data.message2}</h3>
            <button className={s.btns1} onClick={e=> closePopup(e)}>Aceptar</button>
          </div>
        )
      }
      <h1 className={s.title}>Creacion del Video Juego</h1>
      <form className={s.gameCard} onSubmit={e => handleSubmit(e)}>
        <div className={s.imgBox}>
          <label htmlFor="name">Nombre:</label>
          <input className={s.names} type="text" value={data.name} name='name' onChange={e => handleDataChange(e)} />
        </div>
        {errors.name && (<p className={s.danger}>{errors.name}</p>)}
        <div>
          <label htmlFor="released">Fecha de lanzamiento:</label>
          <input className={s.released} type="date" value={data.released} name='released' onChange={e => handleDataChange(e)} />
        </div>
        <div className={s.descText}>
          <label className={s.descLabel} htmlFor="description">Descripcion:</label>
          <textarea className={s.description} type="text" rows="10" cols="40" value={data.description} name='description' onChange={e => handleDataChange(e)}></textarea>
        </div>
        {errors.description && (<p className={s.danger}>{errors.description}</p>)}
        <div>
          <label htmlFor="rating">Rating:</label>
          <input className={s.num} type="number" value={data.rating} name='rating' onChange={e => handleDataChange(e)} />
        </div>
        {errors.rating && (<p className={s.danger}>{errors.rating}</p>)}
        <div className={s.imgBox}>
          <label htmlFor="background_image">Imagen Principal:</label>
          <input className={s.urlimage} type="text" value={data.background_image} name='background_image' onChange={e => handleDataChange(e)} />
        </div>
        <div className={s.tabla}>
          <div className={s.tabla}>
            <div>
              <label htmlFor="">Generos:</label>
              <select onChange={e => handleDataGenre(e)}>
                {genres?.map((genre, index) => <option key={index}>{genre}</option>)}
              </select>
            </div>
            <div>
              <ul>
                {
                  data.genres.map((genre, index) => (
                    <li className={s.genres} key={index}>
                      {genre.name}
                      <button className={s.btns2} onClick={(e) => removeGenre(genre.name, e)}>X</button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>

          <div className={s.tabla}>
            <div>
              <label htmlFor="">Plataformas:</label>
              <select name="platforms" onChange={e => handleDataPlatform(e)}>
                {platforms?.map((platform, index) => <option key={index}>{platform}</option>)}
              </select>
            </div>
            <div>
              <ul>
                {
                  data.platforms.map((platform, index) => (
                    <li className={s.platforms} key={index}>
                      {platform.name}
                      <button className={s.btns2} onClick={(e) => removePlatform(platform.name, e)}>X</button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          {errors.platforms && (<p className={s.danger}>{errors.platforms}</p>)}
        </div>
        <button className={s.btns1} type="submit"
          disabled={errors.name || errors.description || errors.rating || errors.platforms ? true
            : false} >Crear Video Juego</button>
      </form>
      <div >
        <Link to='/Home'><button className={s.btns1}>Ir Atras</button></Link>
      </div>
    </div>

  )

}