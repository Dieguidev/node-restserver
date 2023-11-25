const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const User = require('../models/user.model');

const validatorJwt = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'no hay token',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWTSECRETKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.json.status.json({
        msg: 'usuario no existe',
      });
    }

    //verificar si el uid esta en estado false
    if (!user.state) {
      return res.status(401).json({
        msg: 'usuario inactivo',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'token no valido',
    });
  }
};

module.exports = {
  validatorJwt,
};
