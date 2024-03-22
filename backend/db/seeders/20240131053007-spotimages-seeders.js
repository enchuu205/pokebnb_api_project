'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925254/lacunosa-town/pljmkfm3r8wxvqi1cj9s.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925254/lacunosa-town/rbxfspv5xtaysyafngjn.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925255/lacunosa-town/vvusyj9tgka0yxj75yyb.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925255/lacunosa-town/dc8pjbc8abt6trhqlhlk.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925254/lacunosa-town/spbbknnoj5bsibvjychg.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925170/canalave-city/apgxkx5dvhzyxpyhw7du.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925294/snowpoint-city/hf337nfslrx3ztjjxaw7.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925283/ptfc/i59onhdsjkcorlwznliw.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925189/cynthia-home/aqxoves8v27zyukxbjin.png',
        preview: true
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
