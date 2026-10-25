# D & L Esküvő - Wedding RSVP Site

A elegant, responsive wedding RSVP website with email submission functionality. Deployable for free on Vercel.

## Features

- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Glass-effect mobile navigation with smooth animations
- 🎯 Form validation (guest name & count)
- 📧 SMTP email notifications for RSVP submissions
- 🎁 Beautiful UI with custom fonts and decorative elements
- ☁️ Serverless backend (Vercel Functions)

## Quick Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Vercel deployment ready"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3. Add Environment Variables

After deployment, go to **Project Settings → Environment Variables** and add:

```
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_SECURE: false
SMTP_USER: your-email@gmail.com
SMTP_PASSWORD: your-app-password
RECIPIENT_EMAIL: biacsi.ors@gmail.com
SENDER_NAME: D & L Esküvő
EMAIL_SUBJECT: Új visszajelzés - D & L Esküvő
```

#### Gmail Setup (Recommended)

1. Enable [2-Factor Authentication](https://myaccount.google.com/security) on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the generated 16-character password as `SMTP_PASSWORD`

#### Other Email Providers

- **SendGrid**: Use `smtp.sendgrid.net` as host, `apikey` as username, API key as password
- **Mailgun**: Use `smtp.mailgun.org`
- **AWS SES**: Use `email-smtp.region.amazonaws.com`

## Local Development

### Prerequisites

- Node.js 16+
- Gmail or SMTP service account

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=biacsi.ors@gmail.com
SENDER_NAME=D & L Esküvő
EMAIL_SUBJECT=Új visszajelzés - D & L Esküvő
```

3. Run development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
├── index.html              # Main HTML file
├── style.css               # Styling
├── script.js               # Frontend logic
├── assets/                 # Images and decorative elements
├── api/
│   └── submit.js          # Vercel API function for email
├── package.json           # Node dependencies
├── .env                   # Environment variables (not in git)
├── .gitignore             # Git ignore rules
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## API Endpoints

### POST `/api/submit`

Submit RSVP form data and send email notification.

**Request:**
```json
{
  "name": "Kiss János",
  "count": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Form Validation

- **Name**: 2-100 characters (required)
- **Guest count**: 1-20 people (required)

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Vercel Functions
- **Email**: Nodemailer
- **Icons**: Lucide
- **Fonts**: Google Fonts (Playfair Display, Montserrat, Allura)
- **Hosting**: Vercel (free tier)

## Troubleshooting

### Email not sending?

1. Check environment variables are set correctly in Vercel dashboard
2. Verify SMTP credentials work locally
3. Check spam folder for test emails
4. Enable "Less secure app access" (Gmail) or use App Password

### Form not submitting?

1. Open browser DevTools (F12)
2. Check Console tab for error messages
3. Verify API endpoint responds: `curl https://your-domain/api/submit`

## Customization

### Change wedding details

Edit `index.html`:
- Update date: Line 43
- Update location: Line 50-52
- Update hero text: Lines 58-62

### Change email template

Edit `api/submit.js` lines 31-38 to customize the email format

### Change colors/fonts

Edit `style.css` `:root` variables (lines 2-12)

## Support

For issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with `npm run dev`
4. Check nodemailer SMTP settings

## License

MIT

## Author

Biacsi Örs - biacsi.ors@gmail.com
