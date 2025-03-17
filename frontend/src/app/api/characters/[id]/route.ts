/* eslint-disable @typescript-eslint/no-explicit-any */
import API_BASE_URL from '@/config';
import axios from 'axios';
import { parse } from 'cookie';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { NextResponse } from 'next/server';
import { endpoints } from '../../endpoints';

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

    const response = await axios.get(
      `${API_BASE_URL}${endpoints.characters.character(Number(id))}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const characterData = response.data;
    if (typeof characterData.abilityScores === 'string') {
      characterData.abilityScores = JSON.parse(characterData.abilityScores);
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error fetching character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error fetching character' },
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
      return NextResponse.json({ message: 'Character ID is required' }, { status: 400 });
    }

    const formData = await req.formData();
    const payload = new FormData();
    formData.forEach((value, key) => {
      payload.append(key, value);
    });

    const response = await axios.patch(
      `${API_BASE_URL}${endpoints.characters.character(Number(id))}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const characterData = response.data;

    characterData.abilityScores = JSON.stringify(characterData.abilityScores);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error updating character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error updating character' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(req: Request) {
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

    const response = await axios.delete(
      `${API_BASE_URL}${endpoints.characters.character(Number(id))}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ message: 'Character deleted successfully' }, { status: 200 });
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.error('Error deleting character:', error?.message || error);
    return NextResponse.json(
      { message: error.response?.data || 'Error deleting character' },
      { status: error.response?.status || 500 }
    );
  }
}
