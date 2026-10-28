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
 * File			: AuthProvider.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthContextValue, Member } from "../types/auth";
import * as authApi from "../api/auth";

const AuthContext =
	createContext<AuthContextValue | undefined>(
		undefined
	);

interface Props {
	children: ReactNode;
}

export function AuthProvider({ children }: Props) {
	const [accessToken, setAccessToken] =
		useState<string | null>(
			localStorage.getItem("accessToken")
		);

	const [member, setMember] =
		useState<Member | null>(() => {
			const savedMember =
				localStorage.getItem("member");

			if (!savedMember) {
				return null;
			}

			try {
				return JSON.parse(savedMember) as Member;
			} catch {
				return null;
			}
		});

	async function login(email: string, password: string) {

		try {
			const result = await authApi.login({email, password});
			
			localStorage.setItem("accessToken"	, result.accessToken);
			localStorage.setItem("member"		, JSON.stringify(result.member));
			setAccessToken(result.accessToken);
			setMember(result.member);
		}
		catch {
			console.log("[9999]실패(접속)");
		}

	}

	async function signup(
		email: string,
		password: string,
		name: string
	) {
		await authApi.signup({
			email,
			password,
			name,
		});
	}

	function logout() {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("member");

		setAccessToken(null);
		setMember(null);
	}

	const value: AuthContextValue = {
		member,
		accessToken,
		isAuthenticated: !!accessToken,
		login,
		signup,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			"useAuth must be used inside AuthProvider"
		);
	}

	return context;
}