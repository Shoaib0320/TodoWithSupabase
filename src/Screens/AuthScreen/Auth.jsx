import React, { useState } from 'react';
import { supabase } from '../../Config/SupabaseConfig';
import './Auth.css'; // CSS file ko import karo

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert('Check your email for the confirmation link!'), console.log('Error Araha hai', error);
        ;
    };

    return (
        <div className="container">
            <h1>Login / Sign Up</h1>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
}