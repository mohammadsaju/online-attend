const router = require('express').Router();
const userController = require('../controller/users');


/**
 * get user by id
 * @method get
 */
router.get('/:userId', userController.getUserById);
/**
 * update user by id
 * @method patch 
 */
router.patch('/:userId', userController.patchUserById);
/**
 * update user by id
 * @method put
 */
router.put('/:userId', userController.putUserById);
/**
 * delete user by id
 * @method delete
 */
router.delete('/:userId', userController.deleteUserById);
/**
 * get all users
 * @method get
 * @visibility private
 */
router.get('/', userController.getUsers);
/**
 * create a new user
 * @method post
 */
router.post('/', userController.postUser);


module.exports = router;