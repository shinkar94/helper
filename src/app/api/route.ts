import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {checkToken} from "@/app/service/token/checkToken";
import {connectMongoDB} from "@/app/lib/mogodb";


export async function GET(req: Request){
    const accessToken = cookies().get('accessToken')
    await connectMongoDB()
    const data = await checkToken(accessToken)
    return NextResponse.json(data)
}