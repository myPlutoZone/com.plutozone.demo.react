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
 * File			: Login.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import axios from "axios";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
	const navigate			= useNavigate();
	const location			= useLocation();
	const { login }			= useAuth();

	const [email, setEmail]			= useState("pluto@plutozone.com");
	const [password, setPassword]	= useState("12345678");

	const [error, setError]		= useState("");
	const [loading, setLoading]	= useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");
		setLoading(true);

		try {
			await login(email, password);
			const from = location.state?.from?.pathname || "/posts";
			navigate(from, {replace: true});
		}
		catch (error: unknown) {
			if (!axios.isAxiosError(error)) {
				setError("알 수 없는 오류가 발생했습니다!");
			}
			else if (!error.response) {
				// 서버 응답 자체가 없음(인터넷 연결, 서버 중단, CORS, 타임아웃 등)
				setError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요!");
			}
			else if (error.response.status === 401) {
				// 백엔드가 로그인 실패를 401로 반환한다는 계약이 필요
				setError("이메일 또는 암호가 올바르지 않습니다!");
			}
			else if (error.response.status >= 500) {
				setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요!");
			}
			else {
				setError("로그인 처리 중 오류가 발생했습니다!");
			}
			// setError("이메일 또는 암호가 올바르지 않습니다.");
		}
		finally {
			setLoading(false);
		}
	}	

	return (
		<section className="auth-page">
			<div className="card auth-card">
				<h1>로그인</h1>
				<form onSubmit={handleSubmit} className="form">
					<label>
						이메일
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /* placeholder="email@example.com" */ required />
					</label>
					<label>
						암호
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /* placeholder="암호" */ required />
					</label>
					{error && (<p className="error">{error}</p>)}
					<button type="submit" className="button button-primary" disabled={loading}>
						{loading ? "로그인 중..." : "로그인"}
					</button>
				</form>

				<div className="auth-footer">
					계정이 없으신가요?{" "}
					<Link to="/signup">회원가입</Link>
				</div>
			</div>
		</section>
	);
}