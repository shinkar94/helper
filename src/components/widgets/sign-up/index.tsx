'use client'
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema, TypeSignUpSchema, UserResponseType} from "@/lib/types";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useAuthStore} from "@/app/store";
import {toggleInitial, toggleUser} from "@/app/store/authStore";


export const SignUp = () =>{
    // const initialization = useAuthStore((state) => state.initialization)
    //
    // const router = useRouter();
    // useEffect(() => {
    //     console.log("refresh", initialization)
    //     if (initialization) {
    //         router.push('/');
    //     }
    // }, [initialization]);
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TypeSignUpSchema>({resolver: zodResolver(signUpSchema)})

    const onSubmit = async (dataForm: TypeSignUpSchema) => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(dataForm),
                headers: { "Content-Type": "application/json" },
            });
            const data:UserResponseType = await response.json();
            const {_id,email,avatarUrl,fullName} = data
            const user:PayloadType = {id: _id, email, avatarUrl, fullName}
            toggleUser(user)
            toggleInitial(true)
            reset();
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>SignUp</h3>
                {errors.email && (<p>{`${errors.email.message}`}</p>)}
                {errors.password && (<p>{`${errors.password.message}`}</p>)}
                {errors.confirmPassword && (<p>{`${errors.confirmPassword.message}`}</p>)}
                {errors.fullName && (<p>{`${errors.fullName.message}`}</p>)}
                <input type={'text'}
                       {...register('fullName')}
                       placeholder={'fullName'}/>
                <input type={'email'}
                       {...register('email', {
                           required: "Email is required"
                       })}
                       placeholder={'Email'}/>
                <input type={'password'}
                       {...register('password')}
                       placeholder={'Password'}/>
                <input type={'password'}
                       {...register('confirmPassword')}
                       placeholder={'confirmPassword'}/>
                <button type={'submit'} disabled={isSubmitting}>send</button>
            </form>
            <Link href={'/Page/user/signIn'}>Sign In</Link>
        </>
    )
}