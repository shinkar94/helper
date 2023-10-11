import {useRouter} from "next/router";

export const useRefreshPage = () => {
    const router = useRouter();

    const refreshPage = () => {
        router.push('/Page/user/signUp');
    };

    return {refreshPage};
};
