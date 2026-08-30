export const getNewPostNotificationTemplate = (
    title: string,
    authorName: string,
    category: string,
    postUrl: string,
    dashboardUrl: string
): { subject: string; html: string } => {
    const subject = `New post published: "${title}"`

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New post published</title>
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

    .header h1 {
      font-family: 'DM Serif Display', serif;
      font-size: 28px;
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

    .body {
      padding: 40px 48px;
    }

    .post-title {
      font-size: 19px;
      font-weight: 500;
      color: #f5f0e8;
      margin-bottom: 8px;
    }

    .meta {
      font-size: 13px;
      color: #888;
      margin-bottom: 32px;
    }

    .meta span {
      color: #60a5fa;
    }

    .cta-row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .cta-btn {
      display: inline-block;
      background: #3b82f6;
      color: #ffffff !important;
      text-decoration: none !important;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      padding: 14px 28px;
      border-radius: 10px;
      letter-spacing: 0.01em;
    }

    .cta-btn.secondary {
      background: transparent;
      border: 1px solid #333;
      color: #ccc !important;
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
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <div class="header">
        <div class="logo-mark"></div>
        <h1>A new post just<br/>went live</h1>
        <p>Sent to the super admin inbox so you can review it.</p>
      </div>

      <div class="body">
        <p class="post-title">${title}</p>
        <p class="meta">By <span>${authorName}</span> &middot; ${category}</p>

        <div class="cta-row">
          <a href="${postUrl}" class="cta-btn">View live post →</a>
          <a href="${dashboardUrl}" class="cta-btn secondary">Manage in dashboard</a>
        </div>
      </div>

      <div class="footer">
        <p>
          You're receiving this because this address is set as the super admin for Bloggers Blog.<br/>
          &copy; ${new Date().getFullYear()} Bloggers Blog. All rights reserved.
        </p>
      </div>

    </div>
  </div>
</body>
</html>`

    return { subject, html }
}
