module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        uuid: '004e76f3-d0cb-47a5-8fd4-de263d3dcus1',
        firstname: 'admin',
        lastname: 'pertama',
        email: 'admin@example.com',
        password: '$2a$10$OXoAMXYJ1Sunebe9pD6EHuzGHxgk6JE0nbRWjFsSOWvu39eO4CeNy',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        uuid: '004e76f3-d0cb-47a5-8fd4-de263d3dcus2',
        firstname: 'scm',
        lastname: 'pertama',
        email: 'scm@example.com',
        password: '$2a$10$OXoAMXYJ1Sunebe9pD6EHuzGHxgk6JE0nbRWjFsSOWvu39eO4CeNy',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        uuid: '004e76f3-d0cb-47a5-8fd4-de263d3dcus3',
        firstname: 'finance',
        lastname: 'pertama',
        email: 'finance@example.com',
        password: '$2a$10$OXoAMXYJ1Sunebe9pD6EHuzGHxgk6JE0nbRWjFsSOWvu39eO4CeNy',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        uuid: '004e76f3-d0cb-47a5-8fd4-de263d3dcus4',
        firstname: 'reviewer',
        lastname: 'pertama',
        email: 'reviewer@example.com',
        password: '$2a$10$OXoAMXYJ1Sunebe9pD6EHuzGHxgk6JE0nbRWjFsSOWvu39eO4CeNy',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },
  down: async () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
