import './App.css';
import{ Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component={LandingPage}/>
      <Route exact path={'/home'} component={Home}/>
    </div>
  );
}

export default App;
