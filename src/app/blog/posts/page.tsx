"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getPosts() {
			const res = await fetch("/api/blog/posts");
			const data = await res.json();
			setPosts(data.posts);
			console.log(data.posts)
		}
		getPosts();
		async function getPost() {
			const res = await fetch("/api/blog/posts/70944115c0064432ab9181b4a5a04f5f");
			const data = await res.json();
			console.log(data)
		}
		getPost()
	}, []);
  
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<h1>ブログ一覧</h1>
			<ul>
				{posts?.map((post: any) => (
					<li key={post.id} className="mb-3">
						<Link href={`/blog/posts/${post.id}`}>
							<p>タイトル：{post.properties.title.title[0].plain_text}</p>
						</Link>
						<p>更新日：{post.properties.updated_at.last_edited_time}</p>
						{post.properties.tag.multi_select.length
							? post.properties.tag.multi_select?.map((tag: any) => (
									<p key={tag.id}>タグ：{tag.name}</p>
								))
							: "タグ："}
					</li>
				))}
			</ul>
		</div>
	);
}
