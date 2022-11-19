import * as data from "../db.json";

import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from 'react';
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as ReactRedux from "react-redux";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import isReact, { component } from "is-react";
import thunk from "redux-thunk";

import { CreateVideoGame } from './components/CreateVideoGame/CreateVideoGame.jsx';
import validateData from './components/CreateVideoGame/ValidateDataVideogame.js';
import * as actions from "./redux/actions";

configure({ adapter: new Adapter() });

jest.mock('./redux/actions', () => ({
  CREATE_VIDEOGAME: "CREATE_VIDEOGAME",
  createVideoGame: (payload) => ({ type: 'CREATE_VIDEOGAME', payload: payload}),
  getGenres: (payload) => ({type: 'GET_GENRES', payload: payload}),
  getPlatforms: (payload) => ({type: 'GET_PLATFORMS', payload: payload})
}))



describe('CreateVideoGame/>', () => { 
  const state = { videogames: data.videogames };
  const mockStore = configureStore([thunk]);
  const { CREATE_VIDEOGAME } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateVideoGame)).toBeFalsy());

  describe("Formulario de Creación del Video Juego", () => {
    let createvideogame;
    let store = mockStore(state);
    beforeEach(() => {
      createvideogame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/createvideogame"]}>
            <CreateVideoGame />
          </MemoryRouter>
        </Provider>
      );
    });

    it("<Debe renderizar un formulario>", () => {
      expect(createvideogame.find("form").length).toBe(1);
    });

    it('Debe renderizar un label para el nombre con el texto "Nombre:"', () => {
      expect(createvideogame.find("label").at(0).text()).toEqual("Nombre:");
    });

    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "name"', () => {
      expect(createvideogame.find('input[name="name"]').length).toBe(1);
    });

    it('Debe renderizar un label para la fecha de lanzamiento con el texto "Fecha de lanzamiento:"', () => {
      expect(createvideogame.find("label").at(1).text()).toEqual("Fecha de lanzamiento:");
    });

    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "released"', () => {
      expect(createvideogame.find('input[name="released"]').length).toBe(1);
    });

    it('Debe renderizar un label para la descripcion con el texto "Descripcion:"', () => {
      expect(createvideogame.find("label").at(2).text()).toEqual("Descripcion:");
    });

    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "description"', () => {
      expect(createvideogame.find('textarea[name="description"]').length).toBe(1);
    });

    it('Debe renderizar un label para el raiting con el texto "Rating:"', () => {
      expect(createvideogame.find("label").at(3).text()).toEqual("Rating:");
    });
      
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "rating"', () => {
      expect(createvideogame.find('input[name="rating"]').length).toBe(1);
    });

    it('Debe renderizar un label para la imagen con el texto "Imagen Principal:"', () => {
      expect(createvideogame.find("label").at(4).text()).toEqual("Imagen Principal:");
    });

    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "background_image"', () => {
      expect(createvideogame.find('input[name="background_image"]').length).toBe(1);
    });
    
    it('Debe renderizar un label para las plataformas con el texto "Plataformas:"', () => {
      expect(createvideogame.find("label").at(6).text()).toEqual("Plataformas:");
    });

    it('Debe renderizar un select de tipo text con la propiedad "name" igual a "background_image"', () => {
      expect(createvideogame.find('select[name="platforms"]').length).toBe(1);
    });

    it('Debería renderizar un input de button submit y con texto "Crear Video Juego"', () => {
      expect(createvideogame.find('button[type="submit"]').length).toBe(1);
      expect(createvideogame.find('button[type="submit"]').text()).toBe(
        "Crear Video Juego"
      );
    });
  });

  describe("Manejo de estados locales", () => {
    let useState, useStateSpy, createvideogame;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);

      createvideogame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/createvideogame"]}>
            <CreateVideoGame />
          </MemoryRouter>
        </Provider>
      );
    });


    it("Deberia inicializar de forma correcta los valores del useState", () => {
      expect(useStateSpy).toHaveBeenCalled()
      expect(useStateSpy).toHaveBeenCalledWith({
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
      });
    });

    describe("Cambios en el Nombre del Video Juego ==> input:name ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "name"', () => {
        createvideogame.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Super Mario Bross" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: 'Super Mario Bross',
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
        });

        createvideogame.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "The Emperor of Bad World" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "The Emperor of Bad World",
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
        });
      });
    });


    describe("Cambios en la descripcion del Video Juego ==> input:description ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "description"', () => {
        createvideogame.find('textarea[name="description"]').simulate("change", {
          target: { name: "description", value: "En cada partida de Super Mario Bros. 35, los jugadores competirán en una configuración aleatoria de niveles del Super Mario Bros. original, así que ¡deberán prepararse para lo inesperado! Los jugadores podrán sugerir y votar el nivel por el que quieran empezar la partida, ¡lo que significa que esta podría iniciarse en el castillo de Bowser en el mundo 8-4, por ejemplo!" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          released: '', 
          description: 'En cada partida de Super Mario Bros. 35, los jugadores competirán en una configuración aleatoria de niveles del Super Mario Bros. original, así que ¡deberán prepararse para lo inesperado! Los jugadores podrán sugerir y votar el nivel por el que quieran empezar la partida, ¡lo que significa que esta podría iniciarse en el castillo de Bowser en el mundo 8-4, por ejemplo!', 
          rating: 0, 
          genres: [],
          background_image: '',
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });

        createvideogame.find('textarea[name="description"]').simulate("change", {
          target: { name: "description", value: "Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          released: '', 
          description: 'Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas', 
          rating: 0, 
          genres: [],
          background_image: '',
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });
      });
    });


    describe("Cambios en la fecha del lanzamiento del Video Juego ==> input:released ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "released"', () => {
        createvideogame.find('input[name="released"]').simulate("change", {
          target: { name: "released", value: "2021-03-10" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          released: '2021-03-10', 
          description: '', 
          rating: 0, 
          genres: [],
          background_image: '',
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });

        createvideogame.find('input[name="released"]').simulate("change", {
          target: { name: "released", value: "2020-05-30" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          released: '2020-05-30', 
          description: '', 
          rating: 0, 
          genres: [],
          background_image: '',
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });
      });
    });


    describe("Cambios en el rating del Video Juego ==> input:rating ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "rating"', () => {
        createvideogame.find('input[name="rating"]').simulate("change", {
          target: { name: "rating", value: 4.2 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          released: '', 
          description: '', 
          rating: 4.2, 
          genres: [],
          background_image: '',
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });

        createvideogame.find('input[name="rating"]').simulate("change", {
          target: { name: "rating", value: 4.5 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          released: '', 
          description: '', 
          rating: 4.5, 
          genres: [],
          background_image: '',
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });
      });
    });


    describe("Cambios en la imagen del Video Juego ==> input:background_image ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "background_image"', () => {
        createvideogame.find('input[name="background_image"]').simulate("change", {
          target: { name: "background_image", value: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          released: '', 
          description: '', 
          rating: 0, 
          genres: [],
          background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });

        createvideogame.find('input[name="background_image"]').simulate("change", {
          target: { name: "background_image", value: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612006.jpg" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          released: '', 
          description: '', 
          rating: 0, 
          genres: [],
          background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612006.jpg",
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });
      });
    });


    describe("Cambios en los generos del Video Juego ==> select:genres ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del select "genres"', () => {
        createvideogame.find('select[name="genres"]').simulate("change", {
          target: { name: "genres", value: "Adventure" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          released: '', 
          description: '', 
          rating: 0, 
          genres: [{name: "Adventure"}],
          background_image: "",
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });

        createvideogame.find('select[name="genres"]').simulate("change", {
          target: { name: "genres", value: "Action" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          released: '', 
          description: '', 
          rating: 0, 
          genres:  [{name: "Action"}],
          background_image: "",
          platforms: [],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });
      });
    });


    describe("Cambios en las plataformas del Video Juego ==> select:platforms ", () => {
      it('Debe reconocer cuando hay un cambio en el valor del select "platforms"', () => {
        createvideogame.find('select[name="platforms"]').simulate("change", {
          target: { name: "platforms", value: "PlayStation 5" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          released: '', 
          description: '', 
          rating: 0, 
          genres: [],
          background_image: "",
          platforms: [{name: "PlayStation 5"}],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });

        createvideogame.find('select[name="platforms"]').simulate("change", {
          target: { name: "platforms", value: "Nintendo Switch" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          released: '', 
          description: '', 
          rating: 0, 
          genres:  [],
          background_image: "",
          platforms: [{name: "Nintendo Switch"}],
          showPopup: false,
          message1: '',
          message2: '',
          errors: {}
        });
      });
    });

  });


  describe("Dispatch al store", () => {
    let useState, useStateSpy, createvideogame;
    let store = mockStore(state);

    jest.mock('./redux/actions', () => ({
      CREATE_VIDEOGAME: "CREATE_VIDEOGAME",
      createVideoGame: (payload) => ({ type: 'CREATE_VIDEOGAME', payload: payload})
    }))

    const data = {
      "name": "The Witcher 19: Wild Hunt",
      "released": "2022-09-27",
      "description": "The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately",
      "rating": 4.4,
      "background_image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
      "genres": [ { "name": "Action" }, { "name": "Adventure" }, { "name": "RPG" } ],
      "platforms": [
        {"name": "PlayStation 5" },
        {"name": "PlayStation 4" },
        {"name": "Xbox One" },
        {"name": "Nintendo Switch" }
      ],
      showPopup: false,
      message1: '',
      message2: '',
      errors: {}
    };

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);

      store = mockStore(state, actions.createVideoGame);
      store.clearActions();

      createvideogame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/createvideogame"]}>
            <CreateVideoGame />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it("Debe disparar la acción createVideoGame con los datos del state cuando se haga submit del form.", () => {
      const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
      const createVideoGameSpy = jest.spyOn(actions, "createVideoGame");

      createvideogame.find('input[name="name"]').simulate("change", {
        target: { name: "name", value: "Super Mario Bross" }
      });
      createvideogame.find('textarea[name="description"]').simulate("change", {
        target: { name: "description", value: "En cada partida de Super Mario Bros. 35, los jugadores competirán en una configuración aleatoria de niveles del Super Mario Bros. original, así que ¡deberán prepararse para lo inesperado! Los jugadores podrán sugerir y votar el nivel por el que quieran empezar la partida, ¡lo que significa que esta podría iniciarse en el castillo de Bowser en el mundo 8-4, por ejemplo!" },
      });
      createvideogame.find('input[name="released"]').simulate("change", {
        target: { name: "released", value: "2021-03-10" },
      });
      createvideogame.find('input[name="rating"]').simulate("change", {
        target: { name: "rating", value: 4.5 },
      });
      createvideogame.find('input[name="background_image"]').simulate("change", {
        target: { name: "background_image", value: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg" },
      });
      createvideogame.find('select[name="genres"]').simulate("change", {
        target: { name: "genres", value: "Adventure" },
      });
      createvideogame.find('select[name="platforms"]').simulate("change", {
        target: { name: "platforms", value: "PlayStation 5" },
      });

      createvideogame.find("form").simulate("submit");
      expect(createVideoGameSpy).toHaveBeenCalled();
      expect(createVideoGameSpy).toHaveBeenCalledWith({
              name: "Super Mario Bross",
              released: "2021-03-10",
              description: "En cada partida de Super Mario Bros. 35, los jugadores competirán en una configuración aleatoria de niveles del Super Mario Bros. original, así que ¡deberán prepararse para lo inesperado! Los jugadores podrán sugerir y votar el nivel por el que quieran empezar la partida, ¡lo que significa que esta podría iniciarse en el castillo de Bowser en el mundo 8-4, por ejemplo!",
              rating: 4.5,
              genres: [{name: "Adventure"}],
              background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
              platforms: [{name: "PlayStation 5"}],
              showPopup: false,
              message1: '',
              message2: '',
              errors: {}
            });

      expect(CreateVideoGame.toString().includes("useDispatch")).toBe(true);
    });

    it('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      createvideogame.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });

  });

});

