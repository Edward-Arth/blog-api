import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const CommentForm = (postId) => {
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
            window.location.reload();
        } else {
            console.error("Server response bad");
        }
    };

    return (
        <Form onSubmit ={handleSubmit} className='commentForm'>
            <Form.Group className="mb-3" controlId="createComm.ControlInput1">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={4} name="content" placeholder="This post gave me an epiphany..." onChange={handleInput}/>
            </Form.Group>
            <div className="subButt"><Button type="submit">Submit</Button></div>
        </Form>
    )
}

export default CommentForm