'use client'
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchema, TypeSignInSchema, UserResponseType} from "@/lib/types";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import Link from "next/link";
import {useAuthStore} from "@/app/store";
import s from './signIn.module.scss';
import Image from "next/image";
import Gear from "@/components/shared/icon/shes1.png";
import {GoogleIcon} from "@/components/shared";
import {UseAuthUser} from "@/components/shared/hok";


export const SignIn = () =>{
    const initialization = useAuthStore((state) => state.initialization)
    const {sendGoogleData, googleLogin, session} = UseAuthUser()

    useEffect(()=>{
        if(session && session.user?.email && initialization === false){
            sendGoogleData(session.user.email)
        }
    }, [session])

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
            reset();
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div className={s.wrapperAuth}>
            <div className={s.auth}>
                <div className={s.mehanics}>
                    <div className={s.shet1}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet2}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet3}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet4}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet5}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet6}><Image src={Gear} alt="Gear" priority/></div>
                </div>
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
                    <div className={s.btnPanel}>
                        <Link href={'/Page/user/sign-up'}>Sign Up</Link>
                        <button type={'submit'} disabled={isSubmitting}>Send</button>
                    </div>
                </form>
                <div className={s.googleAuth}>
                    <div className={s.googleBtn} onClick={googleLogin}><GoogleIcon/><p>Registration with Google</p></div>
                </div>
            </div>
        </div>
    )
}