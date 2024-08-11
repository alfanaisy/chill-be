const Order = require("../models/order.model")

const getAllOrders = async () => {
  const result = await Order.findAndCountAll();

  return {
    count: result.count,
    data: result.rows
  }
}

const findOrderById = async (id) => {
  const result = await Order.findByPk(id);

  return result;
}

const createOrder = async (item) => {
  const result = await Order.create(item);

  return result;
}

const updateOrder = async (id, item) => {
  const existingItem = await findOrderById(id);
  if (!existingItem) return null;

  const result = await Order.update(item, {
    where: {
      orderId: id
    },
    returning: true
  });
  return result;
}

const deleteOrder = async (id) => {
  const existingItem = await findOrderById(id);
  if (!existingItem) return null;

  const result = await Order.destroy({
    where: {
      orderId: id
    }
  });
  return result
}

module.exports = {
  getAllOrders,
  findOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}