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
 * File			: Layout.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Layout() {
	const {
		member,
		isAuthenticated,
		logout,
	} = useAuth();

	return (
		<div className="app">
			<header className="header">
				<div className="header-inner">
					<Link to="/" className="logo">React Board</Link>
					<nav className="nav">
						<Link to="/posts">게시판</Link>

						{isAuthenticated && member ? (
							<>
								<span className="member">{member.name}님</span>
								<button className="button button-small" onClick={logout}>로그아웃</button>
							</>
						) : (
							<>
								<Link to="/login">로그인</Link>
								<Link to="/signup">회원가입</Link>
							</>
						)}
					</nav>
				</div>
			</header>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}