import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const {data} = await axios('https://648da9b72de8d0ea11e81919.mockapi.io/info')
            // console.log(data, 'data')
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {rejectWithValue, dispatch}){
        try {
            const todo = {
                text: text,
                completed: false
            }

            const {data} = await axios.post('https://648da9b72de8d0ea11e81919.mockapi.io/info', todo)

            dispatch(addTodo(data))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.delete(`https://648da9b72de8d0ea11e81919.mockapi.io/info/${id}`)
            // console.log(data, 'deleteData')
            dispatch(removeTodo({id}))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function (id,{rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(el => el.id === id)
        try {
            const data = await axios.put(`https://648da9b72de8d0ea11e81919.mockapi.io/info/${id}`, {completed: !todo.completed})
            // console.log(data)
            dispatch(toggleTodoComplete({id}))
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const changeTodo = createAsyncThunk(
    'todos/changeTodo',
    async function (getEdit, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.put(`https://648da9b72de8d0ea11e81919.mockapi.io/info/${getEdit.id}`, getEdit)
            console.log(data)
            dispatch(editTodo(data.data))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        },
        editTodo(state, action) {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
        }
    },
    extraReducers: {
        [getTodos.pending]: (state) => {
            state.status = 'resolved';
            state.error = null
        },
        [getTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [getTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

export const {addTodo, removeTodo, toggleTodoComplete, editTodo} = todoSlice.actions;

export default todoSlice.reducer