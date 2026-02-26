const AISuggestions = ({ suggestions, visible, onGenerate }) => {
  if (!visible) return null;

  return (
    <div style={{ border: "1px solid gray", padding: "10px" }}>
      <h4>AI Suggestions</h4>

      <button onClick={onGenerate}>Generate New Suggestions</button>

      <pre>{suggestions}</pre>
    </div>
  );
};

export default AISuggestions;