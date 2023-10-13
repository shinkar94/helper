import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 characters")
})

export type TypeSignInSchema = z.infer<typeof signInSchema>



export type UserResponseType = {
    avatarUrl: string;
    createdAt: string;
    email: string;
    fullName: string;
    token: string;
    updatedAt: string;
    __v: number;
    _id: string;
}