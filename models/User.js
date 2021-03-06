// Name --- Email --- Password --- Roles --- AccountStatus

const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: [4, 'minimum length will be 4']
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: prop => `email invalid: ${prop.value} is not a valid email😒` 
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'password must be at least 5 character']
    },
    roles: {
        type: [String],
        required: true,
        default: ["STUDENT"]
    },
    accountStatus: {
        type: String,
        enum: ["PENDING","ACTIVE", "REJECTED"],
        default: "PENDING"
    },
});

const User = model('User', userSchema);
module.exports = User;