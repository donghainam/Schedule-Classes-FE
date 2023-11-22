import axios from "axios";

export const HOST_API = "https://sos.joosdigital.com/api";

const handelError = (error: any) => {
    if (error.response) {
        const res = error.response.data?.message || error.response.data?.title;
        throw res;
    }
    if (error.message) {
        throw error.message.toString();
    }

    throw JSON.stringify(error);
};

export const postService = async (
    url: string,
    body: any,
    authentication = true
) => {
    try {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");
        const headers = {
            Accept: "application/json ",
            "Content-Type": "application/json",
            ...(localToken || (sessionToken && authentication)
                ? {
                    Authorization: "Bearer " + (localToken || sessionToken),
                }
                : {}),
        };
        axios.defaults.withCredentials = false;

        const response = await axios.post(
            `${HOST_API + url}`,
            JSON.stringify(body),
            { headers }
        ); console.log("Check response: ", response.data);
        if (response.status >= 200 && response.status <= 210) {
            console.log("Check response: ", response.data);
            return response.data;
        }
    } catch (error: any) {
        throw handelError(error);
    }
};

export const getService = async (url: string, params?: any) => {
    try {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localToken || sessionToken
                ? {
                    Authorization: "Bearer " + (localToken || sessionToken),
                }
                : {}),
        };

        let queryString = "";
        if (params) {
            queryString = `?${Object.keys(params)
                .filter((k) => !!params[k])
                .map((key) => `${key}=${params[key] || ""}`)
                .join("&")}`;
        }
        const response = await axios.get(
            `${HOST_API}${url}${encodeURI(queryString)}`,
            {
                headers,
                withCredentials: true,
            }
        );
        if (response.status >= 200 && response.status <= 210) {
            return response.data;
        }
    } catch (error: any) {
        throw handelError(error);
    }
};

export const putService = async (url: string, body: any) => {
    try {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const headers = {
            Accept: "application/json ",
            "Content-Type": "application/json",
            ...(localToken || sessionToken
                ? {
                    Authorization: "Bearer " + (localToken || sessionToken),
                }
                : {}),
        };

        const response = await axios.put(
            `${HOST_API + url}`,
            JSON.stringify(body),
            {
                headers: headers,
                withCredentials: true,
            }
        );

        if (response.status >= 200 && response.status <= 210) {
            return response.data;
        }
    } catch (error: any) {
        if (error.response) {
            const res = error.response.data?.message || error.response.data?.title;
            throw res;
        }
        throw JSON.stringify(error);
    }
};

export const deleteService = async (url: string, body?: any) => {
    try {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localToken || sessionToken
                ? {
                    Authorization: "Bearer " + (localToken || sessionToken),
                }
                : {}),
        };

        const response = await axios.delete(`${HOST_API + url}`, {
            headers: headers,
            withCredentials: true,
            data: body,
        });
        if (response.status >= 200 && response.status <= 210) {
            return response.data;
        }
    } catch (error: any) {
        if (error.response) {
            const res = error.response.data?.message || error.response.data?.title;
            throw res;
        }
        throw JSON.stringify(error);
    }
};