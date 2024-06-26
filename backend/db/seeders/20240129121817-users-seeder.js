'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'gary@user.io',
        username: 'byeolrin',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Gary',
        lastName: 'Cheung'
      },
      {
        email: 'dennis@user.io',
        username: 'dennisbtw',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Dennis',
        lastName: 'Ma'
      },
      {
        email: 'ileftyy@user.io',
        username: 'iLeftyy',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Lefty',
        lastName: 'Suicune'
      },
      {
        email: 'undel@user.io',
        username: 'undel',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Undel',
        lastName: 'Riolu'
      },
      {
        email: 'amy@user.io',
        username: 'amy1234',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Amy',
        lastName: 'Litwick'
      },
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('demopassword'),
        firstName: 'Demo',
        lastName: 'Lition'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['byeolrin', 'dennisbtw', 'iLeftyy', 'undel', 'AsparagusSoju'] }
    }, {});
  }
};
