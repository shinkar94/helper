import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 characters")
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string(),
    fullName: z.string().min(5).max(50)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
})

export type TypeSignInSchema = z.infer<typeof signInSchema>
export type TypeSignUpSchema = z.infer<typeof signUpSchema>



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