const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: { message: "Debes iniciar sesión para realizar esta acción" }
    });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { message: "La sesión no es válida o ha caducado" }
    });
  }
}

module.exports = requireAuth;