import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";
import { NavLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { ImGithub } from "react-icons/im";

const windImages = [
  "https://imgs.search.brave.com/PUIYQO_rdJwnO8biJrjxowcy9kH8ORvJcJdmH9NtaIg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP3E9d2luZCUy/MHR1cmJpbmUlMjBk/aWFncmFtJnc9MTI4/MCZoPTcyMCZjPTUm/cnM9MSZwPTA",
  "https://images.unsplash.com/photo-1587168173357-99c7e95fb5cd?q=80&w=1075&auto=format&fit=crop",
];

const solarImages = [
  "https://imgs.search.brave.com/2SupGqSvomDEHMZif5s8hR8p4b80n-K7Rx6SIwwgyRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FjLzc5/L2FkL2FjNzlhZGFm/YTE4NmFjODgxZGNh/MGUxZGY3YzdmMTc5/LmpwZw",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1074&auto=format&fit=crop",
];

export default function RenewableInfoPage() {
  gsap.registerPlugin(ScrollTrigger);

  const [hoveredImg, setHoveredImg] = useState(null);

  useEffect(() => {
    gsap.to(".sec3", {
      scrollTrigger: {
        trigger: ".sec3",
        start: "top 100%",
        end: "center 70%",
        toggleActions: "play none none none",
        scrub: 2,
      },
      marginLeft: "auto",
      marginBottom: "100px",
    });

    // Animate section cards on scroll
    gsap.utils.toArray(".info-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="infopage-root">
      {/* Image Lightbox Overlay */}
      {hoveredImg && (
        <div
          className="img-lightbox-overlay"
          onMouseEnter={() => setHoveredImg(null)}
        >
          <div className="img-lightbox-frame">
            <img src={hoveredImg} alt="Enlarged view" className="img-lightbox-img" />
          </div>
        </div>
      )}

      <div className="infopage-hero-bg">
        <div className="infopage-hero-glow glow1" />
        <div className="infopage-hero-glow glow2" />
      </div>

      <div className="infopage w-8/10 mx-auto pt-40 pb-20">

        {/* ── Section Header ── */}
        <div className="info-section-header">
          <span className="info-badge">Knowledge Hub</span>
          <h1 className="info-main-title">How Renewable Energy Works</h1>
          <p className="info-main-sub">
            Explore the science behind the world's cleanest sources of power.
          </p>
        </div>

        {/* ── Section 1: Wind ── */}
        <div className="info-card info-card-wind">
          <div className="info-card-label">
            <span className="info-card-tag wind-tag">🌬️ Wind Energy</span>
          </div>
          <div className="info-card-body">
            <div className="info-card-text">
              <h2 className="info-card-title">How a Wind Turbine Works?</h2>
              <p className="info-card-desc">
                A wind turbine is a remarkable machine that transforms the simple
                movement of air into usable electricity. At first glance it may seem
                that the wind simply pushes the blades, but the process is far more
                precise and rooted in aerodynamic science. The blades of a turbine
                are shaped much like the wings of an aircraft, engineered to create
                lift rather than rely on force. When wind passes over their curved
                surfaces, air on one side moves faster than on the other, producing
                a pressure difference that causes the rotor to turn smoothly and
                efficiently. This allows turbines to operate even in gentle winds.
              </p>
            </div>
            <div className="info-card-images">
              {windImages.map((src, idx) => (
                <div
                  key={idx}
                  className="info-img-wrapper"
                  onMouseEnter={() => setHoveredImg(src)}
                  onMouseLeave={() => setHoveredImg(null)}
                >
                  <img src={src} alt={`Wind turbine ${idx + 1}`} className="info-img" />
                  <div className="info-img-overlay">
                    <span>🔍 Enlarge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 2: Solar ── */}
        <div className="info-card info-card-solar">
          <div className="info-card-label">
            <span className="info-card-tag solar-tag">☀️ Solar Energy</span>
          </div>
          <div className="info-card-body">
            <div className="info-card-images">
              {solarImages.map((src, idx) => (
                <div
                  key={idx}
                  className="info-img-wrapper"
                  onMouseEnter={() => setHoveredImg(src)}
                  onMouseLeave={() => setHoveredImg(null)}
                >
                  <img src={src} alt={`Solar panel ${idx + 1}`} className="info-img" />
                  <div className="info-img-overlay">
                    <span>🔍 Enlarge</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="info-card-text">
              <h2 className="info-card-title">How Does a Solar Panel Work?</h2>
              <p className="info-card-desc">
                A solar panel is, at its core, a device that captures sunlight and
                turns it into electricity, yet the process behind this transformation
                is both elegant and profoundly scientific. Each panel is made up of
                many photovoltaic (PV) cells, usually crafted from silicon, a
                material whose atomic structure allows it to interact with light in a
                unique way. When sunlight strikes the surface of a panel, it carries
                energy in the form of photons. These photons collide with the silicon
                atoms, transferring enough energy to knock electrons free from their
                positions. This movement of electrons creates an electric current,
                the fundamental building block of power generation.
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 3: Nature Impact ── */}
        <div className="info-nature-section">
          <div className="info-nature-text">
            <span className="info-card-tag nature-tag">🌿 Environmental Impact</span>
            <h2 className="info-card-title">How Renewable Energy Affects Nature</h2>
            <p className="info-card-desc">
              Renewable energy sources like solar and wind have a profoundly positive
              impact on our natural world. By transitioning away from fossil fuels, we
              significantly reduce greenhouse gas emissions that drive climate change,
              protecting ecosystems and wildlife from unprecedented environmental
              stress. These clean energy technologies produce no air or water
              pollution, preserving air quality for all living organisms and keeping
              our water sources pure. Unlike traditional power plants, renewable
              systems require minimal water for operation, conserving this precious
              resource for nature and agriculture. By choosing renewables, we honor
              the delicate balance of our planet's ecosystems and ensure a healthier,{" "}
              <span className="nature-highlight">sustainable future for generations to come.</span>
            </p>
          </div>
          <div className="info-nature-img-wrap">
            <img
              src="/image/Gemini_Generated_Image_39qvjf39qvjf39qv.png"
              className="info-nature-img"
              alt="Nature and energy"
            />
          </div>
        </div>

        {/* ── Section 4: Savings Calculator ── */}
        <section className="info-savings-section">
          <div className="info-savings-header">
            <span className="info-card-tag savings-tag">💰 Save More</span>
            <h2 className="info-card-title">Calculate Your Savings with Our Custom System Creator</h2>
            <p className="info-card-desc">
              Wondering how much you can save by going solar or installing a wind turbine?
              Our intuitive Custom System Creator lets you design your perfect renewable
              energy setup and instantly see the financial impact.
            </p>
          </div>

          <div className="info-savings-grid">
            {[
              { icon: "💸", color: "blue", title: "Bill Reduction", desc: "See exactly how much you'll save monthly and annually on your energy bills." },
              { icon: "🌱", color: "green", title: "Carbon Offset", desc: "Track the CO₂ emissions you'll prevent by switching to clean energy." },
              { icon: "📈", color: "purple", title: "ROI Analysis", desc: "Understand your return on investment and break-even timeline." },
            ].map((item, i) => (
              <div key={i} className={`info-savings-card savings-${item.color}`}>
                <div className="savings-icon">{item.icon}</div>
                <h3 className="savings-title">{item.title}</h3>
                <p className="savings-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="info-templates-box">
            <h3>Choose Your Template</h3>
            <div className="info-templates-grid">
              {["🌾 Agriculture", "🏭 Industry", "🏘️ Suburb", "🏡 Country House"].map((t, i) => (
                <div key={i} className="info-template-chip">{t}</div>
              ))}
            </div>
          </div>

          <div className="info-steps-box">
            <h3>How It Works</h3>
            <ol className="info-steps-list">
              <li>Input your current energy consumption data.</li>
              <li>Select your location to account for solar and wind availability.</li>
              <li>Choose a template that best fits your needs.</li>
              <li>Our system analyzes the data and provides estimates for savings, payback period & environmental impact.</li>
            </ol>
          </div>

          <NavLink to="/Customcircuit" className="info-cta-btn">
            ⚡ Start Calculating Your Savings Now
          </NavLink>
        </section>

        {/* ── Section 5: Off-Grid CTA ── */}
        <section className="sec3 info-offgrid-section">
          <div className="info-offgrid-text">
            <h2 className="info-offgrid-title">How You Can Go Off-Grid?</h2>
            <p className="info-offgrid-desc">
              Let the Nature do the Work for You.{" "}<br /><br />
              By harnessing the power of renewable energy sources like solar and wind,{" "}<br /><br />
              Know How much you can save on your energy bills and contribute to a sustainable future.
            </p>
            <NavLink to="/Customcircuit" className="info-offgrid-btn">
              Go to Custom System Creator →
            </NavLink>
          </div>
          <img
            src="/image/untitled33-removebg-preview.png"
            alt="Off-grid house"
            className="info-offgrid-img"
          />
        </section>

      </div>

      {/* ── Footer ── */}
      <footer className="hero bg-black text-white mt-20 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Electrosystems</h2>
            <p className="text-gray-400">
              Building hybrid solar &amp; wind systems for a sustainable future.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Homepage</a></li>
              <li><a href="/learn-more" className="hover:text-white">Learn More</a></li>
              <li><a href="/custom-system" className="hover:text-white">Custom System</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-white text-gray-300 text-2xl"><GrLinkedinOption /></a>
              <a href="#" className="hover:text-white text-gray-300 text-2xl"><ImGithub /></a>
              <a href="#" className="text-white text-2xl"><BsInstagram /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mt-8">
          © {new Date().getFullYear()} ELECTROSYSTEMS. All rights reserved.
        </div>
      </footer>

      <style>{`
        /* ── Root & Background ── */
        .infopage-root {
          background: #ffffff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .infopage-hero-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .infopage-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.09;
        }
        .glow1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, #3b82f6, transparent);
          top: -100px; left: -150px;
        }
        .glow2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #10b981, transparent);
          bottom: 0; right: -100px;
        }
        .infopage {
          position: relative;
          z-index: 1;
        }

        /* ── Lightbox ── */
        .img-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          animation: fadeInLightbox 0.25s ease;
        }
        @keyframes fadeInLightbox {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .img-lightbox-frame {
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(0,0,0,0.08);
          animation: popInLightbox 0.3s cubic-bezier(.34,1.56,.64,1);
          max-width: 80vw;
          max-height: 80vh;
        }
        @keyframes popInLightbox {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .img-lightbox-img {
          display: block;
          max-width: 80vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 0;
        }

        /* ── Section Header ── */
        .info-section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .info-badge {
          display: inline-block;
          background: black;
          color: white;
          font-family: 'Science Gothic', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 0;
          margin-bottom: 16px;
        }
        .info-main-title {
          font-family: 'Science Gothic', sans-serif;
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .info-main-sub {
          font-family: 'Science Gothic', sans-serif;
          font-size: 18px;
          color: #64748b;
          max-width: 500px;
          margin: 0 auto;
        }

        /* ── Info Cards ── */
        .info-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 0;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          transition: box-shadow 0.3s ease;
        }
        .info-card:hover {
          box-shadow: 0 10px 40px rgba(0,0,0,0.12);
        }
        /* ── Alternating accent borders (10px = tw-2.5) ── */
        .info-card-wind      { border-left:  10px solid black !important; }
        .info-card-solar     { border-right: 10px solid black !important; }
        .info-card-label {
          margin-bottom: 20px;
        }
        .info-card-tag {
          display: inline-block;
          font-family: 'Science Gothic', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 0;
          margin-bottom: 8px;
        }
        .wind-tag   { background: #dbeafe; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .solar-tag  { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
        .nature-tag { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
        .savings-tag{ background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; }
        .info-card-title {
          font-family: 'Science Gothic', sans-serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .info-card-desc {
          font-family: 'Science Gothic', sans-serif;
          font-size: 16px;
          color: #475569;
          line-height: 1.8;
        }
        .info-card-body {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .info-card-text {
          flex: 1;
          min-width: 280px;
        }
        .info-card-images {
          flex: 1;
          display: flex;
          gap: 14px;
          min-width: 280px;
        }

        /* ── Hover Images ── */
        .info-img-wrapper {
          position: relative;
          flex: 1;
          border-radius: 0;
          overflow: hidden;
          cursor: zoom-in;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .info-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .info-img-wrapper:hover .info-img {
          transform: scale(1.07);
        }
        .info-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .info-img-wrapper:hover .info-img-overlay {
          opacity: 1;
        }
        .info-img-overlay span {
          color: white;
          font-family: 'Science Gothic', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          background: rgba(0,0,0,0.4);
          padding: 4px 12px;
          border-radius: 0;
          backdrop-filter: blur(4px);
        }

        /* ── Nature Section ── */
        .info-nature-section {
          background: #f0fdf4;
          border: 2px solid #bbf7d0;
          border-left: 10px solid black;
          border-radius: 0;
          padding: 48px;
          margin-bottom: 40px;
          display: flex;
          gap: 40px;
          align-items: center;
          flex-wrap: wrap;
        }
        .info-nature-text {
          flex: 1;
          min-width: 280px;
        }
        .nature-highlight {
          background: linear-gradient(90deg, #059669, #2563eb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 800;
        }
        .info-nature-img-wrap {
          flex: 0 0 300px;
        }
        .info-nature-img {
          width: 100%;
          border-radius: 0;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          border: 2px solid #d1fae5;
        }

        /* ── Savings Section ── */
        .info-savings-section {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-right: 10px solid black;
          border-radius: 0;
          padding: 48px;
          margin-bottom: 40px;
        }
        .info-savings-header {
          margin-bottom: 36px;
        }
        .info-savings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .info-savings-card {
          border-radius: 0;
          padding: 28px 22px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-savings-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .savings-blue   { background: #eff6ff; border: 2px solid #bfdbfe; }
        .savings-green  { background: #f0fdf4; border: 2px solid #bbf7d0; }
        .savings-purple { background: #faf5ff; border: 2px solid #ddd6fe; }
        .savings-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }
        .savings-title {
          font-family: 'Science Gothic', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .savings-desc {
          font-family: 'Science Gothic', sans-serif;
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }
        .info-templates-box {
          background: #fffbeb;
          border: 2px solid #fde68a;
          border-radius: 0;
          padding: 28px;
          margin-bottom: 24px;
        }
        .info-templates-box h3 {
          font-family: 'Science Gothic', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #92400e;
          margin-bottom: 16px;
        }
        .info-templates-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .info-template-chip {
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #78350f;
          font-family: 'Science Gothic', sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 0;
          transition: background 0.2s;
        }
        .info-template-chip:hover {
          background: #fde68a;
        }
        .info-steps-box {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 0;
          padding: 28px;
          margin-bottom: 32px;
        }
        .info-steps-box h3 {
          font-family: 'Science Gothic', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }
        .info-steps-list {
          list-style: decimal;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-steps-list li {
          font-family: 'Science Gothic', sans-serif;
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }
        .info-cta-btn {
          display: inline-block;
          background: black;
          color: white;
          font-family: 'Science Gothic', sans-serif;
          font-size: 17px;
          font-weight: 800;
          padding: 16px 36px;
          border-radius: 0;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          letter-spacing: 0.5px;
        }
        .info-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          background: #1e293b;
        }

        /* ── Off-Grid Section ── */
        .info-offgrid-section {
          background: #0f172a;
          border: 2px solid #1e293b;
          border-left: 10px solid black;
          border-radius: 0;
          padding: 60px 48px;
          display: flex;
          gap: 40px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
          overflow: hidden;
          position: relative;
        }
        .info-offgrid-section::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.15), transparent);
          border-radius: 50%;
          pointer-events: none;
        }
        .info-offgrid-text {
          flex: 1;
          min-width: 280px;
          position: relative;
          z-index: 1;
        }
        .info-offgrid-title {
          font-family: 'Science Gothic', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 900;
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.1;
        }
        .info-offgrid-desc {
          font-family: 'Science Gothic', sans-serif;
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          margin-bottom: 36px;
          max-width: 460px;
        }
        .info-offgrid-btn {
          display: inline-block;
          background: white;
          color: #0f172a;
          font-family: 'Science Gothic', sans-serif;
          font-size: 16px;
          font-weight: 800;
          padding: 14px 32px;
          border-radius: 0;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .info-offgrid-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .info-offgrid-img {
          flex: 0 0 460px;
          max-width: 460px;
          width: 460px;
          filter: drop-shadow(0 24px 48px rgba(59,130,246,0.35));
          position: relative;
          z-index: 1;
          transition: transform 0.4s ease;
        }
        .info-offgrid-img:hover {
          transform: scale(1.04) translateY(-6px);
        }
      `}</style>
    </div>
  );
}