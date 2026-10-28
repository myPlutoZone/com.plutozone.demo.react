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
 * File			: auth.ts
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import { api } from "./client";
import type { LoginRequest, LoginResponse, SignupRequest, Member } from "../types/auth";

export async function login(request: LoginRequest): Promise<LoginResponse> {
	const response = await api.post<LoginResponse> (
		"/api/v1/member/login.jsp", request
		// "/auth/login", request
	);

	return response.data;
}

export async function signup(request: SignupRequest): Promise<void> {
	await api.post("/auth/signup", request);
}

export async function getMe(): Promise<Member> {
	const response = await api.get<Member>("/auth/me");

	return response.data;
}