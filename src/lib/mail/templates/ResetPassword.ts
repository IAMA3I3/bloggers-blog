export const getResetPasswordEmailTemplate = (username: string, resetUrl: string): { subject: string; html: string } => {
    const subject = "Reset your password"

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset your password</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0e0e0e;
      font-family: 'DM Sans', sans-serif;
      color: #e8e2d9;
      padding: 40px 16px;
    }

    .wrapper {
      max-width: 560px;
      margin: 0 auto;
    }

    .card {
      background: #161616;
      border: 1px solid #2a2a2a;
      border-radius: 16px;
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #111 100%);
      padding: 48px 48px 36px;
      border-bottom: 1px solid #222;
      position: relative;
    }

    .logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: #f97316;
      border-radius: 12px;
      margin-bottom: 28px;
    }

    .logo-mark svg {
      width: 24px;
      height: 24px;
    }

    .header h1 {
      font-family: 'DM Serif Display', serif;
      font-size: 30px;
      font-weight: 400;
      color: #f5f0e8;
      line-height: 1.2;
      margin-bottom: 12px;
    }

    .header p {
      font-size: 15px;
      color: #aaa;
      line-height: 1.6;
    }

    .header p span {
      color: #fb923c;
      font-weight: 500;
    }

    .body {
      padding: 40px 48px;
    }

    .message {
      font-size: 15px;
      color: #c0c0c0;
      line-height: 1.7;
      margin-bottom: 36px;
    }

    .cta-wrapper {
      margin-bottom: 36px;
    }

    .cta-btn {
      display: inline-block;
      background: #f97316;
      color: #ffffff !important;
      text-decoration: none !important;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      padding: 14px 32px;
      border-radius: 10px;
      letter-spacing: 0.01em;
    }

    .divider {
      border: none;
      border-top: 1px solid #222;
      margin: 32px 0;
    }

    .fallback {
      font-size: 13px;
      color: #888;
      line-height: 1.6;
    }

    .fallback a {
      color: #aaa;
      word-break: break-all;
    }

    .expiry-note {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #1f1208;
      border: 1px solid #3d2108;
      border-radius: 8px;
      padding: 12px 16px;
      margin-top: 24px;
    }

    .expiry-note svg {
      flex-shrink: 0;
    }

    .expiry-note p {
      font-size: 13px;
      color: #999;
    }

    .security-note {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      background: #111;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 36px;
    }

    .security-note svg {
      flex-shrink: 0;
      margin-top: 1px;
    }

    .security-note p {
      font-size: 13px;
      color: #888;
      line-height: 1.6;
    }

    .footer {
      padding: 24px 48px;
      border-top: 1px solid #1e1e1e;
      background: #111;
    }

    .footer p {
      font-size: 12px;
      color: #777;
      line-height: 1.6;
    }

    .footer a {
      color: #888;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <div class="header">
        <div class="logo-mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="14" height="10" rx="2" stroke="#fff" stroke-width="1.5"/>
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h1>Reset your<br/>password</h1>
        <p>Hey <span>${username}</span>, we received a request to reset your password.</p>
      </div>

      <div class="body">
        <p class="message">
          Click the button below to choose a new password. If you didn't request this, you can safely ignore this email — your password will remain unchanged.
        </p>

        <div class="security-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="#888" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
          <p>For your security, never share this link with anyone. Our team will never ask for it.</p>
        </div>

        <div class="cta-wrapper">
          <a href="${resetUrl}" class="cta-btn">Reset my password →</a>
        </div>

        <div class="expiry-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#f97316" stroke-width="1.5"/>
            <path d="M12 7v5l3 3" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <p>This link expires in <strong style="color: #fb923c">10 minutes</strong>. If it expires, you can request a new one from the sign-in page.</p>
        </div>

        <hr class="divider"/>

        <p class="fallback">
          Button not working? Copy and paste this link into your browser:<br/>
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
      </div>

      <div class="footer">
        <p>
          If you didn't request a password reset, please ignore this email — no action is needed.<br/>
          &copy; ${new Date().getFullYear()} Bloggers Blog. All rights reserved.
        </p>
      </div>

    </div>
  </div>
</body>
</html>`

    return { subject, html }
}