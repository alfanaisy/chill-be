const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-config");
const User = require("./user.model");
const Order = require('./order.model');

const Pembayaran = sequelize.define('Pembayaran', {
  pembayaranId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    },
    onDelete: 'CASCADE'
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'orderId'
    },
    onDelete: 'CASCADE'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
});

Pembayaran.belongsTo(User, { foreignKey: 'userId' });
Pembayaran.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Pembayaran;