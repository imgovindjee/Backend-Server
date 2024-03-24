const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User"
        },
        name: {
            type: String,
            require: [true, "Please Add the Contact-Name"]
        },
        sex: {
            type: String,
            require: [false, "Please add the Gender"]
        },
        email: {
            type: String,
            require: [true, "Please add The Email-Address"]
        },
        phone: {
            type: String,
            require: [true, "Please add the PhoneNumber"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("contacts", contactSchema);