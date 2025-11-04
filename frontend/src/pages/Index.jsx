import React from "react"
import { useEffect } from "react";
import bg1 from '../assets/bg1.jpg'
import { Link } from "react-router";
import { LocateFixed} from "lucide-react"

const Index = () => {
    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector(".parallax-bg");
            let scrollY = window.scrollY;
            section.style.backgroundPositionY = `${scrollY * 0.4}px`;
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    
    return (
        <>
        <header>
            <nav className="bg-wbtext2 border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center text-white"><LocateFixed size={32}/>
                        <span className="ml-2 self-center text-xl font-semibold whitespace-nowrap text-white">C-TRACK</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link to="/admin/signin" className="text-white bg-wbprimary hover:bg-wbsecondary hover:text-white focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Sign in</Link>
                    </div>
                </div>
            </nav>
        </header>
        <section
            className="parallax-bg relative bg-cover bg-center w-full min-h-screen flex items-center justify-center"
            style={{ backgroundImage: `url(${bg1})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
    
            {/* Content */}
            <div className="relative z-10 text-center px-6 lg:px-12 max-w-4xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg animate-fadeIn delay-100">
            Building Safer Communities For A Safer World
            </h1>
    
            <p className="mb-6 text-lg font-semibold text-gray-200 lg:text-xl sm:px-8 animate-fadeIn delay-300">
            Safer communities are built when everyone plays a part.Empower citizen to report crimes securely and help law enforcement respond faster and more effectively
            </p>
    
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center animate-slideUp delay-700">
                <Link
                to="/report/form"
                className="inline-flex items-center justify-center py-3 px-6 text-base font-semibold rounded-lg bg-wbprimary text-white border border-transparent hover:bg-wbsecondary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                Report A Crime Anonymously
                </Link>
            </div>
            </div>
    
            {/* Animations */}
            <style>
            {`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.8s ease-out forwards;
            }
            .animate-slideUp {
                animation: slideUp 0.8s ease-out forwards;
            }
            .delay-100 { animation-delay: 0.1s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-500 { animation-delay: 0.5s; }
            .delay-700 { animation-delay: 0.7s; }
            `}
            </style>
        </section>
    {/**FOOTER */}
    <footer class="p-4 bg-wbtext 2 md:p-8 lg:p-10">
    <div class="mx-auto max-w-screen-xl text-center">
    <Link to='/' class="flex justify-center items-center text-2xl font-semibold text-white">
        <LocateFixed />
        <span className="ml-2">C-TRACK</span> 
    </Link>
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" class="hover:underline">MikeTech™</a>. All Rights Reserved.</span>
    </div>
    </footer>
    </>
    )
    }
export default Index;