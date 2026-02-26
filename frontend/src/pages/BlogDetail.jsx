import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => { fetchBlog(); }, [id]);

    const fetchBlog = async () => {
        const { data } = await API.get(`/blogs/${id}`);
        setBlog(data);
    };

    if (!blog) return <div className="container"><h3>Loading story...</h3></div>;

    return (
        <div className="container">
            <header className="detail-header">
                <h1 className="hero-title" style={{textAlign: 'left'}}>{blog.title}</h1>
                <div className="post-meta">
                    <strong>{blog.author}</strong> • {new Date(blog.created_at).toDateString()}
                </div>
            </header>

            <article className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

            <footer className="post-actions">
                <Link to={`/edit/${blog.id}`}><button className="btn-secondary">Edit Post</button></Link>
                <button className="btn-danger">Delete</button>
            </footer>
        </div>
    );
};

export default BlogDetail;