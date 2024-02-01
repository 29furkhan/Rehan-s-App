import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="login-header card-header text-center">
                            <h4>Login to App</h4>
                        </div>
                        <div className="card-body login-body">
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    value={username}
                                    type="text"
                                    className="form-control login-input"
                                    id="username"
                                    placeholder="Enter your username"
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    value={password}
                                    type="password"
                                    className="form-control login-input"
                                    id="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <br />
                            <button
                                onClick={() => onLogin(username, password)}
                                className="login-btn btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;