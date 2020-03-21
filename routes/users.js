const express = require('express');
const router = express.Router();
const { userValidationRules, userValidationErrorHandling } = require('../validators/validator');
const auth = require('../middleware/authenticator');
const isAdmin = require('../middleware/rolesAuthenticator');

const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  authenticateUser,
  loginUser,
  logoutUser
} = require('../controllers/usersController');

router
  .route('/')
  .get(getUsers) //auth, isAdmin
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router.route('/me').get(auth, authenticateUser);
router.route('/login').post(loginUser);
router.route('/logout').post(auth, logoutUser);

router
  .route('/:id')
  .get(getUser)  //auth,
  .delete(deleteUser) //auth, 
  .put(updateUser); // auth, 

module.exports = router;
