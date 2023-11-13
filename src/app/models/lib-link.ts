import mongoose from "mongoose";



const LinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    typesCode: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    idAuthor: {
        type: String,
        required: true
    }
});

const LinkHotLib = mongoose.models.LinkHotLib || mongoose.model("LinkHotLib", LinkSchema)
export default LinkHotLib