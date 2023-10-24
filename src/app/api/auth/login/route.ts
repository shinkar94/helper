import {NextResponse} from "next/server";
import {connectMongoDB} from "@/app/lib/mogodb";
import User from "@/app/models/User";
import {userDTO} from "@/app/service/dto/dto";
import {generateToken} from "@/app/service/generate-token/generateToken";
import {SaveRefreshToken} from "@/app/service/save-token/saveRefreshToken";
import bcrypt from "bcrypt";

export type UserType = {
    avatarUrl: string;
    createdAt: string;
    email: string;
    fullName: string;
    token: string;
    updatedAt: string;
    __v: number;
    _id: string;
};
export type ResponseUserType = UserType & {
    token: string
}
export async function POST(req: Request):Promise<NextResponse<ResponseUserType | {message: string}>> {
    const {email, password} = await req.json()
    await connectMongoDB()
    const user = await User.findOne({email: email})
    if (!user) {
        return NextResponse.json({message: 'this email not found!!'})
    }
    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)
    // if (!isValidPass) {
    //     return NextResponse.json({message: 'invalid login or password'})
    // }

    const userDto = userDTO(user)
    const tokens = generateToken(userDto)
    const {refreshToken,token} = tokens
    await SaveRefreshToken(user._id, refreshToken)

    const {passwordHash, ...userData} = user._doc;
    const responseUser:ResponseUserType = {...userData, token}
    return NextResponse.json(responseUser)
}