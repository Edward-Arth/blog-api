import BasicHeader from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const CreatePost = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_APIKEY + "post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                response.json().then(data => {
                    if (data && data.result._id) {
                        navigate(`/api/post?id=${data.result._id}`)
                    } else {
                        throw "Data missing!"
                    }
                })
            } else {
                throw "Login expired!"
            }
        } catch (error) {
            console.error("Error:", error);
            localStorage.clear('token');
            navigate('/api/login');
        }
    };

    return (
        <div className="createPostCon">
            <BasicHeader/>
            {isLoading ? (
                <Loading/>
            ) : (
            <div>
                <div className="signupTitle">Create your post!</div>
                <div className="formCon">
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group className="mb-3" controlId="createPost.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="input" name="title" placeholder="Why I love being a dev" onChange={handleInput}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlID="createPost.ControlInput2">
                            <Form.Label>Post</Form.Label>
                            <Form.Control as="textarea" name="content" rows={5} placeholder="It all started when I was a boy..." onChange={handleInput}/>
                        </Form.Group>
                        <div className="subButt"><Button type="submit">Submit</Button></div>
                    </Form>
                </div>
            </div>
            )}
        </div>
    )
};

export default CreatePost;