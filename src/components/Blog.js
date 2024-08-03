import React from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from "axios";

const Blog = ({ title, description, image, user, isUser, id }) => {
    const navigate = useNavigate();
    const handleEdit = (e) => {
        navigate(`/myBlogs/${id}`);
    }
    const deleteRequest = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/blogs/${id}`);
            const data = await res.data;
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }
    const handleDelete = () => {
        deleteRequest().then((data) => console.log(data));
    }
    return (
        <>
            <Card
                sx={{
                    width: "40%",
                    margin: "auto",
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc",
                    '&:hover': { boxShadow: "10px 10px 20px #ccc" },
                }}
            >
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}><ModeEditOutlineIcon color="warning"/></IconButton>
                        <IconButton onClick={handleDelete}><DeleteForeverIcon color="error"/></IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={title}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="Paella dish"
                />
                <CardContent>
                    <hr />
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        <b>{user.name}</b> {": "} {description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default Blog;
