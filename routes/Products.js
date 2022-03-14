const { Product } = require("../Models/Product");
const { User } = require("../Models/User");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer"); // upload file to the server

//image type that the user can upload
const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

// to use multer to upload the files to the storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb is call back
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid image type");

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, "public/uploads"); // uplead distenation folder
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-"); //make a beautiful file name.
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});
const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
    const products = await Product.find();
    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
});

// router.get(`/store/:id`, async (req, res) => {
//     const store = await User.findById(req.params.id);

//     if (!store) {
//         res.status(500).json({ success: false });
//     }
//     const products = await Product.findById();
//     res.send(product);
// });

router.post("/", uploadOptions.single("image"), async (req, res) => {
    //check if the category exists
    const category = req.body.category;
    const file = req.file;
    if (!file) {
        return res.status(400).send("No image in the request");
    }
    const fileName = file.filename; // to get the file name from request

    // the basepath is for making the stores file name full path with the name itsef
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232" ///////uploaded file url
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        isFeatured: req.body.isFeatured,
        size: req.body.size,
        color: req.body.color,
        personType: req.body.personType,
        Admin: req.body.admin,
    });
    product = await product.save();
    if (!product) {
        return res.status(500).send("The product cannot be created");
    }
    res.send(product);
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
    //check the id
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Product Id");
    }
    //validate the category

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send("Invalid Product!");

    const file = req.file;
    let imagepath;
    //if the user want to change the image. make the changes.
    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: imagepath, // "http://localhost:3000/public/upload/image-2323232" ///////uploaded file url
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
            size: req.body.size,
            color: req.body.color,
            personType: req.body.personType,
            Admin: req.body.admin,
        },
        { new: true }
    );

    if (!updatedProduct) return res.status(500).send("the product cannot be updated!");

    res.send(updatedProduct);
});

router.delete("/:id", async (req, res) => {
    product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("product not found!");

    res.status(200).send("the product is deleted!");
});

module.exports = router;
