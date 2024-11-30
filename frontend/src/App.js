import React, { useEffect } from "react";
import AllTasks from "./pages/AllTasks";
import Home from "./pages/Home";
import {Route, Routes, useNavigate } from "react-router-dom";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Incomplete from "./pages/Incomplete";
// import Login from "./pages/Signup";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "./store/auth";

function App() {

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login)
    }else if(isLoggedIn === false){
      navigate("/signup")
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative" >
        <Routes>
          <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<Important />} />
          <Route path="/completedTasks" element={<Completed />} />
          <Route path="/incompletedTasks" element={<Incomplete />} />
          </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
