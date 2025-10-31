# Contact Form Setup Instructions

Your website now has a contact form that sends emails directly without requiring the visitor to use their email client.

## Setup Steps:

### 1. Get a Free Web3Forms API Key

1. Go to https://web3forms.com
2. Click "Get Started for Free"
3. Enter your email (fbonds@gmail.com)
4. Verify your email
5. Copy your Access Key

### 2. Add Your API Key

1. Create a file named `.env` in the project root (same folder as package.json)
2. Add this line to the `.env` file:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_actual_key_here
   ```
3. Replace `your_actual_key_here` with the key you got from Web3Forms

### 3. Restart Dev Server

```bash
npm run dev
```

## How It Works

- When someone fills out the contact form on your website
- Web3Forms receives the data and sends an email to fbonds@gmail.com
- The sender gets a copy confirmation
- All spam protection is handled automatically

## Alternative Options

If you prefer a different service:

**Formspree**: https://formspree.io (also free)
**EmailJS**: https://www.emailjs.com (free tier available)

Let me know if you want to use a different service!

## For Production

Don't forget to:
1. Add your `.env` file to `.gitignore` (already done)
2. Set the environment variable on your hosting platform (Netlify, Vercel, etc.)
