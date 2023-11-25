const { Router } = require('express');
const { check } = require('express-validator');

const { validatorFields } = require('../middlewares/validate-fields');
const { validatorJwt } = require('../middlewares/validator-jwt');
const { isValueRol, emailExist, idExist } = require('../helpers/db-validators');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require('../controllers/user.controller');
const { isAdminRole, hasRole } = require('../middlewares/validate--roles');

const router = Router();

router.get(
  '/',
  [
    check('limit', 'No es un limite valido').optional().isInt(),
    check('from', 'No es un from valido').optional().isInt(),
    validatorFields,
  ],
  getUsers
);

router.put(
  '/:userId',
  [
    check('userId', 'No es un ID valido').isMongoId(),
    check('userId').custom(idExist),
    check('rol').custom(isValueRol),
    validatorFields,
  ],
  putUsers
);

router.post(
  '/',
  [
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({
      min: 6,
    }),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isValueRol),
    validatorFields,
  ],
  postUsers
);

router.delete(
  '/:userId',
  [
    validatorJwt,
    // isAdminRole,
    hasRole('VENTAS_ROLE'),
    check('userId', 'No es un ID valido').isMongoId(),
    check('userId').custom(idExist),
    validatorFields,
  ],
  deleteUsers
);

module.exports = router;
