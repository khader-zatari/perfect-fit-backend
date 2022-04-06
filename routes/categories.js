const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

//get all the categories
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
});
//get category by id
router.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({ message: "The category with the given ID was not found." });
    }
    res.status(200).send(category);
});
//add a category
router.post("/", async (req, res) => {
    let category = new Category({
        //object of category
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save();

    if (!category) return res.status(400).send("the category cannot be created!");

    res.send(category);
});
//update a category by id 
router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        },
        { new: true } // it means to return the new updated data
    );

    if (!category) return res.status(400).send("the category cannot be created!");

    res.send(category);
});
//delete a category by id 
router.delete("/:id", async (req, res) => {
    category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).send("category not found!");

    res.status(200).send("the category is deleted!");
});

module.exports = router;
