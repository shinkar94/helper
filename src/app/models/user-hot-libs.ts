import mongoose from "mongoose";
interface IUserLinkLib extends Document {
    idUser: string;
    arrayLibs: string[];
}
export type ResponseUserHotLibType = IUserLinkLib & {
    _id: string;
    __v: number;
    save: () => Promise<ResponseUserHotLibType>;
};
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

const UserLinkLib = mongoose.models.UserLinkLib || mongoose.model<IUserLinkLib>("UserLinkLib", UserLinkSchema)
export default UserLinkLib