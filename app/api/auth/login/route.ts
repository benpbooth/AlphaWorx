import { NextRequest, NextResponse } from 'next/server';
import { getUserData } from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const userData = await getUserData(username);

    if (!userData) {
      return NextResponse.json(
        { error: 'Account not found. Please create an account first.' },
        { status: 404 }
      );
    }

    if (userData.password !== password) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Login successful!',
      user: {
        username: userData.username,
        createdAt: userData.createdAt,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
