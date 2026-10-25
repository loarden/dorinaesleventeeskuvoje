# D & L Esküvő - Wedding RSVP Site

A elegant, responsive wedding RSVP website with email submission functionality.

## Features

- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Glass-effect mobile navigation with smooth animations
- 🎯 Form validation (guest name & count)
- 📧 SMTP email notifications for RSVP submissions
- 🎁 Beautiful UI with custom fonts and decorative elements

## Setup

### Prerequisites

- Node.js 16+ installed
- Gmail or another SMTP service account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` file with your SMTP credentials:
```env
PORT=3000
RECIPIENT_EMAIL=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SENDER_NAME=D & L Esküvő
EMAIL_SUBJECT=Új visszajelzés - D & L Esküvő
```

#### Gmail Setup

If using Gmail:
1. Enable 2-Factor Authentication
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the generated password as `SMTP_PASSWORD` in `.env`

### Running

Start the server:
```bash
npm start
```

The site will be available at `http://localhost:3000`

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # Frontend logic
├── server.js           # Express backend
├── package.json        # Node dependencies
├── .env                # Configuration (not in git)
└── assets/             # Images and decorative elements
```

## API Endpoints

### POST `/api/submit-rsvp`

Submit RSVP form data and send email notification.

**Request:**
```json
{
  "name": "Guest Name",
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

### GET `/api/health`

Health check endpoint.

## Development

The frontend is a static single-page application with smooth scrolling navigation and form validation. The backend handles email sending via SMTP.

### Form Validation

- Name: 2-100 characters (required)
- Guest count: 1-20 people (required)

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Email**: Nodemailer
- **Icons**: Lucide
- **Fonts**: Google Fonts (Playfair Display, Montserrat, Allura)

## Author

Biacsi Örs
