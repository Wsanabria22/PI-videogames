import "./LandingPage.css";
import React from "react";
import { Link } from 'react-router-dom';
import mainImage from '../../images/VideoGames.jpg';


export default function LandingPage() {
  return (
    <div className="container">
      <img src={mainImage} alt="Video Games" />
      <h1>Video Games Information Center</h1>
      <Link to={'/home'}>
        <button>INGRESAR</button>
      </Link>
    </div>
  )
};



