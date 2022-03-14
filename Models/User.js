const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true  },
    receiverName:{type:String ,  default:name},
    receiverPhone:{type:String ,  default:phone},
    street: { type: String, default: "" },
    zip: { type: String, default: "" },
    city: { type: String, default: "" },
    image: { type: String, default: "" },
    isAdmin: { type: Boolean, required: true , default:false },
    
});

export.User = mongoose.model("User", UserSchema); 

