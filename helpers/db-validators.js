const Rol = require('../models/rol.model');
const User = require('../models/user.model');

//verificar si el rol es valido
const isValueRol = async (rol = '') => {
  const rolExist = await Rol.findOne({ rol });
  if (!rolExist) {
    throw new Error(`el rol ${rol} no existe en la base de datos`);
  }
};

//verificar si el email existe
const emailExist = async (email = '') => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`el correo ${email} ya existe en la base de datos`);
  }
};

// VERIFICAR SI EL ID EXISTE
const idExist = async (userId = '') => {
  const idExist = await User.findById(userId);
  if (!idExist) {
    throw new Error(`el id ${userId} no existe en la base de datos`);
  }
};

module.exports = {
  isValueRol,
  emailExist,
  idExist,
};
