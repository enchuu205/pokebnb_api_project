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
        spotId: 2,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925169/canalave-city/qeqlv5mycdiadym7i6pa.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925171/canalave-city/lsrqcd6mhk97jfud6i68.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925170/canalave-city/ca5ndobxlm65hiojscy3.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925294/snowpoint-city/hf337nfslrx3ztjjxaw7.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925294/snowpoint-city/r7iewvywwxli6rs4w9rs.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925294/snowpoint-city/laga9afnghctmo6ee4aw.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925283/ptfc/i59onhdsjkcorlwznliw.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925283/ptfc/tdckkwcc872hxwqchgbr.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925284/ptfc/cn975pqc32lqawezxv6i.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925283/ptfc/hdcwbnx3z2cikqiihdwf.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925285/ptfc/jnio36mou3wiyvvezylg.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925189/cynthia-home/aqxoves8v27zyukxbjin.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925189/cynthia-home/gjylref5o16anhynidvf.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925235/cynthia-home/zcjhncvbxqlvoh0rug8p.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925268/mom-house/llkmxmbscfdlegsuv89m.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925267/mom-house/sncnwgpmu9jndcwiztcy.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925267/mom-house/ykarhokumzx9z9ee4dtf.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925268/mom-house/yqf7co07p4m54f5kw2vf.png',
        preview: false
      }
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
