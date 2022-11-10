const Author = require("../models/authorModel");
const jwt = require('jsonwebtoken')

const getAuthors = async (req, res, next) => {
    try {
        const author = await Author.find();
        if (!author)
            return res.status(404).send({
                success: false,
                msg: "Author Not Found"
            });

        res.status(200).send({
            success: true,
            author
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            msg: "Unable to fetch Authors"
        });
    }
}

const getAuthorbyID = async (req, res, next) => {
    // console.log(req.params.id);
    try {
        const author = await Author.findById(req.params.id);
        if (!author)
            return res.status(404).send({
                success: false,
                msg: "Author Not Found"
            });

        res.status(200).send({
            success: true,
            author
        });
    } catch (err) {
        console.log(err);
    }
}

const getCurrentAuthor = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        const HL = header.split(' ');
        const token = HL[1];
        console.log(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        try {
            console.log(payload)
            const author = await Author.findById(payload.id);
            if (!author)
                return res.status(404).send({
                    success: false,
                    msg: "Author Not Found"
                });

            res.status(200).send({
                success: true,
                author
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            msg: "Unable to verify token"
        });
    }
}

module.exports = { getAuthors, getAuthorbyID, getCurrentAuthor };
