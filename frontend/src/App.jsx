import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import WriteBlog from "./pages/WriteBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/" className="brand">Blogs With GenAI</Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" className="nav-link">Explore</Link>
        {user ? (
          <>
            <Link to="/write"><button className="btn-primary">Write</button></Link>
            <button className="btn-secondary" onClick={logout}>Exit</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register"><button className="btn-primary">Join</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;