import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("userId");
    }
    return (
        <AppBar
            sx={{
                background:
                    "linear-gradient(90deg, rgba(100,63,195,40) 0%, rgba(9,83,121,1) 35%, rgba(9,74,78,1) 82%)",
                position: "sticky",
            }}
        >
            <Toolbar>
                <Typography variant="h4">Blogs App</Typography>
                {isLoggedIn && (
                    <Box display={"flex"} marginLeft={"auto"}>
                        <Tabs
                            textColor="inherit"
                            value={value}
                            onChange={(e, value) => setValue(value)}
                        >
                            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"></Tab>
                            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"></Tab>
                            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"></Tab>
                        </Tabs>
                    </Box>
                )}
                <Box sx={{ display: "flex", marginLeft: "auto" }}>
                    {!isLoggedIn && (
                        <>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                color="warning"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10 }}
                            >
                                Login
                            </Button>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                color="warning"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10 }}
                            >
                                Signup
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={handleLogout}
                            LinkComponent={Link}
                            to="/auth"
                            color="warning"
                            variant="contained"
                            sx={{ margin: 1, borderRadius: 10 }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
