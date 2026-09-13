"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../../Components/Toast";
import { Trash2, ImageIcon, RefreshCcw } from "../../Components/Icons";
import { useRouter } from "next/navigation";

export default function Media({ isForbidden, setIsForbidden }) {
    const toast = useToast();
    const router = useRouter();
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageModal, setImageModal] = useState(null); // stores image object when open
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        public_id: null,
        isDeleting: false
    });

    const fetchImages = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`,
                { withCredentials: true }
            );
            if (response.data.success) {
                setImages(response.data.images || []);
            }
            if (silent) toast.success("Refreshed");
        } catch (error) {
            console.error("Fetch media error details:", error);
            if (error.response) {
                const errorCode = error.response.data?.code;
                if (errorCode === "ACCESS_TOKEN_EXPIRED") {
                    try {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
                            {},
                            { withCredentials: true }
                        );
                        fetchImages(true);
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
                    toast.error(`Error: ${error.response.data?.message || "Failed to fetch images."}`);
                }
            } else if (error.request) {
                toast.error("Network error: No response received.");
            } else {
                toast.error("Error setting up request.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDeleteClick = (e, public_id) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, public_id, isDeleting: false });
    };

    const confirmDelete = async () => {
        if (!deleteModal.public_id) return;
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));
        try {
            await axios({
                method: "delete",
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`,
                data: { public_id: deleteModal.public_id },
                withCredentials: true
            });
            setImages(prev => prev.filter(img => img.public_id !== deleteModal.public_id));
            toast.success("Image deleted successfully.");
        } catch (error) {
            console.error("Delete media error:", error);
            if (error.response) {
                const errorCode = error.response.data?.code;
                if (errorCode === "ACCESS_TOKEN_EXPIRED") {
                    try {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
                            {},
                            { withCredentials: true }
                        );
                        await axios({
                            method: "delete",
                            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`,
                            data: { public_id: deleteModal.public_id },
                            withCredentials: true
                        });
                        setImages(prev => prev.filter(img => img.public_id !== deleteModal.public_id));
                        toast.success("Image deleted successfully.");
                    } catch (refreshError) {
                        toast.error("Session expired. Please login again.");
                        router.push("/Admin/Login");
                    }
                } else {
                    toast.error(`Error: ${error.response.data?.message || "Failed to delete image."}`);
                }
            } else {
                toast.error("Failed to delete image.");
            }
        } finally {
            setDeleteModal(prev => ({ ...prev, isOpen: false, isDeleting: false }));
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col font-sans">
            {/* Image Lightbox Modal */}
                {imageModal && (
                    <div
                        onClick={() => setImageModal(null)}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full cursor-default flex flex-col gap-3"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setImageModal(null)}
                                className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white text-slate-900 rounded-full shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image */}
                            <div className="rounded-xl overflow-hidden shadow-2xl bg-black/30">
                                <img
                                    src={imageModal.secure_url}
                                    alt="Full size"
                                    className="w-full max-h-[65vh] object-contain"
                                />
                            </div>

                            {/* Metadata panel — separate from image */}
                            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-4">
                                <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-white">
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-[9px] uppercase font-mono tracking-widest mb-0.5">Public ID</span>
                                        <span className="font-medium truncate max-w-[200px]" title={imageModal.public_id}>{imageModal.public_id}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-[9px] uppercase font-mono tracking-widest mb-0.5">Format</span>
                                        <span className="font-medium uppercase">{imageModal.format}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-[9px] uppercase font-mono tracking-widest mb-0.5">Size</span>
                                        <span className="font-medium">{(imageModal.bytes / 1024).toFixed(1)} KB</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-[9px] uppercase font-mono tracking-widest mb-0.5">Dimensions</span>
                                        <span className="font-medium">{imageModal.width} × {imageModal.height}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-[9px] uppercase font-mono tracking-widest mb-0.5">Uploaded</span>
                                        <span className="font-medium">{new Date(imageModal.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
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
                                    Delete this image?
                                </h3>
                                <p className="text-slate-500 dark:text-[#8B93A7] mb-6 leading-relaxed px-2 text-xs transition-colors">
                                    This image will be permanently removed from Cloudinary. This cannot be undone.
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                        className="flex-1 px-4 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-[#F5F3EE]/80 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 font-semibold transition-all text-xs disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-3 bg-red-500 dark:bg-[#E5484D] text-white rounded-lg hover:bg-red-600 dark:hover:bg-[#c93d42] font-semibold transition-all shadow-lg shadow-red-500/20 dark:shadow-[#E5484D]/20 text-xs disabled:opacity-70 flex justify-center items-center gap-2"
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
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-slate-50 dark:bg-[#0E1016] flex flex-col flex-1 min-h-0 transition-colors duration-300">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0D12] transition-colors duration-300">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-[#F5F3EE] tracking-tight transition-colors">Media Gallery</h2>
                        <p className="text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] uppercase tracking-[0.2em] mt-0.5 transition-colors">
                            {images.length} images stored
                        </p>
                    </div>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => fetchImages()}
                            className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#F5F3EE]/70 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-[#F5F3EE] rounded-lg transition-all active:scale-95"
                            title="Refresh"
                        >
                            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Grid body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="aspect-square bg-slate-200 dark:bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map((img) => (
                                    <div
                                        key={img.public_id}
                                        className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#14171F] cursor-zoom-in transition-all hover:border-indigo-400 dark:hover:border-[#E8A33D]/50 shadow-sm"
                                        onClick={() => setImageModal(img)}
                                    >
                                        <img
                                            src={img.secure_url}
                                            alt={img.public_id}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        {/* File format badge */}
                                        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur text-white text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {img.format}
                                        </div>

                                        {/* Delete button */}
                                        <button
                                            onClick={(e) => handleDeleteClick(e, img.public_id)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 scale-90 hover:scale-100 shadow-lg"
                                            title="Delete image"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 transition-colors">
                                <ImageIcon className="w-8 h-8 text-slate-300 dark:text-white/20" />
                            </div>
                            <p className="text-slate-900 dark:text-[#F5F3EE] font-semibold mb-1 transition-colors">No media found</p>
                            <p className="text-slate-500 dark:text-[#8B93A7] text-xs max-w-xs transition-colors">
                                Images attached to messages will appear in this gallery.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
