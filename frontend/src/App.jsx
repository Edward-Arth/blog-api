import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Authors from "./components/Authors";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/api" element={<Homepage />}/>
            <Route path="/api/signup" element={<Signup/>}/>
            <Route path="/api/login" element={<Login/>}/>
            <Route path="/api/post" element={<Post/>}/>
            <Route path="/api/posts" element={<Posts/>}/>
            <Route path="/api/authors" element={<Authors/>}/>
        </Routes>
    );
};

export default App;