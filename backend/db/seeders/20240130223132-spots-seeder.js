'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '111 Spot 1',
        city: 'Alhambra',
        state: 'CA',
        country: 'USA',
        lat: 11.111111,
        lng: -11.111111,
        name: 'Spot 1',
        description: 'Test description for Spot 1',
        price: 123.45
      },
      {
        ownerId: 2,
        address: '222 Spot 2',
        city: 'Alhambra',
        state: 'CA',
        country: 'USA',
        lat: 22.2222222,
        lng: -22.2222222,
        name: 'Spot 2',
        description: 'Test description for Spot 2',
        price: 123.45
      },
      {
        ownerId: 3,
        address: '333 Spot 3',
        city: 'Alhambra',
        state: 'CA',
        country: 'USA',
        lat: 33.3333333,
        lng: -33.3333333,
        name: 'Spot 3',
        description: 'Test description for Spot 3',
        price: 123.45
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['111 Spot 1', '222 Spot 2', '333 Spot 3'] }
    }, {});
  }
};
