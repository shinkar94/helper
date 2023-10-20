'use client'
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchema, TypeSignInSchema, UserResponseType} from "@/lib/types";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useAuthStore} from "@/app/store";
import {toggleUser} from "@/app/store/authStore";


export const SignIn = () =>{
    const initialization = useAuthStore((state) => state.initialization)

    const router = useRouter();
    useEffect(() => {
        if (initialization) {
            router.push('/');
        }
    }, []);
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TypeSignInSchema>({resolver: zodResolver(signInSchema)})

    const onSubmit = async (dataForm: TypeSignInSchema) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(dataForm),
                headers: { "Content-Type": "application/json" },
            });
            const data:UserResponseType = await response.json();
            const {_id,email,avatarUrl,fullName} = data
            const user:PayloadType = {id: _id, email, avatarUrl, fullName}
            toggleUser(user)
            reset();
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>SignIn</h3>
                {errors.email && (<p>{`${errors.email.message}`}</p>)}
                {errors.password && (<p>{`${errors.password.message}`}</p>)}
                <input type={'email'}
                       {...register('email', {
                           required: "Email is required"
                       })}
                       placeholder={'Email'}/>
                <input type={'password'}
                       {...register('password')}
                       placeholder={'Password'}/>
                <button type={'submit'} disabled={isSubmitting}>send</button>
            </form>
            <Link href={'/Page/user/signUp'}>Sign Up</Link>
        </>
    )
}