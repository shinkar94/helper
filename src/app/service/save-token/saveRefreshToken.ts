import {NextResponse} from "next/server";

import mongoose from "mongoose";
import Token from "@/app/models/token-model";


export const SaveRefreshToken = async (id: string, refreshToken: string | undefined) => {
    try {
        const tokenDB = await Token.findOne({user: new mongoose.Types.ObjectId(id)})

        if (tokenDB) {
            tokenDB.refreshToken = refreshToken;
            await tokenDB.save();
        } else {
            const newRefreshToken = new Token({
                user: id,
                refreshToken: refreshToken
            })
            await newRefreshToken.save()
        }
    }catch (e) {
        return NextResponse.json({messages: e})
    }
}