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

    const url = new URL(req.url); // Extract the full URL
    const limit = url.searchParams.get('limit'); // Extract `limit` query parameter

    // Construct the API URL with optional limit
    const apiUrl = `${API_BASE_URL}${endpoints.characters.userCharacters}${
      limit ? `?limit=${limit}` : ''
    }`;

    const response = await axios.get(apiUrl, {
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
    console.error('Error fetching user-specific characters:', error.message);
    return NextResponse.json({ message: 'Error fetching characters' }, { status: 500 });
  }
}
