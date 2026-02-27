import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import API from "../services/api";

const BlogDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => { fetchBlog(); }, [id]);

    const fetchBlog = async () => {
        const { data } = await API.get(`/blogs/${id}`);
        setBlog(data);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

        if (!confirmDelete) return;

        try {
            await API.delete(`/blogs/${blog.id}`);
            navigate("/");
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete blog");
        }
    };

    if (!blog) return <div className="container"><h3>Loading story...</h3></div>;

    const cleanContent = blog.content
        .replace(/<\/?p>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&#39;/g, "'");

    return (
        <div className="container">
            <header className="detail-header">
                <h1 className="hero-title" style={{ textAlign: 'left' }}>{blog.title}</h1>
                <div className="post-meta">
                    <strong>{blog.author}</strong>{new Date(blog.created_at).toDateString()}
                </div>
            </header>

            <article className="blog-content">{cleanContent}</article>

            <footer className="post-actions">
                <Link to={`/edit/${blog.id}`}><button className="btn-secondary icon-btn"><Pencil size={18} />Edit Post</button></Link>
                <button className="btn-danger icon-btn" onClick={handleDelete}><Trash2 size={18} />Delete</button>
            </footer>
        </div>
    );
};

export default BlogDetail;