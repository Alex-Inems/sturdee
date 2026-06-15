import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    accent?: "emerald" | "amber" | "gray";
}

const accents = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    gray: "bg-gray-100 text-gray-600",
};

export default function StatCard({ label, value, icon: Icon, accent = "emerald" }: StatCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[12px] font-medium text-gray-500">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`flex h-9 w-9 items-center justify-center rounded-md ${accents[accent]}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
