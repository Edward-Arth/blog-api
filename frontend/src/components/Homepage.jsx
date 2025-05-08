import BasicHeader from "./Header";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Homepage = () => {
    const [hasToken, setHasToken] = useState(false);

    const wakeupCall = async () => {
        const wakeup = await fetch(import.meta.env.VITE_APIKEY)
        const wakeupMessage = await wakeup.json();
        console.log(wakeupMessage.message);
    }

    const checkToken = () => {
        const storageQuery = sessionStorage.getItem('token');
        if (storageQuery) {
            setHasToken(true);
        }
        return;
    };

    useEffect(() => {
        checkToken();
        wakeupCall();
    }, []);

    return (
        <div className="homeBodyCon">
            <BasicHeader />
            {hasToken ? (
                <div className="centerCon">
                    <div className="bubbleCon">Welcome to Epiphany!</div>
                    <div className="buttonCaption">
                        <div className="buttonCon">
                            <Link to="/api/posts">
                                <Button variant="dark" className="homeButts">Read posts</Button>
                            </Link>
                        </div>
                        or
                        <div className="buttonCon">
                            <Link to="/api/create-post">
                                <Button variant="dark" className="homeButts">Write a post</Button>
                            </Link>
                        </div>
                    </div>
            </div>
            ) : (
                <div className="centerCon">
                    <div className="bubbleCon">Welcome to Epiphany!</div>
                    <div className="buttonCaption">
                        <div className="buttonCon">
                            <Link to="/api/posts">
                                <Button variant="dark" className="homeButts">Read posts</Button>
                            </Link>
                            or
                            <Link to="/api/signup">
                                <Button variant="dark" className="homeButts">Sign up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;