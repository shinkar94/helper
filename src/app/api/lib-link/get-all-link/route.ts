import {NextResponse} from "next/server";
import Link from "@/app/models/lib-link";
import {ResponseHotLibType} from "@/lib/types";

export async function GET(req: Request){
    try {
        const LinkLib: ResponseHotLibType[] | null = await Link.find()

        return NextResponse.json([...LinkLib]);
    }catch (e) {
        return NextResponse.json({messages: e})
    }
}