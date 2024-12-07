import { NextResponse } from 'next/server';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { parse } from 'cookie';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      console.error('No cookies found in request');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);

    const accessToken = cookies['access_token'];

    if (!accessToken) {
      console.error('Access token not found in cookies');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    const res = NextResponse.json(response.data, { status: response.status });
    res.headers.set(
      'Set-Cookie',
      'access_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    );

    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error processing logout:', error.message);
    return NextResponse.json(
      { message: 'Logout failed', error: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}
