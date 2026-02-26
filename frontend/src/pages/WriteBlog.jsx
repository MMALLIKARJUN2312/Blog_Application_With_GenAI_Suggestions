import { useState } from "react";
import API from "../services/api";
import AISuggestions from "../components/AISuggestions";

const WriteBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [suggestions, setSuggestions] = useState("");
  const [showAI, setShowAI] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateAI = async () => {
    const { data } = await API.post("/ai-suggestions", {
      title: formData.title,
      content: formData.content,
    });

    setSuggestions(data.suggestions);
    setShowAI(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/blogs", formData);
    alert("Blog created!");
  };

  return (
    <div>
      <h2>Write Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content (Markdown supported)"
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
        />

        <button type="button" onClick={generateAI}>
          Generate AI Suggestions
        </button>

        <button type="submit">Publish</button>
      </form>

      <button onClick={() => setShowAI(!showAI)}>
        {showAI ? "Hide AI Suggestions" : "Show AI Suggestions"}
      </button>

      <AISuggestions
        suggestions={suggestions}
        visible={showAI}
        onGenerate={generateAI}
      />
    </div>
  );
};

export default WriteBlog;