const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

const { createUser, getAllUsers, getUser, deleteUser, editUser } =
  userController;

// routes

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);
module.exports = router;
