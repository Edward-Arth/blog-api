import BasicHeader from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { redirect } from "react-router-dom";

const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                console.log("Success!!");
                return redirect("/api");
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div className="signupCon">
            <BasicHeader/>
            <div className="formCon">
                <Form onSubmit ={handleSubmit}>
                    <Form.Group className="mb-3" controlId="userSignup.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="input" placeholder="Ernest Hemingway" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlID="userSignup.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="hunter2" onChange={handleInput}/>
                    </Form.Group>
                    <div className="subButt"><Button type="submit">Submit</Button></div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;