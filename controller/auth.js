const {registerService, loginService} = require('../service/auth');


//! registration controller
const registerController = async(req, res, next) => {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password) {
        res.status(400).json({msg: "invalid data"})
    } 

    try{
        const user = await registerService({name, email, password});
        res.status(201).json({msg: 'registration successfully✌', user})
    }
    catch(e) {
        next(e)
    }

}

//! login controller
const loginController = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        const token = await loginService({email, password})
        res.status(200).json({msg: "success", token});
    }
    catch(err) {
        console.log(err.message)
        next(err);
    }
}


module.exports = {registerController, loginController}