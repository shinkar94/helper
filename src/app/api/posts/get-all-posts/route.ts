import {NextResponse} from "next/server";
import {ResponseCodePosts} from "@/lib/types";
import PostCode from "@/app/models/posts-model";

export async function POST(req: Request) {
    try {
        const PostsList: ResponseCodePosts[] | any[] = await PostCode.find();
        if(PostsList){
            return NextResponse.json(PostsList);
        }
    } catch (e) {
        return NextResponse.json({ messages: e });
    }
}