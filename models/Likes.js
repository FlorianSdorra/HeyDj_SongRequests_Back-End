const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikeSchema = new Schema ({
    likesCount: {
        type: Number
    },
    dateOfLike : {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Likes", LikeSchema);