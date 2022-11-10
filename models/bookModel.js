//book  
//(id, title, likes, author)
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title"],
        },
        likes: {
            type: Number,
            required: [true],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
        }
    }
);

bookSchema.pre("save", async function (next) {
    this.likes = 0;
    next();
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;