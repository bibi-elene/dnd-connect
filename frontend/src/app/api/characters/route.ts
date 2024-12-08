/* eslint-disable @typescript-eslint/no-explicit-any */
import API_BASE_URL from '@/config';
import axios from 'axios';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      console.error('No cookies found in request');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);

    const accessToken = cookies['access_token'];

    const response = await axios.get(`${API_BASE_URL}/characters`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

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
  try {
    const cookieHeader = req.headers.get('cookie');
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

    const response = await axios.post(`${API_BASE_URL}/characters`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error creating character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error creating character' },
      { status: error.response?.status || 500 }
    );
  }
}
