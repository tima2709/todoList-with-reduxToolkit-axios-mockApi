import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeTodo} from "../../store/todoSlice";


const Modal = ({edit, setEdit}) => {
    const [editText, setEditText] = useState('')
    const todoId = useSelector(state => state.todos.todos.find(item => item.id === edit))
    const dispatch = useDispatch()

    const handleSave = () => {
        const value = {...todoId, text: editText}
        dispatch(changeTodo(value))
        setEditText('')
        setEdit('')
    }
    return (
        <div>
            <button onClick={() => setEdit('')}>X</button>
            <h1>Its modal</h1>
            <input
                type="text"
                defaultValue={todoId?.text || editText.text}
                onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={handleSave}>
                save
            </button>
        </div>
    );
};

export default Modal;