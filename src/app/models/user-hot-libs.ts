import mongoose from "mongoose";

const UserLinkSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    arrayLibs: {
        type: [String],
        required: true
    },
});

const UserLinkLib = mongoose.models.UserLinkLib || mongoose.model("UserLinkLib", UserLinkSchema)
export default UserLinkLib