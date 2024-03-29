import s from './App.module.css';
import{ Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import { CreateVideoGame } from './components/CreateVideoGame/CreateVideoGame';
import GameDetail from './components/VideoGameDetail/VideoGameDetail';
import UpdateVideoGame from './components/UpdateVideoGame/UpdateVideoGame';


function App() {
  return (
    <div className={s.App}>
      <Route exact path={'/'} component={LandingPage}/>
      <Route exact path={'/home'} component={Home}/>
      <Route exact path={'/createvideogame'} component={CreateVideoGame}/>
      {/* <Route path={'/videogamedetail/:idVideoGame'} 
        render={({match}) => <GameDetail idVideoGame={match.params.idVideoGame} />
      }/> */}
      <Route path={'/videogamedetail/:idVideoGame'} component={GameDetail} />
      <Route path={'/updatevideogame/:idVideoGame'} component={UpdateVideoGame} />
    </div>
  );
}

export default App;
