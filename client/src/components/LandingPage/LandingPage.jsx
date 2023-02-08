import React from "react";
import { Link } from 'react-router-dom';
import mainImage from '../../images/VideoGames2.jpg';
import s from "./LandingPage.module.css";


export default function LandingPage() {
  return (
    <div className={s.container}>
      <h1>Informacion de Video Juegos</h1>
      <Link to={'/home'}>
        <button className={s.btns3}>INGRESAR</button>
      </Link>
      <img className={s.img} alt="Video Games" />
    </div>
  )
};



