import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, deleteTodo, getTodos, toggleStatus} from "./store/todoSlice";
import DeleteIcon from "./components/icons/delete-icon";
import EditIcon from "./components/icons/edit-icon";
import Modal from "./components/modal/Modal";

function App() {
    const [text, setText] = useState('')
    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState('')
    const addTask = () => {
        dispatch(addNewTodo(text))
        setText('')
    }

    useEffect(() => {
        dispatch(getTodos())
    }, [])


    return (
        <div className="App">
            <div className={'addTask'}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <div>
                {
                    todos.map(el =>
                        <div key={el.id} className={`tasks ${el.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={el.completed}
                                onChange={() => dispatch(toggleStatus(el.id))}
                            />
                            <div>
                                <h3>{el.text}</h3>
                            </div>
                            <div className={'icons-btn'}>
                                { !el.completed &&
                                    <button onClick={() => setEdit(el.id)}><EditIcon/></button>
                                }
                                <button onClick={() => dispatch(deleteTodo(el.id))}><DeleteIcon/></button>
                            </div>
                        </div>
                    )
                }
                {edit &&
                    <Modal edit={edit} setEdit={setEdit}/>
                }
            </div>
        </div>
    );
}

export default App;
