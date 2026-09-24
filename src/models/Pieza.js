const mongoose = require("mongoose");

const pieceSchema = new mongoose.Schema(
  {
    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"]
    },
    coleccion: {
      type: String,
      required: [true, "La colección es obligatoria"]
    },
    creadoPor: {
      type: String,
      required: [true, "El campo creadoPor es obligatorio"]
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"]
    },
    disponible: {
      type: Boolean,
      required: [true, "Debes indicar si la pieza está disponible"]
    },
    estado: {
      type: String,
      required: [true, "El estado es obligatorio"]
    },
    fechaCreacion: {
      type: String,
      required: true,
      default: () => new Date().toISOString()
    },
    imagen: {
      type: String,
      required: [true, "La imagen principal es obligatoria"]
    },
    imagenesGaleria: {
      type: [String],
      required: [true, "La galería de imágenes es obligatoria"]
    },
    materiales: {
      type: [String],
      required: [true, "Los materiales son obligatorios"]
    },
    medidas: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Las medidas son obligatorias"]
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"]
    },
    personalizable: {
      type: Boolean,
      required: [true, "Debes indicar si es personalizable"]
    },
    piezaUnica: {
      type: Boolean,
      required: [true, "Debes indicar si es una pieza única"]
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
      validate: {
        validator: Number.isInteger,
        message: "El precio debe ser un número entero"
      }
    }
  },
  {
    versionKey: false
  }
);

// El tercer argumento obliga a Mongoose a usar tu colección real: piezas.
module.exports = mongoose.model("Pieza", pieceSchema, "piezas");