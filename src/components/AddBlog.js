import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };



const AddBlog = () => {
    const navigate = useNavigate(); 
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const sendRequest = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/blogs/add`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: localStorage.getItem('userId')
            });

            const data = res.data;
            console.log(data);
            return data;
        } catch (err) {
            console.error(err.message);
            return null;
        };
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => navigate('/myblogs'));
    };
    
    if (!isLoggedIn) {
        return <Navigate to={'/auth'} />;
    }
    return (
        <div>
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
                        Post Your Blog
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
                    <Button color="warning" type="submit" variant="contained" sx={{ borderRadius: 3, marginTop: 2 }}>
                        Add Blog
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddBlog;
