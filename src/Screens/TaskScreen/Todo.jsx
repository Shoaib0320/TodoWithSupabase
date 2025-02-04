import React, { useEffect, useState } from 'react';
import { supabase } from '../../Config/SupabaseConfig';
import './Todo.css';

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchTodos = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', user.id);
        if (error) console.error(error);
        else setTodos(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!newTask.trim()) return;
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase
            .from('todos')
            .insert([{ task: newTask, user_id: user.id }]);
        if (error) console.error(error);
        else {
            setNewTask('');
            fetchTodos();
        }
        setLoading(false);
    };

    const toggleComplete = async (id, isCompleted) => {
        setLoading(true);
        const { error } = await supabase
            .from('todos')
            .update({ is_completed: !isCompleted })
            .eq('id', id);
        if (error) console.error(error);
        else fetchTodos();
        setLoading(false);
    };

    const deleteTodo = async (id) => {
        setLoading(true);
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);
        if (error) console.error(error);
        else fetchTodos();
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };


    return (
        <div className="todo-container">
            <div className='todo-main'>
                <h1 className="todo-title">Todo List</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className='todo-div'>
                <input
                    className="todo-input"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button className="todo-button" onClick={addTodo} disabled={loading}>
                    {
                        loading ?
                            'Submitting.....'
                            :
                            'Add'
                    }
                </button>
            </div>
            {loading && <div className="loader"></div>}
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
