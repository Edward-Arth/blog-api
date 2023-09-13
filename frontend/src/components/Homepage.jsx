import BasicHeader from "./Header";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Homepage = () => {
    const [hasToken, setHasToken] = useState(false);

    const checkToken = () => {
        const storageQuery = sessionStorage.getItem('token');
        if (storageQuery) {
            setHasToken(true);
        }
        return;
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div className="homeBodyCon">
            <BasicHeader />
            {hasToken ? (
                <div className="centerCon">
                    <div className="bubbleCon">Welcome to the React client for my blog API! This is my homepage. Please click a link in the header to see blog posts and authors, fetched from my database with Express.</div>
                    <div className="buttonCaption">
                        Alternatively, you are signed in, so feel free to make your own post!
                        <div className="buttonCon">
                            <Link to="/api/create-post">
                                <Button variant="dark" className="homeButts">Post</Button>
                            </Link>
                        </div>
                    </div>
            </div>
            ) : (
                <div className="centerCon">
                    <div className="bubbleCon">Welcome to the React client for my blog API! This is my homepage. Please click a link in the header to see blog posts and authors, fetched from my database with Express.</div>
                    <div className="buttonCaption">
                        Alternatively, sign up or log in to make your own posts and become an author!
                        <div className="buttonCon">
                            <Link to="/api/signup">
                                <Button variant="dark" className="homeButts">Sign up</Button>
                            </Link>
                            <Link to="/api/login">
                            <Button variant="dark" className="homeButts">Log in</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;