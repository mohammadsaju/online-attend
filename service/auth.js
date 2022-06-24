const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {findUserByProperty, createUser} = require('./user');
const error = require('../utils/error');

const registerService = async({name, email, password, roles, accountStatus}) => {
        const user = await findUserByProperty('email', email);
        
        if(user) {
            throw error('user is already exists👀', 400);
        } 
        else {
            const hashPassword = await bcrypt.hash(password, 10);
            return await createUser({name, email, password: hashPassword, roles, accountStatus});
        }
}


const loginService = async({email, password}) => {
    
    const user = await findUserByProperty('email', email);
    if(user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword) {
            const payload = {
                name: user.name,
                email: user.email,
                id: user._id
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn: '2h'});
            return token;
        }
        else {
            throw error('password is not matched🔍', 400);
        }
    }
    else {
        const error = new Error('user was not found👀');
        error.status = 400
        throw error;
    }
}

module.exports = {registerService, loginService}