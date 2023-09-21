import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentForm = (postId) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        content: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentResponse = await fetch(import.meta.env.VITE_APIKEY + `post/${postId.postId}/commPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(formData),
        });
        if (commentResponse.ok) {
            navigate(0)
        } else {
            console.error("Server response bad");
        }
    };

    return (
        <Form onSubmit ={handleSubmit} className='commentForm'>
            <Form.Group className="mb-3" controlId="createComm.ControlInput1">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" name="content" placeholder="This post gave me an epiphany..." onChange={handleInput}/>
            </Form.Group>
            <div className="subButt"><Button type="submit">Submit</Button></div>
        </Form>
    )
}

export default CommentForm