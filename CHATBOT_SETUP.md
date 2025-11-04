# Chatbot Email Feedback Setup

The chatbot has thumbs up/down feedback functionality. When users give a thumbs down, it automatically sends you an email with the Q&A for improvement.

## Setup Instructions

### 1. Get a Web3Forms Access Key (Free)

1. Go to https://web3forms.com
2. Click "Get Started" or "Create Access Key"
3. Enter your email: `fbonds@gmail.com`
4. Verify your email
5. Copy your access key (looks like: `abcd1234-5678-90ef-ghij-klmnopqrstuv`)

### 2. Configure the Access Key

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your access key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

### 3. Build and Deploy

```bash
npm run build
```

The `.env.local` file is gitignored, so your key stays private.

## How It Works

1. **User gives thumbs down** on a bot response
2. **Email is sent to fbonds@gmail.com** with:
   - Subject: "FLETCHERBONDS.COM - Chat Box Issue"
   - The user's question
   - The bot's response
   - Timestamp
   - Note that user found it unhelpful

3. **Visual feedback**: Button changes to show "Feedback sent"

## Email Format

```
User Feedback: Thumbs Down

Question: [User's question]

Response: [Bot's response]

Timestamp: [ISO timestamp]

Note: User indicated this response missed the mark or was too generalized.
```

## Features

- ✅ Thumbs up/down on all bot responses (except welcome message)
- ✅ Visual feedback when clicked (green for up, red for down)
- ✅ Buttons disabled after voting
- ✅ Only thumbs down sends email (to avoid spam)
- ✅ Free service (Web3Forms) - no backend needed
- ✅ Privacy: No user data collected, just Q&A pairs

## Testing

1. Start dev server: `npm run dev`
2. Open chatbot
3. Ask a question
4. Click thumbs down
5. Check your email (fbonds@gmail.com)

## Alternative: Using Your Own Backend

If you prefer to use your own email service, replace the Web3Forms API call in `Chatbot.jsx` with your own backend endpoint.
