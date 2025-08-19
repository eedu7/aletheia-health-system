import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
	timeout: 10000,
});

api.interceptors.response.use((response) => {
	response.data = camelcaseKeys(response.data, { deep: true });
	return response;
});

export default api;
