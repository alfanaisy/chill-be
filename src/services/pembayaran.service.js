const { Op } = require("sequelize");
const Pembayaran = require("../models/pembayaran.model")

const getAllPembayaran = async () => {
  const { count, rows } = await Pembayaran.findAndCountAll();

  return {
    count,
    data: rows
  }
}

const findPembayaranById = async (id) => {
  const result = await Pembayaran.findByPk(id);

  return result;
}

const findPembayaranByStatus = async (status) => {
  const result = await Pembayaran.findAll({
    where: {
      paymentStatus: status
    }
  });

  return result;
}

const createPembayaran = async (item) => {
  const result = await Pembayaran.create(item);

  return result;
}

const updatePembayaran = async (id, item) => {
  const existingItem = await findPembayaranById(id);
  if (!existingItem) return null;

  const result = await Pembayaran.update(item, {
    where: {
      pembayaranId: id
    },
    returning: true
  });
  return result;
}

const deletePembayaran = async (id) => {
  const existingItem = await findPembayaranById(id);
  if (!existingItem) return null;

  const result = await Pembayaran.destroy({
    where: {
      pembayaranId: id
    }
  });
  return result;
}

module.exports = {
  getAllPembayaran,
  findPembayaranById,
  findPembayaranByStatus,
  createPembayaran,
  updatePembayaran,
  deletePembayaran
}