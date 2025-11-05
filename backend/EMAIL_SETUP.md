# 📧 Email Configuration Guide

This guide will help you set up email functionality for the BestLife application using Nodemailer.

## 🎯 Features

- ✅ Contact form emails
- ✅ Newsletter subscription
- ✅ Automatic confirmation emails to users
- ✅ Admin notifications
- ✅ Beautiful HTML email templates

## 🔧 Setup Options

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account Settings → Security
   - Enable 2-Step Verification
   - Click on "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. **Add to `.env` file:**
```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=your-gmail@gmail.com
EMAIL_FROM_NAME=BestLife
ADMIN_EMAIL=admin@bestlife.com
```

### Option 2: Outlook/Hotmail

```env
# Email Configuration (Outlook)
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_FROM=your-email@outlook.com
EMAIL_FROM_NAME=BestLife
ADMIN_EMAIL=admin@bestlife.com
```

### Option 3: Mailtrap (Testing Only)

Perfect for development/testing without sending real emails.

1. Sign up at [Mailtrap.io](https://mailtrap.io)
2. Get your credentials from the inbox

```env
# Email Configuration (Mailtrap)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your-mailtrap-username
EMAIL_PASS=your-mailtrap-password
EMAIL_FROM=noreply@bestlife.com
EMAIL_FROM_NAME=BestLife
ADMIN_EMAIL=admin@bestlife.com
```

### Option 4: SendGrid (Production)

Best for production with high email volume.

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create an API key

```env
# Email Configuration (SendGrid)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@bestlife.com
EMAIL_FROM_NAME=BestLife
ADMIN_EMAIL=admin@bestlife.com
```

## 📝 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port (usually 587) | `587` |
| `EMAIL_USER` | Email account username | `your-email@gmail.com` |
| `EMAIL_PASS` | Email account password or app password | `abcd efgh ijkl mnop` |
| `EMAIL_FROM` | Sender email address | `noreply@bestlife.com` |
| `EMAIL_FROM_NAME` | Sender name | `BestLife` |
| `ADMIN_EMAIL` | Email where contact forms are sent | `admin@bestlife.com` |

## 🚀 API Endpoints

### 1. Send Contact Message
```bash
POST /api/contact
Content-Type: application/json

{
  "nom": "John Doe",
  "email": "john@example.com",
  "sujet": "Question about products",
  "message": "Hello, I would like to know more about..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message envoyé avec succès! Nous vous répondrons bientôt."
}
```

### 2. Newsletter Subscription
```bash
POST /api/contact/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Abonnement réussi! Vérifiez votre email."
}
```

## 🧪 Testing

### Test with cURL:

**Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test User",
    "email": "test@example.com",
    "sujet": "Test Message",
    "message": "This is a test message"
  }'
```

**Newsletter:**
```bash
curl -X POST http://localhost:5000/api/contact/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## 🎨 Email Templates

The system sends beautifully formatted HTML emails:

1. **Contact Form Admin Notification** - Sent to admin with user's message
2. **Contact Form Confirmation** - Sent to user confirming receipt
3. **Newsletter Welcome** - Sent to new subscribers with welcome offer

## ⚠️ Troubleshooting

### Gmail "Less secure app access" Error
- Use App Passwords instead of your regular password
- Enable 2-Factor Authentication first

### Emails not sending
- Check your `.env` file has correct credentials
- Verify SMTP host and port
- Check firewall/antivirus isn't blocking SMTP
- Look at console logs for specific errors

### Emails going to spam
- Use a verified domain email
- Add SPF, DKIM records (production)
- Use a professional email service like SendGrid

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use App Passwords** for Gmail instead of account password
3. **For production**, use professional email services (SendGrid, AWS SES)
4. **Rate limit** contact form submissions to prevent spam
5. **Validate and sanitize** all user inputs

## 📊 Email Types Sent

| Type | Recipient | Purpose |
|------|-----------|---------|
| Contact Admin | Admin | New contact form submission |
| Contact Confirmation | User | Confirms message was received |
| Newsletter Welcome | Subscriber | Welcome new newsletter subscriber |
| Newsletter Admin | Admin | Notify of new subscriber |

## 🚀 Production Recommendations

For production, consider:

1. **SendGrid** or **AWS SES** for reliability
2. **Email templates** stored in database
3. **Email queue system** (Bull/Redis) for handling high volume
4. **Unsubscribe links** for newsletters (GDPR compliance)
5. **Email tracking** and analytics
6. **Backup SMTP** server for failover

## 💡 Next Steps

After setting up email:
1. Test all email flows
2. Customize email templates with your branding
3. Add email logging/tracking
4. Implement email preferences for users
5. Add more email types (order confirmation, password reset, etc.)
