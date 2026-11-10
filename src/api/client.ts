/**
 * YOU ARE STRICTLY PROHIBITED TO COPY, DISCLOSE, DISTRIBUTE, MODIFY OR USE THIS PROGRAM IN PART OR AS A WHOLE WITHOUT THE PRIOR WRITTEN CONSENT OF PLUTOZONE.COM.
 * PLUTOZONE.COM OWNS THE INTELLECTUAL PROPERTY RIGHTS IN AND TO THIS PROGRAM.
 * COPYRIGHT (C) 2026 PLUTOZONE.COM ALL RIGHTS RESERVED.
 *
 * plutozone.com의 사전 서면 동의 없이 본 문서의 전부 또는 일부를 복사, 공개, 배포, 수정하거나 사용하는 행위는 엄격히 금지됩니다.
 * 본 문서에 대한 지적재산권은 plutozone.com이 보유하고 있습니다.
 * Copyright (C) 2026 plutozone.com All Rights Reserved.
 *
 *
 * Program		: com.plutozone.demo.react
 * Description	:
 * Environment	: react 19.2.8 or more
 * File			: client.ts
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import axios from "axios";

const BACKEND_API_URL_BASE = import.meta.env.URL_API_BACKEND || "https://api.example.com";

export const api = axios.create({
	baseURL: BACKEND_API_URL_BASE,
	headers: {
		"Content-Type": "application/json",
	},
});

export function messageErrorApi(
	error: unknown,
	fallback = "요청 처리 중 오류가 발생했습니다!"
): string {
	if (!axios.isAxiosError(error)) {
		return fallback;
	}

	// 401은 요청을 보낸 화면에서 상황에 맞게 처리
	if (error.response?.status === 401) {
		return fallback;
	}

	if (!error.response) {
		if (error.code === "ECONNABORTED") {
			return "요청 시간이 초과되었습니다! 잠시 후 다시 시도해 주세요!";
		}
		return "서버에 연결할 수 없습니다! 잠시 후 다시 시도해 주세요!";
	}

	switch (error.response.status) {
		case 403:
			return "요청을 처리할 권한이 없습니다!";
		case 404:
			return "요청한 정보를 찾을 수 없습니다!";
		case 409:
			return "이미 처리되었거나 현재 상태와 충돌하는 요청입니다!";
		case 429:
			return "요청이 너무 많습니다! 잠시 후 다시 시도해 주세요!";
		default:
			if (error.response.status >= 500) {
				return "서버 오류가 발생했습니다! 잠시 후 다시 시도해 주세요!";
			}
			return fallback;
	}
}

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("member");
		}

		return Promise.reject(error);
	}
);