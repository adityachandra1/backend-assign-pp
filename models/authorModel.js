// author
// (id, name, email, phone_no

const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Name"],
        },
        password: {
            type: String,
            required: [true, "Please enter a Password"],
            minlength: [4, "Minimum Password length must be 4 characters"]
        },
        email: {
            type: String,
            required: [true, "Please enter your Email ID"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid Email ID"],
        },
        phone_no: {
            type: Number,
            unique: true,
            required: [true, 'Please enter a phone number'],
        }
    }
);

authorSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})