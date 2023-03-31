import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "../src/component/Comment";
import Login from "../src/component/Login";import Task from "./component/Task/Task";
import Kanban from '../src/component/kanban/Task'



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/kanban' element={<Kanban />} />
                 <Route path='/tasks' element={<Task />} />
                <Route path='/comments/:category/:id' element={<Comments />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;