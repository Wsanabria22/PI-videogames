import React, { Component } from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getViedoGames, getGenres, filterByGenre, filterByOrigin, 
  sortByName, sortByRating, clearVideoGameDetail } from "../../redux/actions";
import VideoGame  from '../VideoGames/VideoGames';
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Search/Search";
import { Link } from 'react-router-dom';
import orderVideoGames from './HomeUtils';
import s from './Home.module.css';


export default function Home() {

  const dispatch = useDispatch();
  let videoGames = useSelector((state) => state.videoGames);
  let genres = useSelector((state) => state.genres);
  let originFilter = useSelector((state) => state.originFilter);
  let genreFilter = useSelector((state) => state.genreFilter);
  let sortName = useSelector((state) => state.sortByName);
  let sortRating = useSelector((state) => state.sortByRating);

  let gamesOrdered = orderVideoGames(originFilter, genreFilter, sortName, sortRating, videoGames);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  let indexlastGame = page * pageSize;
  let indexFirstGame = indexlastGame- pageSize;
  let currentGames = gamesOrdered.slice(indexFirstGame, indexlastGame);

 
  // let allGenres = genres ? ['Todos'].concat(genres) : null;

  useEffect(
    ()=> { 
      dispatch(getViedoGames());
      dispatch(getGenres());
      dispatch(clearVideoGameDetail());
    }
    ,[dispatch]
  );

  const pagination = (pageNumber)=>{setPage(pageNumber)};
  
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
  };

  const handleSortByRating = (e) => {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    pagination(1);
  };


  return (
    <div className={s.container}>
      <div className={s.header}>
        <Link to={'/createvideogame'}> 
          <button className={s.btns}>Crear Video Juego</button> 
        </Link>
          <button className={s.btns} onClick={e => handleGetGames(e)}>Cargar Video Juegos</button>
        <SearchBar/>
      </div>

      <div className={s.filtros}>
        <label htmlFor="">Orden por Nombre: </label>
        <select value={sortName} onChange={e => handleSortByName(e)}>
          <option value="none">Ninguno</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <label htmlFor="">Orden por Rating: </label>
        <select value={sortRating} onChange={e => handleSortByRating(e)}>
          <option value="none">Ninguno</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <label htmlFor="">Origen: </label>
        <select value={originFilter} onChange={e => handleFilterOrigin(e)}>
          <option value="All">Todos</option>
          <option value="api">Api</option>
          <option value="created">Creado</option>
        </select>
        <label htmlFor="">Genero: </label>
        <select value={genreFilter} onChange={e => handleFilterGenre(e)}>
          <option value="Todos" selected>Todos</option>
          { genres?.map( (genre, index) => <option 
            key={index}
            value={genre.name}>{genre.name}</option> ) }
        </select>
      </div>
      
      <Pagination pageSize={pageSize} totalVideoGames={gamesOrdered.length} 
        page={page} pagination={pagination}/>
      
      <div className={s.gameCards}>
        { 
          currentGames?.map( (game, index) => 
              <Link to={'/videogamedetail/'+game.id}>
                <VideoGame key={index} image={game.background_image} name={game.name} rating={game.rating} genres={game.genres} id={game.id} /> 
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