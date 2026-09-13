"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../Components/Toast";
import Messages from "./components/messages";
import Media from "./components/media";
import { LogOut, LayoutDashboard, Moon, Sun, MessageSquare, ImageIcon } from "../Components/Icons";

function Admin() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("messages"); // 'messages' or 'media'

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'light') {
        setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
      setIsDarkMode(prev => {
          const newTheme = !prev;
          localStorage.setItem('admin-theme', newTheme ? 'dark' : 'light');
          return newTheme;
      });
  };


  const Logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      router.push("/Admin/Login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      setLoading(false);
    }
  };

  if (isForbidden) {
    return (
      <div className="relative min-h-screen bg-[#0B0D12] flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full bg-[#E8A33D]/[0.06] animate-pulse blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-72 h-72 rounded-full bg-[#E5484D]/[0.05] animate-pulse blur-3xl pointer-events-none [animation-delay:2s]" />

        <div className="relative z-10 flex flex-col items-center text-center px-10 py-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl max-w-sm w-full mx-4">
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#E8A33D] border-r-[#E8A33D]/30 animate-spin" />
            <div className="absolute inset-[10px] rounded-full border-2 border-transparent border-t-[#E5484D] border-l-[#E5484D]/30 animate-[spin_1.8s_linear_infinite_reverse]" />
            <div className="absolute inset-5 rounded-full bg-[#E8A33D]/10 flex items-center justify-center">
              <svg
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="#E8A33D"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B93A7] mb-2">Access denied</p>
          <h2 className="text-lg font-bold text-[#F5F3EE] mb-6">Redirecting to safety…</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D] animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D] animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D] animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0B0D12] text-slate-900 dark:text-[#F5F3EE] font-sans selection:bg-indigo-500/20 dark:selection:bg-[#E8A33D]/20 selection:text-indigo-700 dark:selection:text-[#E8A33D] transition-colors duration-300">

      {/* Top Navigation Bar */}
      <header className="shrink-0 bg-white/90 dark:bg-[#0E1016]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <Link href={"/en"} className="bg-indigo-600 dark:bg-[#E8A33D] text-white dark:text-[#0B0D12] p-2 rounded-lg shadow-sm shadow-indigo-200 dark:shadow-[#E8A33D]/20 transition-colors duration-300">
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-[#F5F3EE] tracking-tight leading-none transition-colors duration-300">
                  Admin Dashboard
                </h1>
                <p className="text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] tracking-[0.2em] uppercase mt-1 transition-colors duration-300">
                  Control Center
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#14171F] rounded-xl border border-slate-200 dark:border-white/10 transition-colors duration-300">
                <button 
                    onClick={() => setActiveTab("messages")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'messages' ? 'bg-white dark:bg-[#1E222D] text-indigo-600 dark:text-[#E8A33D] shadow-sm border border-slate-200/50 dark:border-white/5' : 'text-slate-500 dark:text-[#8B93A7] hover:text-slate-700 dark:hover:text-[#F5F3EE]'}`}
                >
                    <MessageSquare className="w-4 h-4" />
                    Messages
                </button>
                <button 
                    onClick={() => setActiveTab("media")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'media' ? 'bg-white dark:bg-[#1E222D] text-indigo-600 dark:text-[#E8A33D] shadow-sm border border-slate-200/50 dark:border-white/5' : 'text-slate-500 dark:text-[#8B93A7] hover:text-slate-700 dark:hover:text-[#F5F3EE]'}`}
                >
                    <ImageIcon className="w-4 h-4" />
                    Media
                </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#8B93A7] hover:text-indigo-600 dark:hover:text-[#E8A33D] transition-colors border border-slate-200 dark:border-white/10"
                  title="Toggle Theme"
              >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-[#E8A33D]/15 text-indigo-600 dark:text-[#E8A33D] flex items-center justify-center text-[10px] font-bold border border-indigo-200 dark:border-[#E8A33D]/20 transition-colors duration-300">
                  AE
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-[#F5F3EE]/80 pr-1 transition-colors duration-300">
                  Abdellah Edaoudi
                </span>
              </div>

              <button
                onClick={Logout}
                disabled={loading}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-[#8B93A7] hover:text-red-500 dark:hover:text-[#E5484D] transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline group-hover:underline decoration-red-200 dark:decoration-[#E5484D]/40 underline-offset-4">
                  {loading ? "Exiting..." : "Exit"}
                </span>
                <div className="p-2 bg-slate-100 dark:bg-white/5 group-hover:bg-red-50 dark:group-hover:bg-[#E5484D]/10 rounded-lg transition-colors">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-red-200 dark:border-[#E5484D]/30 border-t-red-500 dark:border-t-[#E5484D] rounded-full animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Tabs (visible only on small screens) */}
          <div className="md:hidden flex items-center gap-2 pb-3 mt-1">
              <button 
                  onClick={() => setActiveTab("messages")}
                  className={`flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'messages' ? 'bg-indigo-50 dark:bg-[#1E222D] text-indigo-600 dark:text-[#E8A33D] shadow-sm border border-indigo-100 dark:border-white/10' : 'bg-slate-50 dark:bg-[#14171F] text-slate-500 dark:text-[#8B93A7] border border-slate-200 dark:border-white/5'}`}
              >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Messages
              </button>
              <button 
                  onClick={() => setActiveTab("media")}
                  className={`flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'media' ? 'bg-indigo-50 dark:bg-[#1E222D] text-indigo-600 dark:text-[#E8A33D] shadow-sm border border-indigo-100 dark:border-white/10' : 'bg-slate-50 dark:bg-[#14171F] text-slate-500 dark:text-[#8B93A7] border border-slate-200 dark:border-white/5'}`}
              >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Media
              </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col relative">
        <div className={`absolute inset-0 px-4 sm:px-6 lg:px-8 py-6 flex-col min-h-0 w-full max-w-6xl mx-auto ${activeTab === 'messages' ? 'flex z-10' : 'hidden -z-10'}`}>
            <Messages isForbidden={isForbidden} setIsForbidden={setIsForbidden} />
        </div>
        <div className={`absolute inset-0 px-4 sm:px-6 lg:px-8 py-6 flex-col min-h-0 w-full max-w-6xl mx-auto ${activeTab === 'media' ? 'flex z-10' : 'hidden -z-10'}`}>
            <Media isForbidden={isForbidden} setIsForbidden={setIsForbidden} />
        </div>
      </main>
      </div>
    </div>
  );
}

export default Admin;