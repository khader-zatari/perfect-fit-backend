const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    street: { type: String, default: "" },
    zip: { type: String, default: "" },
    city: { type: String, default: "" },
});

exports.AdminUser = mongoose.model("AdminUser", AdminUser);
