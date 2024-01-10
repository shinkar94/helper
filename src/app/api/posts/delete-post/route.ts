import {NextResponse} from "next/server";
import PostCode from "@/app/models/posts-model";


export async function POST(req: Request){
    try {
        const {idPost} = await req.json()
        const response = await PostCode.deleteOne({_id: idPost})
        if("acknowledged" in response){
            return NextResponse.json(response.acknowledged ? {success: 'Successfully remotely'} : {error: 'error in api'});
        }
        // console.log(response)
        // return NextResponse.json({success: 'Successfully remotely'});
    }catch (e) {
        return NextResponse.json({error: `${e}`})
    }
}