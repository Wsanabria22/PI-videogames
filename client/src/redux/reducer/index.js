import { GET_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, CREATE_VIDEOGAME, GET_PLAFORMS,
        FILTER_BY_ORIGIN, SORT_BY_NAME, SORT_BY_RATING, SEARCH_VIDEO_GAME, GET_VIDEOGAME_DETAIL } from '../actions/index';

const initialState = {
    videoGames: [],
    allVideoGames: [],
    videoGameDetail: {},
    genres: [],
    platforms: []
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
      const genres = action.payload.map( genre => genre.name )
      return {
        ...state,
        genres: genres,
      }
    case GET_PLAFORMS: 
      const platforms = action.payload.map( platform => platform.name )
      return {
        ...state,
        platforms: platforms,
      }
    case FILTER_BY_GENRE:
      const allGames = state.allVideoGames;
      const gamesFilter = action.payload === 'All genres' ? allGames :
        allGames.filter( 
          game => { 
            const gameGenres = game.genres.map( genre => genre.name );
            return gameGenres.includes(action.payload)
          }
        )
      console.log('gameFilter', gamesFilter)
      return {
        ...state,
        videoGames: gamesFilter,
      }
    case FILTER_BY_ORIGIN:
      console.log('reducer', action.payload)
      const originFilter = action.payload === 'created' ? 
        state.allVideoGames.filter( game => game.createdInDb) :
        state.allVideoGames.filter( game => !game.createdInDb);
      return {
        ...state,
        videoGames: action.payload === 'All origin' ? state.allVideoGames : originFilter
      }
    case SORT_BY_NAME:
      let sortByName = action.payload === 'asc' ?
      state.videoGames.sort(function compare(a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }) : 
      state.videoGames.sort(function compare(a, b) {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
      });
      return {
        ...state,
        videoGames: action.payload === 'none' ? state.allVideoGames : sortByName
      }
    case SORT_BY_RATING:
      let sortByRating = action.payload === 'asc' ?
      state.videoGames.sort(function compare(a, b) {return a.rating - b.rating}) :
      state.videoGames.sort(function compare(a, b) {return b.rating - a.rating});
      return {
        ...state,
        videoGames: action.payload === 'none' ? state.allVideoGames : sortByRating
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
    default:
      return state;
  }

};

export default rootReducer;
