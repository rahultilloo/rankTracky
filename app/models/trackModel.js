var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
var Schema = mongoose.Schema;
mongooseTypes.loadTypes(mongoose, "email");
var Email = mongoose.SchemaTypes.Email;
var PositionSchema = new Schema({
       website : {
        type: String
    },
       keyword : {
        type: String
    },
  created: {
        type: Date,
        default: Date.now
    },
    gid: {
        type: String,
        required: true
    },
        tid: {
type : Schema.ObjectId, ref : 'Track' 
    },
        aid: {
    type : Schema.ObjectId, ref : 'Account' 
    }
    })

var TrackSchema = new Schema({
    gid: {
        type: String
            },
     aid: {
    type : Schema.ObjectId, ref : 'Account' 
    },
    website : {
        type: String
    },
    keywords: {
        type: String
    },
    positions: [PositionSchema],
    created: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Track', TrackSchema);