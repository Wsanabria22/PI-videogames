import { GET_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, CREATE_VIDEOGAME, GET_PLAFORMS,
        FILTER_BY_ORIGIN, SORT_BY_NAME, SORT_BY_RATING, SEARCH_VIDEO_GAME, 
        GET_VIDEOGAME_DETAIL, SEND_CREATESTATUS, SET_POPUPSTATUS, CLEAR_VIDEOGAME_DETAIL, 
        UPDATE_VIDEOGAME, SEND_UPDATESTATUS } from '../actions/index';

const initialState = {
    videoGames: [],
    allVideoGames: [],
    videoGameDetail: {},
    genres: [],
    platforms: [],
    originFilter: 'All',
    genreFilter: 'Todos',
    sortByName: 'none',
    sortByRating: 'none',
    statusCode: 0,
    statusText: '',
    message1: '',
    message2: '',
};

const rootReducer = (state = initialState, action ) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
        allVideoGames: action.payload
      }
    case CREATE_VIDEOGAME:
      return {
        ...state,
      }
    case GET_GENRES:
      const genres = action.payload.map( genre => ({id: genre.id, name: genre.name}))
      return {
        ...state,
        genres: genres,
      }
    case GET_PLAFORMS: 
      const platforms = action.payload.map( platform => ({id: platform.id , name: platform.name}) )
      return {
        ...state,
        platforms: platforms,
      }
    case FILTER_BY_GENRE:
      console.log('By genre')
      return {
        ...state,
        // videoGames: gamesFilter,
        genreFilter: action.payload
      }
    case FILTER_BY_ORIGIN:
      console.log('By origin')
      return {
        ...state,
        // videoGames: action.payload === 'All' ? state.allVideoGames : originFilter,
        originFilter: action.payload
      }
    case SORT_BY_NAME:
      console.log('By name')
      return {
        ...state,
        // videoGames: state.allVideoGames,
        sortByName: action.payload,
        sortByRating: 'none',
      }
    case SORT_BY_RATING:
      console.log('By rating')
      return {
        ...state,
        videoGames: state.allVideoGames,
        sortByRating: action.payload,
        sortByName: 'none',
      }
    case SEARCH_VIDEO_GAME:
      let videoGameList = state.allVideoGames.filter(game => {
         let nameGame = game.name.toLowerCase()
         return nameGame.includes(action.payload.toLowerCase()) 
        })
      return {
        ...state,
        videoGames: videoGameList
      }
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videoGameDetail: action.payload
      }
    case SEND_CREATESTATUS:
      return {
        ...state,
        statusCode: action.payload.status,
        statusText: action.payload.text,
        message1: 
          action.payload.status === 200 ?
          'Video Juego Creado Satisfactoriamente' :
          'ERROR: Video Juego No Creado',
        message2: 'Status Code: ' + action.payload.status + ': ' + action.payload.text
      }
    case SET_POPUPSTATUS:
      return {
        ...state,
        statusCode: action.payload.status,
        statusText: action.payload.statusText,
        message1: action.payload.message1,
        message2: action.payload.message2
      }
    case CLEAR_VIDEOGAME_DETAIL:
      return {
        ...state, videoGameDetail: action.payload
      }
    case UPDATE_VIDEOGAME:
      return {
        ...state,
      }
    case SEND_UPDATESTATUS:
      return {
        ...state,
        statusCode: action.payload.status,
        statusText: action.payload.text,
        message1: 
          action.payload.status === 200 ?
          'Video Juego Actualizado Satisfactoriamente' :
          'ERROR: Video Juego No Actualizado',
        message2: 'Status Code: ' + action.payload.status + ': ' + action.payload.text
      }
    default:
      return state;
  }

};

export default rootReducer;
