import React from "react";
import { PostCard } from "../PostCard";
import './styles.css'

export function PostList({posts}) {

  return (
    <section className="posts">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
