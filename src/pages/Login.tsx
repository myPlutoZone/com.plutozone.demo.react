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
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();

	const { login } = useAuth();

	const [email, setEmail] =
		useState("pluto@plutozone.com");

	const [password, setPassword] =
		useState("1234");

	const [error, setError] =
		useState("");

	const [loading, setLoading] =
		useState(false);

	async function handleSubmit(
		event: FormEvent<HTMLFormElement>
	) {
		event.preventDefault();

		setError("");
		setLoading(true);

		try {
			await login(email, password);
			const from = location.state?.from?.pathname || "/posts";
			navigate(from, {replace: true});
		}
		catch {
			setError(
				"이메일 또는 암호가 올바르지 않습니다."
			);
		}
		finally {
			setLoading(false);
		}
	}	

	return (
		
		<section className="auth-page">
			<div className="card auth-card">
				<h1>로그인</h1>

				<form
					onSubmit={handleSubmit}
					className="form"
				>
					<label>
						이메일

						<input
							type="email"
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
							/* placeholder="email@example.com" */
							required
						/>
					</label>

					<label>
						암호

						<input
							type="password"
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
							/* placeholder="암호" */
							required
						/>
					</label>

					{error && (
						<p className="error">
							{error}
						</p>
					)}

					<button
						type="submit"
						className="button button-primary"
						disabled={loading}
					>
						{loading
							? "로그인 중..."
							: "로그인"}
					</button>
				</form>

				<div className="auth-footer">
					계정이 없으신가요?{" "}
					<Link to="/signup">
						회원가입
					</Link>
				</div>
			</div>
		</section>
	);
}