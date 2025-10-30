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
                        <Link to="/admin/signin" className="text-white bg-transparent hover:bg-wbprimary focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Sign in</Link>
                        <Link to="/admin/signup" className="text-white bg-wbprimary hover:bg-wbsecondary hover:text-white focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Admin</Link>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gdtext rounded-lg lg:hidden hover:bg-gdbg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to="/" className="block py-2 pr-4 pl-3 text-gdaccent rounded bg-primary-700 lg:bg-transparent lg:text-gdaccent lg:p-0 ">Home</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 pr-4 pl-3 text-gdtext border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gdprimary lg:p-0 ">Features</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 pr-4 pl-3 text-gdtext border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gdprimary lg:p-0">Team</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 pr-4 pl-3 text-gdtext border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gdprimary lg:p-0">Contact</Link>
                            </li>
                        </ul>
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
    {/**CTA */}
    <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's find more that brings us together.</h2>
            <p class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">Flowbite helps you connect with friends, family and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups, Watch and Marketplace.</p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a href="#" class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Get started
                </a>
                <a href="#" class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    View more
                </a>  
            </div>
        </div>
    </div>
    </section>
    {/**FEATURES */}
    <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
            <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                </div>
                <h3 class="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
                <p class="text-gray-500 dark:text-gray-400">Plan it, create it, launch it. Collaborate seamlessly with all  the organization and hit your marketing goals every month with our marketing plan.</p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                </div>
                <h3 class="mb-2 text-xl font-bold dark:text-white">Legal</h3>
                <p class="text-gray-500 dark:text-gray-400">Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.</p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>                    
                </div>
                <h3 class="mb-2 text-xl font-bold dark:text-white">Business Automation</h3>
                <p class="text-gray-500 dark:text-gray-400">Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.</p>
            </div>
        </div>
    </div>
    </section>
    {/**CTA */}
    <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's find more that brings us together.</h2>
            <p class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">Flowbite helps you connect with friends, family and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups, Watch and Marketplace.</p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a href="#" class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Get started
                </a>
                <a href="#" class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    View more
                </a>  
            </div>
        </div>
    </div>
    </section>
    {/**FOOTER */}
    <footer class="p-4 bg-wbtext 2 md:p-8 lg:p-10">
    <div class="mx-auto max-w-screen-xl text-center">
    <Link to='/' class="flex justify-center items-center text-2xl font-semibold text-white">
        <LocateFixed />
        <span className="ml-2">C-TRACK</span> 
    </Link>
    <p class="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
    <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Premium</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Blog</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">FAQs</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
        </li>
    </ul>
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-2022 <a href="#" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
    </footer>
    </>
    )
    }
export default Index;