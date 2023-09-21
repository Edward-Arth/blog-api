import BasicHeader from "./Header";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from './Loading'
import { AiFillHeart } from 'react-icons/ai';
import he from "he";

const Posts = () => {
    const [blogposts, setBlogposts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const hearts = useRef([]);

    const fetchPosts = async () => {
        setIsLoading(true);
        if(sessionStorage.getItem('token')) {
            const likesGet = await fetch(import.meta.env.VITE_APIKEY + 'likes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const postsGet = await fetch(import.meta.env.VITE_APIKEY + "posts");

            const likesData = await likesGet.json();
            const postsData = await postsGet.json();

            hearts.current = [];
            likesData.userLikes.likes.forEach(like => {
                hearts.current.push(like._id);
            });

            setBlogposts(postsData.blogpostList);

            setIsLoading(false);

            return;
        } else {
            const postsGet = await fetch(import.meta.env.VITE_APIKEY + "posts");
            const postsData = await postsGet.json();
            setBlogposts(postsData.blogpostList);
            setIsLoading(false);
            return;
        }
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
                          {he.decode(blogpost.title)}
                          <p><div id="authorInPosts">{blogpost.user.username}</div></p>
                          {hearts.current.includes(blogpost._id) ? (<AiFillHeart/>) : (null)}
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