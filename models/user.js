const { Model } = require('sequelize');
const { getHash } = require('../helpers/password');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.addHook('beforeFind', (options) => {
        if (!options.attributes) {
          options.attributes = this.getBasicAttribute();
        }
      });
    }
  }

  User.init(
    {
      uuid: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', getHash(value));
        },
      },
      created_by: DataTypes.BIGINT,
      deleted_by: DataTypes.BIGINT,
      updated_by: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      paranoid: true,
      tableName: 'users',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
      deletedAt: 'deleted_at',
    }
  );

  User.getBasicAttribute = function () {
    return ['id', 'uuid', 'firstname', 'lastname', 'email'];
  };

  return User;
};
