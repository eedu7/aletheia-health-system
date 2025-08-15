import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: 10000,
});

export default api;
