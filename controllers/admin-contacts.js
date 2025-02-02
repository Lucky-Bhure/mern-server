const Contact = require("../models/contact-model");

const allContactData = async (req, res, next) => {
    try {
        const response = await Contact.find();

        if(!response || response.length === 0) {
            res.status(404).json({message: "No Contact Found"});
        }

        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteContactById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const response = await Contact.deleteOne({_id : id});
        return res.status(200).json({message: `${id} contact is delete from Server`});

    } catch (error) {
        next(error);
    }
};

module.exports = {allContactData , deleteContactById};