import { useEffect } from 'react'
import '../App.css';
import gsap from 'gsap';
import logo from "../assets/image/Untitled.png"
import Community from './Community';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsInstagram } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { ImGithub } from "react-icons/im";
import { NavLink } from 'react-router-dom';

export default function Homepage() {

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop & Tablet animations
      gsap.to(".ringbox", {
        scrollTrigger: {
          trigger: ".herotext",
          start: "top 20%",
          end: "bottom top",
          scrub: 2,
        },
        scaleX: .12,
        scaleY: .12,
        marginLeft: "47.7%",
        top: "24px",
        zIndex: 40
      });

      gsap.to(".c1, .c2, .c3", {
        scrollTrigger: {
          trigger: ".hr1",
          start: "top center",
          end: "bottom 300px",
          scrub: 2
        },
        marginTop: 0,
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile animations
      gsap.to(".ringbox", {
        scrollTrigger: {
          trigger: ".herotext",
          start: "top 20%",
          end: "bottom top",
          scrub: 2,
        },
        scale: 0.05,
        top: "10px",
        zIndex: 40
      });

      gsap.to(".c1, .c2, .c3", {
        scrollTrigger: {
          trigger: ".hr1",
          start: "top center",
          end: "bottom 100px",
          scrub: 2
        },
        marginTop: 0,
      });
    });

    // General animations
    gsap.to(".herotext", {
      scrollTrigger: {
        trigger: ".herotext",
        start: "bottom 50%",
        end: "bottom 40%",
        scrub: true,
        onEnter: () => {
          document.querySelector(".herotext").textContent = "ELECTROSYTEMS";
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
        scrub: true,
      },
      backgroundColor: "rgb(254, 226, 226)"
    });
    
    gsap.to(".h2side", {
      scrollTrigger: {
        trigger: ".hr1",
        start: "top bottom",
        end: "bottom 50%",
        scrub: true,
      },
      width: "100%"
    });






  }, []);

  return (

    <div className="homepage bg-blue-100 duration-500  w-screen">

      <div className='hero min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4'>

        <h1 className='bitcount mt-[15vh] md:mt-[20vh] lg:mt-40 z-20 text-center text-black herotext w-full text-[clamp(40px,10vw,130px)] leading-none'>MAKING IT POSSIBLE</h1>
        
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-end justify-between mt-auto mb-20 z-10 gap-10">
          <h4 className='w-full md:w-[45%] opacity-80 text-[clamp(14px,1.5vw,18px)] text-left leading-relaxed'>
            we invison to provide people with innovation that can make you go off grid, with cutting edge tecnology we are tranforming lives and Earth. Renewable energy is changing lives, giving people the freedom to choose better, greener, and more independent sources of power. From solar rooftops to wind micro-turbines, from off-grid cabins to eco-smart homes—renewable technologies are not just an alternative anymore; they are becoming the new standard.
          </h4>
          <div className='text-[clamp(24px,4vw,40px)] flex items-center gap-4 whitespace-nowrap'>
            <span className='h2side bg-black w-[5px] md:w-[10px] h-[30px] md:h-[50px]'></span> 
            ELECTROSYTEMS
          </div>
        </div>


        <div className={`ringbox z-1 fixed left-1/2 -translate-x-1/2 top-[150px] md:top-[140px] scale-[0.5] md:scale-1 w-full flex justify-center`}>
          <div className="relative w-[300px] md:w-[600px] h-[300px] md:h-[600px]">
            <div className={`ringg r2 border-[40px] md:border-[90px] border-pink-700/50 absolute inset-0 rounded-full translate-y-[15px] md:translate-y-[30px]`}></div>
            <div className={`ringg r1 border-[40px] md:border-[90px] border-red-700/50 absolute inset-0 rounded-full translate-x-[10px] md:translate-x-[20px]`}></div>
            <div className={`ringg r3 border-[40px] md:border-[90px] border-green-400/50 absolute inset-0 rounded-full translate-x-[10px] md:translate-x-[20px]`}></div>
            <div className={`ringg r4 border-[40px] md:border-[90px] border-blue-500/50 absolute inset-0 rounded-full translate-y-[10px] md:translate-y-[20px]`}></div>
            <div className={`ringg r5 border-[15px] md:border-[30px] border-white/60 absolute inset-0 rounded-full translate-x-[10px] md:translate-x-[20px]`}></div>
          </div>
        </div>

      </div>


      <div className='flex justify-center flex-wrap gap-2 md:gap-5 px-4'>
        <hr className='hr1 bg-black h-[10px] w-full md:w-6/10 ' /> 
        <hr className='hr1 h-[10px] w-[60px] md:w-[100px] bg-black' />
        <hr className='hr1 h-[10px] w-[10px] bg-black' />
      </div>

      <div className='cards z-10 flex flex-col md:flex-row justify-center gap-[30px] items-center mt-[100px] px-6'>
        <div className='c1 w-full md:w-1/4 lg:w-1/5 h-auto min-h-[450px] md:h-[550px] mt-[50px] md:mt-[100px] p-6 bg-white/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center'>
          <img src="/image/battry.png" alt="" className='w-full max-w-[200px] mb-6' />
          <h1 className='hero text-[20px]'>
            Learn about modern energy storage solutions
          </h1>
        </div>

        <span className="hidden md:block h-[400px] bg-black w-[10px]"></span>

        <div className='c2 w-full md:w-1/4 lg:w-1/5 h-auto min-h-[450px] md:h-[550px] p-6 mt-[50px] md:mt-[500px] bg-white/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center'>
          <img src="/image/plant.png" alt="" className='w-full max-w-[200px] mb-6' />
          <h1 className='hero text-[20px]'>
            Learn how using renewable options help saving environment
          </h1>
        </div>

        <span className="hidden md:block h-[400px] bg-black w-[10px]"></span>

        <div className='c3 w-full md:w-1/4 lg:w-1/5 h-auto min-h-[450px] md:h-[550px] p-6 mt-[50px] md:mt-[1000px] bg-white/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center'>
          <img src="/image/house.png" alt="" className='w-full max-w-[200px] mb-6' />
          <h1 className='hero text-[20px]'>
            Learn how you can switch to Renewable and Go of Grid
          </h1>
        </div>
      </div>




      <div className='hr2 z-35 bg-black h-[300px] md:h-[450px] text-white shadow-2xl flex flex-col justify-center overflow-hidden items-center mt-[100px] w-full md:w-8/10 lg:w-6/10 mx-auto hover:w-full md:hover:w-7/10 transition-all duration-700 relative'>
        <h1 className='hero text-[30px] md:text-[60px] absolute z-10 text-center w-full font-bold bg-black/50 py-4'>CHOOSE AMONG 300+ BRANDS</h1>
        <div className='flex items-center gap-4 animate-scroll whitespace-nowrap px-4 py-10'>
          {[
            "/image/vestas.png", "/image/triana.png", "/image/ja.png", 
            "/image/minyang.jpg", "/image/Adobe Express - file.png", 
            "/image/siemens.jpg", "/image/DMEG.png", "/image/akio.png", 
            "/image/Longi.png", "/image/Download.png"
          ].map((src, i) => (
            <div key={i} className='productcard scale-75 md:scale-100 flex-shrink-0'>
              <img src={src} alt="Brand" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {[
            "/image/vestas.png", "/image/triana.png", "/image/ja.png", 
            "/image/minyang.jpg", "/image/Adobe Express - file.png", 
            "/image/siemens.jpg", "/image/DMEG.png", "/image/akio.png", 
            "/image/Longi.png", "/image/Download.png"
          ].map((src, i) => (
            <div key={`dup-${i}`} className='productcard scale-75 md:scale-100 flex-shrink-0'>
              <img src={src} alt="Brand" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-between items-center mt-[100px] md:mt-[150px] mb-[100px] md:mb-[150px] w-[90%] md:w-7/10 mx-auto gap-10'>
        <div className='hero text-[28px] md:text-[40px] text-center lg:text-left w-full lg:w-1/2'>
          SEE WHAT COMMUNITY HAS TO OFFER <br /> 
          <NavLink to="/Community" className="view-details-btn text-[15px] mt-4 inline-block px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">Go to Community Page</NavLink>
        </div>

        <div className="h-[300px] md:h-[500px] w-full max-w-[500px] bg-contain border-white/60 border-[10px] md:border-[40px] shadow-2xl bg-no-repeat bg-center bg-[url('/image/Gemini_Generated_Image_ks59lkks59lkks59.png')] "></div>
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
