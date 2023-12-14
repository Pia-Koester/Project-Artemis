const User = require("../models/users.js")

const createUser = async (req, res) => {
    try {
        const {
            email, phone, password
        } = req.body
const user = await User.create({email, phone, password})
res.status(201).json(user)


    } catch (error) {
        console.log(error)
        res.status(500).send("why are you here?")
    }
}