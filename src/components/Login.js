import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({ name: "", password: "", email: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const sendRequrest = async (type = "login") => {
        // const res = await axios
        //     .post("http://127.0.0.1:5000/api/users/login", {
        //         email: inputs.email,
        //         password: inputs.password,
        //     })
        //     .then(() => console.log("Successfully Logged in"))
        //     .catch((err) => console.log(err.message));
        // const data = await res.data;
        // console.log(res.data);
        // return data;
        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/users/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });

            const data = res.data;
            // console.log(data);
            return data;
        } catch (err) {
            console.error(err.message);
            return null;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignup)
            sendRequrest("signup")
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/blogs"))
                .then((data) => console.log(data));
        else
            sendRequrest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/blogs"))
                .then((data) => console.log(data));
    };
    if (isLoggedIn) {
        return <Navigate to={'/blogs'} />;
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <Box
                    width={400}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    boxShadow={"10px 10px 20px #ccc"}
                    padding={3}
                    margin={"auto"}
                    marginTop={3}
                    borderRadius={5}
                >
                    <Typography variant="h2" padding={3} textAlign={"center"}>
                        {!isSignup ? "Login" : "Signup"}
                    </Typography>
                    {isSignup && (
                        <TextField
                            value={inputs.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Name"
                            margin="normal"
                        />
                    )}
                    <TextField
                        value={inputs.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        margin="normal"
                    />
                    <TextField
                        value={inputs.password}
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        sx={{ borderRadius: 2, marginTop: 2 }}
                        color="warning"
                        variant="contained"
                    >
                        {!isSignup ? "Login" : "Signup"}
                    </Button>
                    <Button
                        sx={{ borderRadius: 3, marginTop: 2 }}
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        Go to {isSignup ? "Login" : "Signup"}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Login;
