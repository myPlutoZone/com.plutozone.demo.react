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
 * File			: BoardDetail.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../api/board";
import { useAuth } from "../contexts/AuthProvider";
import type { Post } from "../types/board";

export default function BoardDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { member } = useAuth();

	const [post, setPost] =
		useState<Post | null>(null);

	const [loading, setLoading] =
		useState(true);

	const [error, setError] =
		useState("");

	useEffect(() => {
		if (id) {
			loadPost(Number(id));
		}
	}, [id]);

	async function loadPost(
		postId: number
	) {
		try {
			const result =
				await getPost(postId);

			setPost(result);
		} catch {
			setError(
				"게시글을 찾을 수 없습니다."
			);
		} finally {
			setLoading(false);
		}
	}

	async function handleDelete() {
		if (!post) {
			return;
		}

		if (
			!window.confirm(
				"게시글을 삭제하시겠습니까?"
			)
		) {
			return;
		}

		try {
			await deletePost(post.id);

			alert(
				"게시글이 삭제되었습니다."
			);

			navigate("/posts");
		} catch {
			alert(
				"게시글 삭제에 실패했습니다."
			);
		}
	}

	if (loading) {
		return (
			<div className="loading">
				불러오는 중...
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="error-box">
				{error}
			</div>
		);
	}

	const isAuthor =
		member?.id === post.authorId;

	return (
		<section>
			<div className="card">
				<div className="post-header">
					<h1>{post.title}</h1>

					<div className="post-meta">
						<span>
							작성자: {post.authorName}
						</span>

						<span>
							{new Date(
								post.createdAt
							).toLocaleString("ko-KR")}
						</span>
					</div>
				</div>

				<div className="post-content">
					{post.content}
				</div>

				<div className="post-actions">
					<Link
						to="/posts"
						className="button"
					>
						목록
					</Link>

					{isAuthor && (
						<>
							<Link
								to={`/posts/${post.id}/edit`}
								className="button"
							>
								수정
							</Link>

							<button
								className="button button-danger"
								onClick={handleDelete}
							>
								삭제
							</button>
						</>
					)}
				</div>
			</div>
		</section>
	);
}