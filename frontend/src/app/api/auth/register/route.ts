import { NextResponse } from "next/server";
import axios from "axios";
import API_BASE_URL from "@/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Forward registration request to the backend
    const response = await axios.post(`${API_BASE_URL}/auth/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error proxying /auth/register:", error.message);
    return NextResponse.json(
      { message: error.response?.data || "Error forwarding register request" },
      { status: error.response?.status || 500 }
    );
  }
}
