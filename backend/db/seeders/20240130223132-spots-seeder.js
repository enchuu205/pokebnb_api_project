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
        address: '1679 Litwick Street',
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
        address: '8790 Chatot Way',
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
      },
      {
        ownerId: 4,
        address: '847 Shuckle Avenue',
        city: 'Lilycove City',
        state: 'Hoenn',
        country: 'Gen 3',
        lat: 44.4444444,
        lng: -44.4444444,
        name: 'Pokemon Trainer Fan Club: Pocket Paradise',
        description: `A vibrant location for Pokémon enthusiasts, where trainers gather to share their passion for battling and bonding with their beloved companions. Engage in lively discussion and friendly competitions with fellow trainers. It's the ultimate destination for trainers to connect and celebrate their shared love for Pokémon. Steps away from Lilycove Museum, Lilycove Department Store, and Lilycove Shore`,
        price: 500.00
      },
      {
        ownerId: 4,
        address: '591 Garchomp Way',
        city: 'Undella Town',
        state: 'Sinnoh',
        country: 'Gen 4',
        lat: 33.3333333,
        lng: -33.3333333,
        name: `Cynthia's Seaside: Champion's Cove`,
        description: `
        "Cynthia's Seaside Haven: Champion's Cove" is a breathtaking sanctuary nestled along the tranquil shores, known as the cherished abode of Pokémon Champion Cynthia.With vast expanses of golden sands stretching as far as the eye can see, this coastal retreat offers ample space for relaxation and Pokémon training alike.As gentle waves kiss the shore and rare Pokémon frolic in the distance, visitors are enveloped in an atmosphere of serenity and adventure unlike any other.`,
        price: 600.00
      },
      {
        ownerId: 2,
        address: '111 Piplup Boulevard',
        city: 'Twinleaf Town',
        state: 'Sinnoh',
        country: 'Gen 4',
        lat: 33.3333333,
        lng: -33.3333333,
        name: `Mom's Home: The Place of Beginning`,
        description: `Reminisce back home by living at Mom's Home, the place where the journey starts. Located near Lake Verity. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        price: 90.00
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
