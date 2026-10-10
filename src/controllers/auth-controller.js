const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Usuarios");

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: "Debes introducir email y contraseña" }
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      activo: true
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: "Email o contraseña incorrectos" }
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        error: { message: "Email o contraseña incorrectos" }
      });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };