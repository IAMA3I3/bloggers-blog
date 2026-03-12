import nodemailer from "nodemailer"

type SendMailOptions = {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  fromName?: string  // ← added
  cc?: string | string[]
  bcc?: string | string[]
  attachments?: {
    filename: string
    path?: string
    content?: Buffer | string
  }[]
}

export async function sendMail(options: SendMailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `${options.fromName ?? "Bloggers Blog"} <${process.env.SMTP_USER}>`, // ← updated
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments,
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Mail error:", error)
    return { success: false, error }
  }
}