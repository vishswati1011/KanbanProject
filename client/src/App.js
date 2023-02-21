import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "../src/component/Comment";
import Task from "./component/Task/Task";
import ListKanban from "./component/Listview/ListKanban";
import Login from "../src/component/Login";
import Listview from "../src/component/Listview/Listview"
import View from "../src/component/Listview/view"
import Kanban from '../src/component/kanban/Task'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dnd' element={<Listview/>}/>
                <Route path='/list' element={<ListKanban/>} />
                <Route path='/view' element={<View />} />
               
                <Route path='/tasks' element={<Task />} />
                <Route path='/kanban' element={<Kanban />} />


                <Route path='/comments/:category/:id' element={<Comments />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;