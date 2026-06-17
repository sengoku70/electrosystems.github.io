import { useState, useEffect } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage";
import Infopage from "./components/Infopage";
import Login from './components/Login';
import Customcircuit from './components/Customcircuit'
import Community from './components/Community.jsx';
import PlanInstallation from './components/PlanInstallation.jsx';
import Sidebar from './components/Sidebar';
import { HiMenu } from 'react-icons/hi';
import './App.css'

const API_URL = "https://electrosystems-gi-git-02db7d-baibhavkumar150-gmailcoms-projects.vercel.app";

// Must live inside <Router> so useLocation works
function AppLayout({ token, setToken, profile, setProfile, isSidebarOpen, toggleSidebar }) {
  const location = useLocation();
  const isLoginPage = location.pathname.toLowerCase() === "/login";

  return (
    <>
      {/* Sidebar + mobile hamburger always rendered on every page */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        token={token}
        profile={profile}
      />
      <nav className="fixed top-8 left-8 z-30 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="p-4 bg-black backdrop-blur-xl border border-white/10 rounded-none shadow-2xl hover:bg-gray-900 transition-all active:scale-95"
        >
          <HiMenu size={28} className="text-white" />
        </button>
      </nav>

      {isLoginPage ? (
        /* Login page: full-screen, no desktop nav, no padded main */
        <Login
          token={token}
          setToken={setToken}
          setProfile={setProfile}
          profile={profile}
        />
      ) : (
        <>
          {/* Desktop Navigation - Hidden on Mobile/Tablet */}
          <nav className="navigation px-6 h-[100px] hidden lg:flex flex-row items-center fixed w-8/10 z-30 bg-white/40 shadow-2xl mx-50 mt-2 backdrop-blur-[5px] font-['Science_gothic'] text-[clamp(16px,1.2vw,22px)] gap-2">
            <NavLink to="/" className="nav-link" end>Home</NavLink>
            <hr className='h-[50px] w-2.5 bg-black' />
            <NavLink to="/Infopage" className="nav-link">Learn</NavLink>
            <hr className='h-[50px] w-2.5 bg-black' />
            <NavLink to="/Customcircuit" className="nav-link">Custom System</NavLink>
            <hr className='h-[50px] w-2.5 bg-black' />
            <NavLink to="/Community" className="nav-link">Community</NavLink>
            <hr className='h-[50px] w-2.5 bg-black' />
            <NavLink to="/PlanInstallation" className="nav-link">Plan Installation</NavLink>
            <hr className='h-[50px] w-2.5 bg-black' />
            {!token ? (
              <NavLink to="/login" className="nav-link">Login</NavLink>
            ) : (
              <NavLink to="/login" className="nav-link">Logout</NavLink>
            )}
            {token && (
              <div className="ml-auto p-2 bg-gradient-to-r from-[#6AA8FF] to-[#7B3DE3] text-white flex items-center justify-center">
                {profile.username}
              </div>
            )}
            <img src='/image/Untitled.png' className={`h-[100px] ${token ? "ml-4" : "ml-auto"} w-fit object-contain`} />
          </nav>

          <main className="min-h-screen pt-4">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/InfoPage" element={<Infopage />} />
              <Route path="/Customcircuit" element={<Customcircuit />} />
              <Route path="/Community" element={<Community />} />
              <Route path="/PlanInstallation" element={<PlanInstallation />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    const getProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.log(err.response?.data?.error || "Unauthorized");
      }
    };
    getProfile();
  }, [token]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <AppLayout
        token={token}
        setToken={setToken}
        profile={profile}
        setProfile={setProfile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </Router>
  );
}

export default App
