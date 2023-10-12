'use client'
import useSWR from "swr";
import {getUserData} from "@/app/api/api-query/getUserData";

export const SignIn = () =>{
    // const { data, isLoading, error } = useSWR("/api", getUserData);

    return(
        <>
            <form>
                <h3>SignIn</h3>
                <input type={'text'} placeholder={'Email'}/>
                <input type={'text'} placeholder={'Password'}/>
                <button type={'submit'}>send</button>
            </form>
        </>
    )
}
// "zod": "^3.21.4"
// "react-hook-form": "^7.45.4",


// 'use client'
// import {z} from 'zod';
// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {useLoginMutation} from "@/app/api-query/api-query";
// import {authAction} from "@/reducer/auth.slice";
// import {useAppDispatch, useAppSelector} from "@/hok/hoks";
// import {authSelectors} from "@/selectors/Selectors";
// import Image from "next/image";
// import {S} from '@/components/user/signIn/siginInStyle'
//
// const signInSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(3)
// });
// type SignInFormShem = z.infer<typeof signInSchema>
// export const SignInPage = () => {
//     const dispatch = useAppDispatch()
//     const userData = useAppSelector(authSelectors)
//     const {getUser} = authAction
//     const [login] = useLoginMutation()
//     const onSubmit = async (values: SignInFormShem) => {
//         try {
//             const response = await login(values)
//             if ('data' in response) {
//                 const {email, avatarUrl, fullName, token, _id} = response.data
//                 dispatch(getUser({email, avatarUrl, fullName, token, id: _id}))
//             }
//         } catch (e) {
//             console.log(e)
//         }
//
//     }
//
//     const {register, handleSubmit} = useForm<SignInFormShem>({resolver: zodResolver(signInSchema)})
//     const handleSubmitForm = handleSubmit(onSubmit)
//     return (
//         <S.SignInBlock>
//             <form onSubmit={handleSubmitForm}>
//                 {userData.avatarUrl && <Image src={userData.avatarUrl} alt={'avatar'} width="60" height="60"/>}
//                 {userData.avatarUrl && <span>{userData.fullName}</span>}
//                 <h3>SignIn</h3>
//                 <input {...register('email')} type={'email'} placeholder={'Login...'}/>
//                 <input {...register('password')} type={'password'} placeholder={'Password...'}/>
//                 <button>send</button>
//             </form>
//         </S.SignInBlock>
//     )
// }