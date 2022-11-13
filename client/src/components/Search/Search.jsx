import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideoGame } from '../../redux/actions'
import s from './Search.module.css';


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
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input className={s.name} type="text" placeholder="Busca un video juego...." value={nameGame}
          onChange={e => handleOnChange(e)} />
        <input className={s.btns2} type="submit" value='Buscar' />
      </form>
    </div>

  )

  
}

