'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-01-01',
        endDate: '2024-01-02'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-01-01',
        endDate: '2024-01-02'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2024-01-01',
        endDate: '2024-01-02'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
