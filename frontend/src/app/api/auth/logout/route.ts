import { NextResponse } from "next/server";
import axios from "axios";
import API_BASE_URL from "@/config";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      console.error("No cookies found in request");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formattedCookie = cookieHeader.split("=")[1];

    // Forward logout request to the backend
    const response = await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${formattedCookie}`, // Use the Authorization header
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error proxying /auth/logout:", error.message);
    return NextResponse.json(
      { message: error.response?.data || "Error forwarding logout request" },
      { status: error.response?.status || 500 }
    );
  }
}
