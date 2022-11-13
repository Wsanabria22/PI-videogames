const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));

    describe('name', () => {

      it('should throw an error if name is null', () => {
        Videogame.create({})
          .then((done) => done())
          .catch((done) => done(new Error('It requires a valid name')));
      });


      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' })
          .then((done) => done());
      });


    });
  });
});



// it('should throw an error if name is null', (done) => {
//   Videogame.create({})
//     .then(() => done())
//     .catch(() => done(new Error('It requires a valid name')));
// });