import API_BASE_URL from "@/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      console.error("No cookies found in request");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formattedCookie = cookieHeader.split("=")[1];
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${formattedCookie}`, // Forward cookies to the backend
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error proxying /auth/me:", error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || "Error forwarding request" },
      { status: error.response?.status || 500 }
    );
  }
}
