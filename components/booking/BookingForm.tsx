"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { BOOKING_SERVICES, TIME_SLOTS } from "@/lib/constants";
import { useAuth } from "@/components/AuthContext";

export default function BookingForm() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const selectedService = BOOKING_SERVICES.find((s) => s.id === service);
    const minDate = new Date().toISOString().split("T")[0];

    const handleSubmit = async () => {
        if (!isAuthenticated) {
            router.push("/?auth=login");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service: selectedService?.name || service,
                    date,
                    time,
                    notes,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Booking failed");

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
                <p className="mt-3 text-gray-500 font-medium">
                    Your {selectedService?.name} session on {date} at {time} has been submitted.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all"
                    >
                        View My Bookings
                    </button>
                    <button
                        onClick={() => {
                            setSuccess(false);
                            setStep(1);
                            setService("");
                            setDate("");
                            setTime("");
                            setNotes("");
                        }}
                        className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-full text-sm hover:bg-gray-50"
                    >
                        Book Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
            <div className="flex border-b border-gray-100">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`flex-1 py-4 text-center text-sm font-semibold ${
                            step >= s ? "text-emerald-600 bg-emerald-50/50" : "text-gray-400"
                        }`}
                    >
                        Step {s}
                    </div>
                ))}
            </div>

            <div className="p-8">
                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Select a Service</h2>
                        <p className="text-gray-500 text-sm mb-6">Choose the session type you&apos;d like to book.</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {BOOKING_SERVICES.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setService(s.id)}
                                    className={`rounded-xl border p-5 text-left transition-all ${
                                        service === s.id
                                            ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <p className="font-bold text-gray-900">{s.name}</p>
                                    <p className="text-xs text-emerald-600 font-medium mt-1">{s.duration}</p>
                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{s.description}</p>
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={!service}
                            onClick={() => setStep(2)}
                            className="mt-8 flex items-center gap-2 px-8 py-3 bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-40 text-white font-semibold rounded-full text-sm transition-all ml-auto"
                        >
                            Continue <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Pick Date & Time</h2>
                        <p className="text-gray-500 text-sm mb-6">Select your preferred appointment slot.</p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <Calendar className="h-4 w-4 text-emerald-600" /> Date
                                </label>
                                <input
                                    type="date"
                                    min={minDate}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <Clock className="h-4 w-4 text-emerald-600" /> Time Slot
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {TIME_SLOTS.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setTime(slot)}
                                            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                                time === slot
                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-3 justify-end">
                            <button onClick={() => setStep(1)} className="px-6 py-3 text-gray-600 font-semibold text-sm">
                                Back
                            </button>
                            <button
                                disabled={!date || !time}
                                onClick={() => setStep(3)}
                                className="flex items-center gap-2 px-8 py-3 bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-40 text-white font-semibold rounded-full text-sm"
                            >
                                Continue <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
                        <p className="text-gray-500 text-sm mb-6">Double-check your booking details.</p>

                        <div className="rounded-xl bg-gray-50 border border-gray-100 p-6 space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Service</span>
                                <span className="font-semibold text-gray-900">{selectedService?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Duration</span>
                                <span className="font-semibold text-gray-900">{selectedService?.duration}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date</span>
                                <span className="font-semibold text-gray-900">{date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Time</span>
                                <span className="font-semibold text-gray-900">{time}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Additional notes (optional)
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                placeholder="Anything you'd like us to know before your session..."
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                            />
                        </div>

                        {!isAuthenticated && (
                            <p className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                You&apos;ll need to sign in to complete your booking.
                            </p>
                        )}

                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setStep(2)} className="px-6 py-3 text-gray-600 font-semibold text-sm">
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-8 py-3 bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 text-white font-semibold rounded-full text-sm transition-all"
                            >
                                {loading ? "Submitting..." : isAuthenticated ? "Confirm Booking" : "Sign In & Book"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
