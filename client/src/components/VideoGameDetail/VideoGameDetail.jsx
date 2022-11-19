import React, { Component } from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions";
import s from './VideoGameDetail.module.css';


export default function GameDetail({match}) {

const dispatch = useDispatch();
let idGame = match.params.idVideoGame;
React.useEffect( ()=>  {dispatch(actions.getVideoGameDetail(idGame))}, [dispatch, idGame]);

let gameDetail = useSelector((state) => state.videoGameDetail);

console.log('gameDetail', gameDetail);

return (
    <div className={s.container}>

      <div className={s.section1}>
        <div className={s.mainData}>
          <h2>{gameDetail.name}</h2>
          <h3>Fecha de lanzamiento:</h3>
          <p>{gameDetail.released}</p>
          <h3>Rating:</h3>
          <p>{gameDetail.rating}</p>
        </div>
        <div>
          <img className={s.image} src={gameDetail.background_image} alt={gameDetail.name}/>
        </div>
      </div>

      <div className={s.section2}>
        <h3>Descripcion:</h3>
        <p>{gameDetail.description}</p>
      </div>
      
      <div className={s.section3}>
        <div>
          <h3>Generos:</h3>
          <ul>
            {
              gameDetail.genres && 
              gameDetail.genres.map( genre => { 
                return <p key={genre.id}>{genre.name}</p>})
            }
          </ul>
        </div>

        <div>
          <h3>Plataformas:</h3>
          <ul>
            {
              gameDetail.platforms && 
              gameDetail.platforms.map( platform =>  
                gameDetail.createdInDb 
                ? <p key={platform.id}>{platform.name}</p>
                : <p key={platform.platform.id}>{platform.platform.name}</p>
              )
            }
          </ul>
        </div>
      </div>

      <div>
        <Link to={'/home'}>
          <button className={s.btns1}>Regresar</button>
        </Link>
      </div>
    </div>
  )

};


// class GameDetail extends Component {

//   componentDidMount() {
//     const gameId = this.props.match.params.idVideoGame;
//     this.props.getVideoGameDetail(gameId);
//     console.log(this.props)
//   }


//   render() {
//     { console.log(this.props) }
//     return (
//       <div className={s.container}>

//         <div className={s.section1}>
//           <div className={s.mainData}>
//             <h2>{this.props.gameDetail.name}</h2>
//             <h3>Fecha de lanzamiento:</h3>
//             <p>{this.props.gameDetail.released}</p>
//             <h3>Rating:</h3>
//             <p>{this.props.gameDetail.rating}</p>
//           </div>
//           <div>
//             <img className={s.image} src={this.props.gameDetail.background_image} alt=""/>
//           </div>
//         </div>

//         <div className={s.section2}>
//           <h3>Descripcion:</h3>
//           <p>{this.props.gameDetail.description}</p>
//         </div>
        
//         <div className={s.section3}>
//           <div>
//             <h3>Generos:</h3>
//             <ul>
//               {
//                 this.props.gameDetail.genres && 
//                 this.props.gameDetail.genres.map( genre => { 
//                   return <p key={genre.id}>{genre.name}</p>})
//               }
//             </ul>
//           </div>

//           <div>
//             <h3>Plataformas:</h3>
//             <ul>
//               {
//                 this.props.gameDetail.platforms && 
//                 this.props.gameDetail.platforms.map( platform =>  
//                   this.props.gameDetail.createdInDb 
//                   ? <p key={platform.id}>{platform.name}</p>
//                   : <p key={platform.platform.id}>{platform.platform.name}</p>
//                 )
//               }
//             </ul>
//           </div>
//         </div>

//         <div>
//           <Link to={'/home'}>
//             <button className={s.btns1}>Regresar</button>
//           </Link>
//         </div>
//       </div>
    
//     )
//   }

// };

// export const mapStateToProps = (state) => {
//    return {
//     gameDetail: state.videoGameDetail
//    } 
// }

// export const mapDispatchToProps = (dispatch) => {
//   return {
//     getVideoGameDetail: (gameId) => dispatch(getVideoGameDetail(gameId))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);