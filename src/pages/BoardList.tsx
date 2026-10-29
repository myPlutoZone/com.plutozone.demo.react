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
 * File			: BoardList.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/board";
import type { PageResponse, Post } from "../types/board";

export default function BoardList() {
	const [data, setData] =
		useState<PageResponse<Post> | null>(
			null
		);

	const [page, setPage] =
		useState(0);

	const [loading, setLoading] =
		useState(true);

	const [error, setError] =
		useState("");

	useEffect(() => {
		loadPosts();
	}, [page]);

	async function loadPosts() {
		setLoading(true);
		setError("");

		try {
			const result =
				await getPosts(page, 10);

			setData(result);
		} catch {
			setError(
				"게시글을 불러오지 못했습니다."
			);
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return (
			<div className="loading">
				게시글을 불러오는 중입니다...
			</div>
		);
	}

	return (
		<section>
			<div className="page-header">
				<div>
					<h1>게시판</h1>
					<p>
						자유롭게 글을 작성할 수 있습니다.
					</p>
				</div>

				<Link
					to="/posts/new"
					className="button button-primary"
				>
					글쓰기
				</Link>
			</div>

			{error && (
				<div className="error-box">
					{error}
				</div>
			)}

			<div className="card">
				{data?.items.length === 0 ? (
					<div className="empty">
						등록된 게시글이 없습니다.
					</div>
				) : (
					<table className="board-table">
						<thead>
							<tr>
								<th>번호</th>
								<th>제목</th>
								<th>작성자</th>
								<th>작성일</th>
							</tr>
						</thead>

						<tbody>
							{data?.items.map(
								(post) => (
									<tr key={post.id}>
										<td>{post.id}</td>

										<td>
											<Link
												to={`/posts/${post.id}`}
											>
												{post.title}
											</Link>
										</td>

										<td>
											{post.authorName}
										</td>

										<td>
											{new Date(
												post.createdAt
											).toLocaleDateString(
												"ko-KR"
											)}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				)}
			</div>

			{data && data.totalPages > 0 && (
				<div className="pagination">
					{Array.from(
						{
							length: data.totalPages,
						},
						(_, index) => (
							<button
								key={index}
								className={
									index === page
										? "page active"
										: "page"
								}
								onClick={() =>
									setPage(index)
								}
							>
								{index + 1}
							</button>
						)
					)}
				</div>
			)}
		</section>
	);
}