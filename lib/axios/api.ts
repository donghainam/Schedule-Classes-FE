import axios, { AxiosResponse } from "axios";

// export const HOST_API = "http://localhost:8080/api";
// export const HOST_API = process.env.NEXT_PUBLIC_HOST_API + "/api";
export const HOST_API = "https://scheduleclasses.azurewebsites.net/api";


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
        );
        if (response.status >= 200 && response.status <= 210) {
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

export const getServicePagination = async <T>(
    url: string,
    params?: any
): Promise<{ data: T; total: number }> => {
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
            return { data: response.data, total: response.headers["x-total-count"] };
        }
        throw `Some thing went wrong`;
    } catch (error: any) {
        throw handelError(error);
    }
};

export const downloadService = async (
    url: string,
    params?: any
) => {
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
                .map((key) => `${key}=${params[key] || ""}`)
                .join("&")}`;
        }

        const response = await axios.get(
            `${HOST_API}${url}${encodeURI(queryString)}`,
            {
                headers,
                responseType: 'blob', // Set responseType to 'blob' to handle binary data
                withCredentials: true,
            }
        );
        if (response.status >= 200 && response.status <= 210) {
            return response;
        }
        throw `Some thing went wrong`;
    } catch (error: any) {
        throw handelError(error);
    }
}

export const importService = async (url: string, data: any) => {
    const fileList = data.fileList;
    if (fileList.length === 0) return;

    const formData = new FormData();
    fileList.forEach((file: any) => {
        formData.append('file', file.originFileObj);
    });
    try {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const headers = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            ...(localToken || sessionToken
                ? {
                    Authorization: "Bearer " + (localToken || sessionToken),
                }
                : {}),
        };
        const response = await axios.post(`${HOST_API}${url}`, formData, {
            headers,
        });
        if (response.status >= 200 && response.status <= 210) {
            return response;
        }
        throw `Some thing went wrong`;
    } catch (error: any) {
        throw handelError(error);
    }
}