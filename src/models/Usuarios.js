const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "La contraseña cifrada es obligatoria"],
      select: false
    },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "cliente"],
      default: "cliente"
    },
    activo: {
      type: Boolean,
      required: true,
      default: true
    },
    fechaRegistro: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

// El tercer argumento usa exactamente la colección usuarios.
module.exports = mongoose.model("User", userSchema, "usuarios");