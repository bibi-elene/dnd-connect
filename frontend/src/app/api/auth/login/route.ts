import { NextResponse } from 'next/server';
import axios from 'axios';
import API_BASE_URL from '@/config';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await axios.post(`${API_BASE_URL}/auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const backendCookies = response.headers['set-cookie'];
    if (backendCookies) {
      const headers = new Headers();
      headers.append('Set-Cookie', backendCookies.join(','));
      return NextResponse.json(response.data, { headers });
    }

    return NextResponse.json(response.data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error proxying /auth/login:', error.message);
    return NextResponse.json(
      { message: error.response?.data || 'Error forwarding login request' },
      { status: error.response?.status || 500 }
    );
  }
}
