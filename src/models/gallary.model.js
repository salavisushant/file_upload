const mongoose = require("mongoose");

const gallarySchema = new mongoose.Schema({
    pictures: [{type:String, required: true},],
    user_id : {type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true},
},{
    versionKey:false,
    timestamps: true
});


module.exports = mongoose.model("gallary",gallarySchema);