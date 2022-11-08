import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideoGame } from '../../redux/actions'
import './Search.css';


export default function SearchBar() {

  const dispatch = useDispatch();
  const [nameGame, setNameGame] = useState('');


  const handleOnChange = (e) => {
    e.preventDefault();
    setNameGame(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVideoGame(nameGame));
    setNameGame('');
  }

  return (
    <div className="search">
      <form onSubmit={e => handleSubmit(e)}>
        <input className="input" type="text" placeholder="Busca un video juego...." value={nameGame}
          onChange={e => handleOnChange(e)} />
        <input className="btns" type="submit" value='Buscar' />
      </form>
    </div>

  )

  
}

