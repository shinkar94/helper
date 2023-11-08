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
    author: {
        type: String,
        required: true
    },
    idAuthor: {
        type: String,
        required: true
    }
});

const LinkLib = mongoose.models.LinkLib || mongoose.model("LinkLib", LinkSchema)
export default LinkLib