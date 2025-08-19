declare namespace NodeJs {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";

		NEXT_PUBLIC_API_BASE_URL: string;
		NEXT_PUBLIC_AFTER_SIGN_IN_URL: string;
		NEXT_PUBLIC_AFTER_SIGN_UP_URL: string;
		NEXT_PUBLIC_AFTER_SIGN_OUT_URL: string;
	}
}
