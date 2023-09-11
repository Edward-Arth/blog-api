import BasicHeader from "./Header";
import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import Loading from './Loading'

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAuthors = async () => {
        setIsLoading(true);
        await fetch(import.meta.env.VITE_APIKEY + "authors")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setAuthors(data.userList)
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <div className="authorsCon">
            <BasicHeader/>
            {isLoading ? (
                <Loading/>
            ) : (
            <div className="mapAuthors">
                {authors.length > 0 && (
                    <ListGroup>
                        {authors.map(author => (
                            <ListGroup.Item key={author._id}>
                                <b>{author.username}</b>
                                {author.posts.length > 0 ? (
                                    <div><p>Pinned Post:</p> <p><Link className="trendingLink" to={`/api/post?id=${author.posts[0]._id}`}>{author.posts[0].title}</Link></p></div>
                                ) : <p>No posts yet!</p>}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
            )}
        </div>
    )
}

export default Authors;