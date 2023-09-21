import { useState, useEffect } from "react";
import BasicHeader from "./Header";
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from './Loading'
import { Link } from "react-router-dom";

const MyPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [myPosts, setMyPosts] = useState();

    const fetchMyPosts = async () => {
        setIsLoading(true);
        const getResponse = await fetch(import.meta.env.VITE_APIKEY + "user-posts", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const myPostsData = await getResponse.json();
        setMyPosts(myPostsData.userPosts.posts);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    return (
        <div className="likesCon">
            <BasicHeader/>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="mapLikes">
                    {myPosts && myPosts.length > 0 ? (
                        <ListGroup>
                            {myPosts.map(post => (
                                <ListGroup.Item key={post._id}>
                                    <Link className="liked-post-links" to={`/api/post/?id=${post._id}`}>
                                        <b>{post.title}</b>
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : <p>No posts yet!</p>}
                </div>
            )}
        </div>
    )
}

export default MyPosts;