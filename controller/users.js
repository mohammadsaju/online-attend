const userService = require('../service/user');
const authService = require('../service/auth');
const error = require('../utils/error');


const getUsers = async(req, res, next) => {
    try{
        //todo: filter, sort, pagination, select
        const users = await userService.findUsers();
        res.status(200).json(users)
    }
    catch(e) {
        next(e)
    }
};

const getUserById = async(req, res, next) => {
    try{
        const {userId} = req.params;
        const user = await userService.findUserByProperty('_id', userId);
        if(!user) {
            throw error('user was not found', 404);
        }
        res.status(200).json(user)
    }
    catch(e) {
        next(e)
    }
};

const postUser = async(req, res, next) => {
    const {name, email, password, roles, accountStatus} = req.body;
    try{
        const user = await authService.registerService({name, email, password, roles, accountStatus});
        res.status(201).json(user);
    }
    catch(e) {
        next(e)
    }
};

const putUserById = async(req, res, next) => {
    const {userId} = req.params;
    const {name, email, roles, accountStatus} = req.body;

    try{
        const user = await userService.updateUser(userId, {name, roles, email, accountStatus});

        if(!user) {
            throw error('user was not found', 404);
        }

        return res.status(200).json(user);
    }
    catch(e) {
        next(e)
    }
};

const patchUserById = async(req, res, next) => {
    const {userId} = req.params;
    const {name, roles, accountStatus} = req.body;

    try{
        const user = await userService.findUserByProperty('_id', userId);

        if(!user) {
            throw error('the user is missing', 404)
        }

        user.name = name ?? user.name
        user.roles = roles ?? user.roles
        user.accountStatus = accountStatus ?? user.accountStatus
        await user.save();

        return res.status(200).json(user);
    }
    catch(e) {
        next(e)
    }
};

const deleteUserById = async(req, res, next) => {
    const {userId} = req.params;
    try{
        const user = await userService.findUserByProperty('_id', userId);

        if(!user) {
            throw error('user was not found', 404)
        }
        //todo-  delete all user services
        await user.remove();
        res.status(203).send();
    }
    catch(e) {
        next(e)
    }
};


module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById
}

