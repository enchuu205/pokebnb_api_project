'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Place was great! Very spacious. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mattis vulputate enim nulla aliquet porttitor lacus. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Place was okay. Could have been better. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mattis vulputate enim nulla aliquet porttitor lacus. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Place was not good at all. Too cramped. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mattis vulputate enim nulla aliquet porttitor lacus. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.',
        stars: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [0, 1, 2, 3, 4, 5] }
    }, {});
  }
};
