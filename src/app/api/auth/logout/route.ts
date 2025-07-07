import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Clear cookies or session storage here
  const cookieStore = await cookies();
  cookieStore.delete('jwt');

  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
