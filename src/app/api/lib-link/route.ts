import {NextResponse} from "next/server";
import LinkLib from "@/app/models/lib-link";
import UserLinkLib from "@/app/models/user-hot-libs";
import {ResponseHotLibType, ResponseUserHotLibType} from "@/lib/types";

export async function POST(req: Request){
    try {
        const {title,code, author, idAuthor} = await req.json()
        // send linkLibs
        const doc = new LinkLib({
            title,
            code,
            author,
            idAuthor
        })
        const link = await doc.save()
        const linkData: ResponseHotLibType = link._doc
        // get userLibs
        const getUserLib: ResponseUserHotLibType | null = await UserLinkLib.findOne({ idUser: idAuthor });
        let updatedArrayLibs: string[] = [];
        if (getUserLib) {
            const arrayLibs = getUserLib.arrayLibs;
            updatedArrayLibs = [...arrayLibs, linkData._id];
            // update existing userLib
            await UserLinkLib.updateOne({ idUser: idAuthor }, { arrayLibs: updatedArrayLibs });
        } else {
            updatedArrayLibs = [linkData._id];
            // create new userLib
            const userLib = new UserLinkLib({
                idUser: idAuthor,
                arrayLibs: updatedArrayLibs
            });
            await userLib.save();
        }
        return NextResponse.json({ ...linkData });
    }catch (e) {
        return NextResponse.json({messages: e})
    }
}