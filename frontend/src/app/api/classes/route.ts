import { NextResponse } from 'next/server';
import classesData from '@/app/data/metadata/classes.json';

export async function GET() {
  return NextResponse.json(classesData);
}
