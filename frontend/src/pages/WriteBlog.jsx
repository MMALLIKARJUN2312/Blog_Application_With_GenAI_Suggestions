import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const WriteBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", content: "", author: "" });
    const [suggestions, setSuggestions] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePublish = async () => {
        try {
            await API.post("/blogs", formData);
            navigate("/");
        } catch (error) {
            console.error("Publish failed:", error);
        }
    };

    const generateAI = async () => {
        setLoadingAI(true);
        try {
            const { data } = await API.post("/ai-suggestions", formData);
            setSuggestions(data.suggestions);
        } finally { setLoadingAI(false); }
    };

    return (
        <div className="container">
            <div className="write-layout">
                <div className="editor-main">
                    <h2 style={{ marginBottom: '2rem' }}>Draft your masterpiece</h2>
                    <input className="input-field" name="title" placeholder="Enter a striking title" onChange={handleChange} />
                    <input className="input-field" name="author" placeholder="Author name" onChange={handleChange} />
                    <textarea className="input-field" name="content" placeholder="Tell your story..." onChange={handleChange} />
                    <button className="btn-primary" onClick={handlePublish}>Publish Story</button>
                </div>

                <aside className="ai-panel glass-card">
                    <h4 style={{ color: 'var(--primary)' }}>✨ AI Assistant</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '1rem 0' }}>Stuck? Let the AI help you out.</p>
                    <button className="btn-secondary" style={{ width: '100%' }} onClick={generateAI}>
                        {loadingAI ? "Thinking..." : "Get Suggestions"}
                    </button>
                    {suggestions.map((s, i) => (
                        <div key={i} className="ai-suggestion-item">{s}</div>
                    ))}
                </aside>
            </div>
        </div>
    );
};

export default WriteBlog;