const Author = require("../models/authorModel");
const mongoose = require("mongoose");
const { ErrorResponse } = require('../utils/ErrorResponse')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const session = require("sessionstorage")


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
  
const register = async (req, res, next) => {
    try {
        const { name, email, password, phone_no } = req.body
        let authorTest = await Author.findOne({ email });
        if (authorTest)
            return next(new ErrorResponse("Email Already Exists", 400));

        authorTest = await Author.findOne({ phone_no });
        if (authorTest)
            return next(new ErrorResponse("Phone Number Already Exists", 400));

        const author = new Author({
            name: name,
            email: email,
            password: password,
            phone_no: phone_no
        });

        await author.save();
        res.status(200).send(
            `${name} registered successfully`
        );
    } catch (err) {
        return next(new ErrorResponse(err.name, err.code));
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorResponse('Email or Password not provided', 404));
        }
        const author = await Author.findOne({ email });
        let isMatch = false;
        if (!author) {
            isMatch = false;
            return next(new ErrorResponse('author does not exist', 404));
        } else {
            isMatch = await bcrypt.compare(password, author.password);
            console.log(isMatch);
        }

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        } else {
            token = createToken(author._id);
            session.setItem("jwt", token);
            return res.status(200).send({
                success: true,
                msg: "Logged In Successfully",
                token
            });
        }
    } catch (err) {
        return next(new ErrorResponse(err.name, err.code));
    }
}

const logout = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        let author = await Author.exists({ token });
        if (author) {
            await Author.updateOne(
                { _id: author._id },
                {
                    $set: {
                        token: null,
                    },
                }
            );
            return res.status(200).send({
                success: true,
                msg: "Logged Out Successfully",
            });
        } else {
            return res.status(404).send({
                success: false,
                msg: "Not Logged In"
            });
        }
    } catch (err) {
        return next(new ErrorResponse(err.name, err.code));
    }
}

module.exports = { register, login, logout };
