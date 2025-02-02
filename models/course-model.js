const {Schema, model} = require("mongoose");

const courseSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    instructor: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
});

const Course = new model("Course", courseSchema);

module.exports = Course;