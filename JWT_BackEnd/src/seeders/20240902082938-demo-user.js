'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('User',
      [
        {
          username: 'John Doe1',
          email: '',
          password: '165231',

        },
        {
          username: 'John Doe2',
          email: '',
          password: '54321',

        },
        {
          username: 'John Doe3',
          email: '',
          password: '3545132',

        },
       
      ], 
      {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
