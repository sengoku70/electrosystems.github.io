import { useEffect } from 'react'
import '../App.css';
import gsap from 'gsap';

import Community from './Community';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsInstagram } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { ImGithub } from "react-icons/im";
import { NavLink } from 'react-router-dom';

export default function Homepage() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.to(".ringbox", {
        scrollTrigger: {
          trigger: ".herotext",
          start: "top 20%",
          end: "bottom top",
          //markers: true,
          scrub: 2,
        },
        scaleX: .12,
        scaleY: .12,
        marginLeft: window.innerWidth < 1024 ? "44%" : "47.7%",
        top: "12px",
        zIndex: 40
      });

      gsap.to(".herotext", {
        scrollTrigger: {
          trigger: ".herotext",
          start: "bottom 50%",
          end: "bottom 40%",
          //markers: true,
          scrub: true,
          onEnter: () => {
            const el = document.querySelector(".herotext");
            if (el) el.textContent = "ELECTROSYTEMS";
          }
        },
        fontWeight: 900,
        backgroundImage: "linear-gradient(90deg, #6AA8FF, #7B3DE3,green)",
        webkitTextFillColor: "transparent",
        webkitBackgroundClip: "text",
        backgroundClip: "text",
      });

      gsap.to(".homepage", {
        scrollTrigger: {
          trigger: ".ringbox",
          start: "top top",
          end: "bottom -10%",
          //markers: true,
          scrub: true,
        },
        backgroundColor: "rgb(254, 226, 226)"
      });

      gsap.to(".homepage", {
        scrollTrigger: {
          trigger: ".hr2",
          start: "top top",
          end: "bottom -10%",
          //markers: true,
          scrub: true,
        },
        backgroundColor: "rgb(254, 226, 226)"
      });

      gsap.to(".h2side", {
        scrollTrigger: {
          trigger: ".hr1",
          start: "top bottom",
          end: "bottom 50%",
          //markers: true,
          scrub: true,
        },
        width: "100%"
      });

      gsap.to(".c1, .c2, .c3", {
        scrollTrigger: {
          trigger: ".hr1",
          start: "top center",
          end: "bottom 300px",
          //markers: true,
          scrub: 2.5
        },
        marginTop: 0,
        ease: "power2.out"
      });

    }); // end gsap.context

    return () => ctx.revert(); // cleanup all ScrollTriggers on unmount

  }, []);

  return (

    <div className="homepage bg-blue-100 duration-500  w-screen">

      <div className='hero h-screen w-full flex flex-col items-center justify-center text-[clamp(2.5rem,10vw,8rem)] text-center relative overflow-hidden'>

        <h1 className='bitcount absolute z-20 text-center text-black herotext w-screen leading-none px-4'>MAKING IT POSSIBLE</h1>
        <h4 className='absolute w-[min(90%,410px)] z-10 bottom-8 opacity-80 text-[clamp(0.8rem,1.2vw,1rem)] text-left px-6 py-4 bg-white/5 backdrop-blur-sm shadow-xl border border-white/10'>we invison to provide people with innovation that can make you go off grid , with cutting edge tecnology we are tranforming lives and Earth,Renewable energy is changing lives, giving people the freedom to choose better, greener, and more independent sources of power. From solar rooftops to wind micro-turbines, from off-grid cabins to eco-smart homes—renewable technologies are not just an alternative anymore; they are becoming the new standard.</h4>


        <div className={`ringbox z-1 fixed left-[25%] lg:left-[35%] top-[140px]`}>
          <div className={`ringg r2 border-90 border-pink-700/50 translate-y-[30px] `}></div>
          <div className={`ringg r1 border-90 border-red-700/50 translate-x-[20px] `}></div>
          <div className={`ringg r3 border-90 border-green-400/50 translate-x-[20px] `}></div>
          <div className={`ringg r4 border-90 border-blue-500/50 translate-y-[20px] `}></div>
          <div className={`ringg r5 border-30 border-white/60 translate-x-[20px]} `}></div>
        </div>
        <div className='text-[40px] w-screen text-center opacity-1 h-fit '><span className='h2side bg-black w-[10px] mr-10'> </span> ELECTROSYTEMS</div>

      </div>


      <div className='flex justify-center'>

        <hr className='hr1 bg-black h-[10px] w-6/10 ' /> <hr className='hr1 h-[10px] w-[100px] bg-black ml-5' /><hr className='hr1 h-[10px] w-[10px] bg-black ml-5' />
      </div>




      <div className='cards z-10 flex flex-col md:flex-row justify-center gap-[20px] lg:gap-[30px] items-stretch mt-[100px] px-6'>
        <NavLink to="/Infopage" className='c1 w-full md:w-1/3 lg:w-1/4 min-h-[400px] lg:h-[550px] py-12 px-4 bg-white/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center text-center hover:bg-white/50 transition-all group md:mt-[100px]'>
          <img src="/image/battry.png" alt="" className='w-[clamp(80px,40%,160px)] max-h-[160px] object-contain mb-6 group-hover:scale-110 transition-transform duration-300' />
          <h1 className='hero text-[clamp(1rem,3vw,1.5rem)] leading-tight text-black mb-8'>
            Learn about modern energy storage solutions
          </h1>
          <span className="mt-auto px-4 py-2 border border-black text-black font-black text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all group-hover:bg-black group-hover:text-white scale-90 group-hover:scale-100 opacity-60 group-hover:opacity-100">
            Learn More →
          </span>
        </NavLink>

        <span className="hidden md:block h-[300px] lg:h-[400px] bg-black w-[5px] lg:w-[10px]"></span>

        <NavLink to="/Infopage" className='c2 w-full md:w-1/3 lg:w-1/4 min-h-[400px] lg:h-[550px] py-12 px-4 bg-white/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center text-center hover:bg-white/50 transition-all group md:mt-[500px]'>
          <img src="/image/plant.png" alt="" className='w-[clamp(80px,40%,160px)] max-h-[160px] object-contain mb-6 group-hover:scale-110 transition-transform duration-300' />
          <h1 className='hero text-[clamp(1rem,3vw,1.5rem)] leading-tight text-black mb-8'>
            Learn how using renewable options help saving environment
          </h1>
          <span className="mt-auto px-4 py-2 border border-black text-black font-black text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all group-hover:bg-black group-hover:text-white scale-90 group-hover:scale-100 opacity-60 group-hover:opacity-100">
            Learn More →
          </span>
        </NavLink>

        <span className="hidden md:block h-[300px] lg:h-[400px] bg-black w-[5px] lg:w-[10px]"></span>

        <NavLink to="/Infopage" className='c3 w-full md:w-1/3 lg:w-1/4 min-h-[400px] lg:h-[550px] py-12 px-4 bg-white/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center text-center hover:bg-white/50 transition-all group md:mt-[1000px] md:mb-0 mb-12'>
          <img src="/image/house.png" alt="" className='w-[clamp(80px,40%,160px)] max-h-[160px] object-contain mb-6 group-hover:scale-110 transition-transform duration-300' />
          <h1 className='hero text-[clamp(1rem,3vw,1.5rem)] leading-tight text-black mb-8'>
            Learn how you can switch to Renewable and Go of Grid
          </h1>
          <span className="mt-auto px-4 py-2 border border-black text-black font-black text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all group-hover:bg-black group-hover:text-white scale-90 group-hover:scale-100 opacity-60 group-hover:opacity-100">
            Learn More →
          </span>
        </NavLink>
      </div>




      <div className='hr2 z-35 bg-black h-[400px] lg:h-[450px] text-white shadow-2xl flex row justify-center overflow-hidden items-center mt-[100px] w-full lg:w-6/10 mx-auto hover:lg:w-7/10 hover:lg:h-[500px] duration-900'>
        <h1 className='hero text-[clamp(1.5rem,5vw,4rem)] absolute text-center w-full font-bold px-4'>CHOOSE AMONG 300+ BRANDS</h1>
        <div className='w-[3700px] h-full flex justify-end items-center gap-4 duration-15000 translate-x-320 hover:-translate-x-280 '>
          <div className='productcard ml-[1000px]'><img src="/image/vestas.png" alt="" /></div>

          <div className='productcard'><img src="/image/triana.png" alt="" /></div>
          <div className='productcard'><img src="/image/ja.png" alt="" /></div>
          <div className='productcard'><img src="/image/minyang.jpg" alt="" /></div>
          <div className='productcard'><img src="/image/Adobe Express - file.png" alt="" /></div>
          <div className='productcard'><img src="/image/siemens.jpg" alt="" /></div>
          <div className='productcard'><img src="/image/DMEG.png" alt="" /></div>
          <div className='productcard'><img src="/image/akio.png" alt="" /></div>
          <div className='productcard'><img src="/image/Longi.png" alt="" /></div>
          <div className='productcard'><img src="/image/Download.png" alt="" /></div>





        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-between items-center mt-[100px] lg:mt-[150px] mb-[150px] w-[90%] lg:w-7/10 mx-auto gap-12'>
        <div className='hero text-[clamp(1.5rem,4vw,2.5rem)] lg:my-[100px] w-full lg:w-5/10 text-center lg:text-left font-black leading-tight'>
          SEE WHAT COMMUNITY HAS TO OFFER <br /> 
          <NavLink to="/Community" className="view-details-btn text-[0.9rem] px-8 py-3 mt-6 inline-block">Go to Community Page</NavLink>
        </div>

        <div className="h-[300px] md:h-[400px] lg:h-[500px] w-full lg:w-[500px] bg-contain border-white/60 border-[20px] lg:border-[40px] shadow-2xl bg-no-repeat bg-center bg-[url('/image/Gemini_Generated_Image_ks59lkks59lkks59.png')]"></div>
      </div>




      <footer className="hero bg-black text-white mt-50 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo + Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Electrosystems</h2>
            <p className="text-gray-400">
              Building hybrid solar & wind systems for a sustainable future.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Homepage</a></li>
              <li><a href="/learn-more" className="hover:text-white">Learn More</a></li>
              <li><a href="/custom-system" className="hover:text-white">Custom System</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-white text-gray-300 text-2xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white text-gray-300 text-2xl">
                <GrLinkedinOption />
              </a>
              <a href="#" className="hover:text-white text-gray-300 text-2xl">
                <ImGithub />
              </a>
              <a href="#" className="text-white text-2xl">
                <BsInstagram />
              </a>
            </div>
          </div>

        </div>

        <div className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} ELECTROSYTEMS. All rights reserved.
        </div>
      </footer>






    </div>
  )
}
