"use client";

import { useState } from "react";
import { X, BookOpen, Mail, Lock, ArrowRight, User } from "lucide-react";
import { useAuth } from "./AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, isLogin ? undefined : name);
        onClose();
        // Reset
        setEmail("");
        setName("");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Left Side - Image & Branding */}
                <div className="relative md:w-2/5 bg-burgundy text-white p-8 flex flex-col justify-between hidden md:flex">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-gold tracking-[0.2em] uppercase font-medium mb-8">
                            <BookOpen className="w-5 h-5" />
                            Académie
                        </div>
                        <h2 className="text-3xl font-light leading-tight mb-4">
                            {isLogin ? "Welcome Back, Scholar" : "Begin Your Journey"}
                        </h2>
                        <p className="text-white/70 font-light leading-relaxed">
                            Access world-class resources and connect with a global community of learners.
                        </p>
                    </div>
                    <div className="relative z-10 text-xs text-white/40">
                        © 2025 Académie. Excellence in Education.
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 p-8 md:p-12 relative bg-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    <div className="mb-8">
                        <h3 className="text-2xl font-light text-gray-900 mb-2">
                            {isLogin ? "Sign in to account" : "Create an account"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {isLogin ? "Enter your credentials to access the portal." : "Fill in your details to get started."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                                    placeholder="student@academie.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-burgundy text-white py-4 hover:bg-[#600018] transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-medium">
                            {isLogin ? "Access Portal" : "Join Académie"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center text-sm">
                        <span className="text-gray-500 mr-2">
                            {isLogin ? "Not a member?" : "Already enrolled?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-burgundy hover:text-gold font-medium transition-colors"
                        >
                            {isLogin ? "Apply for admission" : "Sign in here"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
