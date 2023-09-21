import { useState, useEffect } from "react";
import BasicHeader from "./Header";
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from './Loading'
import { Link } from "react-router-dom";

const MyLikes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [likes, setLikes] = useState();

    const fetchLikes = async () => {
        setIsLoading(true);
        const getResponse = await fetch(import.meta.env.VITE_APIKEY + "likes", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const likeData = await getResponse.json();
        setLikes(likeData.userLikes.likes);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchLikes();
    }, []);

    return (
        <div className="likesCon">
            <BasicHeader/>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="mapLikes">
                    {likes && likes.length > 0 ? (
                        <ListGroup>
                            {likes.map(like => (
                                <ListGroup.Item key={like._id}>
                                    <Link className="liked-post-links" to={`/api/post/?id=${like._id}`}>
                                        <b>{like.title}</b>
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : <p>No likes yet!</p>}
                </div>
            )}
        </div>
    )
}

export default MyLikes;