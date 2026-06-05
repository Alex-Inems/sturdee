"use client";

import { Play, Star, Clock, Users, ArrowRight } from "lucide-react";
import SectionShell from "./SectionShell";

const FeaturedCourses = () => {
    const courses = [
        {
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            title: "Executive Leadership",
            category: "Business",
            instructor: "Dr. James Morrison",
            duration: "12 weeks",
            students: "2,450",
            price: "2,890",
            rating: 4.9,
        },
        {
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
            title: "Strategic Innovation",
            category: "Management",
            instructor: "Prof. Sarah Chen",
            duration: "10 weeks",
            students: "1,890",
            price: "3,200",
            rating: 5.0,
        },
        {
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            title: "Digital Transformation",
            category: "Technology",
            instructor: "Michael Zhang",
            duration: "8 weeks",
            students: "3,120",
            price: "2,650",
            rating: 4.8,
        },
    ];

    return (
        <SectionShell id="courses">
            <div className="mb-12 lg:mb-16">
                <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                    Featured
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Featured Programs
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium mt-4">Curated for excellence</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                    <div
                        key={i}
                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300"
                    >
                        <div className="relative aspect-4/3 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-4 left-4 px-4 py-2 bg-[#FFE55E] rounded-full font-bold text-black text-xs">
                                {course.category}
                            </span>
                            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                                    <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                                </div>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex">
                                    {[...Array(5)].map((_, j) => (
                                        <Star
                                            key={j}
                                            className={`w-3.5 h-3.5 ${j < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500 font-medium">({course.rating})</span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-xs text-gray-500 font-medium mb-4">by {course.instructor}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-4">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5" />
                                    {course.students}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-xl font-bold text-gray-900">${course.price}</span>
                                <button className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Enroll <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
};

export default FeaturedCourses;
