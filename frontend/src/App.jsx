import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/api" element={<Homepage />}/>
            <Route path="/api/signup" element={<Signup/>}/>
        </Routes>
    );
};

export default App;