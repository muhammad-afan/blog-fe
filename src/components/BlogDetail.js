import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const id = useParams().id;
    const [blogs, setBlogs] = useState();
    const fetchDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
            const data = await res.data;
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    useEffect(() => {
        fetchDetails().then((data) => {
            setBlogs(data.blog);
            setInputs({
                title: data.blog.title,
                description: data.blog.description,
                image: data.blog.image,
            });
        });
        // eslint-disable-next-line
    }, [id]);
    console.log(blogs);

    const sendRequest = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/blogs/update/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image
            })

            const data = await res.data;
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then((data) => console.log(data)).then(() => navigate("/blogs"));
    };
    if (!isLoggedIn) {
        return <Navigate to={'/auth'} />;
    }
    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box
                        border={3}
                        borderColor={
                            "linear-gradient(90deg, rgba(100,63,195,40) 0%, rgba(9,83,121,1) 35%, rgba(9,74,78,1) 82%)"
                        }
                        borderRadius={10}
                        boxShadow={"10px 10px 20px #ccc"}
                        padding={3}
                        margin={"auto"}
                        marginTop={3}
                        display={"flex"}
                        flexDirection={"column"}
                        width={"80%"}
                    >
                        <Typography
                            fontWeight={"bold"}
                            padding={3}
                            color={"black"}
                            variant="h2"
                            textAlign={"center"}
                        >
                            Update your Blog
                        </Typography>
                        <InputLabel sx={labelStyles}>Title</InputLabel>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            value={inputs.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <InputLabel sx={labelStyles}>Description</InputLabel>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            value={inputs.description}
                            name="description"
                            onChange={handleChange}
                        />
                        <InputLabel sx={labelStyles}>imageURL</InputLabel>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            value={inputs.image}
                            name="image"
                            onChange={handleChange}
                        />
                        <Button
                            color="warning"
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: 3, marginTop: 2 }}
                        >
                            Update Blog
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default BlogDetail;
