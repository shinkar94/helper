import {NextResponse} from "next/server";
import PostCode from "@/app/models/posts-model";

export async function POST(req: Request){
    try {
        const {dataPost, title, author} = await req.json()
        const doc = new PostCode({
            dataCode: dataPost,
            title: title,
            author: author,
            rating: 0
        })
        const post = await doc.save()
        return NextResponse.json(post);
    }catch (e) {
        return NextResponse.json({error: e})
    }
}