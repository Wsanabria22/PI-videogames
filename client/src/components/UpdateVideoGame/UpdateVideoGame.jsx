import React from 'react';
import {useState} from 'react';
import { useDispatch, useSelector, connect } from "react-redux";
import * as actions from '../../redux/actions';
import { Link } from 'react-router-dom';
import validateData from '../CreateVideoGame/ValidateDataVideogame'
import s from './UpdateVideoGame.module.css';
import { compose } from 'redux';


// class UpdateVideoGame extends React.Component {
//   constructor(props) {
//     super(props);
//     this.initialState = {
//       name: '',
//       released: '',
//       description: '',
//       rating: 0,
//       genres: [],
//       background_image: '',
//       platforms: [],
//       showPopup: false,
//       message1: '',
//       message2: '',
//       errors: {}
//     };
//     this.state = this.initialState;
//     console.log('constructor')
//     // this.handleDataChange = this.handleDataChange.bind(this);
//     // this.handleDataGenre = this.handleDataGenre.bind(this);
//     // this.handleDataPlatform = this.handleDataPlatform.bind(this);
//     // this.removeGenre = this.removeGenre.bind(this);
//     // this.removePlatform = this.removePlatform.bind(this);
//     // this.closePopup = this.closePopup.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
    
//   } 


//   async componentDidMount() {
//     const gameId = this.props.match.params.idVideoGame;
//     await this.props.getVideoGameDetail(gameId);
//     this.props.getGenres();
//     this.props.getPlatforms();
//     this.setState((prevState) => {
//       return this.props.videoGameDetail
//     })
//     console.log('didmount')
//     console.log('props',this.props)
//   } 

//   componentDidUpdate(prevProps, prevState) {
//     console.log('prevProps',prevProps);
//     console.log('prevState',prevState);
//     console.log(Object.keys(prevProps.videoGameDetail).length)
//     if( Object.keys(prevProps.videoGameDetail).length !== Object.keys(this.props.videoGameDetail).length ) {
//       console.log('Entre a actualizar stado')
//         // this.setState(prevState => ({
//         //   ...prevState, name: this.props.videoGameDetail.name, 
//         //   description: this.props.videoGameDetail.description,
//         //   rating: this.props.videoGameDetail.rating, 
//         //   background_image: this.props.videoGameDetail.background_image,
//         //   genres: this.props.videoGameDetail.genres, 
//         //   platforms: this.props.videoGameDetail.platforms 
//         // }))
//       this.setState((prevState) => {
//         return this.props.videoGameDetail
//       })
//     }
//   }


//   handleDataChange = (e) => {
//     e.preventDefault()
//     let newState = {...this.state, [e.target.name]: e.target.value}
//     this.setState(newState);
//     let dataErrors = validateData({ ...this.state, [e.target.name]: e.target.value })
//     this.setState({...this.state, errors: dataErrors})
//   };


//  handleDataGenre = (e) => {
//   e.preventDefault()
//   let genresList = this.state.genres.filter(genre => genre.name === e.target.value)
//   if (genresList.length === 0) {
//     let newState = {...this.state, genres: [...this.state.genres, { name: e.target.value }]}
//     this.setState(newState);
//   }
// };

// handleDataPlatform = (e) => {
//   e.preventDefault()
//   let platformList = this.state.platforms.filter(platform => platform.name === e.target.value)
//   if (platformList.length === 0) {
//     let newState = {...this.state, platforms: [...this.state.platforms, { name: e.target.value }]}
//     this.setState(newState);
//   }
//   let dataErrors = validateData({ ...this.state, platforms: [...this.state.platforms, { name: e.target.value }] })
//   this.setState({...this.state, errors: dataErrors})
// };

// removeGenre = (name, e) => {
//   e.preventDefault()
//   this.setState({...this.state, genres: this.state.genres.filter(genre => genre.name !== name)})
// };

// removePlatform = (name, e) => {
//   e.preventDefault()
//   this.setState({...this.state, platforms: this.state.platforms.filter(platform => platform.name !== name)})
// };

// closePopup = (e) => {
//   e.preventDefault();
//   this.props.setPopupStatus({status: 0, statusText:'', message1:'', message2:''});
// }

// handleSubmit = (e) => {
//   e.preventDefault()
//   console.log('dataSubmited',this.state)
//   let dataErrors = validateData(this.state)
//   console.log('dataErrors', dataErrors)
//   this.setState({...this.state, errors: dataErrors})
//   console.log('datavalidada',this.state)
//   if (Object.keys(dataErrors).length === 0) {
//     console.log('entre al dispatch', this.state)
//    this.props.updateVideoGame(this.state);
//     if ( this.statusCode < 300 ) {
//       this.setState(this.initialState)
//     }
//     // history.push('/Home')
//   }
// };

