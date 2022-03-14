const express = require("express");
const router = express.Router();
const { User } = require("../Models/User");

router.get("/", async (req, res) => {
    const UserList = await User.find().select("-password");

    if (!UserList) {
        res.status(500).json({ success: false });
    }
    res.send(UserList);
});

router.get("/:id", async (req, res) => {
    const User = await User.findById(req.params.id).select("-password");
    if (!User) {
        res.status(500).json({ message: "The User with the given ID was not found" });
    }
    res.send(User);
});

router.put("/:id", async (req, res) => {
    const UserExist = await User.findById(req.params.id);
    let newPassword;
    //update the password and take consideration that we use hash password
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = UserExist.passwordHash;
    }
    const User = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        },
        { new: true }
    );
    if (!User) {
        res.status(400).send("the User cannot be updated!");
    }
    res.send(User);
});

router.post("/login", async (req, res) => {
    const User = await User.findOne({ email: req.body.email });
    if (!User) {
        res.status(400).send("the User is not found");
    }
    if (req.body.password == User.password) {
        res.status(200).send({ User: User.email });
    } else {
        res.status(400).send("password is wrong!");
    }
});

router.post("/register", async (req, res) => {
    //check if the name is unique over all the names in the DataBase
    let User = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        receiverName: req.body.name,
        receiverPhone: req.body.phone,
        isAdmin: req.body.isAdmin,
    });
    User = await User.save();

    if (!User) return res.status(400).send("can't create the User");
    res.send(User);
});

router.delete("/:id", async (req, res) => {
    const User = await User.findByIdAndRemove(req.params.id);
    if (!User) {
        return res.status(404).json({ success: false, message: "User not found!" });
    }
    return res.status(200).json({ success: true, message: "the User is deleted!" });
});

module.exports = router; // export the router
