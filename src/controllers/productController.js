const mongoose = require("mongoose");
const Pieza = require("../models/Pieza");
const createHttpError = require("../utils/httpError");

async function getProducts(req, res, next) {
  try {
    const piezas = await Pieza.find().sort({ fechaCreacion: -1 });

    res.status(200).json({
      success: true,
      count: piezas.length,
      data: piezas
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "El id de la pieza no es válido");
    }

    const pieza = await Pieza.findById(id);

    if (!pieza) {
      throw createHttpError(404, "Pieza no encontrada");
    }

    res.status(200).json({
      success: true,
      data: pieza
    });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const pieza = await Pieza.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pieza creada correctamente",
      data: pieza
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "El id de la pieza no es válido");
    }

    const pieza = await Pieza.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pieza) {
      throw createHttpError(404, "Pieza no encontrada");
    }

    res.status(200).json({
      success: true,
      message: "Pieza actualizada correctamente",
      data: pieza
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "El id de la pieza no es válido");
    }

    const pieza = await Pieza.findByIdAndDelete(id);

    if (!pieza) {
      throw createHttpError(404, "Pieza no encontrada");
    }

    res.status(200).json({
      success: true,
      message: "Pieza eliminada correctamente"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};