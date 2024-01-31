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
        url: 'https://archives.bulbagarden.net/media/upload/thumb/c/cc/Player_House_exterior_DPPt.png/250px-Player_House_exterior_DPPt.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://pbs.twimg.com/media/FsN3z_yWYAEa7bh.jpg:large',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9Ry-4Dr9IU1FphaAXLOFd9OC4IPOfTvOuTEka1FerOZs0uOWmJkGBy5EjsLQgqxsZzc&usqp=CAU',
        preview: true
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImage';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
