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
 * File			: App.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";
import BoardForm from "./pages/BoardForm";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/posts" replace />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route element={<ProtectedRoute />} >
						<Route path="posts" element={<BoardList />} />
						<Route path="posts/new" element={<BoardForm />} />
						<Route path="posts/:id" element={<BoardDetail />} />
						<Route path="posts/:id/edit" element={<BoardForm />} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/posts" replace />} />
			</Routes>
		</BrowserRouter>
	);
}