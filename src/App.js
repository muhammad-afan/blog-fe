import React, { useEffect } from 'react'
import Header from "./components/Header";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import UserBlogs from './components/UserBlogs';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("userId");
  useEffect(() => {
    if (token) {
      navigate("/blogs")
      dispatch(authActions.login())
    }
  }, [dispatch]);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log({ isLoggedIn });

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path='/myBlogs' element={<UserBlogs />} />
          <Route path='/myBlogs/:id' element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
