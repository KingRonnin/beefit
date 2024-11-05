import { useAuthStore } from "../store/auth.js";
import axios from "./axios.js";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post("user/token/", {
            email,
            password,
        });

        if (status === 200) {
            setAuthUser(data.access, data.refresh);

            Toast.fire({
                icon: "success",
                title: "Signed in successfully",
            });
        }

        return { data, error: null };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {
                data: null,
                error: "Invalid email or password",
            };
        }
    }
};

export const register = async (email, password, password2) => {
    try {
        const { data } = await axios.post("user/register/", {
            email,
            password,
            password2,
        });

        await login(email, password);

        Toast.fire({
            icon: "success",
            title: "Signed Up Successfully",
        });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: "Something went wrong",
        };
    }
};

export const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    useAuthStore.getState().setUser(null);

    Toast.fire({
        icon: "success",
        title: "You have been logged out.",
    });
};

export const setUser = async () => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set("access_token", access_token, {
        expires: 1,
        secure: true,
    });

    Cookies.set("refresh_token", refresh_token, {
        expires: 7,
        secure: true,
    });

    const user = jwt_decode(access_token) ?? null;

    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get("refresh_token");
    const response = await axios.post("user/token/refresh/", {
        refresh: refresh_token,
    });

    return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true;
    }
};

export const setStrengthExercise = async (sets, reps, weight, date) => {
    try {
        const { data } = await axios.post("post/exercise/strength", {
            sets,
            reps,
            weight,
            date,
        });

        Toast.fire({
            icon: "success",
            title: "Logged Workout",
        });

        return { date, error : null };
    } catch (error) {
        return {
            data: null,
            error: "Something went wrong"
        };
    }
};

// export const setCardioExercise = async (steps, time, date) => {
//     try {
//         const { data } = await axios.post("post/exercise/cardio", {
//             steps,
//             time,
//             date,
//         });

//         Toast.fire({
//             icon: "success",
//             title: "Logged Workout",
//         });

//         return { date, error : null };
//     } catch (error) {
//         return {
//             data: null,
//             error: "Something went wrong"
//         };
//     }
// };


// export const register = async (email, password, password2) => {
//     try {
//         const { data } = await axios.post("user/register/", {
//             email,
//             password,
//             password2,
//         });

//         await login(email, password);

//         Toast.fire({
//             icon: "success",
//             title: "Signed Up Successfully",
//         });

//         return { data, error: null };
//     } catch (error) {
//         return {
//             data: null,
//             error: "Something went wrong",
//         };
//     }
// };
