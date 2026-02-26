import { generateSuggestions } from "../services/geminiService.js";

// AI Suggestions Controller
export const aiSuggestionsController = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const suggestions = await generateSuggestions(title, content);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Gemini LLM error:", error);
    res.status(500).json({ message: "AI generation failed" });
  }
};