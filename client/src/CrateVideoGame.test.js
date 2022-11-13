import * as data from "../db.json";

import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from 'react';
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
// import { shallow, mount } from 'enzyme';
import isReact from "is-react";
import thunk from "redux-thunk";


import { CreateVideoGame } from './components/CreateVideoGame/CreateVideoGame.jsx';
import validateData from './components/CreateVideoGame/ValidateDataVideogame.js';
import { CREATE_VIDEOGAME } from '../src/redux/actions';

configure({ adapter: new Adapter() });


describe('CreateVideoGame/>', () => { 

  const state = { videogames: data.videogames };
  const mockStore = configureStore([thunk]);

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
    beforeEach( async () => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, 'useState');
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);

      createvideogame = await mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/createvideogame"]}>
            <CreateVideoGame />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Deberia inicializar de forma correcta los valores del useState", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: '',
        released: '', 
        description: '', 
        rating: 0, 
        genres: [],
        background_image: '',
        platforms: []
      });
    });

    describe("Cambios en el Nombre de Video Juego ==> input:name ", () => {
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
          platforms: []
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
          platforms: []
        });
      });
    });

  });

});

