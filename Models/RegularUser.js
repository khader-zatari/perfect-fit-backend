const mongoose = require("mongoose");

const RegularUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, default: "" },
    zip: { type: String, default: "" },
    city: { type: String, default: "" },
    image: { type: String, default: "" },
    
});

export.RegularUser = mongoose.model("RegularUser", RegularUserSchema); // converting the schema to a model. 'user' is the model name.

