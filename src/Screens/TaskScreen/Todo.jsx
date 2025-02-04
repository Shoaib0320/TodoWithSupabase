import React, { useEffect, useState } from 'react';
import { supabase } from '../../Config/SupabaseConfig';
import './Todo.css';

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    const fetchTodos = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', user.id);
        if (error) console.error(error);
        else setTodos(data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);


    const addTodo = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase
            .from('todos')
            .insert([{ task: newTask, user_id: user.id }]);
        if (error) console.error(error);
        else {
            setNewTask('');
            fetchTodos();
        }
    };

    const toggleComplete = async (id, isCompleted) => {
        const { error } = await supabase
            .from('todos')
            .update({ is_completed: !isCompleted })
            .eq('id', id);
        if (error) console.error(error);
        else fetchTodos();
    };

    const deleteTodo = async (id) => {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);
        if (error) console.error(error);
        else fetchTodos();
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">Todo List</h1>
            <div className='todo-div'>
                <input
                    className="todo-input"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button className="todo-button" onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span
                            className={`todo-text ${todo.is_completed ? 'completed' : ''}`}
                            onClick={() => toggleComplete(todo.id, todo.is_completed)}
                        >
                            {todo.task}
                        </span>
                        <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
