import axiosClient from "./axiosClient";

const userApi = {
    async register(data) {
        const url = "/user/register";
        return axiosClient.post(url, {
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password,
        });
    },

    async login(data) {
        const url = "/auth/login";
        return axiosClient.post(url, {
            email: data.email,
            password: data.password,
        });
    },

    async update(data) {
        const url = "/user";
        return axiosClient.post(url, {
            name: data.name
        });
    },

    async getOneUser(userId) {
        const url = `/user/getone`;
        return axiosClient.get(url, {
            params: {
                _id: userId
            }
        });
    },
};


export default userApi;