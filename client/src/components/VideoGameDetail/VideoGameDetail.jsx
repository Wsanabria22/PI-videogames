import React, { Component } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVideoGameDetail } from "../../redux/actions";


// export const VideoGameDetail = ({idVideoGame}) => {

// console.log('idvideogame', idVideoGame)

// const dispatch = useDispatch();


// useEffect( ()=>  {
//   dispatch(getVideoGameDetail(idVideoGame))
// }, [dispatch, idVideoGame]) 

// let gameDetail = useSelector((state) => state.videoGameDetail);

// console.log(gameDetail.genres)

// let gameGenres = '';
// gameDetail.genres.forEach( genre => gameGenres =  gameGenres + `- ${genre.name} `)

// // let gamePlatforms = '';
// // gameDetail.gamePlatforms.forEach( platform => gamePlatforms += '- ' + platform.platform.name)

// return (
//   <div>
//     <h2>{gameDetail.name}</h2>
//     <img src={gameDetail.background_image} alt="" width='300px' height='300px' />
//     <h3>Descripcion</h3>
//     <p>{gameDetail.description}</p>
//     <h3>Fecha de lanzamiento:</h3>
//     <p>{gameDetail.released}</p>
//     <h3>Generos:</h3>

//     <div>
//     <h3>Generos:</h3>
//     <ul>
//       {
//         gameDetail.genres && 
//         gameDetail.genres.map( genre => { 
//           return <p key={genre.id}>{genre.name}</p>
//         })
//       }
//     </ul>
//     </div> 

//     <div>
//       <h3>Plataformas:</h3>
//       <ul>
//         {
//           gameDetail.platforms &&
//           gameDetail.platforms.map( platform => { 
//             return <li key={platform.platform.id}>{platform.platform.name}</li>
//           } )
//         }
//       </ul> 
//     </div>

//     <div>
//       <Link to={'/home'}>
//         <button>Regresar</button>
//       </Link>
//     </div>
//   </div>

// )

// };


class GameDetail extends Component {

  componentDidMount() {
    const gameId = this.props.match.params.idVideoGame;
    this.props.getVideoGameDetail(gameId);
    console.log(this.props)
  }


  render() {
    { console.log(this.props) }
    return (
      <div>
        <h2>{this.props.gameDetail.name}</h2>
        <img src={this.props.gameDetail.background_image} alt="" width='300px' height='300px' />
        <h3>Descripcion:</h3>
        <p>{this.props.gameDetail.description}</p>
        <h3>Fecha de lanzamiento:</h3>
        <p>{this.props.gameDetail.released}</p>
        <h3>Rating:</h3>
        <p>{this.props.gameDetail.rating}</p>
        
        <div>
          <h3>Generos:</h3>
          <ul>
            {
              this.props.gameDetail.genres && 
              this.props.gameDetail.genres.map( genre => { 
                return <p key={genre.id}>{genre.name}</p>
              })
            }
          </ul>
        </div>

        <div>
          <h3>Plataformas:</h3>
          <ul>
            {
              this.props.gameDetail.platforms && 
              this.props.gameDetail.platforms.map( platform =>  
                 this.props.gameDetail.createdInDb ? <p key={platform.id}>{platform.name}</p>
                 : <p key={platform.platform.id}>{platform.platform.name}</p>
               )
            }
          </ul>
        </div>
        <div>
          <Link to={'/home'}>
            <button>Regresar</button>
          </Link>
        </div>
      </div>
    
    )
  }

};

export const mapStateToProps = (state) => {
   return {
    gameDetail: state.videoGameDetail
   } 
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getVideoGameDetail: (gameId) => dispatch(getVideoGameDetail(gameId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);