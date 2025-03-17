import { NextResponse } from 'next/server';
import speciesData from '@/app/data/metadata/species.json';

export async function GET() {
  return NextResponse.json(speciesData);
}
