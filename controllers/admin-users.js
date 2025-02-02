const User = require("../models/user-model");

const allUsersData = async(req, res, next) => {
    try {
        const response = await User.find({}, {password: 0});
        if(!response || response.length === 0) {
            res.status(404).json({message: "No User Found"})
        }

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getUserDataById = async(req, res, next) => {
    try {
        const {id} = req.params;  
        const response = await User.findById(id,{password: 0});

        if(!response) {
            res.status(404).json({message: "User not found"});
        }

        res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
}

const updateUserDataById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        const response = await User.updateOne({_id: id}, {$set: updateData});

        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
}



module.exports = { allUsersData, getUserDataById, updateUserDataById };