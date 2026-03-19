import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const API_URL = "http://localhost:5000";

// Helper component for map interactions
function LocationMarker({ position, setPosition, onAddressFetch }) {
  const map = useMap();
  
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onAddressFetch(lat, lng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function PlanInstallation() {
  const [userSystems, setUserSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [mapPosition, setMapPosition] = useState([20.5937, 78.9629]); // India center
  const [showMap, setShowMap] = useState(false);
  
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    installationDate: ""
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserSystems();
    
    // Try to get current location for the map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setMapPosition([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.warn("Location access denied")
      );
    }
  }, [token, navigate]);

  useEffect(() => {
    gsap.from(".plan-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  async function fetchUserSystems() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/payload/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const systems = res.data.systems || [];
      setUserSystems(systems);
      if (systems.length > 0) {
        setSelectedSystem(systems[0]);
      }
    } catch (err) {
      console.error("Error fetching systems:", err);
      setMessage({ type: "error", text: "Failed to load your systems. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
    gsap.fromTo(".system-details-panel", 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    );
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      if (res.data && res.data.display_name) {
        setFormData(prev => ({ ...prev, address: res.data.display_name }));
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSystem) {
      setMessage({ type: "error", text: "Please select a system first." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        systemId: selectedSystem._id,
        address: formData.address,
        phone: formData.phone,
        installationDate: formData.installationDate
      };

      const res = await axios.post(`${API_URL}/installation/request`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: "success", text: "Installation scheduled successfully! Our team will contact you soon." });
      
      gsap.to(".form-container", {
        scale: 1.02,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });

    } catch (err) {
      console.error("Error scheduling installation:", err);
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to schedule installation." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-pink-100 pt-32 pb-8 px-4 md:px-8 font-['Science_gothic'] overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col pt-4">
        <header className="mb-4 text-left">
          <h1 className="text-2xl md:text-3xl font-black text-black mb-1 tracking-tighter">
            PLAN <span className="bg-black text-white px-2 py-0.5">INSTALLATION</span>
          </h1>
          <p className="text-black/70 text-xs mt-5 font-bold uppercase tracking-widest">
            Ready to go off-grid? Schedule today.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center flex-grow">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-hidden">
            {/* Sidebar: System Selection */}
            <div className="lg:col-span-3 lg:h-full space-y-3 mt-7 overflow-y-auto pr-2 custom-scrollbar pb-4">
              <h2 className="text-lg font-black mb-3 flex items-center gap-2">
                <span className="bg-black text-white px-1.5 py-0.5 text-xs">01</span> SELECT
              </h2>
              {userSystems.length === 0 ? (
                <div className="p-6 bg-white/60 backdrop-blur-md border-2 border-dashed border-black/20 text-center">
                  <p className="text-black/60 mb-2 text-xs font-bold">No saved systems.</p>
                  <button 
                    onClick={() => navigate("/Customcircuit")}
                    className="text-xs font-black underline"
                  >
                     New system →
                  </button>
                </div>
              ) : (
                userSystems.map((system) => (
                  <div 
                    key={system._id}
                    onClick={() => handleSystemSelect(system)}
                    className={`plan-card p-3 border-l-8 cursor-pointer transition-all duration-300 ${
                      selectedSystem?._id === system._id 
                        ? "bg-white border-black shadow-lg scale-[1.02]" 
                        : "bg-white/40 border-black/10 opacity-70"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-black uppercase bg-black text-white px-1.5 py-0.5">
                        {system.plan}
                      </span>
                      <span className="font-bold text-[9px] text-black/40">
                        {new Date(system.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-black text-sm truncate">{system.selectedSolar?.brand || "Custom"}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="font-black text-xs">₹{system.costs?.total?.toLocaleString()}</span>
                      <span className="font-black text-xs opacity-50">{system.desiredReduction}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 lg:h-full flex flex-col gap-4 overflow-hidden mb-4">
              <div className="form-container bg-white shadow-2xl overflow-hidden flex-grow flex flex-col md:flex-row">
                {/* Left: Quick Specs */}
                <div className="md:w-5/12 p-6 bg-white text-black border-r-[10px] border-black flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                      <span className="bg-black text-white px-1.5 py-0.5 text-xs uppercase">System</span> SPECS
                    </h2>
                    
                    {selectedSystem ? (
                      <div className="space-y-4 font-black">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 bg-slate-50">
                            <p className="text-[8px] text-black/40 uppercase font-black mb-1">Usage</p>
                            <p className="text-lg font-black">{selectedSystem.monthlyUsage} <span className="text-[10px]">kWh</span></p>
                          </div>
                          <div className="bg-slate-50 p-3">
                            <p className="text-[8px] text-black/40 uppercase font-black mb-1">Offset</p>
                            <p className="text-lg font-black text-emerald-600">{selectedSystem.desiredReduction}%</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center text-black font-black">☀️</div>
                            <div className="text-xs">
                              <p className="font-black">{selectedSystem.counts?.solarCount}x Solar</p>
                              <p className="text-[10px] opacity-60 truncate max-w-[120px]">{selectedSystem.selectedSolar?.brand}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-sky-400 flex items-center justify-center text-black font-black">💨</div>
                            <div className="text-xs">
                              <p className="font-black">{selectedSystem.counts?.windCount}x Wind</p>
                              <p className="text-[10px] opacity-60 truncate max-w-[120px]">{selectedSystem.selectedWind?.brand}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-black/20 italic py-12 text-center text-sm font-bold">
                        Select to show info.
                      </div>
                    )}
                  </div>

                  {selectedSystem && (
                    <div className="pt-4 border-t-2 border-black/5">
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black uppercase text-black/40">Estimate</p>
                        <p className="text-2xl font-black text-black">₹{selectedSystem.costs?.total?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Form */}
                <div className="md:w-7/12 p-6 bg-neutral-100 overflow-y-auto flex flex-col justify-between">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <h2 className="text-lg font-black text-black">
                        <span className="bg-black text-white px-1.5 py-0.5 text-xs mr-2">02</span> INFO
                      </h2>
                      <button 
                        type="button"
                        onClick={() => setShowMap(!showMap)}
                        className={`text-xs font-black px-4 py-1.5 transition-all uppercase tracking-tighter ${
                          showMap 
                            ? "bg-red-500 text-white" 
                            : "bg-black text-white hover:bg-sky-600 shadow-lg"
                        }`}
                      >
                        {showMap ? "[-] HIDE MAP" : "[+] SELECT ON MAP 📍"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {showMap && (
                        <div className="w-full h-32 border-2 border-black overflow-hidden relative">
                          <MapContainer center={mapPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationMarker position={mapPosition} setPosition={setMapPosition} onAddressFetch={fetchAddress} />
                          </MapContainer>
                        </div>
                      )}

                      <div>
                        <textarea 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          placeholder="Full Installation Address"
                          className="w-full p-2 bg-slate-50 border-2 border-slate-100 focus:border-black text-sm font-bold outline-none h-16 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Phone Number"
                          className="w-full p-2 bg-slate-50 border-2 border-slate-100 focus:border-black font-bold text-sm outline-none"
                        />
                        <input 
                          type="date"
                          name="installationDate"
                          value={formData.installationDate}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 bg-slate-50 border-2 border-slate-100 focus:border-black font-bold text-sm outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting || !selectedSystem}
                      className={`w-full py-3 font-black text-sm tracking-widest transition-all ${
                        submitting || !selectedSystem
                          ? "bg-slate-200 text-slate-400"
                          : "bg-black text-white hover:bg-emerald-600 active:scale-95"
                      }`}
                    >
                      {submitting ? "SUBMITTING..." : "CONFIRM INSTALLATION"}
                    </button>
                  </form>

                  {message && (
                    <div className={`mt-2 p-2 text-[10px] font-black border-2 ${
                      message.type === "success" 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                        : "bg-red-50 border-red-500 text-red-700"
                    }`}>
                      {message.text.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Trust badges */}
              <div className="flex justify-center gap-6 py-2">
                <div className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-black">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-bold">✓</span> Verified
                </div>
                <div className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-black">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-bold">✓</span> 25-YR
                </div>
                <div className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-black">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-bold">✓</span> ISI
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: black; }
        .leaflet-container { z-index: 10; cursor: crosshair !important; outline: none; }
      `}</style>
    </div>
  );
}
