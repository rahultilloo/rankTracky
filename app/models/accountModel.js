var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
var Schema = mongoose.Schema;
mongooseTypes.loadTypes(mongoose, "email");
var Email = mongoose.SchemaTypes.Email;
var AccountSchema = new Schema({
    gid: {
        type: String,
        required: true
    },
    name : {
        type: String
    },
    given_name: {
        type: Email,
    },
    family_name: {
        type: String
    },
    link: {
        type: String
    },
      gender: {
        type: String
    },
    locale : {
  type: String
    },
refreshToken : {
  type: String
    },
    created: {
        type: Date,
        default: Date.now
    },

      email: { type : Array , "default" : [] }
});



module.exports = mongoose.model('Account', AccountSchema);