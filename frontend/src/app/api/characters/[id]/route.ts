/* eslint-disable @typescript-eslint/no-explicit-any */
import API_BASE_URL from '@/config';
import axios from 'axios';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const accessToken = cookies['access_token'];

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'Character ID is required' },
        { status: 400 }
      );
    }

    const response = await axios.get(`${API_BASE_URL}/characters/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error fetching character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error fetching character' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const accessToken = cookies['access_token'];

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'Character ID is required' },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const payload = new FormData();
    formData.forEach((value, key) => {
      payload.append(key, value);
    });

    const response = await axios.patch(
      `${API_BASE_URL}/characters/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error updating character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error updating character' },
      { status: error.response?.status || 500 }
    );
  }
}
