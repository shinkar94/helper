import s from './additionForm.module.scss'
import {useForm} from "react-hook-form";
import {ResponseHotLibType, setLinkLib, TypeSetLinkLib} from "@/lib/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/app/store/authStore";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import React from "react";
import {toggleModalWindow} from "@/app/store/switchStore";
import {addOneLink, LibType} from "@/app/store/LibStore";

export const AdditionForm = () =>{
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
            const {title, code, author, idAuthor, _id} = data
            const link: LibType = {title, code, author, idAuthor, id: _id}
            addOneLink(link)
            reset();
        } catch (error) {
            console.log(error);
        }
    };
    const closeModal = () => {
        toggleModalWindow(false)
    }
    return (
        <div className={s.blockForm}>
            {errors.title && (<p>{`${errors.title.message}`}</p>)}
            <button className={s.closeBtn} onClick={closeModal}>X</button>
            <h4>Add new link</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('title')} placeholder={'Title'}/>
                <input type="text" {...register('code')} placeholder={'Code'}/>
                <button type={'submit'} disabled={isSubmitting}>Add</button>
            </form>
        </div>
    )
}