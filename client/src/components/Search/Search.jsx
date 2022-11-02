import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideoGame } from '../../redux/actions'

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
        <input type="text" placeholder="Video game name...." value={nameGame}
          onChange={e => handleOnChange(e)} />
        <input type="submit" value='Search' />
      </form>
    </div>

  )

  
}

