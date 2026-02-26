// Import Gemini SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key existence
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in environment variables");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate blog suggestions
export const generateSuggestions = async (title, content) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        // WHAT: Build prompt dynamically

        const prompt = `
        You are an expert blog assistant.

        Based on the blog draft below:

        Title: ${title}
        Content: ${content}

        Generate:
        1. Two related blog topic ideas.
        2. One engaging introductory paragraph.

        Return response in clean bullet format.
`;

        // Send request to Gemini
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return text;
        } catch (error) {
            console.error("Gemini Service Error:", error);
            throw new Error("AI generation failed");
        }
};