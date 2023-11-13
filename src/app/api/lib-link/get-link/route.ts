import {NextResponse} from "next/server";
import LinkHotLib from "@/app/models/lib-link";
import UserLinkLib from "@/app/models/user-hot-libs";
import {ResponseHotLibType, ResponseUserHotLibType} from "@/lib/types";

export async function POST(req: Request){
    try {
        const {idUser} = await req.json()
        const userLib:ResponseUserHotLibType | any[] = await UserLinkLib.find({idUser})
        let LinkLib: ResponseHotLibType | any[]
        if(userLib){
            const idMyLib = userLib[0].arrayLibs
            LinkLib = await LinkHotLib.find({ _id: { $in: idMyLib } })
            return NextResponse.json([...LinkLib]);
        }else{
            LinkLib = []
            return NextResponse.json([...LinkLib]);
        }
    }catch (e) {
        return NextResponse.json({messages: e})
    }
}