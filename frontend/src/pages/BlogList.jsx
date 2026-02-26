import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await API.get("/blogs");
            setBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading blogs...</p>;

    return (
        <div className="container">
            <div className="page-header">
                <h2>All Blogs</h2>
            </div>

            {blogs.map((blog) => (
                <div key={blog.id} className="card">
                    <h3>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </h3>
                    <p>By: {blog.author}</p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;