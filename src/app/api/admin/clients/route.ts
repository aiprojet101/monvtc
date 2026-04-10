import { NextRequest, NextResponse } from "next/server";
import { getClients } from "@/lib/db";

const ADMIN_SECRET = process.env.MONVTC_ADMIN_SECRET || "";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") ||
    request.headers.get("authorization")?.replace("Bearer ", "") || "";

  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clients = await getClients();
  return NextResponse.json(clients);
}
