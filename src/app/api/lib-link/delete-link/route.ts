import {NextResponse} from "next/server";
import LinkHotLib from "@/app/models/lib-link";
import UserLinkLib, {ResponseUserHotLibType} from "@/app/models/user-hot-libs";
import {ResponseHotLibType} from "@/lib/types";

export async function POST(req: Request){
    try {
        const {idUser, idLink} = await req.json()
        const linkLib:ResponseHotLibType | any[] = await LinkHotLib.find({_id: idLink})
        const userLibs: ResponseUserHotLibType[] = await UserLinkLib.find({
            arrayLibs: { $in: [idLink] }
        });
        if(linkLib.length >= 1 && linkLib[0].idAuthor === idUser){
            await LinkHotLib.deleteOne({_id: idLink});
            for (const userLib of userLibs) {
                userLib.arrayLibs = userLib.arrayLibs.filter(lib => lib !== idLink);
                await userLib.save();
            }
            return NextResponse.json({success: 'Successfully remotely'});
        }else{
            return NextResponse.json({error: 'You cannot delete a link that does not belong to you'});
        }
    }catch (e) {
        return NextResponse.json({error: `${e}`})
    }
}