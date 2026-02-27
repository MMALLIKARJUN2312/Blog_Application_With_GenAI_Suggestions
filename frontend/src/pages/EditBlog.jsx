import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: ""
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  // Fetch blog on load
  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data } = await API.get(`/blogs/${id}`);
      const cleanText = data.content.replace(/<[^>]*>?/gm, '');
      setFormData({
        title: data.title,
        content: cleanText,
        author: data.author
      });
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      await API.put(`/blogs/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const generateAI = async () => {
    setLoadingAI(true);
    try {
      const { data } = await API.post("/ai-suggestions", formData);
      setSuggestions(data.suggestions);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="container">
      <div className="write-layout">
        <div className="editor-main">
          <h2 style={{ marginBottom: "2rem" }}>Edit your masterpiece</h2>

          <input
            className="input-field"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            className="input-field"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />

          <textarea
            className="input-field"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />

          <button className="btn-primary" onClick={handleUpdate}>
            Update Story
          </button>
        </div>

        <aside className="ai-panel glass-card">
          <h4 style={{ color: "var(--primary)" }}>✨ AI Assistant</h4>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              margin: "1rem 0"
            }}
          >
            Improve your content before updating.
          </p>

          <button
            className="btn-secondary"
            style={{ width: "100%" }}
            onClick={generateAI}
          >
            {loadingAI ? "Thinking..." : "Regenerate Suggestions"}
          </button>

          {suggestions.map((s, i) => (
            <div key={i} className="ai-suggestion-item">
              {s}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default EditBlog;