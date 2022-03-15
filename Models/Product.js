const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    images: [{ type: String }],
    brand: { type: String, default: "" },
    price: { type: Number, default: 0, require: true },
    category: { type: String, required: true },
    size: [{ type: String, require: true }],
    color: { type: String, default: "" },
    personType: { type: String, default: "Men" },
    countInStock: { type: Number, required: true, min: 0, max: 255 },
    isFeatured: { type: Boolean, default: false },
    Admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    dateCreated: { type: Date, default: Date.now },
});
exports.Product = mongoose.model("products", productSchema);
