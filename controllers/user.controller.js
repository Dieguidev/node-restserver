const { response } = require('express');

const getUsers = (req, res = response) => {
  res.json({
    ok: true,
    message: 'Todo esta bien desde el controller',
  });
};

const postUsers = (req = request, res = response) => {
  const body = req.body;
  res.json({
    ok: true,
    message: 'Todo esta bien',
  });
};

const putUsers = (req, res = response) => {
  res.json({
    ok: true,
    message: 'Todo esta bien',
    body,
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    ok: true,
    message: 'Todo esta bien',
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
