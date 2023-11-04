'use client'
import React, {useEffect} from "react";
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
    const {googleLogin,signOutGoogle, session} = UseAuthUser()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        setValue
    } = useForm<TypeSignUpSchema>({resolver: zodResolver(signUpSchema)})

    useEffect(() => {
        setValue("fullName", session?.user?.name || "");
        setValue("email", session?.user?.email || "");
    }, [session]);
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
                    <div className={s.shet1}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet2}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet3}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet4}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet5}><Image src={Gear} alt="Gear" priority/></div>
                    <div className={s.shet6}><Image src={Gear} alt="Gear" priority/></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>SignUp</h3>
                    {errors.email && (<p>{`${errors.email.message}`}</p>)}
                    {errors.password && (<p>{`${errors.password.message}`}</p>)}
                    {errors.confirmPassword && (<p>{`${errors.confirmPassword.message}`}</p>)}
                    {errors.fullName && (<p>{`${errors.fullName.message}`}</p>)}
                    <input type={!!(session && session.user) ? 'hidden' : 'text'}
                           {...register('fullName')}
                           placeholder={'Full Name'}/>
                    <input type={!!(session && session.user) ? 'hidden' : 'email'}
                           {...register('email', {
                               required: "Email is required"
                           })}
                           placeholder={'Email'}/>
                    <input type={'password'}
                           {...register('password')}
                           placeholder={'Password'}/>
                    <input type={'password'}
                           {...register('confirmPassword')}
                           placeholder={'Confirm Password'}/>
                    <div className={s.btnPanel}>
                        <Link href={'/'}>Sign In</Link>
                        <button type={'submit'} disabled={isSubmitting}>Send</button>
                    </div>
                </form>
                <div className={s.googleAuth}>
                    {
                        session && session.user
                            ? <div className={s.googleBtn} onClick={signOutGoogle}>
                                <Image src={session?.user?.image ?? ''} width={'30'} height={'30'} alt={'googleImage'} priority/>
                                <p>
                                    Leave session  {
                                    session.user.email && session.user.email?.length > 10
                                    ? session.user.email.slice(0, 10) + '...'
                                    : session.user.email
                                    }
                                </p>
                            </div>
                            : <div className={s.googleBtn} onClick={googleLogin}><GoogleIcon/><p>Registration with Google</p></div>
                    }
                </div>
            </div>
        </div>
    )
}