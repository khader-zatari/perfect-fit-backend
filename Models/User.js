const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    receiverName: { type: String },
    receiverPhone: { type: String },
    street: { type: String, default: "" },
    zip: { type: String, default: "" },
    city: { type: String, default: "" },
    image: { type: String, default: "" },
    isAdmin: { type: Boolean, required: true, default: false },
});

exports.User = mongoose.model("users", userSchema);
exports.userSchema = userSchema;
