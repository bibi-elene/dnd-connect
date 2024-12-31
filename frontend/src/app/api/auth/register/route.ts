import { NextResponse } from 'next/server';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { endpoints } from '../../endpoints';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await axios.post(`${API_BASE_URL}${endpoints.auth.register}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error proxying /auth/register:', error.message);
    return NextResponse.json(
      { message: error.response?.data || 'Error forwarding register request' },
      { status: error.response?.status || 500 }
    );
  }
}
