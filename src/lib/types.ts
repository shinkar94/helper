import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 characters")
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string(),
    fullName: z.string().min(5).max(50).refine(value => /^[a-zA-Zа-яА-Я\s]+$/u.test(value), {
        message: 'The "fullName" field must contain only English and Russian letters',
    }),
    avatarUrl: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
})

export const setLinkLib = z.object({
    title: z.string().refine(value => /^[a-zA-Zа-яА-Я+_ \-]+$/u.test(value), {
        message: 'The "title" field must contain only English and Russian letters or (+,-,_)',
    }),
    code: z.string()
})

export type TypeSignInSchema = z.infer<typeof signInSchema>
export type TypeSignUpSchema = z.infer<typeof signUpSchema>
export type TypeSetLinkLib = z.infer<typeof setLinkLib>



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

export type UserType = {
    id: string,
    email: string ,
    fullName: string,
    avatarUrl: string,
    token: string
}

export type ResponseHotLibType = {
    "title": string,
    "code": string,
    "author": string,
    "idAuthor": string,
    "_id": string,
    "__v": number
}
export type ResponseUserHotLibType = {
    "idUser": string,
    "arrayLibs": string[],
    "_id": string,
    "__v": number
}