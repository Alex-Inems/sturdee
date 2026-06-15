import type { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
    completed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize ${styles[status]}`}
        >
            {status}
        </span>
    );
}
