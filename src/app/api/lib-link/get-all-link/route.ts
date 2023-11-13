import {NextResponse} from "next/server";
import LinkHotLib from "@/app/models/lib-link";
import {ResponseHotLibType} from "@/lib/types";

export async function POST(req: Request) {
    try {
        const LinkLib: ResponseHotLibType[] | any[] = await LinkHotLib.find();
        if(LinkLib){
            return NextResponse.json([...LinkLib]);
        }
    } catch (e) {
        return NextResponse.json({ messages: e });
    }
}