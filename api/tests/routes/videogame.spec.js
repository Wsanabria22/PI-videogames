/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: "Grand Theft Auto VI",
  description: "<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. </p>",
  released: "2021-09-27",
  background_image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  rating: 4.8,
  genres: [
          {"name": "Action"},
          {"name": "Adventure"},
          {"name": "RPG"}
        ],
  platforms: [
      { "name": "PlayStation 5" },
      { "name": "Xbox One" },
      { "name": "Nintendo Switch" }
    ]
};

const videogame1 = {
  name: "The Witcher 5: Wild Hunt",
  description: "The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately",
  released: "2022-09-27",
  background_image:"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  rating: 4.4,
  genres: [
          {"name": "Action"},
          {"name": "Adventure"},
          {"name": "RPG"}
        ],
  platforms: [
      { "name": "PlayStation 5" },
      { "name": "PlayStation 4" },
      { "name": "Xbox One" },
      { "name": "Nintendo Switch" }
      ]
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Videogame.sync({ force: false }));
    // .then(() => Videogame.create(videogame)));


  describe('GET /videogames', () => {
    Videogame.create(videogame);

    it('should get 200', () => {
      agent.get('/videogames')
      .then( response => response.expect(200) );
    });


    it('should get video game "Super Mario Bros"', () => {
      agent.get('/videogames')
      .then( resp => { resp.expect(resp.body).to.eql(videogame)});
    });

  });


  describe('POST /videogames', () => {
  
    it('should create a videogame in database and rerutn status 200', () => {
      agent.post('/videogames')
      .send(videogame1)
      .then( response => response.expect(200));
    });

    it('should get video game created', () => {
      agent.get('/videogames')
      .then( resp => { 
        console.log(resp.body[100].name)
        resp.expect(resp.body[100].name).to.be(videogame1.name)
      });
    });

  });

});
