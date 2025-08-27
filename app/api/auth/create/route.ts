import { NextRequest, NextResponse } from 'next/server';
import { getUserData, createUser } from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const sanitized = username.toLowerCase();

    // Check if user already exists
    const existingUser = await getUserData(sanitized);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this username already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // Create new user
    const userData = await createUser(sanitized, password);

    return NextResponse.json({
      message: 'Account created successfully!',
      user: {
        username: userData.username,
        createdAt: userData.createdAt,
      }
    });

  } catch (error) {
    console.error('Account creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
