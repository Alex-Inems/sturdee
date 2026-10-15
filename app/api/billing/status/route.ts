import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { isProEntitled, PRO_PRICE_USD } from "@/lib/billing";

export async function GET() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({
            authenticated: false,
            plan: "free",
            planStatus: "inactive",
            isPro: false,
            priceUsd: PRO_PRICE_USD,
        });
    }

    return NextResponse.json({
        authenticated: true,
        plan: session.plan,
        planStatus: session.planStatus,
        isPro: isProEntitled(session),
        priceUsd: PRO_PRICE_USD,
    });
}
