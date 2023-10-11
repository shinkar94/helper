import Token from "@/app/models/token-model";


export async function getRefreshToken(id: string){
    try {
        const tokenData = await Token.findOne({user: id})
        return tokenData.refreshToken
    }catch (e) {
        return null
    }
}