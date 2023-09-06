import BasicHeader from "./Header";
import { useEffect, useState } from "react";

const Post = (postId) => {
    const [blogpost, setBlogpost] = useState('');

    const fetchPost = async () => {
        await fetch(`localhost:8000/api/post/${postId}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setBlogpost(data)
        })
    };

    useEffect(() => {
        fetchPost()
    },);

    return (
        <div className="postViewCon">
            <BasicHeader/>
            <div className="postStart">
                <div className="postTitle">
                    {blogpost.post.title}
                </div>
                <div className="postAuthor">
                    {blogpost.post.user.username}
                </div>
                <div className="postContent">
                    {blogpost.post.content}
                </div>
                <div className="postComments">
                    <ul>
                        {blogpost.comments.map(comment => (
                            <li key={comment.id}>{comment.content}{comment.user.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Post;