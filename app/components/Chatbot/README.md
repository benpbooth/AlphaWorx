# Standalone Chatbot Component

A clean, self-contained React chatbot component that integrates with your n8n webhook.

## Features

- 🎨 Customizable colors and positioning
- 💬 Real-time messaging with webhook integration
- 📱 Responsive design
- ⌨️ Keyboard support (Enter to send)
- 🔄 Loading states and error handling
- 🎯 TypeScript support
- 📦 Zero external dependencies (except React and Lucide icons)

## Installation

1. Copy the `Chatbot` folder to your project
2. Install the required dependency:
   ```bash
   npm install lucide-react
   ```

## Usage

```tsx
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div>
      {/* Your existing content */}
      
      {/* Chatbot with default settings */}
      <Chatbot />
      
      {/* Or with custom configuration */}
      <Chatbot
        webhookUrl="https://your-webhook-url.com/chat"
        primaryColor="#1e40af"
        title="Customer Support"
        position="bottom-left"
        placeholder="How can we help you?"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `webhookUrl` | `string` | Your n8n webhook URL | The endpoint to send messages to |
| `primaryColor` | `string` | `#2563eb` | Primary color for the chat interface |
| `accentColor` | `string` | `#1d4ed8` | Accent color (currently unused, for future features) |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Position of the chat widget |
| `title` | `string` | `'Chat with us'` | Title shown in the chat header |
| `placeholder` | `string` | `'Type your message...'` | Placeholder text for the input field |

## Webhook Integration

The component sends POST requests to your webhook with the following payload:

```json
{
  "message": "User's message text",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

Your webhook should return a plain text response that will be displayed as the bot's reply.

## Styling

The component uses Tailwind CSS classes. If you're not using Tailwind in your target project, you'll need to either:

1. Add Tailwind CSS to your project
2. Convert the Tailwind classes to regular CSS
3. Use a CSS-in-JS solution

## Customization

You can easily customize the appearance by modifying the component's styling or adding new props. The component is designed to be self-contained and easily portable between projects.

## Browser Support

- Modern browsers with ES6+ support
- Mobile responsive
- Touch-friendly interface