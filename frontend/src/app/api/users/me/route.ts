/* eslint-disable @typescript-eslint/no-explicit-any */
import API_BASE_URL from '@/config';
import axios from 'axios';
import { parse } from 'cookie';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { NextResponse } from 'next/server';
import { endpoints } from '../../endpoints';

export async function GET(req: Request) {
  console.log('starttt !@#!#@!#!'); // Debugging start

  const cookieHeader = req.headers.get('cookie');

  try {
    if (!cookieHeader) {
      console.error('❌ No cookies found in request');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const accessToken = cookies['access_token'];

    // Log API route before making the request
    console.log('🔍 Fetching user profile from:', `${API_BASE_URL}${endpoints.users.me}`);
    console.log('🔍 endpoints.users.me:', endpoints.users.me);

    const response = await axios.get(`${API_BASE_URL}${endpoints.users.me}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    console.log('✅ User data retrieved:', response.data);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('❌ Error proxying api/users/me:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error forwarding request' },
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

    const payload = await req.json();

    const allowedUpdates: Record<string, any> = {};
    if (payload.username) allowedUpdates.username = payload.username;
    if (payload.email) allowedUpdates.email = payload.email;

    console.log('🔍 Sending PATCH request to:', `${API_BASE_URL}${endpoints.users.me}`);
    console.log('🔍 Payload:', allowedUpdates);

    const response = await axios.patch(`${API_BASE_URL}${endpoints.users.me}`, allowedUpdates, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ User profile updated:', response.data);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('❌ Error updating profile:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error updating profile' },
      { status: error.response?.status || 500 }
    );
  }
}
