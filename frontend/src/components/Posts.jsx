import BasicHeader from "./Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from './Loading'

const Posts = () => {
    const [blogposts, setBlogposts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        await fetch(import.meta.env.VITE_APIKEY + "posts")
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.blogpostList);
            setBlogposts(data.blogpostList)
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="postsCon">
            <BasicHeader/>
            {isLoading ? (
                <Loading/>
            ) : (
            <div className="mapPosts">
                {blogposts.length > 0 && (
                    <ListGroup>
                    {blogposts.map((blogpost) => (
                      <Link key={blogpost._id} to={`/api/post/?id=${blogpost._id}`} className="postLinks">
                        <ListGroup.Item>
                          {blogpost.title}
                          <p><div id="authorInPosts">{blogpost.user.username}</div></p>
                        </ListGroup.Item>
                      </Link>
                    ))}
                  </ListGroup>
                )}
            </div>
            )}
        </div>
    )
}

export default Posts;