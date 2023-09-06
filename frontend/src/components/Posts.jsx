import BasicHeader from "./Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
    const [blogposts, setBlogposts] = useState([]);

    const fetchPosts = async () => {
        await fetch("localhost:8000/api/posts")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setBlogposts(data)
        })
    };

    useEffect(() => {
        fetchPosts();
    });

    return (
        <div className="postsCon">
            <BasicHeader/>
            <div className="mapPosts">
                {blogposts.length > 0 && (
                    <ul>
                        {blogposts.map(blogpost => (
                            <Link key={blogpost._id} to="/api/post" postId={blogpost._id}>
                                <li>{blogpost.title}{blogpost.user.username}</li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Posts;