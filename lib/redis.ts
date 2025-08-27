import { Redis } from '@upstash/redis';

// For development, we'll use a mock implementation if Redis credentials aren't available
const isDevelopment = !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = isDevelopment 
  ? null // We'll handle this in the functions
  : new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      retry: {
        retries: 3,
        backoff: (retryIndex) => Math.exp(retryIndex) * 50,
      },
    });

// Development mock data store (persisted in global for development)
declare global {
  var mockUsers: Map<string, UserData> | undefined;
}

const mockUsers = globalThis.mockUsers || new Map<string, UserData>();
if (isDevelopment) {
  globalThis.mockUsers = mockUsers;
}

export interface UserData {
  username: string;
  password: string; // In production, this should be hashed!
  createdAt: number;
  analytics: {
    callsThisMonth: number;
    conversionRate: number;
    appointmentsBooked: number;
    totalCalls: number;
  };
}

export async function getUserData(username: string): Promise<UserData | null> {
  const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  if (isDevelopment) {
    return mockUsers.get(sanitizedUsername) || null;
  }
  
  const data = await redis!.get<UserData>(`user:${sanitizedUsername}`);
  return data;
}

export async function createUser(username: string, password: string): Promise<UserData> {
  const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  const userData: UserData = {
    username: sanitizedUsername,
    password: password, // In production, hash this!
    createdAt: Date.now(),
    analytics: {
      callsThisMonth: Math.floor(Math.random() * 100) + 50, // Mock data
      conversionRate: Math.floor(Math.random() * 20) + 10,
      appointmentsBooked: Math.floor(Math.random() * 30) + 15,
      totalCalls: Math.floor(Math.random() * 500) + 200,
    }
  };

  if (isDevelopment) {
    mockUsers.set(sanitizedUsername, userData);
  } else {
    await redis!.set(`user:${sanitizedUsername}`, userData);
  }
  
  return userData;
}
