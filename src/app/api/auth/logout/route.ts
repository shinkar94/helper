import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET():Promise<NextResponse<{status: boolean}>>{
    const accessToken = cookies().get('accessToken')
    if (accessToken) {
        cookies().set('accessToken', '', { expires: new Date(0) });
    }
    return NextResponse.json({status: true})
}