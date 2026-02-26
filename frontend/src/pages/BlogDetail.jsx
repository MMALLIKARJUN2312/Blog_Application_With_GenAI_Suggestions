import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        const { data } = await API.get(`/blogs/${id}`);
        setBlog(data);
    };

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="card">
                <h2>{blog.title}</h2>
                <p>By: {blog.author}</p>

                {/* Render HTML safely */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
        </div>
    );
};

export default BlogDetail;