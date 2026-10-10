function requireAdmin(req, res, next) {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({
      success: false,
      error: { message: "Esta acción requiere una cuenta de administrador" }
    });
  }

  next();
}

module.exports = requireAdmin;