export const getVerifyEmailTemplate = (username: string, verificationUrl: string): { subject: string; html: string } => {
    const subject = "Verify your email address"

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify your email</title>
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
      background: #3b82f6;
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
      color: #60a5fa;
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
      background: #3b82f6;
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
      background: #0f1e36;
      border: 1px solid #1e3a5f;
      border-radius: 8px;
      padding: 12px 16px;
      margin-top: 24px;
    }

    .expiry-note svg {
      flex-shrink: 0;
      color: #aaa;
    }

    .expiry-note p {
      font-size: 13px;
      color: #999;
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
        <div class="logo-mark"></div>
        <h1>Confirm your<br/>email address</h1>
        <p>Hey <span>${username}</span>, welcome aboard — one last step.</p>
      </div>

      <div class="body">
        <p class="message">
          Thanks for signing up. To activate your account and start using the platform, please verify that this is your email address by clicking the button below.
        </p>

        <div class="cta-wrapper">
          <a href="${verificationUrl}" class="cta-btn">Verify my email →</a>
        </div>

        <div class="expiry-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#aaa" stroke-width="1.5"/>
            <path d="M12 7v5l3 3" stroke="#aaa" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <p>This link expires in <strong style="color: #60a5fa">10 minutes</strong>. If it expires, you can request a new one from the sign-in page.</p>
        </div>

        <hr class="divider"/>

        <p class="fallback">
          Button not working? Copy and paste this link into your browser:<br/>
          <a href="${verificationUrl}">${verificationUrl}</a>
        </p>
      </div>

      <div class="footer">
        <p>
          If you didn't create an account, you can safely ignore this email — no action is needed.<br/>
          &copy; ${new Date().getFullYear()} Bloggers Blog. All rights reserved.
        </p>
      </div>

    </div>
  </div>
</body>
</html>`

    return { subject, html }
}