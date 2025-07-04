import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const backendRes = await axios.post(
    `${process.env.BACKEND_URL}/users/signin`,
    { username, password },
    { withCredentials: true }
  );
  const token = (backendRes.data as string );
  const res = NextResponse.json({ loggedIn: true });
  res.cookies.set('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
