const { request, response } = require('express');
const User = require('../models/user.model');

const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el correo existe
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        msg: 'El usuario no existe',
      });
    }

    //sie el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: 'estado false',
      });
    }

    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'contraseña incorrecta',
      });
    }

    //generar el JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al iniciar sesion',
    });
  }
};

module.exports = {
  login,
};
