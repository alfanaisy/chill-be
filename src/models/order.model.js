const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize-config');
const User = require('./user.model');
const Paket = require('./paket.model');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
  },
  paketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Paket,
      key: 'paketId',
    },
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  orderStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Paket, { foreignKey: 'paketId' })

module.exports = Order;
