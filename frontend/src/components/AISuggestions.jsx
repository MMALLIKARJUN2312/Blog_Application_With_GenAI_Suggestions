const AISuggestions = ({ suggestions, visible, onGenerate }) => {
  if (!visible) return null;

  return (
    <div className="ai-box">
      <h4>AI Suggestions</h4>

      <button className="secondary" onClick={onGenerate}>Generate New Suggestions</button>

      <pre>{suggestions}</pre>
    </div>
  );
};

export default AISuggestions;