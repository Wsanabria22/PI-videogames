import React from "react";
// import { useState } from 'react';
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import * as ReactRedux from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import * as actions from "../../redux/actions";
import validateData from './ValidateDataVideogame'
import s from './CreateVideoGame.module.css';

export function CreateVideoGame() {
let statusCode, statusText, genres, platforms, msg1, msg2;

  const dispatch = ReactRedux.useDispatch();
  React.useEffect(() => {
    dispatch(actions.getGenres());
    dispatch(actions.getPlatforms());
  }, [statusCode]);
  const history = useHistory();
  genres = useSelector((state) => state.genres);
  platforms = useSelector((state) => state.platforms);
  statusCode = useSelector((state) => state.statusCode);
  statusText = useSelector((state) => state.statusText);
  msg1 = useSelector((state) => state.message1);
  msg2 = useSelector((state) => state.message2);

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
    errors: {}
  };

  const [data, setData] = React.useState(initialState);

  const handleDataChange = (e) => {
    let newState = {...data, [e.target.name]: e.target.value}
    setData(newState);
    // setData(prevState => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value
    // }))
    let dataErrors = validateData({ ...data, [e.target.name]: e.target.value })
    setData(prevState => ({
      ...prevState,
      errors: dataErrors
    }))
  };

  const handleDataGenre = (e) => {
    e.preventDefault()
    let genresList = data.genres.filter(genre => genre.name === e.target.value)
    if (genresList.length === 0) {
      let newState = {...data, genres: [...data.genres, { name: e.target.value }]}
      setData(newState);
      // setData(prevState => ({
      //   ...prevState,
      //   genres: [...data.genres, { name: e.target.value }]
      // }))
    }
  };

  const handleDataPlatform = (e) => {
    e.preventDefault()
    let platformList = data.platforms.filter(platform => platform.name === e.target.value)
    if (platformList.length === 0) {
      let newState = {...data, platforms: [...data.platforms, { name: e.target.value }]}
      setData(newState);
      // setData(prevState => ({
      //   ...prevState,
      //   platforms: [...data.platforms, { name: e.target.value }]
      // }))
    }
    let dataErrors = validateData({ ...data, platforms: [...data.platforms, { name: e.target.value }] })
    setData(prevState => ({
      ...prevState,
      errors: dataErrors
    }))
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('dataSubmited',data)
    let dataErrors = validateData(data)
    console.log('dataErrors', dataErrors)
    setData(prevState => ({
      ...prevState,
      errors: dataErrors
    }))
    console.log('datavalidada',data)
    if (Object.keys(dataErrors).length === 0) {
      console.log('entre al dispatch')
      dispatch(actions.createVideoGame(data))
      if ( statusCode < 300 ) {
        setData(initialState)
      }
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

  const closePopup = (e) => {
    e.preventDefault();
    dispatch(actions.setPopupStatus({status: 0, statusText:'', message1:'', message2:''}));
  }

  return (
    <div className={s.container}>
      {
        (statusCode > 0) && (
          <div className={s.popup}>
            <h2>{msg1}</h2>
            <h3>{msg2}</h3>
            <button className={s.btns1} onClick={e=> closePopup(e)}>Aceptar</button>
          </div>
        )
      }
      <h1 className={s.title}>Informacion del Video Juego</h1>
      <form className={s.form} onSubmit={e => handleSubmit(e)}>
        <div className={s.inputBox}>
          <div><label htmlFor="name">Nombre:</label></div>
          <div>
            <input className={s.names} type="text" value={data.name} name='name' onChange={e => handleDataChange(e)} />
          </div>
        </div>
        {data.errors.name && (<p className={s.danger}>{data.errors.name}</p>)}
        <div className={s.inputBox}>
          <div><label htmlFor="released">Fecha de lanzamiento:</label></div>
          <div>
            <input className={s.released} type="date" value={data.released} name='released' onChange={e => handleDataChange(e)} />
          </div>
        </div>
        <div className={s.inputBox}>
          <div><label htmlFor="description">Descripcion:</label></div>
          <div>
            <textarea className={s.description} type="text" rows="10" cols="40" value={data.description} name='description' onChange={e => handleDataChange(e)}></textarea>
          </div>
        </div>
        {data.errors.description && (<p className={s.danger}>{data.errors.description}</p>)}
        <div className={s.inputBox}>
          <div><label htmlFor="rating">Rating:</label></div>
          <div>
            <input className={s.num} type="number" value={data.rating} name='rating' onChange={e => handleDataChange(e)} />
          </div>  
        </div>
        {data.errors.rating && (<p className={s.danger}>{data.errors.rating}</p>)}
        <div className={s.inputBox}>
          <div><label htmlFor="background_image">Imagen Principal:</label></div>
          <div>
            <input className={s.urlimage} type="text" value={data.background_image} name='background_image' onChange={e => handleDataChange(e)} />
          </div>
        </div>

        <div className={s.tabla}>
          <div className={s.tabla}>
            <div>
              <label htmlFor="">Generos: </label>
              <select name="genres" onChange={e => handleDataGenre(e)} placeholder="Seleccionar...">
                <option value="" disabled selected>Seleccionar...</option>
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
                <option value="" disabled selected>Seleccionar...</option>
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
            {data.errors.platforms && (<p className={s.danger}>{data.errors.platforms}</p>)}
          </div>    
        </div>
        
        <button className={s.btns1} type="submit"
          disabled={data.errors.name || data.errors.description || 
            data.errors.rating || data.errors.platforms ? true
            : false} >Crear Video Juego
        </button>
      </form>
      <div >
        <Link to='/Home'><button className={s.btns1}>Ir Atras</button></Link>
      </div>
    </div>

  )

}