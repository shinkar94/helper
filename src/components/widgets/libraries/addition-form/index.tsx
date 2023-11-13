import s from './additionForm.module.scss'
import {useForm} from "react-hook-form";
import {ResponseHotLibType, setLinkLib, TypeSetLinkLib} from "@/lib/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/app/store/authStore";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import React from "react";
import {toggleModalWindow} from "@/app/store/switchStore";
import {LibType} from "@/app/store/LibStore";
import {useSWRConfig} from "swr";
import {toast} from "react-toastify";

export const AdditionForm = () =>{
    const {cache,mutate} = useSWRConfig()
    const user: PayloadType = useAuthStore((state) => state.user)
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TypeSetLinkLib>({resolver: zodResolver(setLinkLib)})
    const onSubmit = async (dataForm: TypeSetLinkLib) => {
        try {
            const emailUser = user.email
            const userID = user.id
            const sendData = {...dataForm, author: emailUser, idAuthor: userID}
            const response = await fetch("/api/lib-link", {
                method: "POST",
                body: JSON.stringify(sendData),
                headers: { "Content-Type": "application/json" },
            });
            const data:ResponseHotLibType = await response.json();
            const {title, code,typesCode, author, idAuthor, _id} = data
            const link: LibType = {title, code, typesCode,  author, idAuthor, id: _id}
            const myLib: ResponseHotLibType[] = cache.get('/api/getHotLib')?.data;
            const allLib: ResponseHotLibType[] = cache.get('/api/getAllHotLib')?.data
            if(myLib && myLib.length >= 1){
                cache.set('/api/getHotLib', { data: [...myLib, link] });
                await mutate('/api/getHotLib');
            }
            if(allLib && allLib.length >= 1){
                cache.set('/api/getAllHotLib', { data: [...allLib, link] });
                await mutate('/api/getAllHotLib');
            }
            toast.success('Successfully added to User Link')
            reset();
        } catch (error) {
            toast.error(`${error}`);
        }
    };
    const closeModal = () => {
        toggleModalWindow(false)
    }
    return (
        <div className={s.blockForm}>
            {errors.title && toast.error(`Error in title: ${errors.title.message}`)}
            {errors.code && toast.error(`Error in code init: ${errors.code.message}`)}
            {errors.typesCode && toast.error(`Error in types: ${errors.typesCode.message}`)}
            <button className={s.closeBtn} onClick={closeModal}>X</button>
            <h4>Add new link</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('title')} placeholder={'Title'}/>
                <input type="text" {...register('code')} placeholder={'Code'}/>
                <input type="text" {...register('typesCode')} placeholder={'Types'}/>
                <button type={'submit'} disabled={isSubmitting}>Add</button>
            </form>
        </div>
    )
}