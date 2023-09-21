import BasicHeader from "./Header";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import CommentForm from "./Comment";
import { AiFillEdit, AiFillDelete, AiFillLike, AiOutlineLike  } from 'react-icons/ai';

const Post = () => {
    const navigate = useNavigate();
    const [blogpost, setBlogpost] = useState('');
    const [liked, setLiked] = useState(false);
    const postId = useRef('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [checkDelete, setCheckDelete] = useState(false);

    useEffect(() => {
        const getUrlPost = new URLSearchParams(window.location.search);
        const postParam = getUrlPost.get("id");
        postId.current = postParam;
    }, []);
    
    const fetchPost = async () => {
        let blogpostData;
        if (sessionStorage.getItem('token')) {
            const postResponse = await fetch(import.meta.env.VITE_APIKEY + `post/${postId.current}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            const postData = await postResponse.json();
            setBlogpost(postData);
            setFormData({title: postData.post.title, content: postData.post.content});
            blogpostData = postData;

            const userResponse = await fetch(import.meta.env.VITE_APIKEY + `author/${blogpostData.decodedToken.id}`)
            const userData = await userResponse.json();

            if(userData.user.likes.includes(postId.current)) {
                setLiked(true);
            }
        } else {
            await fetch(import.meta.env.VITE_APIKEY + `post/${postId.current}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setBlogpost(data)
            });
        }
    };

    const likeOnClick = async () => {
        const response = await fetch(import.meta.env.VITE_APIKEY + `post/${postId.current}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            setLiked(true);
            return;
        } else {
            console.error("Something went wrong!");
        }
    };

    const unlikeOnClick = async () => {
        const response = await fetch(import.meta.env.VITE_APIKEY + `post/${postId.current}/unlike`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            setLiked(false);
            return;
        } else {
            console.error("Something went wrong!");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_APIKEY + `post/${postId.current}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });
            if(response.ok) {
                setEditMode(false);
                fetchPost();
            } else {
                throw "Edit failed!"
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleDelete = async () => {
        await fetch(import.meta.env.VITE_APIKEY + `post/${postId.current}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        navigate("/api/posts");
    };

    const editOnClick = () => {
        setEditMode(true);
    };

    useEffect(() => {
        fetchPost()
    }, []);

    return (
        <div className="postViewCon">
            <BasicHeader/>
            {blogpost ? (
                editMode ? (
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group className="mb-3" controlId="editPost.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="input" name="title" value={formData.title} onChange={handleInput}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlID="editPost.ControlInput2">
                            <Form.Label>Post</Form.Label>
                            <Form.Control as="textarea" name="content" rows={5} value={formData.content} onChange={handleInput}/>
                        </Form.Group>
                        <div className="subButt"><Button type="submit">Submit</Button></div>
                    </Form>
                ) : (
            <div className="postStart">
                <div className="postTitle">
                    {blogpost.post.title}
                </div>
                <div className="postAuthor">
                    {blogpost.post.user.username}
                </div>

                <div className="postContent" dangerouslySetInnerHTML={{ __html: blogpost.post.content.replace(/\n/g, '<br>') }}></div>

                {blogpost.decodedToken ? (
                    blogpost.post.user._id === blogpost.decodedToken.id ? (
                        <div className="engageButtsCon">
                            <AiFillEdit className="engageButts" onClick={editOnClick}>Edit</AiFillEdit>
                            {checkDelete ? 
                                (<div className="sureCon"><div className="questionCon">Delete?</div><div className="engageButts-container"><div className="engageButts" onClick={handleDelete}>Yes</div><div className="engageButts" onClick={() => setCheckDelete(false)}>No</div></div></div>) 
                                : 
                                (<AiFillDelete className="engageButts" onClick={() => setCheckDelete(true)}>Delete</AiFillDelete>)}
                        </div>
                    ) : (
                        liked ? 
                        <div className="likeCon">
                            <AiFillLike className="engageButts" onClick={unlikeOnClick}/>
                        </div>
                        :
                        <div className="likeCon">
                            <AiOutlineLike className="engageButts" onClick={likeOnClick}/>
                        </div> 
                    )
                ) : null}

                <div className="postComments">
                    <div className="comments-header">Comments</div>
                    <ul className="comments-ul">
                        {blogpost.comments.map(comment => (
                            <li className="comments-li" key={comment.id}><div className="commentUser">{comment.user.username}</div><div className="commentContent">{comment.content}</div></li>
                        ))}
                    </ul>
                </div>
                {sessionStorage.getItem('token') ? (<CommentForm postId={postId.current}/>) : null}
            </div>
                )
            ) : null }
        </div>
    )
}

export default Post;