import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Blogs = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [blogs, setBlogs] = useState();
    const sendRequrest = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/api/blogs");
            const data = await res.data;
            console.log(data)
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    };
    useEffect(() => {
        sendRequrest().then((res) => setBlogs(res.blogs));
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'/auth'} />;
    }
    return (
        <div>
            {blogs && blogs.map((blog, index) => (
                <Blog
                    id={blog._id}
                    isUser={localStorage.getItem("userId") === blog.user._id}
                    {...blog}
                    key={index}
                />
            ))}
        </div>
    );
};

export default Blogs;
