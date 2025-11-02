import React, { useState } from "react";
import { Link } from "react-router";
import {
  LocateFixed,
  Search,
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  User,
  Plus,
  Activity,
  ActivityIcon,
} from "lucide-react";
import { NavLink, useNavigate , Navigate } from "react-router";
import AuthService from "../services/AuthService";
import { useRef , useEffect} from "react";

const NavSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [activeTab, setActiveTab] = useState('');
    const lastScrollY = useRef(0);
    //const [openModal, setOpenModal] = useState(false);
    const [logoutError, setLogoutError] = useState();
    const {logOutUser , authUser} = AuthService()


    const suggestions = [
        { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", mutualFriends: 12 },
        { name: "Lisa Park", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face", mutualFriends: 8 },
        { name: "David Kim", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", mutualFriends: 15 }
    ];

    const navigate = useNavigate();
    const handleLogout = async(e) =>{
      e.preventDefault();

      const result = await logOutUser();
      if (result.status === 200){
        console.log("User Logged Out!")
        navigate('/user/login')
        console.log(result.message)
        } else{
        setLogoutError(result.err)
      }

    }

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          setTopBarVisible(currentScrollY < lastScrollY.current || currentScrollY < 50);
          lastScrollY.current = currentScrollY;
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [authUser]);

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <LocateFixed className="text-[#2E7BC4]" size={28} />
                <span className="text-xl font-black text-gray-800">C-TRACK</span>
              </div>
              <span className="hidden sm:block px-3 py-1 bg-blue-100 text-[#2E7BC4] text-xs font-semibold rounded-full">
                ADMIN
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">
              Admin Interface
            </h2>
            <nav className="space-y-2">
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link
                to="/cases/all-cases"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Activity size={20} />
                All Cases
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Users size={20} />
                User Management
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <FileText size={20} />
                Crime Reports
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <BarChart3 size={20} />
                Data Analytics
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Settings size={20} />
                Logout
              </Link>
            </nav>
          </div>
        </aside>
      </div>

            {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gdbg backdrop-blur-md border-t border-gray-700 z-40">
        <div className="flex justify-around items-center h-16 px-4">

          <NavLink 
            to={`/cases/all-cases`} 
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? 'text-gdsecondary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            < Activity size={24} />
          </NavLink>

          <NavLink 
            to={`/reports/all-reports`} 
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? 'text-gdsecondary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            < FileText size={28} />
          </NavLink>

          <NavLink 
            to={`/create/new`} 
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? 'text-gdsecondary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            < Plus size={24} />
          </NavLink>

          <NavLink 
            to={`/trade/tradesphere`} 
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? 'text-gdsecondary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            < ActivityIcon size={24} />
          </NavLink>

          <NavLink 
            to={`/user/profile/${authUser?._id}`} 
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? 'text-gdsecondary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <User size={24} />
          </NavLink>

        </div>
      </nav>
    </>
  );
};

export default NavSideBar;