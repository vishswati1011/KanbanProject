import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "../src/component/Comment";
import Task from "./component/Task/Task";
import Login from "../src/component/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/tasks' element={<Task />} />
                <Route path='/comments/:category/:id' element={<Comments />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;