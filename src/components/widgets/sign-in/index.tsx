'use client'
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchema, TypeSignInSchema} from "@/lib/types";
import Link from "next/link";
import {useAuthStore} from "@/app/store";
import s from './signIn.module.scss';
import Image from "next/image";
import Gear from "@/components/shared/icon/shes1.png";
import {GoogleIcon} from "@/components/shared";
import {UseAuthUser} from "@/components/shared/hok";
import {Loader} from "@/components/entities";
import {toast} from "react-toastify";


export const SignIn = () => {
    const { initialization } = useAuthStore()
    const loading = useAuthStore((state) => state.loading)
    const {sendGoogleData, googleLogin,sendDataUser, session} = UseAuthUser()

    useEffect(() => {
        if (session && session.user?.email && initialization === false) {
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
        await sendDataUser(dataForm)
        reset();
    };

    return (
        loading ? <Loader/> :
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
                        {errors.email && toast.error(`${errors.email.message}`)}
                        {errors.password && toast.error(`${errors.password.message}`)}
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
                        <div className={s.googleBtn} onClick={googleLogin}><GoogleIcon/><p>Registration with
                            Google</p></div>
                    </div>
                </div>
            </div>
    )
}