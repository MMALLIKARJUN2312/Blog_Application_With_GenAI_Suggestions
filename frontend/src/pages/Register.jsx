import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-card">
                <h2 className="auth-title">Join the Future</h2>
                <p className="auth-subtitle">Create your account to start sharing stories.</p>

                {error && <p style={{ color: "var(--secondary)", marginBottom: "1rem" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Secure Password"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Create Account
                    </button>
                </form>

                <p style={{ marginTop: '2rem', color: 'var(--text-dim)' }}>
                    Already member? <Link to="/login" className="nav-link" style={{color: 'var(--primary)'}}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;