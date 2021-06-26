const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //leer token del header
  const token = req.header("x-auth-token");
  //revisar si hay token
  if (!token) {
    return res.status(401).json({ msg: "Inicie sesión" });
  }
  //validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.user = cifrado.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Sesión expirada" });
  }
};