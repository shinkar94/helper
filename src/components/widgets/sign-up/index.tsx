'use client'
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema, TypeSignUpSchema, UserResponseType} from "@/lib/types";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import Link from "next/link";
import {toggleInitial, toggleUser} from "@/app/store/authStore";
import Image from "next/image";
import Gear from "../../shared/icon/shes1.png"
import s from './signUp.module.scss'
import {GoogleIcon} from "@/components/shared";
import {UseAuthUser} from "@/components/shared/hok";


export const SignUp = () => {
    const {googleLogin, session} = UseAuthUser()
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
                headers: {"Content-Type": "application/json"},
            });
            const data: UserResponseType = await response.json();
            const {_id, email, avatarUrl, fullName} = data
            const user: PayloadType = {id: _id, email, avatarUrl, fullName}
            toggleUser(user)
            toggleInitial(true)
            reset();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={s.wrapperAuth}>
            <div className={s.auth}>
                <div className={s.mehanics}>
                    <div className={s.shet1}><Image src={Gear} alt="Gear"/></div>
                    <div className={s.shet2}><Image src={Gear} alt="Gear"/></div>
                    <div className={s.shet3}><Image src={Gear} alt="Gear"/></div>
                    <div className={s.shet4}><Image src={Gear} alt="Gear"/></div>
                    <div className={s.shet5}><Image src={Gear} alt="Gear"/></div>
                    <div className={s.shet6}><Image src={Gear} alt="Gear"/></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>SignUp</h3>
                    {errors.email && (<p>{`${errors.email.message}`}</p>)}
                    {errors.password && (<p>{`${errors.password.message}`}</p>)}
                    {errors.confirmPassword && (<p>{`${errors.confirmPassword.message}`}</p>)}
                    {errors.fullName && (<p>{`${errors.fullName.message}`}</p>)}
                    <input type={'text'}
                           {...register('fullName')}
                           placeholder={'Full Name'}
                           disabled={!!(session && session.user)}
                            value={session && session.user ? session.user.name || '' : ''}/>
                    <input type={'email'}
                           {...register('email', {
                               required: "Email is required"
                           })}
                           placeholder={'Email'}
                           disabled={!!(session && session.user)}
                            value={session && session.user ? session.user.email || '' : ''}/>
                    <input type={'password'}
                           {...register('password')}
                           placeholder={'Password'}/>
                    <input type={'password'}
                           {...register('confirmPassword')}
                           placeholder={'Confirm Password'}/>
                    <div className={s.btnPanel}>
                        <Link href={'/Page/user/signIn'}>Sign In</Link>
                        <button type={'submit'} disabled={isSubmitting}>Send</button>
                    </div>
                </form>
                <div className={s.googleAuth}>
                    <div className={s.googleBtn} onClick={googleLogin}><GoogleIcon/><p>Registration with Google</p>
                    </div>
                </div>
            </div>
        </div>
    )
}