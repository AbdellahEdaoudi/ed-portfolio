"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useToast } from "../../Components/Toast";
import {
    MessageSquare, Trash2, Search, Plus, ChevronLeft,
    User, Mail, Clock, RefreshCcw, Star, MailOpen
} from "../../Components/Icons";
import { useRouter } from "next/navigation";

export default function Messages({ isForbidden, setIsForbidden }) {
    const toast = useToast();
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTab, setFilterTab] = useState("all"); // "all", "unread", "starred"
    const [selectedId, setSelectedId] = useState(null);
    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        type: null,
        id: null,
        isDeleting: false
    });
    const [imageModal, setImageModal] = useState(null); // stores image URL when open

    const handleApiError = async (error, retryCallback, defaultErrorMsg = "Operation failed.") => {
        console.error("API error details:", error);
        if (error.response) {
            const errorCode = error.response.data?.code;
            const errorMsg = error.response.data?.message || defaultErrorMsg;
            if (errorCode === "ACCESS_TOKEN_EXPIRED") {
                try {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
                        {},
                        { withCredentials: true }
                    );
                    if (retryCallback) await retryCallback();
                } catch (refreshError) {
                    toast.error("Session expired. Please login again.");
                    router.push("/Admin/Login");
                }
            } else if (["TOKEN_MISSING", "ACCESS_TOKEN_INVALID"].includes(errorCode) || error.response.status === 401) {
                toast.error("Unauthorized: Please login again.");
                router.push("/Admin/Login");
            } else if (error.response.status === 403) {
                setIsForbidden(true);
                toast.error("Forbidden: You don't have permission.");
                router.push("/en");
            } else {
                toast.error(`Error: ${errorMsg}`);
            }
        } else if (error.request) {
            toast.error("Network error: No response received.");
        } else {
            toast.error("Error setting up request.");
        }
    };

     const fetchContacts = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`,
                { withCredentials: true }
            );
            const contactsData = response.data.contacts || response.data;
            setContacts(Array.isArray(contactsData) ? contactsData.reverse() : []);
            if (silent) toast.success("Token refreshed");
        } catch (error) {
            handleApiError(error, () => fetchContacts(true), "Failed to fetch messages.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDeleteAllClick = () => {
        setDeleteModal({ isOpen: true, type: "all", id: null, isDeleting: false });
    };

    const handleDeleteByIdClick = (e, id) => {
        if (e) e.stopPropagation();
        setDeleteModal({ isOpen: true, type: "single", id, isDeleting: false });
    };

    const confirmDelete = async () => {
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));
        try {
            if (deleteModal.type === "all") {
                await axios({ method: "delete", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, withCredentials: true });
                setContacts([]);
                setSelectedId(null);
                toast.success("All messages deleted successfully.");
            } else if (deleteModal.type === "single" && deleteModal.id) {
                await axios({ method: "delete", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact/${deleteModal.id}`, withCredentials: true });
                setContacts((prev) => prev.filter((contact) => contact._id !== deleteModal.id));
                if (selectedId === deleteModal.id) setSelectedId(null);
                toast.success("Message deleted successfully.");
            }
        } catch (error) {
            handleApiError(error, confirmDelete, "Delete failed.");
        } finally {
            setDeleteModal(prev => ({ ...prev, isOpen: false, isDeleting: false }));
        }
    };

    const AddMessage = async () => {
        try {
            const newMsg = {
                subject: "New message",
                email: "[EMAIL_ADDRESS]",
                message: "Hi, I came across your portfolio and I'm impressed with your work. I'm looking for a developer to work on a project, and I think you'd be a great fit.",
            };
            const res = await axios({ method: "post", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, data: newMsg, withCredentials: true });
            setContacts((prev) => [...prev, res.data]);
            toast.success("Added successfully.");
        } catch (error) {
            console.error("Add message error:", error);
            toast.error("Failed to add message.");
        }
    };

    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch =
            contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.message?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;
        if (filterTab === "unread") return !contact.isRead;
        if (filterTab === "starred") return contact.isStarred;
        return true;
    });



    // Ledger index — position of a message within the full (unfiltered) inbox,
    // oldest = 001. This is the page's signature device: every message carries
    // a fixed reference number, independent of search/filter/page.
    const indexOf = (id) => {
        const pos = contacts.findIndex((c) => c._id === id);
        if (pos === -1) return null;
        return String(contacts.length - pos).padStart(3, "0");
    };

    const selectedContact = contacts.find((c) => c._id === selectedId) || null;
    const unreadCount = contacts.filter((c) => !c.isRead).length;
    const starredCount = contacts.filter((c) => c.isStarred).length;

    const handleSelectContact = async (contact) => {
        setSelectedId(contact._id);
        if (!contact.isRead) {
            try {
                await axios.patch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact/${contact._id}/read`,
                    { isRead: true },
                    { withCredentials: true }
                );
                setContacts((prev) =>
                    prev.map((c) => (c._id === contact._id ? { ...c, isRead: true } : c))
                );
            } catch (error) {
                handleApiError(error, () => handleSelectContact(contact), "Failed to mark message as read.");
            }
        }
    };

    const handleToggleRead = async (e, contact, targetStatus) => {
        if (e) e.stopPropagation();
        const nextStatus = targetStatus !== undefined ? targetStatus : !contact.isRead;
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact/${contact._id}/read`,
                { isRead: nextStatus },
                { withCredentials: true }
            );
            setContacts((prev) =>
                prev.map((c) => (c._id === contact._id ? { ...c, isRead: nextStatus } : c))
            );
            toast.success(nextStatus ? "Marked as read" : "Marked as unread");
        } catch (error) {
            handleApiError(error, () => handleToggleRead(null, contact, targetStatus), "Failed to update read status.");
        }
    };

    const handleToggleStar = async (e, contact) => {
        if (e) e.stopPropagation();
        const nextStarred = !contact.isStarred;
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact/${contact._id}/star`,
                { isStarred: nextStarred },
                { withCredentials: true }
            );
            setContacts((prev) =>
                prev.map((c) => (c._id === contact._id ? { ...c, isStarred: nextStarred } : c))
            );
            toast.success(nextStarred ? "Starred message" : "Unstarred message");
        } catch (error) {
            handleApiError(error, () => handleToggleStar(null, contact), "Failed to update star status.");
        }
    };


    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };

    const highlightText = (text, highlight) => {
        if (!text) return "";
        if (!highlight.trim()) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="text-[#E8A33D] bg-[#E8A33D]/10 px-0.5 rounded-sm font-semibold">
                    {part}
                </span>
            ) : part
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col font-sans">
            {/* Custom scrollbar — replaces the default browser scrollbar wherever .custom-scroll is used */}
            <style jsx global>{`
                .custom-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background-color: rgba(232, 163, 61, 0.3);
                    border-radius: 999px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(232, 163, 61, 0.55);
                }
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(232, 163, 61, 0.3) transparent;
                }
            `}</style>
            {/* Image Lightbox Modal */}
                {imageModal && (
                    <div
                        onClick={() => setImageModal(null)}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full cursor-default"
                        >
                            <button
                                onClick={() => setImageModal(null)}
                                className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-[#F5F3EE] text-[#0B0D12] rounded-full shadow-lg flex items-center justify-center hover:bg-[#E5484D] hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={imageModal}
                                alt="Full size attachment"
                                className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                )}

            {/* Delete Confirmation Modal */}
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            onClick={() => !deleteModal.isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <div
                            className="relative bg-white dark:bg-[#14171F] rounded-2xl shadow-2xl p-8 w-full max-w-sm overflow-hidden border border-slate-200 dark:border-white/10 transition-colors"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-red-100 dark:bg-[#E5484D]/10 rounded-full flex items-center justify-center mb-5 border border-red-200 dark:border-[#E5484D]/20 transition-colors">
                                    <Trash2 className="w-6 h-6 text-red-500 dark:text-[#E5484D]" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5F3EE] mb-2 transition-colors">
                                    {deleteModal.type === "all" ? "Clear the entire inbox?" : "Delete this message?"}
                                </h3>
                                <p className="text-slate-500 dark:text-[#8B93A7] mb-6 leading-relaxed px-2 text-xs transition-colors">
                                    {deleteModal.type === "all"
                                        ? "Every message will be permanently removed. This cannot be undone."
                                        : "This message will be permanently removed."}
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                        className="flex-1 px-4 py-3 bg-white/5 text-[#F5F3EE]/80 rounded-lg hover:bg-white/10 font-semibold transition-all text-xs disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-3 bg-[#E5484D] text-white rounded-lg hover:bg-[#c93d42] font-semibold transition-all shadow-lg shadow-[#E5484D]/20 text-xs disabled:opacity-70 flex justify-center items-center gap-2"
                                    >
                                        {deleteModal.isDeleting ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Confirm"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* App shell */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0B0D12] flex flex-col flex-1 min-h-0 transition-colors duration-300">

                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0E1016] transition-colors duration-300">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-[#F5F3EE] tracking-tight transition-colors">Inbox</h2>
                        <p className="text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] uppercase tracking-[0.2em] mt-0.5 transition-colors">
                            {contacts.length} received {unreadCount > 0 && <span className="text-amber-500 dark:text-[#E8A33D] font-bold">({unreadCount} new)</span>}
                        </p>
                    </div>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => fetchContacts()}
                            className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#F5F3EE]/70 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-[#F5F3EE] rounded-lg transition-all active:scale-95"
                            title="Refresh"
                        >
                            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={AddMessage}
                            className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-[#E8A33D] hover:bg-indigo-50 dark:hover:bg-[#E8A33D]/10 rounded-lg transition-all active:scale-95"
                            title="Add sample message"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDeleteAllClick}
                            className={`p-2.5 border transition-all rounded-lg active:scale-95 ${contacts.length > 0 ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-red-500 dark:text-[#E5484D] hover:bg-red-50 dark:hover:bg-[#E5484D]/10' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5 text-slate-300 dark:text-white/15 cursor-not-allowed'}`}
                            title="Clear all"
                            disabled={contacts.length === 0}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Split pane body */}
                <div className="flex-1 flex min-h-0">

                    {/* LIST PANE */}
                    <div className={`w-full md:w-[340px] md:shrink-0 border-r border-slate-200 dark:border-white/10 flex-col bg-slate-50 dark:bg-[#0E1016] transition-colors duration-300 ${selectedId ? 'hidden md:flex' : 'flex'}`}>
                        {/* Search & Filters */}
                        <div className="p-3 border-b border-slate-200 dark:border-white/10 transition-colors">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-[#8B93A7] group-focus-within:text-indigo-600 dark:group-focus-within:text-[#E8A33D] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search messages…"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); }}
                                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-[#F5F3EE] outline-none focus:border-indigo-300 dark:focus:border-[#E8A33D]/50 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-[#E8A33D]/10 transition-all placeholder:text-slate-400 dark:placeholder:text-[#8B93A7]"
                                />
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
                                <button
                                    onClick={() => { setFilterTab("all"); }}
                                    className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-all ${filterTab === "all" ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-[#F5F3EE]" : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-800 dark:hover:text-white"}`}
                                >
                                    All ({contacts.length})
                                </button>
                                <button
                                    onClick={() => { setFilterTab("unread"); }}
                                    className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-all flex items-center gap-1 ${filterTab === "unread" ? "bg-amber-500/20 text-amber-600 dark:text-[#E8A33D]" : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-800 dark:hover:text-white"}`}
                                >
                                    Unread ({unreadCount})
                                </button>
                                <button
                                    onClick={() => { setFilterTab("starred"); }}
                                    className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-all flex items-center gap-1 ${filterTab === "starred" ? "bg-amber-500/20 text-amber-600 dark:text-[#E8A33D]" : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-800 dark:hover:text-white"}`}
                                >
                                    ★ Starred ({starredCount})
                                </button>
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="flex-1 overflow-y-auto custom-scroll">
                            {isLoading ? (
                                <div className="p-3 space-y-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="p-3 rounded-lg animate-pulse space-y-2">
                                            <div className="h-3 bg-white/5 rounded w-2/3" />
                                            <div className="h-2.5 bg-white/5 rounded w-1/2" />
                                            <div className="h-2.5 bg-white/5 rounded w-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : filteredContacts.length > 0 ? (
                                <div>
                                    {filteredContacts.map((contact) => {
                                        const isActive = selectedId === contact._id;
                                        const isUnread = !contact.isRead;
                                        return (
                                            <div
                                                key={contact._id}
                                                onClick={() => handleSelectContact(contact)}
                                                className={`relative w-full cursor-pointer text-left px-4 py-3 border-b border-slate-100 dark:border-white/5 transition-colors ${isActive ? 'bg-indigo-50 dark:bg-[#E8A33D]/[0.08]' : isUnread ? 'bg-amber-500/[0.04] dark:bg-[#E8A33D]/[0.03] hover:bg-amber-500/[0.08]' : 'hover:bg-slate-100 dark:hover:bg-white/[0.03]'}`}
                                            >
                                                {isActive && <span className="absolute left-0 top-0 h-full w-[3px] bg-indigo-600 dark:bg-[#E8A33D]" />}
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <span className="text-[10px] font-mono text-slate-400 dark:text-[#8B93A7]">#{indexOf(contact._id)}</span>
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        {isUnread && (
                                                            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-amber-500/15 text-amber-600 dark:bg-[#E8A33D]/20 dark:text-[#E8A33D] border border-amber-500/30 dark:border-[#E8A33D]/30 shadow-sm animate-pulse">
                                                                NEW
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] font-mono text-slate-400 dark:text-[#8B93A7]">{formatShortDate(contact.createdAt)}</span>
                                                        <button
                                                            onClick={(e) => handleToggleStar(e, contact)}
                                                            className={`p-0.5 rounded hover:bg-amber-500/15 transition-colors shrink-0 ${contact.isStarred ? 'text-amber-500 dark:text-[#E8A33D]' : 'text-slate-300 dark:text-white/20 hover:text-amber-500 dark:hover:text-[#E8A33D]'}`}
                                                            title={contact.isStarred ? "Unstar message" : "Star message"}
                                                        >
                                                            <Star className="w-3.5 h-3.5" filled={contact.isStarred} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <h4 className={`text-[13px] truncate mb-0.5 ${isUnread ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-[#F5F3EE]/80'}`}>
                                                    {highlightText(contact.subject || "No subject", searchTerm)}
                                                </h4>
                                                <p className={`text-[11px] truncate mb-1 ${isUnread ? 'font-medium text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-[#8B93A7]'}`}>{highlightText(contact.email, searchTerm)}</p>
                                                <p className="text-[11px] text-slate-400 dark:text-[#8B93A7]/70 truncate">{highlightText(contact.message, searchTerm)}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="w-5 h-5 text-white/20" />
                                    </div>
                                    <p className="text-[#F5F3EE] font-semibold text-sm mb-1">Inbox is empty</p>
                                    <p className="text-[#8B93A7] text-[11px] leading-relaxed">
                                        Messages from your portfolio will appear here.
                                    </p>
                                </div>
                            )}
                        </div>


                    </div>

                    {/* DETAIL PANE */}
                    <div className={`flex-1 flex-col bg-white dark:bg-[#14171F] min-w-0 transition-colors duration-300 ${selectedId ? 'flex' : 'hidden md:flex'}`}>
                        {selectedContact ? (
                            <>
                                {/* Detail header */}
                                <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex items-start gap-4 transition-colors">
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="md:hidden p-2 -ml-2 mr-1 text-slate-500 dark:text-[#8B93A7] hover:text-slate-900 dark:hover:text-[#F5F3EE] shrink-0 transition-colors"
                                        title="Back to inbox"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 dark:from-[#E8A33D] to-indigo-600 dark:to-[#c97f22] flex items-center justify-center text-white dark:text-[#0B0D12] font-bold text-lg shrink-0">
                                        {selectedContact.subject ? selectedContact.subject.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5F3EE] leading-snug transition-colors">
                                                {selectedContact.subject || "No subject"}
                                            </h3>
                                            <span className="shrink-0 text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] border border-slate-200 dark:border-white/10 rounded-full px-2 py-1 transition-colors">
                                                NO. {indexOf(selectedContact._id)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <Mail className="w-3 h-3 text-slate-400 dark:text-[#8B93A7]" />
                                            <span className="text-[12px] font-mono text-slate-500 dark:text-[#8B93A7] transition-colors">{selectedContact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Clock className="w-3 h-3 text-slate-400 dark:text-[#8B93A7]" />
                                            <span className="text-[11px] text-slate-500 dark:text-[#8B93A7] transition-colors">{formatDate(selectedContact.createdAt)}</span>
                                        </div>
                                    </div>

                                    {selectedContact.image && (
                                        <button
                                            onClick={() => setImageModal(selectedContact.image)}
                                            className="w-11 h-11 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 hover:border-indigo-300 dark:hover:border-[#E8A33D]/50 transition-colors"
                                            title="View attached image"
                                        >
                                            <img
                                                src={selectedContact.image}
                                                alt="Attached"
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    )}

                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            onClick={(e) => handleToggleStar(e, selectedContact)}
                                            className={`p-2.5 rounded-lg transition-all ${selectedContact.isStarred ? 'text-amber-500 hover:bg-amber-500/10' : 'text-slate-400 dark:text-[#8B93A7] hover:text-amber-500 hover:bg-amber-500/10'}`}
                                            title={selectedContact.isStarred ? "Unstar message" : "Star message"}
                                        >
                                            <Star className="w-4 h-4" filled={selectedContact.isStarred} />
                                        </button>
                                        <button
                                            onClick={(e) => handleToggleRead(e, selectedContact, !selectedContact.isRead)}
                                            className="p-2.5 text-slate-400 dark:text-[#8B93A7] hover:text-indigo-600 dark:hover:text-[#E8A33D] hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"
                                            title={selectedContact.isRead ? "Mark as unread" : "Mark as read"}
                                        >
                                            {selectedContact.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteByIdClick(e, selectedContact._id)}
                                            className="p-2.5 text-slate-400 dark:text-[#8B93A7] hover:text-red-500 dark:hover:text-[#E5484D] hover:bg-red-50 dark:hover:bg-[#E5484D]/10 rounded-lg transition-all"
                                            title="Delete message"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Detail body */}
                                <div className="flex-1 overflow-y-auto custom-scroll px-6 py-6">
                                    <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#F5F3EE]/90 whitespace-pre-wrap break-words max-w-2xl transition-colors">
                                        {selectedContact.message}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                                <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 transition-colors">
                                    <Mail className="w-6 h-6 text-slate-300 dark:text-white/20" />
                                </div>
                                <p className="text-slate-900 dark:text-[#F5F3EE] font-semibold text-sm mb-1 transition-colors">No message selected</p>
                                <p className="text-slate-500 dark:text-[#8B93A7] text-[11px] leading-relaxed max-w-xs transition-colors">
                                    Choose a message from the list to read it here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}