"use client";
import React, { useState, useRef } from "react";

import axios from "axios";
import { useToast } from "../Toast";
import Image from "next/image";
import { ArrowBigRight, MailMinus, Send } from "../Icons";
import imageCompression from "browser-image-compression";

function Contact({ content }) {
    const toast = useToast();
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const fileInputRef = useRef(null);

    if (!content) return null;

    const validate = () => {
        let tempErrors = {};
        if (!subject.trim()) tempErrors.subject = content.subjectRequired || "Subject is required";
        if (!email.trim()) {
            tempErrors.email = content.emailRequired || "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = content.emailInvalid || "Please enter a valid email address";
        }
        if (!message.trim()) tempErrors.message = content.messageRequired || "Message is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const ImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error(content.imageTypeError || "Please select a valid image file.");
            return;
        }

        setImageLoading(true);
        try {
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1280,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result);
                setImagePreview(reader.result);
                setImageLoading(false);
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error("Compression error:", error);
            toast.error(content.imageError || "Failed to process image.");
            setImageLoading(false);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const PostContact = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validate()) {
            toast.error(content.formError || "Please correct the errors in the form.");
            return;
        }

        setLoading(true);

        try {
            const payload = { subject, email, message };
            if (imageFile) payload.image = imageFile;

            await axios.post('/api/contact', payload);
            setSubject("");
            setEmail("");
            setMessage("");
            setErrors({});
            removeImage();
            toast.success(content.successMessage || "Sent successfully");
        } catch (error) {
            console.error(error);
            toast.error(content.errorMessage || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="Cnt"
            className=" pb-10 flex flex-col items-center pt-4 min-h-screen relative"
        >
            {/* Image Lightbox Modal */}
            {/* Image Lightbox Modal */}
            {imageModal && imagePreview && (
                <div
                    onClick={() => setImageModal(false)}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md cursor-zoom-out transition-opacity duration-300"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-3xl w-full cursor-default transform transition-all duration-300 scale-100"
                    >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setImageModal(false)}
                                className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white text-slate-700 rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors border border-slate-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={imagePreview}
                                alt="Full size preview"
                                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                            />
                    </div>
                </div>
            )}

            <div className="text-center pb-10">
                <p className="text-4xl font-bold dark:text-white">{content.title}</p>
                <p className="text-gray-400 text-sm">{content.subtitle}</p>
            </div>
            <div className="md:flex justify-center md:space-x-20 md:gap-20 md:space-y-0 space-y-5">
                {/* Contact Information */}
                <div className="w-64 mx-auto text-center space-y-3">
                    <h4 className="text-center font-bold dark:text-slate-200">{content.title}</h4>
                    <ul className="bg-white/70 dark:bg-[#0b1b2b]/70 backdrop-blur-sm space-y-1.5 py-4 rounded-2xl border border-gray-100 dark:border-[#13283d] shadow-md">
                        <li className="flex justify-center dark:text-blue-400">
                            <MailMinus />
                        </li>
                        <li className="font-semibold dark:text-gray-100">{content.email}</li>
                        <li className="text-[12px] text-gray-500 dark:text-gray-400">
                            abdellahedaoudi.dev@gmail.com
                        </li>
                        <li className="flex items-center dark:text-blue-400 justify-center text-[12px] font-medium gap-1">
                            {content.writeMe} <ArrowBigRight />
                        </li>
                    </ul>
                    <ul className="bg-white/70 dark:bg-[#0b1b2b]/70 backdrop-blur-sm space-y-1.5 py-4 rounded-2xl border border-gray-100 dark:border-[#13283d] shadow-md">
                        <li className="flex justify-center">
                            <Image src="/icons/whatsapp.png" width={25} height={25} alt="whatsapp" />
                        </li>
                        <li className="font-semibold dark:text-gray-100">{content.whatsapp}</li>
                        <li className="text-[12px] text-gray-500 dark:text-gray-400">+212 609085357</li>
                        <li className="flex items-center dark:text-blue-400 justify-center text-[12px] font-medium gap-1">
                            {content.writeMe} <ArrowBigRight />
                        </li>
                    </ul>
                </div>

                {/* Contact Form */}
                <div className="w-72 space-y-4">
                    <h4 className="text-center font-bold dark:text-slate-200">{content.subtitle}</h4>
                    <form onSubmit={PostContact} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder={content.subjectPlaceholder}
                                maxLength={100}
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    if (errors.subject) setErrors(prev => ({ ...prev, subject: null }));
                                }}
                                className={`text-[13px] bg-gray-50 dark:bg-[#0b1b2b] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 pl-4 pr-4 py-3 w-72 rounded-xl border-2 transition-colors ${errors.subject ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-[#13283d] dark:focus:border-blue-500'}`}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-[10px] mt-1 transition-all duration-300">
                                    {errors.subject}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder={content.emailPlaceholder}
                                maxLength={100}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                                }}
                                className={`text-[13px] bg-gray-50 dark:bg-[#0b1b2b] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 pl-4 pr-4 py-3 w-72 rounded-xl border-2 transition-colors ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-[#13283d] dark:focus:border-blue-500'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-[10px] mt-1 transition-all duration-300">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <textarea
                                placeholder={content.messagePlaceholder}
                                maxLength={5000}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    if (errors.message) setErrors(prev => ({ ...prev, message: null }));
                                }}
                                className={`text-[13px] bg-gray-50 dark:bg-[#0b1b2b] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 pl-4 pr-4 py-3 w-72 rounded-xl border-2 transition-colors ${errors.message ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-[#13283d] dark:focus:border-blue-500'}`}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-[10px] mt-1 transition-all duration-300">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        {/* Image Attachment */}
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                id="contact-image-input"
                                className="hidden"
                                onChange={ImageChange}
                            />
                            {!imagePreview ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={imageLoading}
                                    className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-slate-700 rounded-xl px-4 py-2.5 w-72 hover:border-gray-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
                                >
                                    {imageLoading ? (
                                        <>
                                            <div className="w-3 h-3 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin" />
                                            {content.imageCompressing || "Compressing..."}
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            {content.attachImage || "Attach an image (optional)"}
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div
                                    className="relative w-72 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 transition-all duration-300"
                                >
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            onClick={() => setImageModal(true)}
                                            className="w-full h-36 object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/80 transition-colors"
                                        >
                                            ✕
                                        </button>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-400 text-center py-1 bg-gray-50 dark:bg-slate-800">
                                            {content.imageAttached || "Image attached & compressed ✓"}
                                        </p>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || imageLoading}
                            className="flex gap-2 bg-gray-800 dark:bg-blue-800 hover:bg-gray-900 dark:hover:bg-blue-700 text-white px-5 py-3 rounded-lg items-center text-[14px] disabled:opacity-50 transition-all active:scale-95"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    {content.sendingButton} <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {content.sendButton} <Send />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
