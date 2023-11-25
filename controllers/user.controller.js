const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const getUsers = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).limit(limit).skip(from),
  ]);

  res.json({ total, users });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  //enbcriptar la contraseñ
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //guardar en la base de datos
  await user.save();

  res.json({ user });
};

const putUsers = async (req = request, res = response) => {
  const { userId } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  //validar contra la base de datos
  if (password) {
    //enbcriptar la contraseñ
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(userId, resto);

  res.json(user);
};

const deleteUsers = async (req = request, res = response) => {
  const { userId } = req.params;

  //eliminar fisicamente de la base de datos
  // const user = await User.findByIdAndDelete(userId);

  //cambiar de true a false el is active
  const user = await User.findByIdAndUpdate(userId, { state: false });

  const userAutenticated = req.user;

  res.json({ user, userAutenticated });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
