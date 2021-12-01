const {Schema,model} = require("mongoose");

const gallarySchema = new Schema({
    pictures: [{type: "string", required: true}],
    user_id : {type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true},
},{
    versionKey:false,
    timestamps: true
});


module.exports = model("gallary",gallarySchema);