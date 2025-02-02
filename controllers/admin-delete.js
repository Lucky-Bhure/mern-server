const User = require("../models/user-model");

const deleteUserById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const response = await User.deleteOne({_id: id});
        return res.status(200).json({message: `${id} user is deleted from Server`});
    } catch (error) {
        next(error)
    }
}

module.exports = deleteUserById;