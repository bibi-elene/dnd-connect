import API_BASE_URL from '@/config';
import axios from 'axios';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';
import { endpoints } from '../endpoints';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  try {
    if (!cookieHeader) {
      console.error('No cookies found in request');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);

    const accessToken = cookies['access_token'];
    const response = await axios.get(`${API_BASE_URL}${endpoints.users.all}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error proxying users data:', error.message);
    return NextResponse.json(
      { message: error.response?.data || 'Error forwarding register request' },
      { status: error.response?.status || 500 }
    );
  }
}
