import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const Sidebar = ({ isOpen, toggleSidebar, token, profile }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[320px] bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl z-50 transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8 text-white">
          <div className="flex justify-between items-center mb-12">
            <img src='/image/Untitled.png' className="h-12 w-auto" alt="Logo" />
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/10 rounded-none transition-colors"
            >
              <IoClose size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 font-['Science_gothic'] text-xl">
            <NavLink 
              to="/" 
              onClick={toggleSidebar}
              className={({ isActive }) => `nav-link px-4 py-2 rounded-none transition-all ${isActive ? 'bg-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/Infopage" 
              onClick={toggleSidebar}
              className={({ isActive }) => `nav-link px-4 py-2 rounded-none transition-all ${isActive ? 'bg-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
            >
              Learn
            </NavLink>
            <NavLink 
              to="/Customcircuit" 
              onClick={toggleSidebar}
              className={({ isActive }) => `nav-link px-4 py-2 rounded-none transition-all ${isActive ? 'bg-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
            >
              Custom System
            </NavLink>
            <NavLink 
              to="/Community" 
              onClick={toggleSidebar}
              className={({ isActive }) => `nav-link px-4 py-2 rounded-none transition-all ${isActive ? 'bg-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
            >
              Community
            </NavLink>
            <NavLink 
              to="/PlanInstallation" 
              onClick={toggleSidebar}
              className={({ isActive }) => `nav-link px-4 py-2 rounded-none transition-all ${isActive ? 'bg-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
            >
              Plan Installation
            </NavLink>
            
            <div className="mt-8 border-t border-white/10 pt-8">
              {!token ? (
                <NavLink 
                  to="/login" 
                  onClick={toggleSidebar}
                  className="nav-link px-4 py-2 rounded-none hover:bg-white/5 transition-all"
                >
                  Login
                </NavLink>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-[#6AA8FF] to-[#7B3DE3] rounded-none text-center shadow-lg">
                    {profile?.username}
                  </div>
                  <NavLink 
                    to="/login" 
                    onClick={toggleSidebar}
                    className="nav-link px-4 py-2 rounded-none hover:bg-white/5 transition-all text-red-300"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
          
          <div className="mt-auto opacity-40 text-sm">
            © 2026 Electrosystems
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
