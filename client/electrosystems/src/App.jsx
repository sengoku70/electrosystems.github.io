import { useState, useEffect, useTransition, use, Profiler } from 'react'
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Homepage from "./components/Homepage";
import Infopage from "./components/Infopage";
import Login from './components/Login';
import Customcircuit from './components/Customcircuit'
import Community from './components/Community.jsx';
import Cookies from "js-cookie"
const API_URL = "http://localhost:5000";
import './App.css'




function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState("")




  useEffect(() => {
    console.log("profile:", profile);
    if (!token) return; // no token → skip

    const getProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });


        setProfile(res.data.user);
        console.log(setProfile);


      } catch (err) {
        console.log(err.response?.data?.error || "Unauthorized");
      }
    };

    getProfile();
  }, [token]);

  return (
    <>
      <Router>
        <nav className="navigation px-4 md:px-6 h-auto md:h-[100px] flex flex-col md:flex-row items-center fixed w-[95%] md:w-8/10 lg:w-3/4 xl:w-8/10 z-30 bg-white/40 shadow-2xl left-1/2 -translate-x-1/2 mt-2 backdrop-blur-[5px] font-[Science gothic] text-[18px] md:text-[24px] lg:text-[30px] gap-2 md:gap-4 py-2 md:py-0">
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <NavLink to="/" className="nav-link" end>Home</NavLink>
            <hr className='hidden md:block h-[30px] md:h-[50px] w-1 md:w-2.5 bg-black' />
            <NavLink to="/Infopage" className="nav-link">Learn</NavLink>
            <hr className='hidden md:block h-[30px] md:h-[50px] w-1 md:w-2.5 bg-black' />
            <NavLink to="/Customcircuit" className="nav-link">Custom System</NavLink>
            <hr className='hidden md:block h-[30px] md:h-[50px] w-1 md:w-2.5 bg-black' />
            <NavLink to="/Community" className="nav-link">Community</NavLink>
            <hr className='hidden md:block h-[30px] md:h-[50px] w-1 md:w-2.5 bg-black' />
            {!token ? (
              <NavLink to="/login" className="nav-link">Login</NavLink>
            ) : (
              <NavLink to="/login" className="nav-link">Logout</NavLink>
            )}
          </div>

          <div className="flex items-center gap-4 ml-0 md:ml-auto w-full md:w-auto justify-center md:justify-end mt-2 md:mt-0">
            {token && (
              <div className="p-2 
                            bg-linear-to-r from-[#6AA8FF] to-[#7B3DE3] 
                            text-white flex items-center justify-center text-sm md:text-base">
                {profile.username}
              </div>
            )}
            <img src='/image/Untitled.png' className="h-[50px] md:h-[80px] lg:h-[100px] w-fit" />
          </div>
        </nav>

        <Routes className="mb-[100px]">
          <Route path="/" element={<Homepage />} />
          <Route path="/InfoPage" element={<Infopage />} />
          <Route path="/Login" element={<Login token={token} setToken={setToken} setProfile={setProfile} profile={profile} />} />
          <Route path="/Customcircuit" element={<Customcircuit />} />
          <Route path="/Community" element={<Community />} />


        </Routes>

      </Router>


    </>
  )
}

export default App
