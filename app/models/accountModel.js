var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
var Schema = mongoose.Schema;
mongooseTypes.loadTypes(mongoose, "email");
var Email = mongoose.SchemaTypes.Email;
var AccountSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: Email,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    offline: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Account', AccountSchema);