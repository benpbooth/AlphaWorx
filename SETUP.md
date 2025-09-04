# AgentEva Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
UPSTASH_REDIS_REST_URL=your_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```

## Getting Upstash Redis Credentials

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the REST URL and REST TOKEN from the database details
4. Add them to your `.env.local` file

## Development

```bash
npm run dev
```

## Features

- Main marketing website at `/`
- User login/registration at `/login`
- Analytics dashboard at `/dashboard/[username]`
- Integrated chatbot component




