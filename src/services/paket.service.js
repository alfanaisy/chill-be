const Paket = require("../models/paket.model")

const getAllPaket = async () => {
  const result = await Paket.findAndCountAll();

  return {
    count: result.count,
    data: result.rows
  }
}

const createPaket = async (item) => {
  const result = await Paket.create(item);

  return result;
}

const findPaketById = async (id) => {
  const result = await Paket.findByPk(id);

  return result;
}

const updatePaket = async (id, item) => {
  const existingItem = await findPaketById(id);
  if (!existingItem) return null;

  const result = await Paket.update(item, {
    where: {
      paketId: id
    },
    returning: true
  });
  return result;
}

const deletePaket = async (id) => {
  const existingItem = await findPaketById(id);
  if (!existingItem) return null;

  const result = await Paket.destroy({
    where: {
      paketId: id
    }
  });
  return result;
}

module.exports = {
  getAllPaket,
  createPaket,
  findPaketById,
  updatePaket,
  deletePaket
}