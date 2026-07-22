import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ camperId: string }> }
) {
  try {
    const { camperId } = await params;
    const searchParams = Object.fromEntries(_req.nextUrl.searchParams);
    const res = await api.get(`/campers/${camperId}/reviews`, { params: searchParams });

    return NextResponse.json(res.data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}