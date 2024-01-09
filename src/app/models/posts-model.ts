import mongoose from "mongoose";

const PostsCodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    dataCode: [
        {
            tag: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ],
    rating: {
        type: Number
    }
});

const PostCode = mongoose.models.PostsExampleCode || mongoose.model("PostsExampleCode", PostsCodeSchema)
export default PostCode