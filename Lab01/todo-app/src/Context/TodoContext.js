import { createContext, useContext, useState } from "react";


const TodoContext = createContext();

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = ({ children }) => {
    const initialState = [
        {
            id: 1,
            title: "title1",
            status: false
        },
        {
            id: 2,
            title: "title2",
            status: true
        },
        {
            id: 3,
            title: "title3",
            status: false
        }
    ]
    const [todos, setTodos] = useState(initialState);

    const addTodo = (todo) => {
        let newId = todos.length + 1;
        let newTodo = {
            id: newId,
            title: todo,
            status: false
        }
        setTodos(prev => [...prev, newTodo]);
    }

    const updateTodoStatus = (todo) => {
        setTodos(prev => prev.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    status: !item.status
                }
            }
            else {
                return item
            }
        }))
    }

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter((todo) => id !== todo.id));
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodoStatus, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}