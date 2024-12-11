import API_BASE_URL from '@/config';
import axios from 'axios';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';
import { endpoints } from '../../endpoints';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  try {
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const cookies = parse(cookieHeader);
    const accessToken = cookies['access_token'];

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: 'Character ID is required' }, { status: 400 });
    }
    const response = await axios.get(`${API_BASE_URL}${endpoints.users.user(Number(id))}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error fetching user:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error fetching user' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  try {
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const cookies = parse(cookieHeader);
    const accessToken = cookies['access_token'];

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const { username, role } = body;

    if (!username || !role) {
      return NextResponse.json({ message: 'Username and role are required' }, { status: 400 });
    }

    const response = await axios.patch(
      `${API_BASE_URL}${endpoints.users.user(Number(id))}`,
      { username, role },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error updating user:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error updating user' },
      { status: error.response?.status || 500 }
    );
  }
}
