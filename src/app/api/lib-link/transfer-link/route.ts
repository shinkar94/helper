import {NextResponse} from "next/server";
import UserLinkLib from "@/app/models/user-hot-libs";
import {ResponseHotLibType, ResponseUserHotLibType} from "@/lib/types";
import LinkLib from "@/app/models/lib-link";

export async function POST(req: Request){
    try {
        const {idLink, idUser} = await req.json()

        const getUserLib: ResponseUserHotLibType | null = await UserLinkLib.findOne({ idUser: idUser });
        const getLinkLib: ResponseHotLibType | null = await LinkLib.findOne({ _id: idLink });
        let updatedArrayLibs: string[] = [];
        if (getUserLib) {
            const arrayLibs = getUserLib.arrayLibs;
            updatedArrayLibs = [...arrayLibs, idLink];
            // update existing userLib
            await UserLinkLib.updateOne({ idUser: idUser }, { arrayLibs: updatedArrayLibs });
        } else {
            updatedArrayLibs = [idLink];
            // create new userLib
            const userLib = new UserLinkLib({
                idUser: idUser,
                arrayLibs: updatedArrayLibs
            });
            await userLib.save();
        }
        return NextResponse.json(getLinkLib);
    }catch (e) {
        return NextResponse.json({error: e})
    }
}