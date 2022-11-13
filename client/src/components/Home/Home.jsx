import React, { Component } from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getViedoGames, getGenres, filterByGenre, filterByOrigin, 
  sortByName, sortByRating } from "../../redux/actions";
import VideoGame  from '../VideoGames/VideoGames';
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Search/Search";
import { Link } from 'react-router-dom';
import s from './Home.module.css';


export default function Home() {

  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);
  const genres = useSelector((state) => state.genres);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [order, setOrder] = useState('');
  let indexlastGame = page * pageSize;
  let indexFirstGame = indexlastGame- pageSize;
  let currentGames = allVideoGames.slice(indexFirstGame, indexlastGame);

  const pagination = (pageNumber)=>{setPage(pageNumber)};
  let allGenres = genres ? ['All genres'].concat(genres) : null;

  useEffect(
    ()=> { 
      dispatch(getViedoGames());
      dispatch(getGenres());
    }
    ,[dispatch]
  );
  
  console.log('home', currentGames);

  const handleGetGames = (e) => {
    e.preventDefault();
    dispatch(getViedoGames());
  }

  const handleFilterGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    pagination(1);
  };

  const handleFilterOrigin = (e) => {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    pagination(1);
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    pagination(1);
    setOrder(`By Name ${e.target.value}`);
  };

  const handleSortByRating = (e) => {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    pagination(1);
    setOrder(`By Rating ${e.target.value}`);
  };


  return (
    <div>
      <div className={s.header}>
        <Link to={'/createvideogame'}> 
          <button className={s.btns}>Crear Video Juego</button> 
        </Link>
          <button className={s.btns} onClick={e => handleGetGames(e)}>Cargar Video Juegos</button>
        <SearchBar/>
      </div>

      <div className={s.filtros}>
        <label htmlFor="">Ordenar por Nombre: </label>
        <select onClick={e => handleSortByName(e)}>
          <option value="none">None</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <label htmlFor="">Ordenar por Rating: </label>
        <select onClick={e => handleSortByRating(e)}>
          <option value="none">None</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <label htmlFor="">Filtro por Origen: </label>
        <select onClick={e => handleFilterOrigin(e)}>
          <option value="All origin">All origin</option>
          <option value="api">Api</option>
          <option value="created">Created</option>
        </select>
        <label htmlFor="">Filtro por Genero: </label>
        <select onChange={e => handleFilterGenre(e)}>
          { allGenres?.map( (genre, index) => <option key={index}>{genre}</option> ) }
        </select>
      </div>
      
      <Pagination pageSize={pageSize} totalVideoGames={allVideoGames.length} pagination={pagination}/>
      
      <div className={s.gameCards}>
        { 
          currentGames?.map( (game, index) => 
              <Link to={'/videogamedetail/'+game.id}>
                <VideoGame key={index} image={game.background_image} name={game.name} rating={game.rating} genres={game.genres}/> 
              </Link>
          )
        }
      </div>

    </div>

  )

};


// export class Home extends Component {

//   componentDidMount(){
//     this.props.getViedoGames();
//   }

//   handleClickList(e){
//       e.preventDefault();
//       this.props.getViedoGames();
//   }

//   render() {
//     return (
//       <div>
//         <Link to={'/CreateVideoGame'}>Create VideoGame</Link>
//         <h1>Video Games List</h1>
//         <button onClick={e => this.handleClickList(e)}>load List</button>
//         <div>
//           <select>
//             <option value="asc">Ascendent</option>
//             <option value="desc">Descendent</option>
//           </select>
//           <select>
//             <option value="all">All</option>
//             <option value="api">API</option>
//             <option value="created">Created</option>
//           </select>
//           <p>{this.props.allVideoGames.length}</p>
//           { 
//             this.props.allVideoGames && 
//             this.props.allVideoGames.map( (game,index) => 
//               <div key={index}>
//                 <VideoGame image={game.background_image} name={game.name} genre={game.genres}/> 
//               </div>
//             )
//           }
//         </div>
  
//       </div>
  
//     )
//   }

// }

// export const mapStateToProps = (state) => {
//   return {
//     allVideoGames: state.videoGames
//   }
//  }

//  export const mapDispatchToProps = (dispatch) => { 
//   return {
//     getViedoGames: ()=> dispatch(getViedoGames())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);