import BasicHeader from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();

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

        setIsLoading(true);

        const response = await fetch(import.meta.env.VITE_APIKEY + "login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            response.json().then(data => {
                if (data && data.token) {
                    sessionStorage.setItem('token', data.token);
                    history('/api');
                } else {
                    console.log("Data missing!")
                }
            })
        } else {
            console.log(response);
        }
    };

    return (
        <div className="signupCon">
            <BasicHeader/>
            {isLoading ? (<Loading/>) : (
            <div>
            <div className="signupTitle">Log in!</div>
            <div className="formCon">
                <Form onSubmit ={handleSubmit}>
                    <Form.Group className="mb-3" controlId="userSignup.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="input" name="username" placeholder="Ernest Hemingway" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlID="userSignup.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="hunter2" onChange={handleInput}/>
                    </Form.Group>
                    <div className="subButt"><Button type="submit">Submit</Button></div>
                </Form>
            </div>
            </div>
            )}
        </div>
    );
};

export default Login;