// render() {
//   console.log('render')
//   let { statusCode, message1, message2, genres, platforms } = this.props ;
//   return (
//     <div className={s.container}>
//       {
//         (statusCode > 0) && (
//           <div className={s.popup}>
//             <h2>{message1}</h2>
//             <h3>{message2}</h3>
//             <button className={s.btns1} onClick={e=> this.closePopup(e)}>Aceptar</button>
//           </div>
//         )
//       }
//       <h1 className={s.title}>Informacion del Video Juego</h1>
//       <form className={s.form} onSubmit={e => this.handleSubmit(e)}>
//         <div className={s.inputBox}>
//           <div><label htmlFor="name">Nombre:</label></div>
//           <div>
//             <input className={s.names} type="text" value={this.state.name} name='name' onChange={e => this.handleDataChange(e)} />
//           </div>
//         </div>
//         {this.state.errors.name && (<p className={s.danger}>{this.state.errors.name}</p>)}
//         <div className={s.inputBox}>
//           <div><label htmlFor="released">Fecha de lanzamiento:</label></div>
//           <div>
//             <input className={s.released} type="date" value={this.state.released} name='released' onChange={e => this.handleDataChange(e)} />
//           </div>
//         </div>
//         <div className={s.inputBox}>
//           <div><label htmlFor="description">Descripcion:</label></div>
//           <div>
//             <textarea className={s.description} type="text" rows="10" cols="40" value={this.state.description} name='description' onChange={e => this.handleDataChange(e)}></textarea>
//           </div>
//         </div>
//         {this.state.errors.description && (<p className={s.danger}>{this.state.errors.description}</p>)}
//         <div className={s.inputBox}>
//           <div><label htmlFor="rating">Rating:</label></div>
//           <div>
//             <input className={s.num} type="number" value={this.state.rating} name='rating' onChange={e => this.handleDataChange(e)} />
//           </div>  
//         </div>
//         {this.state.errors.rating && (<p className={s.danger}>{this.state.errors.rating}</p>)}
//         <div className={s.inputBox}>
//           <div><label htmlFor="background_image">Imagen Principal:</label></div>
//           <div>
//             <input className={s.urlimage} type="text" value={this.state.background_image} name='background_image' onChange={e => this.handleDataChange(e)} />
//           </div>
//         </div>
  
//         <div className={s.tabla}>
//           <div className={s.tabla}>
//             <div>
//               <label htmlFor="">Generos: </label>
//               <select name="genres" onChange={e => this.handleDataGenre(e)} placeholder="Seleccionar...">
//                 <option value="" disabled selected>Seleccionar...</option>
//                 {genres?.map((genre, index) => <option key={index}>{genre}</option>)}
//               </select>
//             </div>
//             <div>
//               <ul>
//                 {
//                   this.state.genres?.map((genre, index) => (
//                     <li className={s.genres} key={index}>
//                       {genre.name}
//                       <button className={s.btns2} onClick={(e) => this.removeGenre(genre.name, e)}>X</button>
//                     </li>
//                   ))
//                 }
//               </ul>
//             </div>
//           </div>
  
//           <div className={s.tabla}>
//             <div>
//               <label htmlFor="">Plataformas:</label>
//               <select name="platforms" onChange={e => this.handleDataPlatform(e)}>
//                 <option value="" disabled selected>Seleccionar...</option>
//                 {platforms?.map((platform, index) => <option key={index}>{platform}</option>)}
//               </select>
//             </div>
//             <div>
//               <ul>
//                 {
//                   this.state.platforms?.map((platform, index) => (
//                     <li className={s.platforms} key={index}>
//                       { this.state.createdInDb ? platform.name : platform.platform.name }
//                       <button className={s.btns2} onClick={(e) => this.removePlatform(platform.name, e)}>X</button>
//                     </li>
//                   ))
//                 }
//               </ul>
//             </div>
//             {this.state.errors.platforms && (<p className={s.danger}>{this.state.errors.platforms}</p>)}
//           </div>    
//         </div>
        
//         <button className={s.btns1} type="submit"
//           disabled={this.state.errors.name || this.state.errors.description || 
//             this.state.errors.rating || this.state.errors.platforms ? true
//             : false} >Actualizar Video Juego
//         </button>
//       </form>
//       <div >
//         <Link to='/Home'><button className={s.btns1}>Ir Atras</button></Link>
//       </div>
//     </div>
  
