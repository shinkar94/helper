import NextAuth  from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const handler =  NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXT_JWT_SECRET
})

export { handler as GET, handler as POST}