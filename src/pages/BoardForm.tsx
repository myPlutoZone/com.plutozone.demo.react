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
 * File			: BoardForm.tsx
 * Notes		:
 * History		: [NO][Programmer][Description]
 *				: [20261027185600][pluto#plutozone.com][CREATE: Initial Release]
*/
import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api/board";

export default function BoardForm() {
	const { id } = useParams();

	const navigate = useNavigate();

	const isEdit =
		Boolean(id);

	const [title, setTitle] =
		useState("");

	const [content, setContent] =
		useState("");

	const [loading, setLoading] =
		useState(false);

	const [initialLoading, setInitialLoading] =
		useState(isEdit);

	const [error, setError] =
		useState("");

	useEffect(() => {
		if (isEdit && id) {
			loadPost(Number(id));
		}
	}, [id, isEdit]);

	async function loadPost(
		postId: number
	) {
		try {
			const post =
				await getPost(postId);

			setTitle(post.title);
			setContent(post.content);
		} catch {
			setError(
				"게시글을 불러오지 못했습니다."
			);
		} finally {
			setInitialLoading(false);
		}
	}

	async function handleSubmit(
		event: FormEvent<HTMLFormElement>
	) {
		event.preventDefault();

		if (!title.trim()) {
			setError(
				"제목을 입력해주세요."
			);

			return;
		}

		if (!content.trim()) {
			setError(
				"내용을 입력해주세요."
			);

			return;
		}

		setError("");
		setLoading(true);

		try {
			if (isEdit && id) {
				await updatePost(
					Number(id),
					{
						title,
						content,
					}
				);

				alert(
					"게시글이 수정되었습니다."
				);

				navigate(`/posts/${id}`);
			} else {
				const post =
					await createPost({
						title,
						content,
					});

				alert(
					"게시글이 등록되었습니다."
				);

				navigate(`/posts/${post.id}`);
			}
		} catch {
			setError(
				"게시글 저장에 실패했습니다."
			);
		} finally {
			setLoading(false);
		}
	}

	if (initialLoading) {
		return (
			<div className="loading">
				불러오는 중...
			</div>
		);
	}

	return (
		<section>
			<div className="page-header">
				<h1>
					{isEdit
						? "게시글 수정"
						: "게시글 등록"}
				</h1>
			</div>

			<div className="card">
				<form
					onSubmit={handleSubmit}
					className="form"
				>
					<label>
						제목

						<input
							type="text"
							value={title}
							onChange={(e) =>
								setTitle(e.target.value)
							}
							maxLength={200}
							required
						/>
					</label>

					<label>
						내용

						<textarea
							value={content}
							onChange={(e) =>
								setContent(e.target.value)
							}
							rows={15}
							required
						/>
					</label>

					{error && (
						<p className="error">
							{error}
						</p>
					)}

					<div className="form-actions">
						<button
							type="button"
							className="button"
							onClick={() =>
								navigate(-1)
							}
						>
							취소
						</button>

						<button
							type="submit"
							className="button button-primary"
							disabled={loading}
						>
							{loading
								? "저장 중..."
								: "저장"}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}