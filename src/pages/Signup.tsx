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
 * File			: Signup.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Signup() {
	const navigate = useNavigate();
	const { signup } = useAuth();

	const [name, setName] =
		useState("플루토");

	const [email, setEmail] =
		useState("pluto@plutozone.com");

	const [password, setPassword] =
		useState("12345678");

	const [passwordConfirm, setPasswordConfirm] =
		useState("12345678");

	const [error, setError] =
		useState("");

	const [loading, setLoading] =
		useState(false);

	async function handleSubmit(
		event: FormEvent<HTMLFormElement>
	) {
		event.preventDefault();

		setError("");

		if (password !== passwordConfirm) {
			setError(
				"암호가 일치하지 않습니다."
			);

			return;
		}

		setLoading(true);

		try {
			await signup(
				email,
				password,
				name
			);

			alert(
				"회원가입이 완료되었습니다."
			);

			navigate("/login");
		} catch {
			setError(
				"회원가입에 실패했습니다."
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="auth-page">
			<div className="card auth-card">
				<h1>회원가입</h1>
				<form
					onSubmit={handleSubmit}
					className="form"
				>
					<label>
						이름

						<input
							type="text"
							value={name}
							onChange={(e) =>
								setName(e.target.value)
							}
							required
						/>
					</label>

					<label>
						이메일

						<input
							type="email"
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
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
							minLength={8}
							required
						/>
					</label>

					<label>
						암호 확인

						<input
							type="password"
							value={passwordConfirm}
							onChange={(e) =>
								setPasswordConfirm(
									e.target.value
								)
							}
							minLength={8}
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
							? "가입 중..."
							: "회원가입"}
					</button>
				</form>

				<div className="auth-footer">
					이미 계정이 있으신가요?{" "}
					<Link to="/login">
						로그인
					</Link>
				</div>
			</div>
		</section>
	);
}