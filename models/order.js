'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.product, {
        as: 'product',
        foreignKey: {
          name: 'idProduct'
        }
      })
      order.belongsTo(models.user, {
        as: 'penjual',
        foreignKey: {
          name: 'idPenjual'
        }
      })
      order.belongsTo(models.user, {
        as: 'pembeli',
        foreignKey: {
          name: 'idPembeli'
        }
      })
    }
  };
  order.init({
    idPembeli: DataTypes.INTEGER,
    idPenjual: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};