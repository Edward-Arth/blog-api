import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Authors from "./components/Authors";
import CreatePost from "./components/CreatePost"
import { Navigate, Route, Routes } from "react-router-dom";
import MyLikes from "./components/MyLikes";
import MyPosts from "./components/MyPosts";

const App = () => {
    return (
        <Routes>
            <Route path="/api" element={<Homepage />}/>
            <Route path="/api/signup" element={<Signup/>}/>
            <Route path="/api/login" element={<Login/>}/>
            <Route path="/api/post" element={<Post/>}/>
            <Route path="/api/posts" element={<Posts/>}/>
            <Route path="/api/authors" element={<Authors/>}/>
            <Route path="/api/create-post" element={<CreatePost/>}/>
            <Route path="/" element={<Navigate to="/api"/>}/>
            <Route path="/api/my-likes" element={<MyLikes/>}/>
            <Route path="/api/my-posts" element={<MyPosts/>}/>
        </Routes>
    );
};

export default App;