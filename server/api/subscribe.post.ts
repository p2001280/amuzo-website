import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const email = body.email;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email address',
        });
    }

    const config = useRuntimeConfig();

    // Create Transporter
    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: parseInt(config.smtpPort),
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass,
        },
    });

    try {
        // Send Confirmation Email
        await transporter.sendMail({
            from: config.fromEmail,
            to: email,
            subject: 'Welcome to AMUZO - Confirmation',
            html: `
        <div style="font-family: sans-serif; color: #000; padding: 20px;">
          <h1 style="text-transform: uppercase; letter-spacing: 2px;">Welcome to the movement.</h1>
          <p>You have successfully subscribed to the AMUZO exclusive list.</p>
          <p>We will notify you when Collection 001 drops.</p>
          <br>
          <p style="font-size: 0.8em; color: #666;">AMUZO</p>
        </div>
      `,
        });

        return { success: true, message: 'Confirmation email sent' };
    } catch (error) {
        console.error('Email sending failed:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to send confirmation email',
        });
    }
});
