import {NextResponse} from "next/server";
import Link from "@/app/models/lib-link";
import {ResponseHotLibType} from "@/lib/types";

export async function GET(req: Request) {
    try {
        const LinkLib: ResponseHotLibType[] | any[] = await Link.find();
        if(LinkLib){
            return NextResponse.json([...LinkLib]);
        }
    } catch (e) {
        return NextResponse.json({ messages: e });
    }
}