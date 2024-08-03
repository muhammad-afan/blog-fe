import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from './Blog';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserBlogs = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const id = localStorage.getItem("userId");
    const [blogs, setBlogs] = useState();
    const sendRequest = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/blogs/user/${id}`);
            const data = await res.data;
            return data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
    useEffect(() => {
        sendRequest().then((data) => setBlogs(data?.blogs));
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'/auth'} />;
    }
    return (
        <div>
            {blogs && blogs.blogs.map((blog, index) => (
                <Blog
                    id={blog._id}
                    isUser={localStorage.getItem("userId") === blog.user}
                    {...blog}
                    user={blogs}
                    key={index}
                />
            ))}
        </div>
    )
}

export default UserBlogs
