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
        address: '1679 Leppa Street',
        city: 'Lacunosa Town',
        state: 'Unova',
        country: 'Gen 5',
        lat: 11.111111,
        lng: -11.111111,
        name: 'Lacu-Serenity Villa: Where Luxury Meets Seclusion',
        description: 'Luxurious modern home with rooftop pool for secluded relaxation',
        price: 300.00
      },
      {
        ownerId: 2,
        address: '8790 Ledyba Way',
        city: 'Canalave City',
        state: 'Sinnoh',
        country: 'Gen 4',
        lat: 22.2222222,
        lng: -22.2222222,
        name: 'Bridgewater Haven: Serene Retreat with Canal Views and Boat Perks',
        description: 'Peaceful Retreat with Complimentary Boat Services, Steps from Canalave Library and Iconic Bascule Bridge',
        price: 850.00
      },
      {
        ownerId: 3,
        address: '182 Snorunt Drive',
        city: 'Snowpoint City',
        state: 'Sinnoh',
        country: 'Gen 4',
        lat: 33.3333333,
        lng: -33.3333333,
        name: 'Frostfall Lodge: Where Snowy Serenity Meets Ancient Mystique',
        description: 'Discover Frostfall Lodge, a cozy lodge in perpetual snowfall. Escape to mysterious wonders amidst the eternal winter beauty of Snowpoint Temple',
        price: 230.00
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
