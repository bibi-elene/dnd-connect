/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const url = new URL(req.url);
    const limit = url.searchParams.get('limit') || null;

    const response = await axios.get(`${API_BASE_URL}${endpoints.characters.all}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: { limit },
      withCredentials: true,
    });
    console.log(response.data, 'res data from backend');
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error fetching characters:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error fetching characters' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  try {
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const accessToken = cookies['access_token'];

    const formData = await req.formData();
    const payload = new FormData();
    formData.forEach((value, key) => {
      payload.append(key, value);
    });

    const response = await axios.post(`${API_BASE_URL}${endpoints.characters.all}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error creating character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error creating character' },
      { status: error.response?.status || 500 }
    );
  }
}
