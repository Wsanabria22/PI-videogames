const orderVideoGames = (originFilter, genreFilter, sortName, sortRating, videoGames) => {
  console.log('originFilter',originFilter)
  console.log('genreFilter',genreFilter)
  console.log('sortName',sortName)
  console.log('sortRating',sortRating)
  let videoGamesOrdered = videoGames;
  if ( originFilter !== 'All' ) {
    let arrayFiltered = 
      originFilter === 'created' ? 
        videoGamesOrdered.filter( game => game.createdInDb) :
        videoGamesOrdered.filter( game => !game.createdInDb);
    videoGamesOrdered = arrayFiltered;    
  };
  if ( genreFilter !== 'Todos' ) {
    let arrayFiltered = 
    videoGamesOrdered.filter( game => { 
        const gameGenres = game.genres.map( genre => genre.name );
        return gameGenres.includes(genreFilter)
      }
    )
    videoGamesOrdered = arrayFiltered;
  }
  if ( sortName !== 'none' ) {
    let arrayOrdered;
    switch (sortName) {
      case 'asc':
        arrayOrdered = videoGamesOrdered.sort(function compare(a, b) {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        }) 
        break;
      case 'desc':
        arrayOrdered = videoGamesOrdered.sort(function compare(a, b) {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          return 0
        });
        break;
     default:
        break;
    }
    videoGamesOrdered = arrayOrdered
  }
  if ( sortRating !== 'none' ) { 
    let arrayOrdered = sortRating === 'asc' ?
    videoGamesOrdered.sort(function compare(a, b) {return a.rating - b.rating}) :
    videoGamesOrdered.sort(function compare(a, b) {return b.rating - a.rating});
    videoGamesOrdered = arrayOrdered;
  }  
  return(videoGamesOrdered);
};

  export default orderVideoGames;