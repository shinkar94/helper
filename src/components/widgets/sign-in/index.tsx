'use client'
import React, {ChangeEvent, useEffect, useState} from "react";
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
import firebase from '../../../../firebase'

export const SignIn = () => {
    const { initialization } = useAuthStore()
    const loading = useAuthStore((state) => state.loading)
    const {sendGoogleData, googleLogin,sendDataUser, session} = UseAuthUser()
    const [number, setNumber] = useState('')
    const [code, setCode] = useState('')
    const [verificationId, setVerificationId] = useState('');
    const [saveRecaptchaVerifier, setRecaptchaVerifier] = useState<firebase.auth.RecaptchaVerifier | null>(null);
    // const auth = getAuth(app)
    const handleSendCode = () => {
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-button', {
            size: 'invisible',
        });

        firebase.auth().signInWithPhoneNumber(number, recaptchaVerifier)
            .then((verificationId) => {
                setVerificationId(verificationId.verificationId);
                setRecaptchaVerifier(recaptchaVerifier)
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleVerifyCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

        firebase.auth().signInWithCredential(credential)
            .then((userCredential) => {
                userCredential.user?.getIdToken().then((data_token) => {
                    console.log(data_token)
                })
                // console.log(userCredential.user?.getIdToken())
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleResendCode = () => {
        const recaptchaContainer = document.getElementById('recapthca');
        if (recaptchaContainer) {
            recaptchaContainer.innerHTML = '';
            saveRecaptchaVerifier && saveRecaptchaVerifier?.clear()
        }
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recapthca', {
            size: 'invisible',
        });

        firebase.auth().signInWithPhoneNumber(number, recaptchaVerifier)
            .then((verificationId) => {
                setVerificationId(verificationId.verificationId);
            })
            .catch((error) => {
                console.error(error);
            });
    }
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
    const onSetNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setNumber(e.currentTarget.value)
    }
    const onSetCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value)
    }

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
                    <p className={s.authTitle}>Auth with phone</p>
                    <div className={s.phoneAuth}>
                        <div className={s.inputPhoneBlock}>
                            <input type="text" onChange={onSetNumber} value={number} placeholder={"+375332987765"}/>
                            <input type="text" onChange={onSetCode} value={code} placeholder={"SMS Code"}/>
                        </div>
                        <div className={s.btnPhonePanel}>
                            <div className={s.btnPanel}>
                                <button className={s.btnSend} id='send-code-button' onClick={handleSendCode}>Send number</button>
                                <button className={s.btnSend} onClick={handleVerifyCode}>Send code</button>
                            </div>
                            <div className={s.bottomPanel}>
                                <button className={s.btnSend} onClick={handleResendCode}>Resend Code</button>
                            </div>
                        </div>
                        <div className={s.recaptcha} id='recapthca'></div>
                    </div>
                </div>
            </div>
    )
}