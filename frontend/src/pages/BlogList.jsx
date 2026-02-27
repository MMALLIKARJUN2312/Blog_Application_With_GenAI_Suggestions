import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchBlogs(); }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await API.get("/blogs");
            setBlogs(data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    if (loading) return <div className="container"><h2>Fetching stories...</h2></div>;

    return (
        <div className="container">
            <header className="hero-section">
                <h1 className="hero-title">The Future of <br/>Writing is Here.</h1>
                <p className="hero-subtitle">Experience a new era of AI-powered blogging.</p>
            </header>

            <div className="blog-grid">
                {blogs.map(blog => (
                    <article key={blog.id} className="post-card glass-card">
                        <Link to={`/blog/${blog.id}`} style={{textDecoration: 'none'}}>
                            <h2 className="post-title">{blog.title}</h2>
                        <p className="post-preview">
                            {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                        </p>
                        <div className="post-meta">
                            <span style={{color: 'var(--primary)'}}>{blog.author}</span>
                        </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogList;