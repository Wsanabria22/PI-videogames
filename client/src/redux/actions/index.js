// import axios from 'axios'

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEGAME';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const SEARCH_VIDEO_GAME = 'SEARCH_VIDEO_GAME';
export const GET_PLAFORMS = 'GET_PLAFORMS';
export const SEND_CREATESTATUS = 'SEND_CREATESTATUS';
export const SET_POPUPSTATUS = 'SET_POPUPSTATUS';
export const CLEAR_VIDEOGAME_DETAIL = 'CLEAR_VIDEOGAME_DETAIL';
export const UPDATE_VIDEOGAME = 'UPDATE_VIDEOGAME';
export const SEND_UPDATESTATUS = 'SEND_UPDATESTATUS';


// export const getViedoGames = () => (dispatch) => {
//   return axios.get('http://localhost:3001/videogames')
//   .then( json => {
//     // console.log(json)
//     (dispatch({type: GET_VIDEOGAMES, payload: json.data}))
//   })
//   .catch( error => console.log(error))
// };

export const getViedoGames = () => (dispatch) => {
  return fetch('http://localhost:3001/videogames')
  .then( response => response.json() )
  .then( json => {
    // console.log(json)
    (dispatch({type: GET_VIDEOGAMES, payload: json}))
  })
  .catch( error => console.log(error))
};

export const getGenres = () => (dispatch) => {
  return fetch('http://localhost:3001/genres')
  .then( response => response.json() )
  .then( json => dispatch({type: GET_GENRES, payload: json }) )
  .catch( error => console.log(error) )
};

export const getPlatforms = () => (dispatch) => {
  return fetch('http://localhost:3001/platforms')
  .then( response => response.json() )
  .then( json => dispatch({ type: GET_PLAFORMS, payload: json}))
  .catch( error => console.log(error))
};

// export const createVideoGame = (dataVideoGame)=> () => {
//   axios.post('http://localhost:3001/videogames',dataVideoGame)
//   .then( json => {
//     console.log(json)
//     return json
//     // dispatch({ type: CREATE_VIDEOGAME, payload: dataVideoGame })
//   })
//   .catch( error => console.log(error))
// };

export const createVideoGame = (dataVideoGame)=> (dispatch) => {
  return fetch('http://localhost:3001/videogames',
  { method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(dataVideoGame)})
  .then( response => { 
    console.log('Status code:',response.status)
    console.log('Status Text:',response.statusText) 
    let result = {status: response.status, text:response.statusText}
    dispatch({type: SEND_CREATESTATUS, payload: result})
  })
  .catch( error => { 
    console.error(error)
  })
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

// export const getVideoGameDetail = (idVideoGame) => (dispatch) => {
//   console.log('id',idVideoGame,'http://localhost:3001/videogame/' + idVideoGame)
//   axios.get('http://localhost:3001/videogame/' + idVideoGame)
//   .then( json =>{
//     console.log('json', json.data)
//     dispatch({ type: GET_VIDEOGAME_DETAIL, payload: json.data} )
//   })
// }

export const getVideoGameDetail = (idVideoGame) => (dispatch) => {
  console.log('id',idVideoGame,'http://localhost:3001/videogame/' + idVideoGame)
  fetch('http://localhost:3001/videogame/' + idVideoGame)
  .then( response => response.json() )
  .then( json =>{
    console.log('json', json)
    dispatch({ type: GET_VIDEOGAME_DETAIL, payload: json} )
  })
  .catch( error => { 
    console.error(error)
  })
};

export const setPopupStatus = (status) => {
  return { type: SET_POPUPSTATUS, payload: status }
};

export const clearVideoGameDetail = () => {
  return { type: CLEAR_VIDEOGAME_DETAIL, payload: {} }
};

export const updateVideoGame = (dataVideoGame)=> (dispatch) => {
  return fetch('http://localhost:3001/updatevideogame',
  { method: 'PUT', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(dataVideoGame)})
  .then( response => { 
    console.log('Status code:',response.status)
    console.log('Status Text:',response.statusText) 
    let result = {status: response.status, text:response.statusText}
    dispatch({type: SEND_UPDATESTATUS, payload: result})
  })
  .catch( error => { 
    console.error(error)
  })
};
