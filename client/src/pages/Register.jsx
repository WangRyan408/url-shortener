import { useState } from 'react';
import './Register.css';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './Login';


export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = (e) => {
        e.preventDefault();
        console.log('Form submitted:', data);
    };

    return (
        <div className="form-container">
            <div className="signup-title">
                Sign Up
            </div>

            <form onSubmit={registerUser} className="form">
                {/* Name Input */}
                <div className="input-group name-group">
                    <img
                        className="icon name-icon"
                        src="/usericon.png"
                        alt="Name Logo"
                    />
                    <input
                        className="input name-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>

                {/* Email Input */}
                <div className="input-group email-group">
                    <img
                        className="icon email-icon"
                        src="/emailicon.webp"
                        alt="Email Logo"
                    />
                    <input
                        className="input email-input"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>

                {/* Password Input */}
                <div className="input-group password-group">
                    <img
                        className="icon password-icon"
                        src="/passwordicon.png"
                        alt="Password Logo"
                    />
                    <input
                        className="input password-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                </div>

{/* Register and Login */}
            <div className="auth-actions">
                    <div className="register-text" onClick={registerUser}>
                        Register
                    </div>
                    <div className="login-link">
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </form>

            {/* Routes */}
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}