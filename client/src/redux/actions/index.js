import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEGAME';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const SEARCH_VIDEO_GAME = 'SEARCH_VIDEO_GAME';

export const getViedoGames = () => (dispatch) => {
  return axios.get('http://localhost:3001/videogames')
  .then( json => {
    // console.log(json)
    (dispatch({type: GET_VIDEOGAMES, payload: json.data}))
  })
  .catch( error => console.log(error))
};

export const getGenres = () => (dispatch) => {
  return fetch('http://localhost:3001/genres')
  .then( response => response.json() )
  .then( json => dispatch({type: GET_GENRES, payload: json }) )
  .catch( error => console.log(error) )
};

export const filterByGenre = (genre) => {
  console.log('actions',genre)
  return { type: FILTER_BY_GENRE, payload: genre }
};

export const filterByOrigin = (origin) => {
  return { type: FILTER_BY_ORIGIN, payload: origin }
};

export const sortByName = (mode) => {
  return { type: SORT_BY_NAME, payload: mode }
};

export const sortByRating = (mode) => {
  return { type: SORT_BY_RATING, payload: mode }
};

export const searchVideoGame = (nameGame) => {
  return { type: SEARCH_VIDEO_GAME, payload: nameGame }
};
