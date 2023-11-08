import {NextResponse} from "next/server";
import Link from "@/app/models/lib-link";

export async function POST(req: Request){
    try {
        const {idUser} = await req.json()

        const LinkLib = await Link.find({idAuthor: idUser})

        return NextResponse.json([...LinkLib]);
    }catch (e) {
        return NextResponse.json({messages: e})
    }
}