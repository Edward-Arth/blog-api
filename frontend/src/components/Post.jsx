import BasicHeader from "./Header";
import { useEffect, useState } from "react";

const Post = () => {
    const [blogpost, setBlogpost] = useState('');

    let postId;

    useEffect(() => {
        const getUrlPost = new URLSearchParams(window.location.search);
        const postParam = getUrlPost.get("id");
        postId = postParam;
    }, []);
    
    const fetchPost = async () => {
        await fetch(import.meta.env.VITE_APIKEY + `post/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            setBlogpost(data)
        })
    };

    useEffect(() => {
        fetchPost()
    }, [postId]);

    return (
        <div className="postViewCon">
            <BasicHeader/>
            {blogpost ? (
            <div className="postStart">
                <div className="postTitle">
                    {blogpost.post.title}
                </div>
                <div className="postAuthor">
                    {blogpost.post.user.username}
                </div>
                {blogpost.decodedToken && blogpost.post.user._id === blogpost.decodedToken.id ? (
                    <div>Edit and delete</div>
                ) : (
                    <div>Like</div>
                )}
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
            ) : null }
        </div>
    )
}

export default Post;