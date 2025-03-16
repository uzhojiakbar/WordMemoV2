import {useMutation, useQuery} from "@tanstack/react-query";
import Instance from "./api.jsx";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";


export const useLogin = () => {
    return useMutation({
        mutationFn: async (medicineDara) => {
            console.log("LoginData", medicineDara);
            const response = await Instance.post(
                "auth/login",
                {...medicineDara?.requestData}
            );
            Cookies.set("access_token", response.data?.accessToken);
            Cookies.set("refresh_token", response.data?.refreshToken);
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};


export const useRegister = () => {
    return useMutation({
        mutationFn: async (medicineDara) => {
            console.log("LoginData", medicineDara);
            const response = await Instance.post(
                "auth/register",
                {...medicineDara?.requestData}
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};


export const getUserInfo = () => {
    const accessToken = Cookies.get("access_token") || "";
    const info = accessToken.length ? jwtDecode(accessToken) : null;
    return useQuery({
        queryKey: ["userInfo", info?.id], // 'page' qiymatini kuzatish uchun 'queryKey' dinamik qilingan
        queryFn: async () => {
            if (info) {

                try {
                    const data = await Instance.get(
                        `/user/${info?.phonenumber}`
                    );

                    return data?.data;
                } catch (error) {
                    console.error("Error fetching data", error);
                    throw error; // xatolikni qaytarish
                }
            } else {
                return false
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}




export const GetWords = () => {
    return useQuery({
        queryKey: ["words"], // So‘nggi natijani cache qilish uchun to‘g‘ri nom
        queryFn: async () => {
            try {
                const response = await Instance.get(`/words`);
                console.log(response);
                return response.data; // Javobning faqat `data` qismini olish
            } catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

