import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", formData);
            login(data.token);
            navigate("/");
        } catch (err) { alert("Invalid credentials"); }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-card">
                <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input-field" type="email" name="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    <input className="input-field" type="password" name="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    <button type="submit" className="btn-primary" style={{width: '100%'}}>Sign In</button>
                </form>
                <p style={{marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>
                    No account? <Link to="/register" style={{color: 'var(--primary)', textDecoration: 'none'}}>Join us</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;