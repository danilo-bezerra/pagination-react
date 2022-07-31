import React from "react";
import './styles.css'

export function PostCard({post}) {
    const {image, title, body} = post

  return (
    <div className="post">
      <img src={image} alt={title} />
      <div className="post-content">
        <h3>{title} {post.id}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}