//   )  

// }


// }

// export const mapStateToProps = (state) => {
//    return {
//     videoGameDetail: state.videoGameDetail,
//     genres: state.genres,
//     platforms: state.platforms,
//     statusCode: state.statusCode,
//     statusText: state.statusText,
//     message1: state.message1,
//     message2: state.message2
//    } 
// }

// export const mapDispatchToProps = (dispatch) => {
//   return {
//     getVideoGameDetail: (gameId) => dispatch(actions.getVideoGameDetail(gameId)),
//     getGenres: () => dispatch(actions.getGenres()),
//     getPlatforms: () => dispatch(actions.getPlatforms()),
//     setPopupStatus: (data)=> dispatch(actions.setPopupStatus(data)),
//     updateVideoGame: (data)=> dispatch(actions.updateVideoGame(data))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UpdateVideoGame);


export default function UpdateVideoGame({match}) {
let statusCode, statusText, genres, platforms, message1, message2,dataVideoGame

const dispatch = useDispatch();
dataVideoGame = useSelector(state => state.videoGameDetail);
genres = useSelector(state => state.genres);
platforms = useSelector(state => state.platforms);
statusCode = useSelector(state => state.statusCode);
statusText = useSelector(state => state.statusText);
message1 = useSelector(state => state.message1);
message2 = useSelector(state => state.message2);

React.useEffect( ()=>{
  dispatch(actions.getVideoGameDetail(match.params.idVideoGame));
  dispatch(actions.getGenres());
  dispatch(actions.getPlatforms());
}, []);

React.useEffect( ()=>{
  updateState(dataVideoGame);
}, [dataVideoGame]);



const initialState = {
  id: '',
  name: '',
  released: '',
  description: '',
  rating: 0,
  genres: [],
  background_image: '',
  platforms: [],
  showPopup: false,
  message1: '',
  message2: '',
  errors: {}
};
const [data, setData] = useState(initialState);

console.log('dataVGame', dataVideoGame);
console.log('data', data);



const updateState = (dataVideoGame) => {
  setData(prevState => ({
    ...prevState, id:dataVideoGame.id, name: dataVideoGame.name, 
      description: dataVideoGame.description, rating: dataVideoGame.rating, 
      background_image: dataVideoGame.background_image,
      released: dataVideoGame.released, 
      genres: dataVideoGame.genres, platforms: dataVideoGame.platforms 
  }))
  console.log('dataGame==>',data)
}


  const handleDataChange = (e) => {
  e.preventDefault()
  let newState = {...data, [e.target.name]: e.target.value}
  setData(newState);
  // setData(prevState => ({
  //   ...prevState,
  //   [e.target.name]: e.target.value
  // }))
  let dataErrors = validateData({ ...data, [e.target.name]: e.target.value })
  setData(prevState => ({
    ...prevState,
    errors: dataErrors
  }))
};

const handleDataGenre = (e) => { 
  e.preventDefault()
  let genresList = data.genres.filter(genre => genre.name === e.target.value)
  let idGenre = genres.find(genre => genre.name === e.target.value).id
  if (genresList.length === 0) {
    let newState = {...data, genres: [...data.genres, { id: idGenre, name: e.target.value }]}
    setData(newState);
    // setData(prevState => ({
    //   ...prevState,
    //   genres: [...data.genres, { name: e.target.value }] 
    // }))
  }
};

const handleDataPlatform = (e) => {
  e.preventDefault()
  let platformList = data.platforms.filter(platform => platform.name === e.target.value)
  let idPlatform = platforms.find(platform => platform.name === e.target.value).id
  console.log('idPlatform',idPlatform)
  if (platformList.length === 0) {
    let newState = {...data, platforms: [...data.platforms, { id: idPlatform, name: e.target.value }]}
    setData(newState);
    // setData(prevState => ({
    //   ...prevState,
    //   platforms: [...data.platforms, { name: e.target.value }]
    // }))
  }
  let dataErrors = validateData({ ...data, platforms: [...data.platforms, { name: e.target.value }] })
  setData(prevState => ({
    ...prevState,
    errors: dataErrors
  }))
};

const removeGenre = (name, e) => {
  e.preventDefault()
  setData(prevState => ({
    ...prevState,
    genres: data.genres.filter(genre => genre.name !== name)
  }))
};

const removePlatform = (name, e) => {
  e.preventDefault()
  setData(prevState => ({
    ...prevState,
    platforms: data.platforms.filter(platform => platform.name !== name)
  }))
};

const closePopup = (e) => {
  e.preventDefault();
  dispatch(actions.setPopupStatus({status: 0, statusText:'', message1:'', message2:''}));
}

const handleSubmit = async (e) => {
  e.preventDefault()
  console.log('dataSubmited',data)
  let dataErrors = validateData(data)
  console.log('dataErrors', dataErrors)
  setData(prevState => ({
    ...prevState,
    errors: dataErrors
  }))
  console.log('datavalidada',data)
  if (Object.keys(dataErrors).length === 0) {
    console.log('entre al dispatch')
    dispatch(actions.updateVideoGame(data))
    if ( statusCode < 300 ) {
      setData(initialState)
    }
    // history.push('/Home')
  }
};

return (
  <div className={s.container}>
    {
      (statusCode > 0) && (
        <div className={s.popup}>
          <h2>{message1}</h2>
          <h3>{message2}</h3>
          <button className={s.btns1} onClick={e=> closePopup(e)}>Aceptar</button>
        </div>
      )
    }
    <h1 className={s.title}>Informacion del Video Juego</h1>
    <form className={s.form} onSubmit={e => handleSubmit(e)}>
      <div className={s.inputBox}>
        <div><label htmlFor="name">Nombre:</label></div>
        <div>
          <input className={s.names} type="text" value={data.name} name='name' onChange={e => handleDataChange(e)} />
        </div>
      </div>
      {data.errors.name && (<p className={s.danger}>{data.errors.name}</p>)}
      <div className={s.inputBox}>
        <div><label htmlFor="released">Fecha de lanzamiento:</label></div>
        <div>
          <input className={s.released} type="date" value={data.released} name='released' onChange={e => handleDataChange(e)} />
        </div>
      </div>
      <div className={s.inputBox}>
        <div><label htmlFor="description">Descripcion:</label></div>
        <div>
          <textarea className={s.description} type="text" rows="10" cols="40" value={data.description} name='description' onChange={e => handleDataChange(e)}></textarea>
        </div>
      </div>
      {data.errors.description && (<p className={s.danger}>{data.errors.description}</p>)}
      <div className={s.inputBox}>
        <div><label htmlFor="rating">Rating:</label></div>
        <div>
          <input className={s.num} type="number" value={data.rating} name='rating' onChange={e => handleDataChange(e)} />
        </div>  
      </div>
      {data.errors.rating && (<p className={s.danger}>{data.errors.rating}</p>)}
      <div className={s.inputBox}>
        <div><label htmlFor="background_image">Imagen Principal:</label></div>
        <div>
          <input className={s.urlimage} type="text" value={data.background_image} name='background_image' onChange={e => handleDataChange(e)} />
        </div>
      </div>

      <div className={s.tabla}>
        <div className={s.tabla}>
          <div>
            <label htmlFor="">Generos: </label>
            <select name="genres" onChange={e => handleDataGenre(e)} placeholder="Seleccionar...">
              <option value="" disabled selected>Seleccionar...</option>
              {genres?.map((genre, index) => <option key={index}>{genre.name}</option>)}
            </select>
          </div>
          <div>
            <ul>
              {
                data.genres?.map((genre, index) => (
                  <li className={s.genres} key={index}>
                    {genre.name}
                    <button className={s.btns2} onClick={(e) => removeGenre(genre.name, e)}>X</button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className={s.tabla}>
          <div>
            <label htmlFor="">Plataformas:</label>
            <select name="platforms" onChange={e => handleDataPlatform(e)}>
              <option value="" disabled selected>Seleccionar...</option>
              {platforms?.map((platform, index) => <option key={index}>{platform.name}</option>)}
            </select>
          </div>
          <div>
            <ul>
              {
                data.platforms?.map((platform, index) => (
                  <li className={s.platforms} key={index}>
                    {platform.name}
                    <button className={s.btns2} onClick={(e) => removePlatform(platform.name, e)}>X</button>
                  </li>
                ))
              }
            </ul>
          </div>
          {data.errors.platforms && (<p className={s.danger}>{data.errors.platforms}</p>)}
        </div>    
      </div>
      
      <button className={s.btns1} type="submit"
        disabled={data.errors.name || data.errors.description || 
          data.errors.rating || data.errors.platforms ? true
          : false} >Actualizar Video Juego
      </button>
    </form>
    <div >
      <Link to='/Home'><button className={s.btns1}>Ir Atras</button></Link>
    </div>
  </div>

)



};

