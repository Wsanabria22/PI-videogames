import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";
import VideoGameDetail from "./components/VideoGameDetail/VideoGameDetail";
import * as data from "../db.json";
import * as actions from "./redux/actions/index";
import axios from "axios";
const nock = require("nock");
const fetch = require('node-fetch');
axios.defaults.adapter = require("axios/lib/adapters/http");


configure({ adapter: new Adapter() });

jest.mock('./redux/actions', () => ({
  getVideoGameDetail: () => ({ type: 'GET_VIDEOGAME_DETAIL' })
}));


describe("<CharacterDetail />", () => {
  global.fetch = fetch;
  let videogameDetail, useSelectorStub, useSelectorFn, useEffect;
  const noChar = {
    "id": 3,
    "name": "The Witcher 9: Wild Hunt",
    "description": "The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately",
    "released": "2022-09-27",
    "background_image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "rating": 4.4,
    "genres": [ { "id":1,"name": "Action" }, { "id":2,"name": "Adventure" }, { "id":3,"name": "RPG"
   } ],
    "platforms": [
      {"platform": { "id":1, "name": "PlayStation 5" }},
      {"platform": { "id":2, "name": "PlayStation 4" }},
      {"platform": { "id":3, "name": "Xbox One" }},
      {"platform": { "id":4, "name": "Nintendo Switch" }}
    ]
  };

  const match = (idVideoGame) => ({
    params: { idVideoGame },
    isExact: true,
    path: "/videogamedetail/:idVideoGame",
    url: `/videogamedetail/${idVideoGame}`,
  });
  const mockStore = configureStore([thunk]);

  const store = (idVideoGame) => {
    let state = {
      videoGameDetail: noChar,
    };
    return mockStore(state);
  };

  beforeAll(() => expect(isReact.classComponent(VideoGameDetail)).toBeFalsy());
  const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

  beforeEach(() => {
    // Se Mockea las request a las api
    const apiMock = nock("http://localhost:3001").persist();

    // "/characters" => Retorna la propiedad characters del archivo data.json
    apiMock.get("/videogames").reply(200, data.videogames);


    // "/videogames/:id" => Retorna un personaje matcheado por su id

    let id = null;
    apiMock
      .get((uri) => {
        id = Number(uri.split("/").pop()); // Number('undefined') => NaN
        return !!id;
      })
      .reply(200, (uri, requestBody) => {
        return data.videogames.find((c) => c.id === id) || {};
      });
    useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
    useSelectorFn = (id) =>
      useSelectorStub.mockReturnValue(store(id).getState().videogameDetail);
    useEffect = jest.spyOn(React, "useEffect");
    videogameDetail = (id) =>
      mount(
        <ReactRedux.Provider store={store(id)}>
          <MemoryRouter initialEntries={[`/videogamedetail/${id}`]}>
            <VideoGameDetail match={match(id)} />
          </MemoryRouter>
        </ReactRedux.Provider>
      );
    mockUseEffect();
    mockUseEffect();
  });

  afterEach(() => jest.restoreAllMocks());

  it("Debería usar un useEffect y dentro de este, despachar la acción getVideoGameDetail, pasandole como argumento el ID del video juego a renderizar", 
  async () => {
    // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
    // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getVideoGameDetail".
    const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getVideoGameDetail = jest.spyOn(actions, "getVideoGameDetail");
    videogameDetail(1);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    // Para que este test funcione, es necesario importar las actions como object modules!
    expect(getVideoGameDetail).toHaveBeenCalled();

    videogameDetail(2);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getVideoGameDetail).toHaveBeenCalled();
  });


  describe('Debería recibir por props el objeto "match". Utilizar el "id" de "params" para despachar la action "getVideoGameDetail"', () => {
    const videoGame = data.videogames[0];
    console.log('videoGame',videoGame);
    it("Deberia renderizar el name del video juego.", () => {
      useSelectorFn(1);
      expect(videogameDetail(1).text().includes(videoGame.name)).toEqual(true);
      // expect(useSelectorStub).toHaveBeenCalled();
      // expect(useEffect).toHaveBeenCalled();
    });
    xit("Deberia renderizar la descripcion del videojuego.", () => {
      let sel = useSelectorFn(1);
      console.log('sel',sel)
      expect(videogameDetail(1).text().includes(videoGame.description)).toEqual(true);
      // expect(useSelectorStub).toHaveBeenCalled();
      // expect(useEffect).toHaveBeenCalled();
    });
    it("Deberia renderizar la fecha de lanzamiento del video juego.", () => {
      useSelectorFn(1);
      expect(videogameDetail(1).text().includes(videoGame.released)).toEqual(true);
    //   expect(useSelectorStub).toHaveBeenCalled();
    //   expect(useEffect).toHaveBeenCalled();
    });
    it("Deberia renderizar el raiting del video juego.", () => {
      useSelectorFn(1);
      expect(videogameDetail(1).text().includes(videoGame.rating)).toEqual(true);
      // expect(useSelectorStub).toHaveBeenCalled();
      // expect(useEffect).toHaveBeenCalled();
    });
    it("Debería renderizar la imagen del videojuego y un alt con el nombre del mismo", () => {
      expect(videogameDetail(1).find("img").at(0).prop("src")).toBe(videoGame.background_image);
      expect(videogameDetail(1).find("img").at(0).prop("alt")).toBe(videoGame.name);
    });
    it("Debería renderizar los generos del video juego", () => {
      expect(videogameDetail(1).text().includes(videoGame.genres[0].name)).toEqual(true);
      expect(videogameDetail(1).text().includes(videoGame.genres[1].name)).toEqual(true);
      expect(videogameDetail(1).text().includes(videoGame.genres[2].name)).toEqual(true);
    })
    it("Debería renderizar las plataformas del video juego", () => {
      expect(videogameDetail(1).text().includes(videoGame.platforms[0].platform.name)).toEqual(true);
      expect(videogameDetail(1).text().includes(videoGame.platforms[1].platform.name)).toEqual(true);
      expect(videogameDetail(1).text().includes(videoGame.platforms[2].platform.name)).toEqual(true);
    })
  });
  
});  
