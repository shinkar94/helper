import {NextResponse} from "next/server";
import LinkLib from "@/app/models/lib-link";

export async function POST(req: Request){
    try {
        const {title,code, author, idAuthor} = await req.json()
        console.log(idAuthor)
        const doc = new LinkLib({
            title,
            code,
            author,
            idAuthor
        })

        const link = await doc.save()
        const linkData = link._doc
        return NextResponse.json({ ...linkData });
    }catch (e) {
        return NextResponse.json({messages: e})
    }
}