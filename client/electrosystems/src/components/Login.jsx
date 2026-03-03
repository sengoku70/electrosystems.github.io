import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
const API_URL = "http://localhost:5000";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ token, setToken, setProfile, profile }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [sign, setsign] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  const bgImages = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1472&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1472&auto=format&fit=crop",
  ];

  // cycle background image every 4s
  useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % bgImages.length), 4000);
    return () => clearInterval(t);
  }, []);

  const signup = async () => {
    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/signup`, { username, email, password });
      setPasswordError("");
      setMessage("Signup successful! Now login.");
      setsign(false);
    } catch (err) {
      const errMsg = err.response?.data?.error || "Signup failed";
      if (errMsg.toLowerCase().includes("password")) setPasswordError(errMsg);
      else setMessage(errMsg);
    } finally { setLoading(false); }
  };

  const login = async () => {
    setLoading(true);
    try {
      const payload = email ? { email, password } : { username, password };
      const res = await axios.post(`${API_URL}/auth/login`, payload);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfile(null);
    setMessage("Logged out!");
  };

  return (
    <div className="login-root">

      {/* ── LEFT: Visual Panel ── */}
      <div className="login-visual">
        {bgImages.map((src, i) => (
          <div
            key={i}
            className="login-bg-slide"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === imgIndex ? 1 : 0,
            }}
          />
        ))}
        {/* dark overlay */}
        <div className="login-visual-overlay" />

        {/* content over image */}
        <div className="login-visual-content">
          <div className="login-logo-row">
            <img src="src/assets/image/Untitled.png" alt="Logo" className="login-logo" />
            <span className="login-brand">ELECTROSYSTEMS</span>
          </div>

          <h2 className="login-visual-title">
            Power Your Future<br />with Clean Energy
          </h2>
          <p className="login-visual-sub">
            Design custom solar &amp; wind systems, calculate real savings, and join
            a community driving the renewable revolution.
          </p>

          {/* floating stat cards */}
          <div className="login-stats">
            {[
              { label: "Users Saved", value: "₹2.4Cr+", icon: "💸" },
              { label: "CO₂ Offset", value: "8,200 kg", icon: "🌿" },
              { label: "Systems Built", value: "1,800+", icon: "⚡" },
            ].map((s, i) => (
              <div key={i} className="login-stat-card" style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* image dot indicators */}
          <div className="login-dots">
            {bgImages.map((_, i) => (
              <button
                key={i}
                className={`login-dot ${i === imgIndex ? "active" : ""}`}
                onClick={() => setImgIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div className="login-form-panel">
        <div className="login-form-inner">

          {!token ? (
            <>
              {/* toggle tabs */}
              <div className="login-tabs">
                <button
                  className={`login-tab ${sign ? "active" : ""}`}
                  onClick={() => { setsign(true); setMessage(""); setPasswordError(""); }}
                >
                  <span>Sign Up</span>
                </button>
                <button
                  className={`login-tab ${!sign ? "active" : ""}`}
                  onClick={() => { setsign(false); setMessage(""); setPasswordError(""); }}
                >
                  <span>Log In</span>
                </button>
              </div>

              <h1 className="login-form-title">
                {sign ? "Create your account" : "Welcome back"}
              </h1>
              <p className="login-form-sub">
                {sign
                  ? "Join the renewable energy movement today."
                  : "Sign in to access your dashboard."}
              </p>

              <div className="login-fields">
                {/* username always shown */}
                <div className="login-field-wrap">
                  <label className="login-label">Username</label>
                  <input
                    placeholder="e.g. solarhero"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                  />
                </div>

                {/* email shown for signup OR if user wants to login with email */}
                <div className="login-field-wrap">
                  <label className="login-label">
                    Email {!sign && <span className="login-label-opt">(optional)</span>}
                  </label>
                  <input
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                  />
                </div>

                <div className="login-field-wrap">
                  <label className="login-label">Password</label>
                  <input
                    type="password"
                    placeholder={sign ? "At least 8 characters" : "Your password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setMessage(""); }}
                    className="login-input"
                  />
                  {passwordError && <p className="login-error">{passwordError}</p>}
                </div>
              </div>

              <button
                onClick={sign ? signup : login}
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="login-spinner" />
                ) : (
                  <span>{sign ? "Create Account →" : "Sign In →"}</span>
                )}
              </button>

              {message && (
                <p className={`login-msg ${message.toLowerCase().includes("success") ? "login-msg-ok" : "login-msg-err"}`}>
                  {message}
                </p>
              )}
            </>
          ) : (
            /* ── Logged in: Profile card ── */
            <div className="login-profile-card">
              <div className="login-avatar">
                {profile?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <h2 className="login-profile-name">{profile?.username}</h2>
              {profile?.email && <p className="login-profile-email">{profile.email}</p>}
              <p className="login-profile-id">ID: {profile?._id}</p>

              <div className="login-profile-stats">
                <div className="lp-stat"><span>🌱</span> Active Member</div>
                <div className="lp-stat"><span>⚡</span> Energy Saver</div>
              </div>

              <NavLink to="/" onClick={logout} className="login-logout-btn">
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .login-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          font-family: 'Science Gothic', sans-serif;
          padding-top: 0;
        }

        /* ── Left visual panel ── */
        .login-visual {
          position: relative;
          flex: 1.1;
          overflow: hidden;
        }
        .login-bg-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 1.2s ease;
        }
        .login-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.72) 0%,
            rgba(0,0,0,0.45) 60%,
            rgba(0,0,0,0.6) 100%
          );
          z-index: 1;
        }
        .login-visual-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 50px;
          color: white;
        }
        .login-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .login-logo {
          height: 44px;
          width: auto;
          filter: brightness(0) invert(1);
        }
        .login-brand {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 2px;
          color: white;
        }
        .login-visual-title {
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 20px;
          color: white;
        }
        .login-visual-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          max-width: 380px;
          margin-bottom: 40px;
        }

        /* stat cards */
        .login-stats {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .login-stat-card {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 110px;
          animation: floatUp 0.7s ease both;
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-icon  { font-size: 22px; }
        .stat-value { font-size: 20px; font-weight: 900; color: white; }
        .stat-label { font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; }

        /* dots */
        .login-dots { display: flex; gap: 8px; }
        .login-dot {
          width: 8px; height: 8px; border-radius: 0;
          background: rgba(255,255,255,0.35);
          border: none; cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .login-dot.active { background: white; width: 24px; }

        /* ── Right form panel ── */
        .login-form-panel {
          flex: 0.9;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
        }
        .login-form-inner {
          width: 100%;
          max-width: 420px;
          padding: 48px 40px;
        }

        /* tabs */
        .login-tabs {
          display: flex;
          gap: 0;
          border: 2px solid #e2e8f0;
          margin-bottom: 32px;
          width: fit-content;
        }
        .login-tab {
          padding: 10px 28px;
          font-family: 'Science Gothic', sans-serif;
          font-size: 15px;
          font-weight: 700;
          background: white;
          color: #94a3b8;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .login-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: black;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }
        .login-tab.active::before { transform: translateX(0); }
        .login-tab.active { color: white; }
        .login-tab span { position: relative; z-index: 1; }

        .login-form-title {
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .login-form-sub {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        /* fields */
        .login-fields {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 24px;
        }
        .login-field-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .login-label {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .login-label-opt {
          font-weight: 400;
          text-transform: none;
          color: #94a3b8;
          letter-spacing: 0;
          margin-left: 4px;
        }
        .login-input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 2px solid #e2e8f0;
          border-radius: 0;
          font-family: 'Science Gothic', sans-serif;
          font-size: 15px;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .login-input:focus {
          border-color: black;
          background: white;
          box-shadow: 4px 4px 0 black;
        }
        .login-input::placeholder { color: #cbd5e1; }
        .login-error {
          font-size: 12px;
          color: #dc2626;
          margin-top: 4px;
        }

        /* submit button — same slide animation */
        .login-btn {
          width: 100%;
          height: 52px;
          position: relative;
          overflow: hidden;
          background: black;
          color: white;
          font-family: 'Science Gothic', sans-serif;
          font-size: 16px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          letter-spacing: 1px;
          transition: transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1e293b;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }
        .login-btn:hover::before { transform: translateX(0); }
        .login-btn span { position: relative; z-index: 1; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-btn:active { transform: scale(0.98); }

        /* spinner */
        .login-spinner {
          width: 20px; height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* messages */
        .login-msg {
          margin-top: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          padding: 10px;
        }
        .login-msg-ok  { background: #f0fdf4; color: #065f46; border: 1px solid #bbf7d0; }
        .login-msg-err { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

        /* ── Profile card ── */
        .login-profile-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
          padding: 20px 0;
        }
        .login-avatar {
          width: 80px;
          height: 80px;
          background: black;
          color: white;
          font-size: 36px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          box-shadow: 6px 6px 0 #e2e8f0;
          animation: floatUp 0.6s ease both;
        }
        .login-profile-name {
          font-size: 26px;
          font-weight: 900;
          color: #0f172a;
        }
        .login-profile-email {
          font-size: 14px;
          color: #64748b;
        }
        .login-profile-id {
          font-size: 12px;
          color: #94a3b8;
          font-family: monospace;
        }
        .login-profile-stats {
          display: flex;
          gap: 12px;
          margin: 12px 0;
        }
        .lp-stat {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .login-logout-btn {
          display: inline-block;
          width: 100%;
          padding: 14px;
          background: #dc2626;
          color: white;
          font-family: 'Science Gothic', sans-serif;
          font-size: 16px;
          font-weight: 800;
          text-align: center;
          text-decoration: none;
          border: none;
          cursor: pointer;
          border-radius: 0;
          transition: background 0.2s, transform 0.1s;
          margin-top: 8px;
        }
        .login-logout-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Login;